import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {BarController, BarElement, CategoryScale, Chart, LinearScale} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarController, BarElement);
const ProductChart = () => {
    const [products, setProducts] = useState([]);
    const chartInstance = useRef(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products')
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao encontrar os produtos: ", error);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const productNames = products.map(product => product.name);
            const productPrices = products.map(product => product.price);

            const ctx = document.getElementById('productPriceChart').getContext('2d');

            if(chartInstance.current) {
                chartInstance.current.destroy();
            }
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: productNames,
                    datasets: [{
                        label: "Preco dos produtos",
                        data: productPrices,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'category',  // tipo de escala para o eixo X
                        },
                        y: {
                            type: 'linear',   // tipo de escala para o eixo Y
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
    }, [products])

    return (
        <div className='w-full max-w-lg'>
            <canvas id='productPriceChart'></canvas>
        </div>
    );
}

export default ProductChart;