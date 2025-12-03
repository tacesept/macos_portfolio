import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants";
import useWindowStore, { type WindowKey } from "#store/window";

const typeNavLinks = navLinks as {
  id: number;
  name: string;
  type: WindowKey;
}[];

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav className="flex justify-between items-center backdrop-blur-xs py-2 px-6 text-white/90 select-none">
      {/* left side */}
      <div className="flex items-center max-sm:w-full justify-center sm:justify-start gap-5">
        <img src="/images/logo.svg" alt="logo" />

        <p className="font-bold">Thawit's portfolio</p>

        <ul className="hidden sm:flex items-center gap-5">
          {typeNavLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button
                onClick={() => openWindow(type)}
                className="text-sm cursor-pointer hover:underline transition-all"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* right side */}
      <div className="hidden sm:flex items-center justify-center max-sm:w-full gap-5">
        <ul className="flex items-center gap-5">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time className="text-sm font-medium">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};
export default Navbar;
