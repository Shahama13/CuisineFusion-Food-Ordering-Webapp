import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import Footer from './components/Footer';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
