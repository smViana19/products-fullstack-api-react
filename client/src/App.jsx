import {Route, Routes} from "react-router-dom";
import ProductForm from "./pages/ProductForm.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import './style.css'

function App() {

    return (
        <Routes>
            <Route path='/' element={<ProductList/>}/>
            <Route path='/cadastrar' element={<ProductForm/>}/>
            <Route path='/produto/:id' element={<ProductDetail/>}/>
        </Routes>
    )
}

export default App
