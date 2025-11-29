import { WindowControls } from "#components";
import { locations } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useLocationStore, {
  type ActiveLocationWithExtras,
} from "#store/location";
import useWindowStore, { type WindowKey } from "#store/window";

import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item: ActiveLocationWithExtras) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (item.fileType && ["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}` as WindowKey, item);
  };

  const renderList = (name: string, items: ActiveLocationWithExtras[]) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={twMerge(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
