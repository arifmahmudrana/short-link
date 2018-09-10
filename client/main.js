import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import '../imports/startup/simple-schema';
import routes from '../imports/routes';

import './main.html';

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});