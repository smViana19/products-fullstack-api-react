const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('comida', 'limpeza', 'higiene', 'bebida'),
    }
}, {
    timestamps: true
});

module.exports = Product;
