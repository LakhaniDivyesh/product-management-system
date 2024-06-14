import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sub_cats from "./components/Sub-Cat";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Filter from "./components/Filter";
import Page404 from "./components/Page404";
import Protected from "./utils/protected.config";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Protected>
          <Navbar /><Home/>
          </Protected>
          } />
        <Route path="/sub-cat/:id" element={[<Navbar />,<Sub_cats/>]} />
        <Route path="/product-detail/:id" element={[<Navbar />,<Product/>]} />
        <Route path="/my-cart" element={[<Navbar />,<Cart/>]} />
        <Route path="/login" element={[<Login/>]} />
        <Route path="/signup" element={[<Signup/>]} />
        <Route path="/product-filter" element={[<Navbar />,<Filter/>]} />
        <Route path="*" element={[<Page404/>]} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
