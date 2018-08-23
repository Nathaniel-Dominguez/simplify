'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Hey, Listen! Give me a valid email address! -Navi'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Hey, Listen! That password should be between 8 and 16 characters long. -Navi'
        }
      }
    },
    dob: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'No pic?'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser) {
        if(pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.isValidPassword = function(typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password);
  }

  return user;
};