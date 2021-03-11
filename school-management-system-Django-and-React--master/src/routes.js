import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ProfilePage from "./containers/profile";
import AssignmentList from './containers/Assignment'
import AssignmentDetail from './containers/AssignmentDetail'
import WrappedAssignCreate from './containers/AssignCreate'





const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/create" component={WrappedAssignCreate} />
    <Route exact path="/profile/:id" component={ProfilePage} />
    <Route exact path="/" component={AssignmentList} />
    <Route  path="/assignments/:ID" component={AssignmentDetail} />
    
  </Hoc>
);

export default BaseRouter;
