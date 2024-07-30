import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ExploreMore from './pages/ExploreMore';
import Restaurants from './pages/Restaurants';
import CartPage from './pages/CartPage';
import ForgetPassword from './pages/Password/ForgetPassword';
import ResetPassword from './pages/Password/ResetPassword';
import SetnewPassword from './pages/Password/SetnewPassword';
import SuccessfulPasswordReset from './pages/Password/SuccessfulPasswordReset';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';
import Saveedit from './pages/Profile/Saveedit';
import Payment from './pages/Payment/Payment';
import AccountSettings from './pages/Account-Settings/AccountSettings';
import Notifications from './pages/Account-Settings/Notifications';
import PrivacyDisplay from './component/PrivacyDisplay';
import Privacy from './pages/Account-Settings/Privacy';
import ChangePassword from './pages/Account-Settings/ChangePassword';
import AccountDeactivation from './component/AccountDeactivation';
import Logout from './component/Logout';

function App() {
  const handleToggleOpenLogin = () => {
    console.log('Toggle login state');
    // Your logic to handle the toggle
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploremore" element={<ExploreMore />} />
        <Route path="/mycart" element={<CartPage />} />
        <Route path="/restaurants">
          <Route path=":restaurantname" element={<Restaurants />} />
        </Route>
        {/* <Route path="/login" element={<SignUp />} /> */}

        {/* Password routes */}
        <Route path="/forget-password/reset-passsword" element={<ResetPassword />} />
        <Route path='/forget-password' element={<ForgetPassword handleToggleOpenLogin={handleToggleOpenLogin} />} />
        <Route path='/set-new-password' element={<SetnewPassword handleToggleOpenLogin={handleToggleOpenLogin} />} />
        <Route path='/successful' element={<SuccessfulPasswordReset />} />

        {/* Profile Routes */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit-profile' element={<EditProfile />} />
        <Route path='/profile/edit-profile/submit' element={<Saveedit />} />
        <Route path='/profile/payment-methods' element={< Payment/>} />

        {/* Account Settings */}
        <Route path='/profile/account-settings' element = {<AccountSettings /> } />
        <Route path='/profile/account-setting/notification' element = {<Notifications /> } />
        <Route path='/profile/account-setting/privacy-security' element = {<Privacy /> } />
        <Route path='/profile/privacy-security/change-password' element = {<ChangePassword /> } />
        <Route path='/profile/account-delete' element = {<AccountDeactivation /> } />
        <Route path='/profile/logout' element = {<Logout /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
