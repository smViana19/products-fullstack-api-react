const sequelize = require('./src/config/database');

const Product = require('./src/models/Product')

sequelize.sync({ force: true }).then(() => {
    console.log("Sincronizado com sucesso");
}).catch((error) => {
    console.error("Erro ao sincronizar: ", error)
})