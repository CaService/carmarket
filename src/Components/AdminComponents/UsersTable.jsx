import { useState, useEffect } from "react";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/carmarket/server/api/users/get_users.php"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Errore nel caricamento degli utenti:", error);
      setError("Errore nel caricamento degli utenti");
      setLoading(false);
    }
  };

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <>
      <h1 className="text-center text-4xl font-bold uppercase pb-4">
        tabella users
      </h1>
      <div className="w-full px-4">
        <table className="w-full bg-white shadow-md rounded-lg table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-16 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Paese
              </th>
              <th className="w-40 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Azienda
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                P.IVA
              </th>
              <th className="w-40 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Indirizzo
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                CAP
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Città
              </th>
              <th className="w-40 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-2 py-4 text-sm text-gray-500">{user.id}</td>
                <td className="px-2 py-4 text-sm text-gray-500 break-words">
                  {user.country}
                </td>
                <td className="px-2 py-4 text-sm text-gray-900 break-words">
                  {user.company_name}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 break-words">
                  {user.vat_number}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 break-words">
                  {user.address}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 break-words">
                  {user.postal_code}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 break-words">
                  {user.city}
                </td>
                <td className="px-2 py-4 text-sm text-gray-900 break-words">
                  {user.email}
                </td>
                <td className="px-2 py-4 text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 block mb-1 cursor-pointer">
                    Modifica
                  </button>
                  <button className="text-red-600 hover:text-red-900 block cursor-pointer">
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
