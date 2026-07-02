import { Link } from "react-router-dom";

function AdminDashboard() {

  return (

    <div className="admin-container">

      <h1>Admin Dashboard</h1>

      <p>Welcome Admin</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <Link to="/admin/products">
          <button>
            Product Management
          </button>
        </Link>

        <Link to="/admin/admins">
          <button>
            Admin Management
          </button>
        </Link>

      </div>

    </div>

  );

}

export default AdminDashboard;