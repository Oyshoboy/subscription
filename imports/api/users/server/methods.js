Meteor.methods({
  'users.checkRefs'(userId) {
    var user = Meteor.users.findOne(userId);
    var userIds = [];

    if(user) {
      var users = Meteor.users.find({ ref: user.self }, { fields: { _id: 1 } } );
      users.forEach( (user) => {
        userIds.push(user._id);
      });
      return userIds;
    }
  }
});