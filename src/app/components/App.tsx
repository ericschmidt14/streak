import { useStreakContext } from "../context/StreakContext";
import Header from "./Header";
import Login from "./Login";
import Overlay from "./Overlay";
import StreakView from "./StreakView";

export default function App() {
  const { user, loading } = useStreakContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex flex-col items-center justify-items-center w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <StreakView />
      <Overlay />
    </div>
  );
}
