require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        
        await client.connect();
        console.log("✅ Connected successfully to MongoDB Atlas");

        const database = client.db('ecommerce');
        const productCollection = database.collection('products');
        const userCollection = database.collection('user');
        const orderCollection = database.collection('orders');

        const store_id = process.env.STORE_ID || 'testbox';
        const store_passwd = process.env.STORE_PASS || 'qwerty';
        const is_live = false; 


        app.post('/create-ssl-payment', async (req, res) => {
            const { userId, items, totalAmount, address } = req.body;

            const tran_id = new ObjectId().toString();

            const data = {
                total_amount: totalAmount,
                currency: 'BDT',
                tran_id: tran_id,
                success_url: `https://ecommerce-web-nrat.vercel.app/payment/success/${tran_id}`,
                fail_url: `https://ecommerce-web-nrat.vercel.app/payment/fail/${tran_id}`,
                cancel_url: `https://ecommerce-web-nrat.vercel.app/payment/cancel/${tran_id}`,
                ipn_url: 'https://ecommerce-web-nrat.vercel.app/ipn',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: 'customer@example.com',
                cus_add1: address,
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };

            const order = {
                userId: new ObjectId(userId),
                transactionId: tran_id,
                items: items,
                totalAmount: totalAmount,
                address: address,
                status: 'Pending',
                paymentStatus: 'Unpaid',
                createdAt: new Date()
            };

            await orderCollection.insertOne(order);

            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            sslcz.init(data).then(apiResponse => {
                let GatewayPageURL = apiResponse.GatewayPageURL;
                res.send({ url: GatewayPageURL });
            });
        });

        app.post('/payment/success/:tranId', async (req, res) => {
            const tranId = req.params.tranId;

            const result = await orderCollection.updateOne(
                { transactionId: tranId },
                {
                    $set: {
                        paymentStatus: 'Paid',
                        status: 'Processing'
                    }
                }
            );

            if (result.modifiedCount > 0) {
                const order = await orderCollection.findOne({ transactionId: tranId });
                if (order) {
                    await userCollection.updateOne(
                        { _id: new ObjectId(order.userId) },
                        { $set: { cart: [] } }
                    );
                }

                res.redirect(`http://localhost:5173/payment/success/${tranId}`);
            } else {
                res.redirect(`http://localhost:5173/payment/fail/${tranId}`);
            }
        });

        app.post('/payment/fail/:tranId', async (req, res) => {
            const tranId = req.params.tranId;
            await orderCollection.deleteOne({ transactionId: tranId });
            res.redirect(`http://localhost:5173/payment/fail/${tranId}`);
        });

        app.get('/orders/:userId', async (req, res) => {
            const userId = req.params.userId;
            try {
                const orders = await orderCollection
                    .find({ userId: new ObjectId(userId) })
                    .sort({ createdAt: -1 })
                    .toArray();
                res.send(orders);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch orders" });
            }
        });


        app.get('/products', async (req, res) => {
            const products = await productCollection.find().toArray();
            res.send(products);
        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        app.post('/products', async (req, res) => {
            const product = req.body;

            const newProduct = {
                name: product.name,
                category: product.category,
                description: product.description,
                image: product.image,
                price: parseFloat(product.price) || 0,
                originalPrice: parseFloat(product.originalPrice) || 0,
                stock: parseInt(product.stock) || 0,
                createdAt: new Date()
            };

            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: updatedProduct.name,
                    category: updatedProduct.category,
                    description: updatedProduct.description,
                    image: updatedProduct.image,
                    price: parseFloat(updatedProduct.price) || 0,
                    originalPrice: parseFloat(updatedProduct.originalPrice) || 0,
                    stock: parseInt(updatedProduct.stock) || 0,
                },
            };
            const result = await productCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.post('/register', async (req, res) => {
            const user = req.body;

            const existingUser = await userCollection.findOne({ email: user.email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.post('/login', async (req, res) => {
            const { email, password } = req.body;

            const user = await userCollection.findOne({ email });

            if (user && user.password === password) {
                const { password, ...userWithoutPassword } = user;
                res.json({ success: true, user: userWithoutPassword });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        });

        app.get('/users', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    address: updatedUser.address,
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/users/:id/cart', async (req, res) => {
            const id = req.params.id;
            const cartItems = req.body.cartItems;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    cartItems: cartItems,
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        app.post('/cart/add', async (req, res) => {
            const { userId, product } = req.body;
            const productId = product._id; 

            try {
                const updateResult = await userCollection.updateOne(
                    { _id: new ObjectId(userId), "cart.productId": productId },
                    { $inc: { "cart.$.quantity": 1 } }
                );

                if (updateResult.matchedCount === 0) {
                    const cartItem = {
                        productId: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        quantity: 1
                    };

                    await userCollection.updateOne(
                        { _id: new ObjectId(userId) },
                        { $push: { cart: cartItem } }
                    );
                }

                res.json({ success: true, message: "Cart updated" });
            } catch (error) {
                console.error("Cart Error:", error);
                res.status(500).json({ message: "Server Error" });
            }
        });

        app.put('/cart/update-quantity', async (req, res) => {
            const { userId, productId, type } = req.body;

            try {
                const quantityChange = type === 'increment' ? 1 : -1;

                await userCollection.updateOne(
                    { _id: new ObjectId(userId), "cart.productId": productId },
                    { $inc: { "cart.$.quantity": quantityChange } }
                );


                res.json({ success: true });
            } catch (error) {
                res.status(500).json({ message: "Error updating quantity" });
            }
        });

        app.get('/cart/:userId', async (req, res) => {
            const userId = req.params.userId;
            const user = await userCollection.findOne({ _id: new ObjectId(userId) });
            res.json(user?.cart || []);
        });

        app.get('/admin/orders', async (req, res) => {
            try {
                const orders = await orderCollection.aggregate([
                    {
                        $lookup: {
                            from: 'user', 
                            localField: 'userId', 
                            foreignField: '_id', 
                            as: 'customerDetails'
                        }
                    },
                    {
                        $unwind: {
                            path: '$customerDetails',
                            preserveNullAndEmptyArrays: true 
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            transactionId: 1,
                            totalAmount: 1,
                            status: 1,
                            paymentStatus: 1,
                            createdAt: 1,
                            items: 1,
                            address: 1,
                            customerName: '$customerDetails.name',
                            customerEmail: '$customerDetails.email'
                        }
                    },
                    { $sort: { createdAt: -1 } }
                ]).toArray();

                res.send(orders);
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Error fetching orders" });
            }
        });

        app.patch('/admin/orders/:id/status', async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;
            const filter = { _id: new ObjectId(id) };

            try {
                const order = await orderCollection.findOne(filter);

                if (!order) {
                    return res.status(404).json({ message: "Order not found" });
                }

                if (status === "Delivered" && order.status !== "Delivered") {

                    for (const item of order.items) {
                        const productId = item.productId || item._id;
                        const quantityToDeduct = item.quantity || 1;

                        await productCollection.updateOne(
                            { _id: new ObjectId(productId) },
                            { $inc: { stock: -quantityToDeduct } }
                        );
                    }
                }

                const updateDoc = {
                    $set: { status: status }
                };
                const result = await orderCollection.updateOne(filter, updateDoc);

                res.send(result);

            } catch (error) {
                console.error("Error updating status:", error);
                res.status(500).send({ message: "Failed to update status" });
            }
        });

        app.get('/', (req, res) => {
            res.send('ShopSmart API is running...');
        });

        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    } finally {
    }
}

run().catch(console.dir);