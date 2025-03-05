-- CreateEnum
CREATE TYPE "PunchType" AS ENUM ('ENTRY', 'LUNCH_OUT', 'LUNCH_IN', 'EXIT');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "faceData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Punch" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "type" "PunchType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Punch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Punch" ADD CONSTRAINT "Punch_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
