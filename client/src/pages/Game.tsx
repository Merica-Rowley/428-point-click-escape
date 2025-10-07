import AuthButtons from "../components/auth/AuthButtons";

export default function Game() {
  return (
    <section>
      <h1>Game</h1>
      <p>Only visible when signed in.</p>
      <AuthButtons />
    </section>
  );
}
