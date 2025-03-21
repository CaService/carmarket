import AdminContainer from "./AdimnContainer";

const AdminNavbar = () => {
  return (
    <div className="h-16 bg-blue-500 text-white flex items-center">
      <AdminContainer>
        <div className="h-full flex items-center">
          <div className="text-2xl font-medium">ADMIN</div>
        </div>
      </AdminContainer>
    </div>
  );
};

export default AdminNavbar;
