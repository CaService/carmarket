import AdminContainer from "./AdimnContainer";
import { Link } from "react-router-dom";
const AdminNavbar = () => {
  return (
    <div className="h-16 bg-blue-500 text-white flex items-center">
      <AdminContainer>
        <div className="h-full flex items-center justify-between">
          <div className="text-2xl font-medium">ADMIN</div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-300">
              <Link to="/">Vai al sito</Link>
            </button>
          </div>
        </div>
      </AdminContainer>
    </div>
  );
};

export default AdminNavbar;
