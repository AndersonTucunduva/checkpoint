"use server";
import prisma from "@/lib/prisma";

export async function verifyFace(faceData: string) {
  const employee = await prisma.employee.findFirst({
    where: { faceData },
  });

  return employee ? employee : null;
}

export async function registerPunch(employeeId: string) {
  const today = new Date().toISOString().split("T")[0];
  const punches = await prisma.punch.findMany({
    where: { employeeId, createdAt: { gte: new Date(today) } },
  });

  const types = ["ENTRY", "LUNCH_OUT", "LUNCH_IN", "EXIT"];
  const type = types[punches.length] || "EXIT";

  await prisma.punch.create({ data: { employeeId, type } });

  return { success: true, type };
}

export async function getAllPunches() {
  return await prisma.punch.findMany({
    include: { employee: true },
    orderBy: { createdAt: "desc" },
  });
}
