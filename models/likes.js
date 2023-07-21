'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.belongsTo(models.Post, {
        targetKey: 'postId',
        foreignKey: 'postId',
      });
    }
  }
  Likes.init(
    {
      likeId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      // ==================================================
      postId: {
        // Foreign Key
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      userId: {
        // Foreign Key
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      // ==================================================
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Likes',
    }
  );
  return Likes;
};
