import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/const");
      setUsers(response.data);
    };
    getData();
  }, []);

  return (
    <div className="center">
      <div className="container">
        <div className="display-6 mb-4 text-center">UserDetails</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((usersData) => {
                return usersData.id == id;
              })
              .map((usersData) => {
                return (
                  <tr key={usersData.id}>
                    <th scope="row">{usersData.id}</th>
                    <td>{usersData.name}</td>
                    <td>{usersData.email}</td>
                    <td>{usersData.dob}</td>
                    <td>{usersData.gender}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Link to="/home" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
