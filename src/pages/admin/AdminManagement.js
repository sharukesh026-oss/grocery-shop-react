import { useEffect, useState } from "react";
import API from "../../api/api";
import "./AdminManagement.css";

function AdminManagement() {

  const [admins, setAdmins] = useState([]);

  const [admin, setAdmin] = useState({
    name: "",
    username: "",
    password: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {

    try {

      const response = await API.get("/admins");

      setAdmins(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId == null) {

        await API.post("/admins", admin);

        alert("Admin Added Successfully");

      } else {

        await API.put(`/admins/${editId}`, admin);

        alert("Admin Updated Successfully");

      }

      loadAdmins();

      setEditId(null);

      setAdmin({
        name: "",
        username: "",
        password: ""
      });

    } catch (error) {

      console.error(error);

      alert("Operation Failed");

    }

  };

  const handleEdit = (item) => {

    setEditId(item.adminId);

    setAdmin({
      name: item.name,
      username: item.username,
      password: item.password
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this admin?")) return;

    try {

      await API.delete(`/admins/${id}`);

      loadAdmins();

      alert("Admin Deleted Successfully");

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="admin-container">

      <h2>Admin Management</h2>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={admin.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={admin.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          required
        />

        <button type="submit">

          {editId == null
            ? "Add Admin"
            : "Update Admin"}

        </button>

      </form>

      <hr />

      <h3>Admin List</h3>

      <table className="admin-table">

        <thead>

          <tr>

            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {admins.length === 0 ? (

            <tr>

              <td colSpan="4">

                No Admins Available

              </td>

            </tr>

          ) : (

            admins.map((item) => (

              <tr key={item.adminId}>

                <td>{item.name}</td>

                <td>{item.username}</td>

                <td>{item.password}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item.adminId)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default AdminManagement;