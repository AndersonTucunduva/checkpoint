'use client'
import { useState } from 'react'
import { registerPunch } from '@/app/actions'
import { Button } from '@/components/ui/button'

interface PunchButtonProps {
  employeeId: string
  onSuccess: () => void
}

export default function PunchButton({
  employeeId,
  onSuccess,
}: PunchButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePunch = async () => {
    const response = await registerPunch(employeeId)

    if (response.success) {
      setLoading(true)
      onSuccess()
      alert('Ponto registrado com sucesso!')
      setLoading(false)
    } else {
      alert('Funcionário não encontrado')
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-800 py-4">
      <Button onClick={handlePunch} disabled={loading} variant="secondary">
        {loading ? 'Registrando...' : 'Registrar Ponto'}
      </Button>
    </div>
  )
}
