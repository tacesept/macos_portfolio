import useWindowStore, { type WindowKey } from "#store/window";
import { useGSAP } from "@gsap/react";
import { useEffect, useLayoutEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { twMerge } from "tailwind-merge";
import useWindowSizeStore from "#store/windowSize";

const windowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowKey
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const { windowSize } = useWindowSizeStore();
    const { isOpen, zIndex } = windows[windowKey];
    const sectionRef = useRef<HTMLElement | null>(null);
    const draggableRef = useRef<Draggable | null>(null);

    useGSAP(() => {
      const el = sectionRef.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = sectionRef.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
        bounds: {
          top: 0,
          left: -99999,
          width: 999999,
          height: 999999,
        },
      });

      draggableRef.current = instance;

      return () => instance.kill();
    }, []);

    useEffect(() => {
      const el = sectionRef.current;
      const draggable = draggableRef.current;
      if (!el || !draggable) return;

      if (windowSize === "maxSize") {
        el.style.transform = "";
        el.style.left = "";
        el.style.top = ""; // ⭐ APPLY BOUNDS AGAIN
        draggable.disable();
      } else {
        draggable.enable();
      }
    }, [windowSize]);

    useLayoutEffect(() => {
      const el = sectionRef.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={sectionRef}
        style={{
          zIndex,
        }}
        className={twMerge(
          "absolute w-3xl left-50 top-1/4 shadow-2xl drop-shadow-2xl overflow-hidden rounded-xl",
          windowSize === "maxSize" && "size-full left-0 top-0"
        )}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper${
    Component.displayName || Component.name || "Component"
  }`;

  return Wrapped;
};
export default windowWrapper;
