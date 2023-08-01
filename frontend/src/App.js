import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Product from './components/Product';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/products" element={<Product />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
