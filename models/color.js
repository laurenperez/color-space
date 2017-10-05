'use strict';
module.exports = (sequelize, DataTypes) => {
  var color = sequelize.define('color', {
    rgb: DataTypes.STRING,
    hex: DataTypes.STRING,
    cmyk: DataTypes.STRING,
    spaceId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.color.belongsTo(models.space);
      }
    }
  });
  return color;
};
