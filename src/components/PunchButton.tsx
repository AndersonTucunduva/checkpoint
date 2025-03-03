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
      await registerPunch(employeeId);
      alert("Ponto registrado com sucesso!");
      onSuccess();
    } catch (error) {
      alert(error);
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
