import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import useWindowStore, { type WindowKey } from "#store/window";

const setupDockHover = (container: HTMLElement | null) => {
  if (!container) return () => {};

  const icons = container.querySelectorAll("button");

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    icons.forEach((icon) => {
      const { left: l, width } = icon.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + width / 2));
      const intensity = Math.max(0, 1 - distance / 120);

      gsap.to(icon, {
        duration: 0.2,
        ease: "power2.out",
        scale: 1 + 0.25 * intensity,
        y: -20 * intensity,
      });
    });
  };
  const handleMouseLeave = () => {
    icons.forEach((icon) => {
      gsap.to(icon, {
        duration: 0.2,
        ease: "power2.out",
        scale: 1,
        y: 0,
      });
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef<HTMLDivElement>(null);

  const toggleApp = ({ id }: { id: WindowKey }) => {
    if (windows[id].isOpen) {
      closeWindow(id);
    } else {
      openWindow(id);
    }
  };

  useGSAP(() => {
    const dockCleanUp = setupDockHover(dockRef.current);

    return () => {
      dockCleanUp();
    };
  }, []);

  return (
    <div className="hidden sm:block select-none pb-2 relative z-2000">
      <div
        ref={dockRef}
        className="bg-black/50 backdrop-blur-md flex justify-center items-center w-fit mx-auto rounded-2xl p-1.5 "
      >
        {dockApps.map(({ id, name, icon }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              onClick={() => toggleApp({ id })}
              className="size-15 cursor-pointer"
            >
              <img src={`/images/${icon}`} alt={name} loading="lazy" />
            </button>
          </div>
        ))}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="bg-blue-200! text-blue-900! shadow-2xl!"
        />
      </div>
    </div>
  );
};
export default Dock;
