import { CityResult } from "@/app/interfaces/CityResult";
import { create } from "zustand";

type CitiesStore = {
  cities: CityResult[];
  setCities: (cities: CityResult[]) => void;
};

export const useCitiesStore = create<CitiesStore>()((set) => ({
  cities: [],
  setCities: (cities) => {
    const statenn = [...cities];

    console.log("Cities", statenn);

    set((state) => ({
      ...state,
      cities: statenn,
    }));
  },
}));
