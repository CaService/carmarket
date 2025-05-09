import { useState, useEffect } from "react";
import { API_BASE_URL, fetchConfig, handleApiResponse } from "../../config/api";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/users/get_users.php`,
        fetchConfig
      );
      const data = await handleApiResponse(response);

      if (data.status === "success") {
        setUsers(data.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setDeleteLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/users/user_delete.php?id=${userId}`,
        {
          method: "DELETE",
          ...fetchConfig,
        }
      );

      const data = await handleApiResponse(response);

      if (data.status === "success") {
        setUsers(users.filter((user) => user.id !== userId));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedUser(id);
    setIsDeleteModalOpen(true);
  };

  if (loading)
    return (
      <div className="w-full px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
          <p className="mt-4 text-gray-600">Caricamento utenti</p>
        </div>
      </div>
    );
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
                  <button
                    onClick={() => openDeleteModal(user.id)}
                    className="text-red-600 hover:text-red-900 block cursor-pointer"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Conferma eliminazione</h2>
            <p className="mb-4">Sei sicuro di voler eliminare questo utente?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                disabled={deleteLoading}
              >
                Annulla
              </button>
              <button
                onClick={() => handleDelete(selectedUser)}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent mr-2"></div>
                    Eliminazione...
                  </div>
                ) : (
                  "Elimina"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersTable;
