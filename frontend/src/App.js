import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
import Categories from "./components/Category/Categories";
import CategoryProducts from "./components/Category/CategoryProducts";
import Login from "./components/User/LoginPage";
import ForgetPasswordPage from "./components/User/ForgotPasswordPage";
import RegisterPage from "./components/User/RegisterPage";
import Home from "./components/Home/Home"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />

          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/:cid/products" element={<CategoryProducts />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
