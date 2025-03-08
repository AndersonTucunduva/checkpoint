'use client'

import { useEffect, useState } from 'react'
import EmployeeSelect from './EmployeeSelect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getEmployeePunches } from '@/app/actions'

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

const punchTypes = {
  ENTRY: 'ENTRADA',
  LUNCH_OUT: 'ALMOÇO',
  LUNCH_IN: 'VOLTA',
  EXIT: 'SAÍDA',
}

export default function DashboardContent({
  employees,
}: {
  employees: { id: string; name: string }[]
}) {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]?.id)
  const [punches, setPunches] = useState<
    Record<string, Record<string, string>>
  >({})

  useEffect(() => {
    if (!selectedEmployee) return

    async function fetchPunches() {
      const data = await getEmployeePunches(selectedEmployee)
      setPunches(data)
    }

    fetchPunches()
  }, [selectedEmployee])

  return (
    <>
      <EmployeeSelect
        employees={employees}
        selectedEmployee={selectedEmployee}
        onChange={setSelectedEmployee}
      />

      <div className="mt-6 space-y-4">
        {Object.entries(punches).map(([date, records]) => {
          const dayOfWeek = new Date(date).getDay()

          return (
            <Card key={date}>
              <CardHeader>
                <CardTitle>
                  {weekDays[dayOfWeek + 1]} - {date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {Object.entries(punchTypes).map(([key, label]) => (
                    <div key={key} className="p-2 bg-gray-100 rounded">
                      <span className="block text-sm text-gray-500">
                        {label}
                      </span>
                      <span className="text-lg font-semibold">
                        {records[key] || '--:--'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
