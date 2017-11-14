import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/client';
import './main.html';

import { Users } from '../imports/api/users/users';


Template.info.onCreated(function helloOnCreated() {
  Meteor.subscribe('userMe');
  Meteor.subscribe('userMyRefs');

});

Template.info.helpers({
  refUsers() {
    var users = Users.find({
      ref: {
        $exists: true,
        $eq: Meteor.user() && Meteor.user().self
      }
    })
    return users;
  },
});
