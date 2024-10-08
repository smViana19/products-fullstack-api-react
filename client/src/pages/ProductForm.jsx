import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate();


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:5000/api/products', {
    //             name,
    //             description,
    //             price,
    //             quantity
    //         });
    //         const dataForm = {name, description, price, quantity};
    //         console.log(dataForm)
    //         navigate('/');
    //     } catch (error) {
    //         setError(error.response?.data?.error || 'Erro ao cadastrar produto')
    //     }
    // }

    return (

        <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center mb-6'>Cadastro de produtos</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite o nome do produto"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite a descrição do produto"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Preço</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite o preço"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantidade" className="block text-gray-700 font-medium mb-2">Quantidade</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite a quantidade"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm;