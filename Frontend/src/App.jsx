import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Pages/user/Register';
import Home from './Pages/Home';
import Signin from './Pages/user/Signin';
import UserDashboard from './Pages/user/Dashboard';
import AdminLogin from './Pages/admin/AdminLogin';
import AdminDashboard from './Pages/admin/AdminDashboard';
import Dashboard from './Pages/admin/adminPages/Dashboard'
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_ROUTE_NAME;
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Customer from './Pages/admin/adminPages/Customer';
import CustomerDetails from './Pages/admin/adminPages/CustomerDetails'
import AddNewCustomer from './Pages/admin/adminPages/AddNewCustomer'
import Categories from './Pages/admin/adminPages/Categories';
import CategoryProvider from './CategoryContext';
import CategoriesDetails from './Pages/admin/adminPages/CategoriesDetails';
import ProductPage from './Pages/admin/adminPages/ProductPage';
import AddProduct from './Pages/admin/adminPages/AddProduct';
import ShopPage from './Pages/ShopPage';
import Landingpage from './Pages/Landingpage';
import Account from './Pages/user/Account';
import HomeDashboard from './Pages/user/HomeDashboard';
import UserProvider from './Pages/user/UserContext';
import Settings from './Pages/user/Settings';
import NotFound from './404';
import ShoppingCart from './Pages/ShoppingCart';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import OrderHistory from './Pages/user/OrderHistory';
import OrderDetails from './Pages/user/OrderDetails';
import Order from './Pages/admin/adminPages/Order';
import OrderInfo from './Pages/admin/adminPages/OrderInfo';
import OrderTrack from './Pages/OrderTrack';
import OrderTrackDetails from './Pages/OrderTrackDetails';
import Productdetails from './Pages/Productdetails';
import ScrollToTop from './components/ScrollToTop';
import Logout from './Pages/user/Logout';
import ShowcaseProduct from './components/ShowcaseProduct';
import Gallery from './components/Gallery';
import CustomerSupport from './Pages/CustomerSupport';
import AboutUs from './Pages/AboutUs';


const App = () => {
  // const images = [
  //   "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  //   "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  //   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  //   "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  //   "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  //   "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  // ];
  return (
    <div>
      <ScrollToTop />
      
      <Routes>
          <Route path="/" element={
            <CategoryProvider>
              <Home />
            </CategoryProvider>
          }>
            <Route index element={<Landingpage />} />
            <Route path='/who-we-are' element={<AboutUs />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/shop/:categoryName' element={<ShopPage />} />
            <Route path='/product-page/:id' element={
              <CategoryProvider>
                <Productdetails />
              </CategoryProvider>
            } />
            <Route path='/order-tracking' element={<OrderTrack />} />
            <Route path='/order-tracking/:id' element={<OrderTrackDetails />} />
            <Route path='/shopping-cart' element={<ShoppingCart />} />
            <Route path='/customer-support' element={<CustomerSupport />} />
            <Route path='/shopping-cart/checkout' element={
              <UserProvider>
                <ProtectedRoute role="user">
                  <Checkout />
                </ProtectedRoute>
              </UserProvider>
            } />
            <Route path="/shopping-cart/checkout/payment-successful/:orderId" element={<PaymentSuccess />} />
            <Route path="/dashboard/" element={
              <UserProvider>
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              </UserProvider>
            }>
              <Route path='account' element={
                <UserProvider>
                  <HomeDashboard />
                </UserProvider>
              }/>
              <Route path='order-history' element={
                <UserProvider>
                  <OrderHistory />
                </UserProvider>
              }/>
              <Route path='order-history/:id' element={
                <UserProvider>
                  <OrderDetails />
                </UserProvider>
              }/>
              <Route path='setting' element={
                <UserProvider>
                  <Settings />
                </UserProvider>
              }/>
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path='/account' element={<Account />}>
              <Route path="register" element={
                <PublicRoute><Register /></PublicRoute>
              } />
            
              <Route path="login" element={
                <PublicRoute><Signin /></PublicRoute>
              } />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Route>


        <Route path={`/${ADMIN_ROUTE}/login`} element={
          <PublicRoute><AdminLogin /></PublicRoute>
        } />

        {/* Protected Routes */}

        <Route path={`/${ADMIN_ROUTE}/`} element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        }> 
          <Route path='dashboard' element={
            <CategoryProvider>
              <Dashboard />
            </CategoryProvider>
          }/>
          <Route path='orders' element={
            <CategoryProvider>
              <Order />
            </CategoryProvider>
          }/>
          <Route path='orders/:id' element={
            <CategoryProvider>
              <OrderInfo />
            </CategoryProvider>
          } />
          <Route path='customer' element={<Customer />} />
          <Route path='customer/:id' element={<CustomerDetails />} />
          <Route path='customer/add-new-customer' element={<AddNewCustomer />} />

          <Route path='categories' element={
            <CategoryProvider>
              <Categories />
            </CategoryProvider>
          }/>
          <Route path='categories/:name' element={
            <CategoryProvider>
              <CategoriesDetails />
            </CategoryProvider>
          } />
          <Route path='products' element={ 
            <CategoryProvider>
              <ProductPage />
            </CategoryProvider>
          } />
          <Route path='product/add-product' element={ 
            <CategoryProvider>
              <AddProduct />
            </CategoryProvider>
          } />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
