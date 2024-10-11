import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProductChart from "../components/ProductChart.jsx";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editQuantity, setEditQuantity] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [productId, setProductId] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');


    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                setError('Erro ao carregar os produtos');
                console.error(error)
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const numericPrice = parseFloat(price.replace('R$ ', '').replace('.', '').replace(',', '.'));

            await axios.post('http://localhost:5000/api/products', {
                name,
                description,
                price,
                quantity,
                category
            });
            
            const dataForm = { name, description, price, quantity };
            console.log(dataForm)
            setIsModalOpen(false);
            window.location.reload();
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || 'Erro ao cadastrar produto')
        }
    }

    const openEditModal = (product) => {
        setEditName(product.name);
        setEditPrice(product.price);
        setEditQuantity(product.quantity);
        setEditDescription(product.description);
        setProductId(product.id);
        setIsEditModalOpen(true);
    };
    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${productId}`, {
                name: editName,
                description: editDescription,
                price: editPrice,
                quantity: editQuantity
            });
            setIsEditModalOpen(false);
            window.location.reload();

        } catch (error) {
            console.error('Erro ao atualizar o produto', error);
        }
    };


    const handleDeleteProduct = async (e, id) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir este produto?");
        if (!confirmDelete) {
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            window.location.reload()
        } catch (error) {
            setError(error.response?.data?.error || 'Erro ao deletar produto')
        }
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return (
        <div className='min-h-screen flex flex-col items-center p-4'>
            <div className="w-full max-w-7xl mb-4 flex flex-col sm:flex-row justify-between items-center mt-7">
                <button onClick={toggleModal}
                    className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    type="button">
                    <IoMdAdd size={24} />
                    Adicionar produtos
                </button>
                {isModalOpen && (
                    <div
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow ">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                                <h3 className="text-lg font-semibold text-gray-900 ">
                                    Cadastrar novo produto
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <FaTimes size={16} />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 ">
                                            Nome do produto
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="Digite o nome do produto"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <label htmlFor="price"
                                            className="block mb-2 text-sm font-medium text-gray-900 ">Preço</label>
                                        <input
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            type="number" name="price" id="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="R$9.90" required="" />
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <label htmlFor="quantity"
                                            className="block mb-2 text-sm font-medium text-gray-900 ">Quantidade</label>
                                        <input
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            type="number" name="quantity" id="quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="Digite a quantidade"
                                            required="" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                                        <select
                                            id="category"
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                            required
                                        >
                                            <option value="" disabled selected>Selecione</option>
                                            <option value="comida">Comida</option>
                                            <option value="limpeza">Limpeza</option>
                                            <option value="higiene">Higiene</option>
                                            <option value="bebida">Bebida</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 ">Descrição</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                            placeholder="Digite a descrição do produto"></textarea>
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Adicionar produto
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="filter-category" className="mr-2">Filtrar por categoria:</label>
                <select
                    id="filter-category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                    <option value="">Todas</option>
                    <option value="comida">Comida</option>
                    <option value="limpeza">Limpeza</option>
                    <option value="higiene">Higiene</option>
                    <option value="bebida">Bebida</option>
                </select>
            </div>
            <div className="w-full max-w-7xl relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome do produto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Preço
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantidade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {products
                            .filter(product => !selectedCategory || product.category === selectedCategory)
                            .map(product => (
                                <tr key={product.id} className="bg-white border-b hover:bg-gray-50 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">{product.description}</td>
                                    <td className="px-6 py-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                                    <td className="px-6 py-4">{product.quantity}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center space-x-4">
                                            <button onClick={() => openEditModal(product)} className="flex items-center text-yellow-500 hover:text-yellow-600 font-medium">
                                                <FaEdit className="mr-1" /> Editar
                                            </button>
                                            <button onClick={(e) => handleDeleteProduct(e, product.id)} className="flex items-center text-red-700 hover:text-red-800 font-medium">
                                                <MdDelete className="mr-1" /> Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {isEditModalOpen && (
                    <div
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-lg font-semibold text-gray-900">Editar produto</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <FaTimes size={16} />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={handleEditProduct} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="edit-name"
                                            className="block mb-2 text-sm font-medium text-gray-900">
                                            Nome do produto
                                        </label>
                                        <input
                                            type="text"
                                            name="edit-name"
                                            id="edit-name"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Digite o nome do produto"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <label htmlFor="edit-price"
                                            className="block mb-2 text-sm font-medium text-gray-900">
                                            Preço
                                        </label>
                                        <input
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            type="number"
                                            name="edit-price"
                                            id="edit-price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="R$9.90"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <label htmlFor="edit-quantity"
                                            className="block mb-2 text-sm font-medium text-gray-900">
                                            Quantidade
                                        </label>
                                        <input
                                            value={editQuantity}
                                            onChange={(e) => setEditQuantity(e.target.value)}
                                            type="number"
                                            name="edit-quantity"
                                            id="edit-quantity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Digite a quantidade"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="edit-description"
                                            className="block mb-2 text-sm font-medium text-gray-900">
                                            Descrição
                                        </label>
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            id="edit-description"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Digite a descrição do produto"
                                        ></textarea>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Atualizar produto
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className='mt-10'>
                <ProductChart />
            </div>
        </div>
    );
};

export default ProductList;
