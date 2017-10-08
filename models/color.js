'use strict';
module.exports = (sequelize, DataTypes) => {
  var color = sequelize.define('color', {
    r: DataTypes.INTEGER,
    g: DataTypes.INTEGER,
    b: DataTypes.INTEGER,
    hex: DataTypes.STRING,
    c: DataTypes.INTEGER,
    m: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    k: DataTypes.INTEGER,
    spaceId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.color.belongsTo(models.space)
      }
    }
  });
  return color;
};
