import React, { useState } from "react";
import { loginUser } from "./action/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";



const Login = ({ loginUser, isLoggedIn}) => {
 
  let [data, setData] = useState({
    email: "",
    password: "",
    error: ""
  });
  if (isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }
  let { email, password, error} = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkError = (res) => {
    const area1 = (typeof res["response"].data.msg === 'undefined') ? false : res["response"].data.msg;
       
    if (area1) {
      setData({ ...data, ['error']: res["response"].data.msg });
      return;
    }
    const area2 = res["response"].data.errors;
    let description = ""
    for (const key in area2) {
      description += area2[key].msg
      if (area2[1]) {
        description += "\n";
      }
    }
    setData({ ...data, ['error']: description });

  }
  const submitData = () => {
    //loginUser(email,password);
    const login =  loginUser(email,password)
    login.then((values) => {
      if (!isLoggedIn) {
        console.log("here")
        checkError(values)

        
      } 
    })
 
    

    
    

    
    
    
   
    
    
  };

  return (
    <div>
    <h1>Login page</h1>
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
      <br/><br/>
      {
        (error) ?
        <div>{error}</div> :
        null
      }

      <button onClick={() => submitData()}>submit</button>
    </div>
  );
};
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn

})
export default connect(mapStateToProps, { loginUser })(Login);

