'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    }),
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    })
  };
  return Message;
};