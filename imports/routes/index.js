import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../libs/history';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import SignUp from '../ui/SignUp';
import Link from '../ui/Link';
import LogIn from '../ui/LogIn';
import LogOut from '../ui/LogOut';
import NotFound from '../ui/NotFound';

const unAuthenticatedRoutes = ['/', '/sign-up'];
const authenticatedRoutes = ['/links'];

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  if (isAuthenticated && unAuthenticatedRoutes.includes(history.location.pathname)) {
    history.replace('/links');
  }

  if (!isAuthenticated && authenticatedRoutes.includes(history.location.pathname)) {
    history.replace('/');
  }
});

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" component={LogIn} exact />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/links" component={Link} />
      <Route path="/log-out" component={LogOut} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);