
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
          
          <Route path="/verify-auth" element={<VerifyOtp />}></Route>


          <Route path="/profile" element={<Profile />}></Route>

          {/* 

//forget password -- /forget-password -- will enter email
//reset password -- /reset-password

//view property booking page

 */}

          <Route path="/property" element={<Property />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/listproperty" element={<ListProperty />}></Route>
          <Route path="/viewproperty" element={<ViewProperty />}></Route>


          {/* <Route path="/cart" element={<Cart />}></Route> */}

        </Routes>

        <Footer />

        <NotificationSnackbar />

      </MainState>

    </>
  )

}

export default App
