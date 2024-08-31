/*
  Warnings:

  - A unique constraint covering the columns `[nominatimId]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_nominatimId_key" ON "City"("nominatimId");
