import { getAllPunches } from "./actions";
import Table from "@/components/Table";

export default async function Dashboard() {
  const punches = await getAllPunches();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registros de Ponto</h1>
      <Table punches={punches} />
    </div>
  );
}
