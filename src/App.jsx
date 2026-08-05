import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import  Kategori from "./pages/Kategori";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path="Produk" element={<Produk/>}/>
      <Route path="Kategori" element={<Produk/>}/>
      <Route path="About" element={<About/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
  )
}