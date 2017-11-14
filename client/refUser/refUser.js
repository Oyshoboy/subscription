import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './refUser.html';

import { Users } from '../../imports/api/users/users';



Template.refUser.onCreated(function helloOnCreated() {
  this.hasRefs = new ReactiveVar(0);
  this.subArr = new ReactiveVar([]);
});

Template.refUser.onRendered( function() {
    Meteor.call('users.checkRefs', this.data._id, (err, res) => {
      if(err) console.log('err', err);
      this.hasRefs.set(res);
    });

  this.autorun( () => {
    let self = this;
    Meteor.subscribe('usersById', Template.instance().subArr.get() );
  });
});


Template.refUser.helpers({
  nestedRefs() {
    var users = Users.find({
      ref: {
        $exists: true,
        $eq: this.self
      }
    })
    return users;
  },
  hasRefals(){
    var refs = Template.instance().hasRefs.get();
    var sub = Template.instance().subArr.get();
    return refs.length && !sub.length;
  },
  isOpened() {
    var sub = Template.instance().subArr.get();
    return sub.length;
  }
});

Template.refUser.events({
  'click .js-click'(ev, tmpl) {
    ev.preventDefault();

    var refs = tmpl.hasRefs.get()
    Meteor.call('users.checkRefs', tmpl.data._id, (err, res) => {
      if(err) console.log('err', err);
      tmpl.subArr.set(refs.concat(res));
    });
  },
  'click .js-cancel'(ev, tmpl) {
    ev.preventDefault();

    Meteor.call('users.checkRefs', tmpl.data._id, (err, res) => {
      if(err) console.log('err', err);
        var myArray = tmpl.subArr.get().filter( function( el ) {
        return res.indexOf( el ) < 0;
      } );
      tmpl.subArr.set(myArray);
    });
  }
});

