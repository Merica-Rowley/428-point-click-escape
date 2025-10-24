import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthHelper";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {isAuthenticated && <Link to="/game">Game</Link>}
    </nav>
  );
}
