import Header from './components/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
