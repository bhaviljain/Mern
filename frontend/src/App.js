import { Route,Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
import PageNotfound from './Pages/PageNotfound';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './user/Dashboard';
import PrivateRoute from './Routes/Private';
import ForgotPassword from './Pages/ForgotPassword';
import AdminRoute from './Routes/Admin';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import ProductCategory from './Admin/ProductCategory';
import User from './Admin/User';
import Order from './user/Order';
import Profile from './user/Profile';

  
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} /> 
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Order />} />
        <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />


        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<ProductCategory/>} />
        <Route path="admin/users" element={<User/>} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<PageNotfound />} />
      </Routes>
    </div>
  );
}

export default App;
