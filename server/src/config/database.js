const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestaoprodutodb', 'root', "", {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;