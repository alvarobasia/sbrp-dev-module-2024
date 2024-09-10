-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "name" TEXT NOT NULL,
    "nominatimId" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "geometry" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_City" ("id", "name", "nominatimId") SELECT "id", "name", "nominatimId" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_nominatimId_key" ON "City"("nominatimId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
