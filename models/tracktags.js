'use strict';
module.exports = (sequelize, DataTypes) => {
  const trackTags = sequelize.define('trackTags', {
    trackId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  trackTags.associate = function(models) {
    // associations can be defined here
  };
  return trackTags;
};