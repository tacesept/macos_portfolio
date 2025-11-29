import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

type LocationType = (typeof locations)[keyof typeof locations];
type WorkChildrenType = LocationType["children"][number] & {
  children?: WorkChildrenType[];
};

type ActiveLocation = LocationType | WorkChildrenType;

// unexpected type to add
export type ActiveLocationWithExtras = ActiveLocation & {
  fileType?: string;
  kind?: string;
  href?: string;
  imageUrl?: string;
  image?: string;
  subtitle?: string;
  description?: string[];
};

type LocationStoreState = {
  activeLocation: ActiveLocationWithExtras;
};

type LocationStoreActions = {
  setActiveLocation: (location?: ActiveLocationWithExtras) => void;
  resetActiveLocation: () => void;
};

type useLocationStore = LocationStoreState & LocationStoreActions;

const useLocationStore = create<useLocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location = DEFAULT_LOCATION) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
