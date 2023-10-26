import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Products from './screens/Products';
import PasswordReset from './screens/PasswordReset';
import Footer from './components/Footer';
import Search from './screens/Search';
import ForgotPassword from './screens/ForgotPassword';
import UserOptions from './components/UserOptions';
import LoginSignup from './screens/LoginSignup';
import UpdateProfile from './screens/UpdateProfile';
import Profile from './screens/Profile';
import UpdatePassword from './screens/UpdatePassword';
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
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<PasswordReset />} />


        <Route element={<LoggedInUser isAuthenticated={isAuthenticated} />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
