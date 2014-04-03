var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    UserSchema,
    ManagerSchema,

UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection : 'users', discriminatorKey : '_type'  }),

// UserSchema.virtual('fullname').get(function () {
//   return this.firstname + ' ' + this.lastname;
// });

ManagerSchema = UserSchema.extend({
  department : String
});

mongoose.model('User', UserSchema),
mongoose.model('Manager', ManagerSchema);
