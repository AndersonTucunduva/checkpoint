'use client'
import { useState } from 'react'
import Camera from '@/components/Camera'
import PunchButton from '@/components/PunchButton'
import { verifyFace } from '@/app/actions'

type Employee = { id: string; name: string; faceData: string }

export default function Home() {
  const [employee, setEmployee] = useState<Employee | null>(null)

  async function handleFaceRecognition(faceData: Float32Array) {
    try {
      const response = await verifyFace(JSON.stringify(Array.from(faceData)))
      if (response) {
        setEmployee(response)
      } else {
        alert('Funcionário não encontrado!')
      }
    } catch (error) {
      console.error('Erro ao verificar o rosto:', error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 flex justify-center bg-slate-800 py-2 text-white rounded-xl">
        Registro de Ponto
      </h1>
      {!employee ? (
        <Camera onRecognize={handleFaceRecognition} />
      ) : (
        <PunchButton
          employeeId={employee.id}
          onSuccess={() => setEmployee(null)}
        />
      )}
    </div>
  )
}
