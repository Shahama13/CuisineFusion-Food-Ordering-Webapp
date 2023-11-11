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
import Cart from './screens/Cart';
import LoginSignup from './screens/LoginSignup';
import UpdateProfile from './screens/UpdateProfile';
import OrderSummary from './screens/OrderSummary';
import MyOrders from './screens/MyOrders';
import Profile from './screens/Profile';
import UpdatePassword from './screens/UpdatePassword';
import Payment from './screens/Payment';
import NotFound from './screens/NotFound';
import OrderDetails from './screens/OrderDetails';
import ForgotPassword from './screens/ForgotPassword';
import Wishlist from './screens/Wishlist';
import store from "./store"
import { getMyWishlist, loadUser } from './Actions/user';
import User from './protectedRoutes/User';
import Header from './components/Header';
import Admin from './protectedRoutes/Admin';
import Dashboard from './admin/Dashboard';
import AllProducts from './admin/AllProducts';
import CreateProduct from './admin/CreateProduct';
import Orders from './admin/Orders';
import Users from './admin/Users';
import EditProduct from './admin/EditProduct';


function App() {

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(getMyWishlist());
  }, [])

  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<PasswordReset />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<User />}>
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

        <Route element={<Admin />}>
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<AllProducts />} />
          <Route exact path="/admin/product" element={<CreateProduct />} />
          <Route exact path="/admin/product/:id" element={<EditProduct />} />
          <Route exact path="/admin/orders" element={<Orders />} />
          <Route exact path="/admin/users" element={<Users />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
