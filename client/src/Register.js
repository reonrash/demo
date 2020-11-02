import React, { useState } from "react";
import { registerUser } from "./action/auth"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"



const Register = ({ isLoggedIn, registerUser }) => {
  
  
  let [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  if(isLoggedIn) return <Redirect to="/"></Redirect>

  let { email, password, fname, lname} = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitData = () => {
    if (email === "" || password === "") {
      return alert("Empty Values")
    } else {
      registerUser(email, password, fname, lname);
    }

  };

  return (

    <div>
      <h1>Register</h1>
      <label>First Name</label>
      <br />
      <input
        type="text"
        onChange={(e) => onChange(e)}
        value={ fname }
        name="fname"
      ></input>
      <br />
      <label>Last Name</label>
      <br />
      <input
        type="text"
        onChange={(e) => onChange(e)}
        value={lname}
        name="lname"
      ></input>
      <br />
      <label>Email</label>
      <br />
      <input
        type="text"
        onChange={(e) => onChange(e)}
        value={email}
        name="email"
      ></input>
      <br />
      <label>Password</label>
      <br />
      <input
        type="password"
        onChange={(e) => onChange(e)}
        value={password}
        name="password"
      ></input>
      <br/>
      <br/>
      <button onClick={() => submitData()}>submit</button>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn

})
export default connect(mapStateToProps, { registerUser })(Register);
