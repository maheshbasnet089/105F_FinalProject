module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        commentMessage: {
        type: DataTypes.STRING,
        
      }
    
    });
    return Comment;
  };