module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull:false
      }
    

    
    });
    return User;
  };