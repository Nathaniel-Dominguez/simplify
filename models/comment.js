'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    trackId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.track);
    models.comment.belongsTo(models.user);
  };
  return comment;
};