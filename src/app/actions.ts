'use server'
import prisma from '@/lib/prisma'
import { PunchType } from '@prisma/client'
import { startOfDay, endOfDay } from 'date-fns'

function euclideanDistance(vector1: number[], vector2: number[]): number {
  if (vector1.length !== vector2.length) {
    console.error('Os vetores têm tamanhos diferentes!')
    return Infinity
  }

  return Math.sqrt(
    vector1.reduce((sum, val, i) => sum + Math.pow(val - vector2[i], 2), 0),
  )
}

export async function verifyFace(faceData: string) {
  const employees = await prisma.employee.findMany()
  const faceVector = JSON.parse(faceData) as number[]

  let bestMatch = null
  let bestDistance = 0.4

  for (const employee of employees) {
    const employeeVector = JSON.parse(employee.faceData) as number[]

    const distance = euclideanDistance(faceVector, employeeVector)
    console.log(`Comparando com ${employee.name}, distância:`, distance)

    if (distance < bestDistance) {
      bestMatch = employee
      bestDistance = distance
    }
  }

  return bestMatch
}

export async function getEmployees() {
  try {
    return await prisma.employee.findMany({
      select: { id: true, name: true },
    })
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error)
    return []
  }
}

export async function registerPunch(employeeId: string) {
  try {
    const todayStart = startOfDay(new Date())
    const todayEnd = endOfDay(new Date())

    const lastPunch = await prisma.punch.findFirst({
      where: {
        employeeId,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    let nextPunchType: PunchType = PunchType.ENTRY

    if (lastPunch) {
      switch (lastPunch.type) {
        case PunchType.ENTRY:
          nextPunchType = PunchType.LUNCH_OUT
          break
        case PunchType.LUNCH_OUT:
          nextPunchType = PunchType.LUNCH_IN
          break
        case PunchType.LUNCH_IN:
          nextPunchType = PunchType.EXIT
          break
        case PunchType.EXIT:
          nextPunchType = PunchType.ENTRY
          break
      }
    }

    const punch = await prisma.punch.create({
      data: { employeeId, type: nextPunchType },
    })

    return { success: true, punch }
  } catch (error) {
    console.error('Erro ao registrar ponto:', error)
    return { success: false, message: 'Erro ao registrar ponto.' }
  }
}

export async function registerEmployee(name: string, faceData: Float32Array) {
  try {
    const faceDataString = JSON.stringify(Array.from(faceData))

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        faceData: faceDataString,
      },
    })

    return { success: true, employee: newEmployee }
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error)
    return { success: false, message: 'Erro ao cadastrar funcionário' }
  }
}

export async function getAllPunches() {
  return await prisma.punch.findMany({
    include: { employee: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getEmployeePunches(employeeId: string) {
  const punches = await prisma.punch.findMany({
    where: { employeeId },
    orderBy: { createdAt: 'asc' },
  })

  // Agrupar por data e organizar por tipo
  const groupedPunches: Record<string, Record<string, string>> = {}

  punches.forEach((punch) => {
    const date = punch.createdAt.toISOString().split('T')[0]
    if (!groupedPunches[date]) {
      groupedPunches[date] = {
        ENTRY: '--:--',
        LUNCH_OUT: '--:--',
        LUNCH_IN: '--:--',
        EXIT: '--:--',
      }
    }
    groupedPunches[date][punch.type] = new Date(
      punch.createdAt,
    ).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  })

  return groupedPunches
}
