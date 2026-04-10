import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductSlider from "./components/ProductSlider";
import Slider from "./components/Slider";
import TrendingProduct from "./components/TrendingProduct";

function App() {
    return (
        <>
            <nav>
                <Header />
            </nav>
            <main>
          <section className="my-8">
            <Slider/>
          </section>
          <section className="my-8">
            <ProductSlider/>
          </section>
          <section className="my-8">
            <TrendingProduct/>
          </section>
          <section>

          </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default App;
