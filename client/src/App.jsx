import { useEffect, useState } from "react"
import ProductDetail from "./components/ProductDetail"
import axios from "axios";

function App() {

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("product ", product);

        const response = await axios.get('http://localhost:5000/api/products/1');
        setProduct(response.data);
        console.log("product ", product);
      } catch (error) {
        setError("Erro ao carregar os produtos");

      }
    };
    fetchProduct()
  }, []);

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100"></div>
    <ProductDetail 
      name={product.name}
      description={product.description}
      price={product.price}
      quantity={product.quantity}
    />
    </>
  )
}

export default App
