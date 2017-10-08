'use strict';
module.exports = (sequelize, DataTypes) => {
  var space = sequelize.define('space', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    note: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.space.belongsTo(models.user);
        models.space.hasMany(models.color);
      }
    }
  });
  return space;
};
