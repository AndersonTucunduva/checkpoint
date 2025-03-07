'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

export default function Camera({
  onRecognize,
}: {
  onRecognize: (faceData: Float32Array) => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [faceapi, setFaceapi] = useState<typeof import('face-api.js') | null>(
    null,
  )
  const [modelsLoaded, setModelsLoaded] = useState(false)

  useEffect(() => {
    async function loadFaceAPI() {
      const faceApiModule = await import('face-api.js')
      setFaceapi(faceApiModule)

      await Promise.all([
        faceApiModule.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceApiModule.nets.faceLandmark68Net.loadFromUri('/models'),
        faceApiModule.nets.faceRecognitionNet.loadFromUri('/models'),
      ])

      setModelsLoaded(true)
    }

    loadFaceAPI()
  }, [])

  useEffect(() => {
    if (!modelsLoaded || !faceapi) return

    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
      if (videoRef.current) videoRef.current.srcObject = stream
    }

    startCamera()
  }, [modelsLoaded, faceapi])

  async function handleCapture() {
    if (!videoRef.current || !faceapi) return

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (detection) {
      onRecognize(detection.descriptor)
    } else {
      alert('Nenhum rosto detectado!')
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 bg-slate-800 p-8 rounded-xl">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-96 h-auto border-4 rounded-xl"
      />
      <Button
        onClick={handleCapture}
        className="px-4 py-2 text-2xl bg-blue-500 text-white rounded-xl"
      >
        Capturar Rosto
      </Button>
    </div>
  )
}
