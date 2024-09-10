"use server";

import { prisma } from "../../db";

export async function getCityInDBAction(cityName: string) {
  console.log("sasa", cityName);
  const city = await prisma.city.findFirst({
    where: {
      displayName: cityName,
    },
  });

  console.log(city);

  return city;
}
