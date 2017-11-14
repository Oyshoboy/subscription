import { Meteor } from 'meteor/meteor';

Meteor.publish('userMe', function publishUsers() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('userMyRefs', function publishUsers() {
  var user = Meteor.users.findOne(this.userId);
  if(user) {
    return Meteor.users.find({ ref: user.self });
  }
});

Meteor.publish('usersById', function publishUsers(userIds) {
  return Meteor.users.find({ _id: { $in: userIds } } );
});

