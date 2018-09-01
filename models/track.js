'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    content: DataTypes.TEXT,
    albumArt: DataTypes.STRING,
    trackUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    // associations can be defined here
    models.track.belongsTo(models.user);
    models.track.hasMany(models.comment);
    models.track.belongsToMany(models.tag, { through: 'trackTags' });
  };
  return track;
};