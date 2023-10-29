import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Products from './screens/Products';
import Address from './screens/Address.jsx';
import PasswordReset from './screens/PasswordReset';
import Search from './screens/Search';
import Cart from './screens/Cart';
import LoginSignup from './screens/LoginSignup';
import UpdateProfile from './screens/UpdateProfile';
import OrderSummary from './screens/OrderSummary.jsx';
import Profile from './screens/Profile';
import UpdatePassword from './screens/UpdatePassword';
import Payment from './screens/Payment.jsx';
import ForgotPassword from './screens/ForgotPassword';
// import Footer from './components/Footer';
import UserOptions from './components/UserOptions';
import store from "./store"
import { loadUser } from './Actions/user';
import LoggedInUser from './protectedRoutes/LoggedInUser';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripe-api-key")
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    console.log(stripeApiKey)
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [stripeApiKey])
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
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<PasswordReset />} />


        <Route element={<LoggedInUser isAuthenticated={isAuthenticated} />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/order/summary" element={<OrderSummary />} />
          {stripeApiKey && (
            <Route exact path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
        </Route>


      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
