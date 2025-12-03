import { create } from "zustand";

type Store = {
  windowSize: "default" | "maxSize";
  togglewindowSize: () => void;
};

const useWindowSizeStore = create<Store>()((set) => ({
  windowSize: "default",
  togglewindowSize: () =>
    set((state) => ({
      windowSize: state.windowSize === "default" ? "maxSize" : "default",
    })),
}));

export default useWindowSizeStore;
