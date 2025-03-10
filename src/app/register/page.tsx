'use client'

import { useState } from 'react'
import Camera from '@/components/Camera'
import { registerEmployee } from '@/app/actions'
import { Button } from '@/components/ui/button'

export default function RegisterEmployee() {
  const [name, setName] = useState('')
  const [faceData, setFaceData] = useState<Float32Array | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function handleFaceRecognition(data: Float32Array | null) {
    if (data) {
      setFaceData(data)
      setMessage('Rosto capturado com sucesso!')
    } else {
      setMessage('Falha ao capturar o rosto. Tente novamente.')
    }
  }

  async function handleRegister() {
    if (!name.trim() || !faceData) {
      setMessage('Por favor, preencha todos os campos.')
      return
    }

    setLoading(true)
    const result = await registerEmployee(name, faceData)
    setLoading(false)

    if (result.success) {
      setMessage('Funcionário cadastrado com sucesso!')
      setName('')
      setFaceData(null)
    } else {
      setMessage(result.message || 'Erro ao cadastrar funcionário.')
    }
  }

  return (
    <div className="p-4">
      <div className="p-6 max-w-md mx-auto bg-slate-800">
        <h1 className="text-2xl font-bold mb-4 text-white flex justify-center">
          Cadastro de Funcionário
        </h1>

        <label className="block mb-2 font-medium text-white">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <Camera onRecognize={handleFaceRecognition} />

        <Button
          onClick={handleRegister}
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white py-2 text-xl font-semibold rounded-xl hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        {message && (
          <p className="mt-4 text-red-500 flex justify-center">{message}</p>
        )}
      </div>
    </div>
  )
}
