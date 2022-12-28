import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/const");
      setFetchData(response.data);
    };
    getData();
  }, []);

  //   console.log(fetchData);

  const navigate = useNavigate();

  const handleClick = () => {
    if (users.email == "") {
      alert("plz enter email address");
    } else if (users.password == "") {
      alert("plz enter password");
    } else {
      const filteredData = fetchData.filter((usersData) => {
        return (
          usersData.email == users.email && usersData.password == users.password
        );
      });
      setUsers(() => {
        return {
          email: "",
          password: "",
        };
      });
      const object = { ...filteredData };
      const { id, name, email, gender, password, dob } = object[0];
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("gender", gender);
      localStorage.setItem("password", password);
      localStorage.setItem("dob", dob);
      //   alert("Successfully logedin");
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
        <div className="display-6 mb-4 text-center">SignIn</div>
        <form onSubmit={(e) => e.preventDefault()}>
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            SignIn
          </button>
          <h6 className="mt-4">
            Have you created your account? if no,&nbsp;&nbsp;
            <Link to="/signup">SignUp here</Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
