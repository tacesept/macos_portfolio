import { WindowControls } from "#components";
import Sidebar from "#components/Sidebar";
import { locations } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useLocationStore, {
  type ActiveLocationWithExtras,
} from "#store/location";
import useWindowStore, { type WindowKey } from "#store/window";
import useWindowSizeStore from "#store/windowSize";

// import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { windowSize } = useWindowSizeStore();

  const openItem = (item: ActiveLocationWithExtras) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (item.fileType && ["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}` as WindowKey, item);
  };

  const renderList = (name: string, items: ActiveLocationWithExtras[]) => (
    <div>
      <h3 className="text-xs font-medium text-gray-400 mb-1">{name}</h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={twMerge(
              "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer",
              item.id === activeLocation.id
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-200"
            )}
          >
            <img src={item.icon} alt={item.name} className="size-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="px-4 py-3 rounded-t-lg bg-gray-50 border-b border-gray-200 select-none">
        <WindowControls target="finder" />
        {/* <Search /> */}
      </div>

      <div className="bg-white flex h-full">
        <Sidebar>
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </Sidebar>

        <ul
          className={twMerge(
            "flex-1 grid grid-cols-4 px-5 pt-5 pb-30 gap-x-1 gap-y-4 auto-rows-min  overflow-y-scroll",
            windowSize === "maxSize" && "grid-cols-9"
          )}
        >
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center hover:scale-110 cursor-pointer"
              onClick={() => openItem(item)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="size-16 object-contain object-center"
              />
              <p className="text-center">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
