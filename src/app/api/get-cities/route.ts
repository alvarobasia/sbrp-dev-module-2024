import axios from "axios";
import { prisma } from "../../../../db";

export async function GET(req: Request) {
  const cityName = (req as any).nextUrl.searchParams.get("q");

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: cityName,
          format: "json",
          addressdetails: 1,
          polygon_geojson: 1,
        },
      }
    );

    const data = response.data;

    const cities = data
      .filter(
        (item: any) => item.type === "city" || item.type === "administrative"
      )
      .map((item: any) => ({
        name: item.display_name,
        id: item.osm_id,
        geometry: item.geojson,
      }));

    const firstCity = cities[0];

    if (!firstCity) {
      return Response.json({ error: "City not found" }, { status: 404 });
    }

    const city = await prisma.city.findUnique({
      where: { nominatimId: firstCity.id },
    });

    if (!city) {
      await prisma.city.create({
        data: {
          name: firstCity.name,
          nominatimId: firstCity.id,
          geometry: JSON.stringify(firstCity.geometry),
          displayName: firstCity.name.split(",")[0],
        },
      });
    }

    return Response.json(cities);
  } catch (error) {
    console.error("Error fetching data from Nominatim API:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
