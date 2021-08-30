// const sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUUID: 4 },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 3 },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 3 },
    },
    password: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isIn: [["admin", "user"]] },
    },
  });
  return Users;
};
