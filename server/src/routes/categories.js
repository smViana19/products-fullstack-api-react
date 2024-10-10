const express = require('express');
const Category = require('../models/Category');
const router = express.Router();
const Product = require('../models/Product')
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Product,
                as: 'products'
            }
        });
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        return res.status(500).json({erro: "Erro ao carregar as categorias."});
    }
});

router.post('/', async (req, res) => {
    try {
        const name = req.body;
        const category = await Category.create(name);
        res.status(201).json(category);
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Erro ao criar a categoria."})
    }
});

router.get('/:id', async(req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({erro: "Categoria nao encontrada."});
        }
        return res.status(200).json(category)
    } catch(error) {
        return res.status(500).json({error: "Erro ao carregar a categoria solicitada."})
    }
})

module.exports = router;