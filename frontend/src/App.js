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
import UserOptions from './components/UserOptions';
import LoginSignup from './components/LoginSignup';
import UpdateProfile from './components/UpdateProfile';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import { useEffect } from 'react';
import store from "./store"
import { loadUser } from './Actions/user';
import LoggedInUser from './protectedRoutes/LoggedInUser';
import { useSelector } from 'react-redux';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <Router>
      <UserOptions />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />

        <Route element={<LoggedInUser isAuthenticated={isAuthenticated} />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<ChangePassword />} />
        </Route>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
