"use client";
import { useState } from "react";
import { registerPunch } from "@/app/actions";
import { Button } from "@/components/ui/button";

interface PunchButtonProps {
  employeeId: string;
  onSuccess: () => void;
}

export default function PunchButton({ employeeId, onSuccess }: PunchButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePunch = async () => {
    setLoading(true);
    try {
      const response = await registerPunch(employeeId);
      alert(response.success ? "Ponto registrado com sucesso!" : "Erro ao registrar ponto!");
      if (response.success) onSuccess();
    } catch {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePunch} disabled={loading}>
      {loading ? "Registrando..." : "Registrar Ponto"}
    </Button>
  );
}
