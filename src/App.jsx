import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";
import  Kategori from "./pages/Kategori";
import About from "./pages/About";

import { Navigate } from "react-router-dom";
import Login from "./pages/login";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/login"element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
         <Layout/> 
        </ProtectedRoute>
      }
      >
      <Route index element={<Home/>}/>
      <Route path="Produk" element={<Produk/>}/>
      <Route path="produk/tambah" element={<AddProduk/>}/>
      <Route path="produk/edit/:id" element={<EditProduk/>}/>
      <Route path="Kategori" element={<Kategori/>}/>
      <Route path="About" element={<About/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
  )
}