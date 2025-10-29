import AuthButtons from "../components/auth/AuthButtons";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <h2>Welcome Home</h2>
        <AuthButtons />
      </div>
    </>
  );
}
