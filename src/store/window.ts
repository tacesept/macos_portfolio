import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import type { ActiveLocationWithExtras } from "./location";

export type WindowKey = keyof typeof WINDOW_CONFIG;

type WindowValue = {
  isOpen: boolean;
  zIndex: number;
  data: ActiveLocationWithExtras | null;
};

type WindowStoreState = {
  windows: Record<WindowKey, WindowValue>;
  nextZIndex: number;
};

type WindowStoreActions = {
  openWindow: (
    windowKey: WindowKey,
    data?: ActiveLocationWithExtras | null
  ) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey) => void;
};

type useWindowStore = WindowStoreState & WindowStoreActions;

const useWindowStore = create<useWindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
