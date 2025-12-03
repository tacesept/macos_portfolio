import { Dock, Home, Navbar, WelcomeText } from "#components";
import { WindowTabs } from "#components";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <div className="w-dvw h-dvh overflow-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 relative">
        <WelcomeText />
        <Home />

        <WindowTabs />
      </main>

      <Dock />
    </div>
  );
};
export default App;
