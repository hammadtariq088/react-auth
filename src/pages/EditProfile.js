import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const EditProfile = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  var id = localStorage.getItem("id");
  // var username = localStorage.getItem("name");
  // var useremail = localStorage.getItem("email");
  // var userdob = localStorage.getItem("dob");
  // var usergender = localStorage.getItem("gender");
  // var userpassword = localStorage.getItem("password");
  // console.log(id, username);

  const navigate = useNavigate();

  const handleClick = () => {
    const sendData = async () => {
      const response = await axios.put(
        `http://localhost:5000/const/${id}`,
        users
      );
      // console.log(response);
      setUsers(response.data);
    };

    if (users.name == "") {
      alert("plz fill your name");
    } else if (users.email == "") {
      alert("plz fill your email");
    } else if (users.gender == "") {
      alert("plz fill your gender");
    } else if (users.password == "") {
      alert("plz fill your password");
    } else if (users.dob == "") {
      alert("plz fill your dob");
    } else {
      sendData();
      setUsers(() => {
        return {
          name: "",
          email: "",
          password: "",
          dob: "",
          gender: "",
        };
      });
      localStorage.setItem("id", id);
      localStorage.setItem("name", users.name);
      localStorage.setItem("email", users.email);
      localStorage.setItem("gender", users.gender);
      localStorage.setItem("password", users.password);
      localStorage.setItem("dob", users.dob);
      alert("Congrats, your data has been updated completed");
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUsers((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  return (
    <div className="center my-5">
      <div className="container">
        <div className="display-6 mb-4 text-center">Edit Profile</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={users.name}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={users.email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={users.password}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">DOB</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              onChange={handleChange}
              value={users.dob}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="gender"
              onChange={handleChange}
              value={users.gender}
            >
              <option value="" selected>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Update
          </button>
          <Link to="/home" className="btn btn-primary ms-2">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
