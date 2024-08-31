"use server";

import { CityResult } from "@/app/interfaces/CityResult";
import { useCitiesStore } from "@/store/citiesStore";
import { revalidatePath } from "next/cache";

export async function searchCities(searchValue: FormData): Promise<void> {
  console.log("Searching for cities with value", searchValue.get("search"));
  const resultsCities: CityResult[] = await fetch(
    "http://localhost:3000/api/get-cities?q=" + searchValue.get("search")
  ).then((res) => res.json());

  useCitiesStore.getState().setCities(resultsCities);

  revalidatePath("http://localhost:3000/dashboard");
}
