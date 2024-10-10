const sequelize = require('./src/config/database');

const { Category, Product } = require('./src/models/associations');

sequelize.sync({ force: true }).then(() => {
    console.log("Sincronizado com sucesso");
}).catch((error) => {
    console.error("Erro ao sincronizar: ", error)
})