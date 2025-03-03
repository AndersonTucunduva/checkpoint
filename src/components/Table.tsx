export default function Table({ punches }) {
    return (
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Data</th>
          </tr>
        </thead>
        <tbody>
          {punches.map((punch) => (
            <tr key={punch.id} className="text-center">
              <td className="p-2 border">{punch.employee.name}</td>
              <td className="p-2 border">{punch.type}</td>
              <td className="p-2 border">{new Date(punch.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  