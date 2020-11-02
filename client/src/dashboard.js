import React from "react";
import { logOut } from "./action/auth"
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const Dashboard = ({ isLoggedIn, logOut}) => {

  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      {
          isLoggedIn ? (
              <div>
                  <h1>Logged In</h1>
                  <button onClick={() => logOut()}> Log Out </button>
              
              </div>

          ) :
          (
            <div><h1>Nor Logged In</h1></div>
          )
      }
    </div>
    

  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
});
export default connect(mapStateToProps, { logOut })(Dashboard);
