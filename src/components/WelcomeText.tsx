import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 800, default: 400 },
};

const renderText = (text: string, baseWeight?: number) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      style={{
        fontVariationSettings: `'wght' ${baseWeight ?? 400}`,
      }}
    >
      {char}
    </span>
  ));
};

const setupTextHover = (
  container: HTMLElement | null,
  type: "title" | "subtitle"
) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.max(0, 1 - distance / 120);

      gsap.to(letter, {
        duration: 0.25,
        ease: "power2.out",
        fontVariationSettings: `'wght' ${min + (max - min) * intensity}`,
      });
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      gsap.to(letter, {
        duration: 0.3,
        ease: "power2.out",
        fontVariationSettings: `'wght' ${base}`,
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

const WelcomeText = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, [titleRef, subtitleRef]);

  return (
    <section className="flex flex-col justify-center items-center h-full text-gray-200 relative">
      <p
        ref={subtitleRef}
        className="hidden sm:block select-none text-3xl font-georama"
      >
        {renderText("Hey, I'm Thawit! Welcome to my", 100)}
      </p>
      <h1
        ref={titleRef}
        className="hidden sm:block select-none text-9xl italic font-georama text-black text-shadow-[1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white,-1px_-1px_0_white]"
      >
        {renderText("Portfolio")}
      </h1>

      <div className="sm:hidden m-7 bg-red-300/20 backdrop-blur-lg p-3 rounded-md">
        <p className="text-center font-roboto text-gray-400">
          This Portfolio is designed for desktop/table screens only.
        </p>
      </div>
    </section>
  );
};
export default WelcomeText;
