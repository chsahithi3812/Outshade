import react from "react"
import { Link } from "react-router-dom";
import "./Home.css"
export default function Home() {
return (
    <div className="login">
    <h1>WELCOME!!</h1>
      <h2>INVENTORY MANAGEMENT SYSTEM</h2>
      <h5>Alredy a user?</h5>
      <button className="btn" style={{float: "left"}}>
        <Link className="link" to="/login">
         LOGIN
        </Link>
      </button>
      <h5>Don't have an account?</h5>
      <button className="btn" style={{float:"right"}}>
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );}