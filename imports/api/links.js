import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

const Links = new Mongo.Collection('links');
export default Links;

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({user_id: this.userId});
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    // try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({
        url
      });
    // } catch (e) {
    //   throw new Meteor.Error(400, e.message);
    // }   

    const user_id = this.userId;
    Links.insert({
      _id: shortid.generate(),
      url,
      user_id,
      visible: true,
      visited_count: 0
    });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        label: 'Link ID',
        min: 1
      },
      visible: {
        type: Boolean,
        label: 'Visibility'
      }
    }).validate({
      _id,
      visible
    });

    Links.update({_id, user_id: this.userId}, {$set: {visible}});
  },
  'links.visited'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        label: 'Link ID',
        min: 1
      }
    }).validate({
      _id
    });

    Links.update(_id, {
      $inc: {visited_count: 1},
      $set: {last_visited: new Date().getTime()}
    });
  }
})