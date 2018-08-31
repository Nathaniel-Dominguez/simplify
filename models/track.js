'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    content: DataTypes.TEXT,
    albumArt: DataTypes.STRING,
    trackUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
    //models.track.belongsTo(models.user);
  };
  return Track;
};