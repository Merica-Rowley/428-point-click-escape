import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import Game from "./pages/Game";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/game"
              element={
                <RequireAuth>
                  <Game />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
