const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Todo = sequelize.define('Todo', {
    sno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('onhold', 'in_progress', 'completed'), 
        allowNull: false
    },
     assignedUserId: {              
        type: DataTypes.INTEGER,
        allowNull: true,            
        references: {
            model: 'users',        
            key: 'id'
        }
    }
}, {
    tableName: 'todos', 
    timestamps: false
});

module.exports = Todo;
