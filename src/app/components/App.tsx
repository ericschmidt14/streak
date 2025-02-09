import { useStreakContext } from "../context/StreakContext";
import FAB from "./FAB";
import Header from "./Header";
import Loader from "./Loader";
import Login from "./Login";
import Overlay from "./Overlay";
import StreakView from "./StreakView";

export default function App() {
  const { user, loading } = useStreakContext();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex flex-col items-center justify-items-center w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <StreakView />
      <FAB />
      <Overlay />
    </div>
  );
}
