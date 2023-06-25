import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Footer from "./components/Footer"
import ContactUs from "./pages/ContactUs"
import Order from "./pages/Order"
import ListProperty from "./pages/ListProperty"
import ViewProperty from "./pages/ViewProperty"
import Cart from "./pages/Cart"

function App() {
  return (
    <>
      <Header />
      <Routes>  
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/listproperty" element={<ListProperty />}></Route>
        <Route path="/viewproperty" element={<ViewProperty />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
