import { getEmployees } from '@/app/actions'
import { Suspense } from 'react'
import DashboardContent from './DashboardContent'

export default async function Employee() {
  const employees = await getEmployees()

  if (!employees.length) {
    return <p className="text-center mt-10">Nenhum funcionário cadastrado.</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de Pontos da Semana</h1>

      <Suspense fallback={<p>Carregando...</p>}>
        <DashboardContent employees={employees} />
      </Suspense>
    </div>
  )
}
