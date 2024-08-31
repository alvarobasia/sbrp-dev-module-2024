/*
  Warnings:

  - You are about to alter the column `nominatimId` on the `City` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "name" TEXT NOT NULL,
    "nominatimId" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_City" ("id", "name", "nominatimId") SELECT "id", "name", "nominatimId" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_nominatimId_key" ON "City"("nominatimId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
