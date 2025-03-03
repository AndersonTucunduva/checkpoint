"use client";
import { useEffect, useRef, useState } from "react";

export default function Camera({ onRecognize }: { onRecognize: (faceData: Float32Array) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [faceapi, setFaceapi] = useState<any>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    async function loadFaceAPI() {
      const faceApiModule = await import("face-api.js");
      setFaceapi(faceApiModule);

      await faceApiModule.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceApiModule.nets.faceLandmark68Net.loadFromUri("/models");
      await faceApiModule.nets.faceRecognitionNet.loadFromUri("/models");
      setModelsLoaded(true);
    }

    loadFaceAPI();
  }, []);

  useEffect(() => {
    if (!modelsLoaded || !faceapi) return;

    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as MediaStream;
      }
    }

    startCamera();
  }, [modelsLoaded, faceapi]);

  async function handleCapture() {
    if (!videoRef.current || !faceapi) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      onRecognize(detection.descriptor);
    } else {
      alert("Nenhum rosto detectado!");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay muted className="w-64 h-48 border rounded" />
      <button onClick={handleCapture} className="px-4 py-2 bg-blue-500 text-white rounded">
        Capturar Rosto
      </button>
    </div>
  );
}
