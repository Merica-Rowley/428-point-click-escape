import AuthButtons from "../components/auth/AuthButtons";
import Navbar from "../components/navbar/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h2>Welcome Home</h2>
        <AuthButtons />
      </div>
    </>
  );
}
