'use client'
import { useEffect, useState } from 'react'
import { getAllPunches } from '../app/actions'
import Table from '@/components/Table'
import { PunchType } from '@prisma/client'

type Punch = {
  id: string
  employeeId: string
  type: PunchType
  createdAt: Date
  employee: { id: string; name: string }
}

export default function DashboardMain() {
  const [punches, setPunches] = useState<Punch[]>([])

  useEffect(() => {
    getAllPunches().then(setPunches).catch(console.error)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registros de Ponto</h1>
      <Table punches={punches} />
    </div>
  )
}
