import { getEmployeePunches, getEmployees } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EmployeeSelect from './components/EmployeeSelect'

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>
}) {
  const employees = await getEmployees()

  // Garantir que searchParams exista e tenha um valor válido
  const selectedEmployee = searchParams?.employeeId ?? employees[0]?.id

  if (!selectedEmployee) {
    return <p className="text-center mt-10">Nenhum funcionário cadastrado.</p>
  }

  const punches = await getEmployeePunches(selectedEmployee)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Pontos</h1>

      <EmployeeSelect
        employees={employees}
        selectedEmployee={selectedEmployee}
      />

      <div className="mt-6 space-y-4">
        {Object.entries(punches).map(([date, records]) => {
          const dayOfWeek = new Date(date).getDay()
          return (
            <Card key={date}>
              <CardHeader>
                <CardTitle>
                  {weekDays[dayOfWeek]} - {date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {['ENTRY', 'LUNCH_OUT', 'LUNCH_IN', 'EXIT'].map((type) => (
                    <div key={type} className="p-2 bg-gray-100 rounded">
                      <span className="block text-sm text-gray-500">
                        {type.replace('_', ' ')}
                      </span>
                      <span className="text-lg font-semibold">
                        {records[type] || '--:--'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
