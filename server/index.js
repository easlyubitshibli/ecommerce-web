require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const uri = process.env.MONGO_URI; // Make sure this is in your .env file
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("✅ Connected successfully to MongoDB Atlas");

        // Select Database and Collections
        const database = client.db('ecommerce'); // DB Name
        const productCollection = database.collection('products');
        const userCollection = database.collection('user');
        const orderCollection = database.collection('orders');

        // Store ID and Password (Put these in .env file in real app)
        const store_id = process.env.STORE_ID || 'testbox';
        const store_passwd = process.env.STORE_PASS || 'qwerty';
        const is_live = false; // true for real money


        // Payment Gateway Initialization
        // 1. Initialize Payment
        app.post('/create-ssl-payment', async (req, res) => {
            const { userId, items, totalAmount, address } = req.body;

            // Create a unique transaction ID
            const tran_id = new ObjectId().toString();

            const data = {
                total_amount: totalAmount,
                currency: 'BDT',
                tran_id: tran_id, // Use unique tran_id for each API call
                success_url: `http://localhost:5000/payment/success/${tran_id}`,
                fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
                cancel_url: `http://localhost:5000/payment/cancel/${tran_id}`,
                ipn_url: 'http://localhost:5000/ipn',
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

            // Before redirecting, save the "Pending" order to database
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

            // Initialize SSLCommerz
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL;
                res.send({ url: GatewayPageURL });
            });
        });

        // 2. Payment Success Callback
        app.post('/payment/success/:tranId', async (req, res) => {
            const tranId = req.params.tranId;

            // Update order status to "Paid"
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
                // Determine userId to clear their cart (optional, requires storing userId or looking up order)
                const order = await orderCollection.findOne({ transactionId: tranId });
                if (order) {
                    await userCollection.updateOne(
                        { _id: new ObjectId(order.userId) },
                        { $set: { cart: [] } }
                    );
                }

                // Redirect to Frontend Success Page
                res.redirect(`http://localhost:5173/payment/success/${tranId}`);
            } else {
                res.redirect(`http://localhost:5173/payment/fail/${tranId}`);
            }
        });

        // 3. Payment Fail Callback
        app.post('/payment/fail/:tranId', async (req, res) => {
            const tranId = req.params.tranId;
            // You might want to delete the pending order or mark it as failed
            await orderCollection.deleteOne({ transactionId: tranId });
            res.redirect(`http://localhost:5173/payment/fail/${tranId}`);
        });

        app.get('/orders/:userId', async (req, res) => {
            const userId = req.params.userId;
            try {
                const orders = await orderCollection
                    .find({ userId: new ObjectId(userId) })
                    .sort({ createdAt: -1 }) // Sort by newest first
                    .toArray();
                res.send(orders);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch orders" });
            }
        });

        // ======================================================
        //                  PRODUCT ROUTES
        // ======================================================

        // 1. Get All Products (With Search Support)
        app.get('/products', async (req, res) => {




            const products = await productCollection.find().toArray();
            res.send(products);
        });

        // 2. Get Single Product by ID
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        // 3. Add New Product (Admin)
        // 3. Add New Product (Admin)
        app.post('/products', async (req, res) => {
            const product = req.body;

            // Construct the object explicitly to ensure all fields are saved with correct types
            const newProduct = {
                name: product.name,
                category: product.category,
                description: product.description,
                image: product.image,
                // Convert numbers, but handle empty strings safely (default to 0)
                price: parseFloat(product.price) || 0,
                originalPrice: parseFloat(product.originalPrice) || 0,
                stock: parseInt(product.stock) || 0,
                createdAt: new Date() // Useful to sort by "Newest" later
            };

            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        // 4. Delete Product (Admin)
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });

        // 5. Update Product (Admin)
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

        // ======================================================
        //                  USER / AUTH ROUTES
        // ======================================================

        // 5. Register User
        app.post('/register', async (req, res) => {
            const user = req.body;

            // Check if email already exists
            const existingUser = await userCollection.findOne({ email: user.email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // 6. Login User
        app.post('/login', async (req, res) => {
            const { email, password } = req.body;

            // Find user by email
            const user = await userCollection.findOne({ email });

            // Basic validation (In real apps, use bcrypt for password hashing)
            if (user && user.password === password) {
                // Remove password before sending back user info
                const { password, ...userWithoutPassword } = user;
                res.json({ success: true, user: userWithoutPassword });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        });

        // users
        app.get('/users', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        });

        // single user
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // update user
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
                    // Add other fields as necessary
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // delete user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // add to cart in user
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
            const productId = product._id; // Ensure we use the String version of ID for consistency

            try {
                // 1. Try to find the user AND the specific product in their cart
                // If found, increment quantity by 1
                const updateResult = await userCollection.updateOne(
                    { _id: new ObjectId(userId), "cart.productId": productId },
                    { $inc: { "cart.$.quantity": 1 } }
                );

                // 2. If matchedCount is 0, it means the item does NOT exist in the cart yet.
                // So we push it as a new object.
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

        // 8. Update Quantity (For the + and - buttons in Cart Page)
        app.put('/cart/update-quantity', async (req, res) => {
            const { userId, productId, type } = req.body; // type = 'increment' or 'decrement'

            try {
                const quantityChange = type === 'increment' ? 1 : -1;

                await userCollection.updateOne(
                    { _id: new ObjectId(userId), "cart.productId": productId },
                    { $inc: { "cart.$.quantity": quantityChange } }
                );

                // Optional: Remove item if quantity becomes 0 (Handled in next step or strictly frontend)
                // For now, let's just update the count.

                res.json({ success: true });
            } catch (error) {
                res.status(500).json({ message: "Error updating quantity" });
            }
        });

        // 8. Get User's Cart (Optional: Call this on Login to restore cart)
        app.get('/cart/:userId', async (req, res) => {
            const userId = req.params.userId;
            const user = await userCollection.findOne({ _id: new ObjectId(userId) });
            res.json(user?.cart || []);
        });

        // admin
        // 11. ADMIN: Get All Orders (with User Details)
        // 11. ADMIN: Get All Orders (with Customer Name joined)
        app.get('/admin/orders', async (req, res) => {
            try {
                const orders = await orderCollection.aggregate([
                    {
                        $lookup: {
                            from: 'user', // <--- MAKE SURE THIS MATCHES YOUR DB COLLECTION NAME
                            localField: 'userId', // The field in 'orders' collection
                            foreignField: '_id',  // The field in 'users' collection
                            as: 'customerDetails'
                        }
                    },
                    {
                        $unwind: {
                            path: '$customerDetails',
                            preserveNullAndEmptyArrays: true // Keep order even if user is deleted
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
                            // Pull name/email from the joined 'customerDetails' object
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

        // 12. ADMIN: Update Order Status (Accept/Reject)
        // 12. ADMIN: Update Order Status (With Stock Management)
        app.patch('/admin/orders/:id/status', async (req, res) => {
            const id = req.params.id;
            const { status } = req.body; // "Delivered" or "Cancelled"
            const filter = { _id: new ObjectId(id) };

            try {
                // 1. Get the current order to check previous status and get items
                const order = await orderCollection.findOne(filter);

                if (!order) {
                    return res.status(404).json({ message: "Order not found" });
                }

                // 2. Prevent double deduction: Only deduct if moving from Pending/Processing -> Delivered
                if (status === "Delivered" && order.status !== "Delivered") {

                    // Loop through all items in the order and update their stock
                    for (const item of order.items) {
                        // Use productId (or _id depending on how you saved it in cart)
                        const productId = item.productId || item._id;
                        const quantityToDeduct = item.quantity || 1;

                        await productCollection.updateOne(
                            { _id: new ObjectId(productId) },
                            { $inc: { stock: -quantityToDeduct } }
                        );
                    }
                }

                // 3. Update the Order Status
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

        // ======================================================
        //                  SERVER START
        // ======================================================

        app.get('/', (req, res) => {
            res.send('ShopSmart API is running...');
        });

        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close(); 
        // Commented out so connection stays open for server
    }
}

run().catch(console.dir);