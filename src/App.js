import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import { auth } from "./utils/firebase";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) console.log(user);
      // dispatch(login({
      //   displayName: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL
      // }))
    });
  }, []);

  return (
    <div>

      {!user ? (
        <Router>
        <Switch>
        <Route exact path="/">
        <Login />
      </Route> 

          <Route exact path="/signup">
          <Signup /> 
          </Route>
       
        </Switch>
        </Router>
      ) : (
        <Router>
        <Switch>
        <Route exact path="/">
        <Home />
      </Route> 
        <Route path="/profile">
          <Profile />
        </Route>

      
        </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
