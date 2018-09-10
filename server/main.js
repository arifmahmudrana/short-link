import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/startup/simple-schema';
import Links from '../imports/api/links';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if (link) {      
      Meteor.call('links.visited', link._id);
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
    } else {
      next();
    }
  });
});
