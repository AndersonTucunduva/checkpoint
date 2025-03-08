'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function EmployeeSelect({
  employees,
  selectedEmployee,
  onChange,
}: {
  employees: { id: string; name: string }[]
  selectedEmployee: string
  onChange: (value: string) => void
}) {
  return (
    <Select name="employeeId" value={selectedEmployee} onValueChange={onChange}>
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
