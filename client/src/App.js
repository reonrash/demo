import React, { useEffect } from "react";
import { Provider } from 'react-redux'
import store from './store'
import Register from './Register'
import Login from "./login"
import Dashboard from "./dashboard"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { loadUser } from './action/auth'
import { setToken } from "./setToken";

if (localStorage.getItem('token')) {
  setToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])


  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
