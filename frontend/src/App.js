import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { useEffect } from 'react';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import OrderSuccess from './screens/OrderSuccess';
import Products from './screens/Products';
import Address from './screens/Address';
import PasswordReset from './screens/PasswordReset';
import Search from './screens/Search';
import Cart from './screens/Cart';
import LoginSignup from './screens/LoginSignup';
import UpdateProfile from './screens/UpdateProfile';
import OrderSummary from './screens/OrderSummary';
import MyOrders from './screens/MyOrders';
import Profile from './screens/Profile';
import UpdatePassword from './screens/UpdatePassword';
import Payment from './screens/Payment';
import OrderDetails from './screens/OrderDetails.jsx';
import ForgotPassword from './screens/ForgotPassword';
// import Footer from './components/Footer';
import UserOptions from './components/UserOptions';
import store from "./store"
import { loadUser } from './Actions/user';
import LoggedInUser from './protectedRoutes/LoggedInUser';
import Header from './components/Header.jsx';



function App() {
  
  useEffect(() => {
    store.dispatch(loadUser())  
  }, [])

  return (
    <Router>
      {/* <UserOptions /> */}
      <Header/>
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


        <Route element={<LoggedInUser />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/order-summary" element={<OrderSummary />} />
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/process/payment" element={<Payment />} />
        </Route>


      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
