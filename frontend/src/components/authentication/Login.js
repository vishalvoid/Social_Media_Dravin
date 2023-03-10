import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/UserAction";
import { useAlert } from "react-alert";

function Login() {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleformOnchange = (event) => {
    const { value, name } = event.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const alert = useAlert();
  const { error, user } = useSelector((state) => state.user);

  const handleOnClick = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    await dispatch(loginUserAction(email, password));
    if (!error) {
      alert.success(`welcome ${user.name}`);
    }
    if (error) {
      alert.error(error);
    }
  };

  return (
    <>
      <div className="Login-box">
        <img className="Login-box_logo" src="./logo.gif" alt="logo"></img>
        <h1 className="Login-box__header">Login</h1>
        <form>
          <div className="Login-box__form-content">
            <label>Email</label>
            <br></br>
            <input
              type="text"
              value={data.email}
              onChange={handleformOnchange}
              name="email"
              required
            ></input>
          </div>
          <div className="Login-box__form-content">
            <label>Password</label>
            <br></br>
            <input
              type="password"
              value={data.password}
              onChange={handleformOnchange}
              name="password"
              required
            ></input>
          </div>

          <button type="submit" className="btn-login" onClick={handleOnClick}>
            Login
          </button>

          <p className="text-login">
            Don't have account ? <Link to="/register">register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default Login;
