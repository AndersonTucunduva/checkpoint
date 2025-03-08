'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EmployeeSelect({
  employees,
  selectedEmployee,
}: {
  employees: { id: string; name: string }[]
  selectedEmployee: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(selectedEmployee)

  // Atualiza o selected quando a URL mudar
  useEffect(() => {
    const employeeIdFromParams = searchParams.get('employeeId')
    if (employeeIdFromParams) {
      setSelected(employeeIdFromParams)
    } else if (employees.length > 0) {
      setSelected(employees[0]?.id)
    }
  }, [searchParams, employees])

  const handleChange = (value: string) => {
    setSelected(value)
    router.push(`?employeeId=${value}`, { scroll: false }) // Atualiza a URL com o employeeId
  }

  return (
    <Select name="employeeId" value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um funcionário" />
      </SelectTrigger>
      <SelectContent>
        {employees.map((employee) => (
          <SelectItem key={employee.id} value={employee.id}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
