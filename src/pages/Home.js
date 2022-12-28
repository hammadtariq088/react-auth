import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const Id = localStorage.getItem("id");
  const regUserId = parseInt(Id);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/const");
      setUsers(response.data);
    };
    getData();
  }, []);

  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClick = (id) => {
    // console.log(id, regUserId);
    if (id === regUserId) {
      const deleteData = async () => {
        const response = await axios.delete(
          `http://localhost:5000/const/${id}`,
          users
        );
        // console.log(response);
        setUsers();
        localStorage.clear();
        navigate("/");
      };
      deleteData();
    } else {
      const deleteData = async () => {
        const response = await axios.delete(
          `http://localhost:5000/const/${id}`,
          users
        );
        console.log(response);
        // setUsers();
      };
      deleteData();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Project
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-white">Welcome "{name}"</li>
            </ul>
            <form className="d-flex" role="search">
              <Link className="btn btn-outline-light me-2" to={"/editprofile"}>
                Edit Profile
              </Link>
              <button className="btn btn-outline-light" onClick={Logout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="center">
        <div className="container">
          <div className="display-6 mb-4 text-center">Users List</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usersData) => (
                <tr key={usersData?.id}>
                  <th scope="row">{usersData?.id}</th>
                  <td>{usersData?.name}</td>
                  <td>{usersData?.email}</td>
                  <td>
                    <Link
                      className="btn btn-outline-success"
                      to={`/userdetails/${usersData?.id}`}
                    >
                      View Detail
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleClick(usersData?.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
