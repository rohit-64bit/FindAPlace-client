
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Footer from "./components/Footer"
import ContactUs from "./pages/ContactUs"
import Order from "./pages/Order"
import ListProperty from "./pages/ListProperty"
import ViewProperty from "./pages/ViewProperty"
import Cart from "./pages/Cart"
import MainState from "./context/MainState"
import VerifyOtp from "./pages/VerifyOtp"
import NotificationSnackbar from "./components/NotificationSnackbar"
import ScrollReset from "./components/ScrollReset"
import Property from "./pages/Property"
import TfaRoute from './routes/TfaRoute';
import ForgetPassword from "./pages/ForgetPassword"
import UserRoute from './routes/UserRoute';
import ResetPassword from "./pages/ResetPassword"

function App() {

  return (
    <>

      <MainState>

        <ScrollReset />

        <Header />

        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          {/* <Route path="/help" element={<ContactUs />}></Route> */}

          <Route path="/verify-auth" element={
            <TfaRoute>
              <VerifyOtp />
            </TfaRoute>
          }></Route>




          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>

          {/* 

//view property booking page

 */}

          <Route path="/property" element={<Property />}></Route>
          <Route path="/viewproperty" element={<ViewProperty />}></Route>

          <Route path="/profile" element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }></Route>

          <Route path="/order" element={
            <UserRoute>
              <Order />
            </UserRoute>
          }></Route>

          <Route path="/listproperty" element={
            <UserRoute>
              <ListProperty />
            </UserRoute>
          }></Route>


          {/* <Route path="/cart" element={<Cart />}></Route> */}

        </Routes >

        <Footer />

        <NotificationSnackbar />

      </MainState >

    </>
  )

}

export default App
