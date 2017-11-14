import { Mongo } from 'meteor/mongo';


const Users = Meteor.users;

// console.log('Users', Users);

Users.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Users.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});


export { Users };