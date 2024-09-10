"use client";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import React from "react";
import { LatLngExpression } from "leaflet";
import * as turf from "@turf/turf";
interface MapProps {
  polygon: number[][][];
}

function generateRandomPointsInPolygon(
  polygonCoords: [number, number][],
  numPoints: number
): [number, number][] {
  // Create a turf polygon from the coordinates
  const polygon = turf.polygon([polygonCoords]);

  // Get the bounding box of the polygon
  const bbox = turf.bbox(polygon);
  const [minX, minY, maxX, maxY] = bbox;

  const points: [number, number][] = [];

  while (points.length < numPoints) {
    // Generate a random point within the bounding box
    const randomPoint = [
      Math.random() * (maxX - minX) + minX,
      Math.random() * (maxY - minY) + minY,
    ] as [number, number];

    // Check if the point is within the polygon
    const point = turf.point(randomPoint);
    if (turf.booleanPointInPolygon(point, polygon)) {
      points.push(randomPoint);
    }
  }

  return points;
}

// Example usage

const numPoints = 10;

const Map: React.FC<MapProps> = ({ polygon = [] }: MapProps) => {
  const invertPositionsLatLong = (num: number[][][]): number[][] => {
    console.log(num);
    const y = num[0].map((n) => [n[1], n[0]]);
    console.log(y);
    return y;
  };
  return (
    <MapContainer
      preferCanvas={true}
      center={[-19.810477, -43.173501]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {generateRandomPointsInPolygon(
          invertPositionsLatLong(polygon) as any,
          300
        ).map((point, index) => (
          <Marker
            draggable={true}
            key={index}
            position={point as LatLngExpression}
          >
            <Popup>Random point {index}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <Polygon
        pathOptions={{ color: "purple" }}
        positions={invertPositionsLatLong(polygon) as any}
      ></Polygon>
    </MapContainer>
  );
};

export default Map;
