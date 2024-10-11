const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar os produtos." });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        const product = await Product.create({ name, description, price, quantity, category });
        res.status(201).json(product);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ erro: "Erro ao criar o produto." });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ erro: 'Produto nao encontrado' });
        }
        const editedProduct = await product.update(req.body);
        return res.status(200).json(editedProduct);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao tentar editar o produto." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ erro: 'Produto nao encontrado' });
        }
        product.destroy();
        return res.json({ msg: "Produto deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao deletar o produto." });
    }
});



module.exports = router;