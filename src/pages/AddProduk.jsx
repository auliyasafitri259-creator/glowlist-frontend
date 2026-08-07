import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [kategori, setKategori] = useState([]);
    const [formData, setFormData ] = useState({
        judul: "",
        deskripsi:"",
        harga:"",
        id_kategori:"",
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/produk", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })
            if (res.ok) {
                alert("Produk berhasil ditambahkan!");
                navigate("/produk")
            }else {
                const data = await res.json()
                 console.log(data);
                alert(data.message || "GAGAL MENAMBAH PRODUK!!")
            }
        } catch (err) {
            console.error("Error:", err)
            alert("Terjadi kesalahan saat menambah produk")
        }
    }
    
    useEffect(() => {
        const getKategori =  async () => {
            try {
                const res = await fetch("http://localhost:3001/kategori");
                const data = await res.json()
                setKategori(data)
            }catch (err){
                console.error("GAGAL MENGAMBIL KATEGORI:", err)
            }
        }
        getKategori()
    }, [])
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="card p-4  shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Judul Produk</label>
                    <input
                    type="text" 
                    name="judul" 
                    value={formData.judul} 
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Masukkan nama produk" 
                    required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea 
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Massukkan deskripsi produk"
                    ></textarea>
                </div>

                 <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                    type="text" 
                    name="harga" 
                    value={formData.harga} 
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Masukkan harga" 
                    required />
                </div>

                 <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select 
                    name="id_kategori" 
                    value={formData.id_kategori} 
                    onChange={handleChange} 
                    className="form-select"
                    required
                    >
                    <option value="">--Pilih Kategori--</option>
                    {kategori.map((item) => (
                        <option 
                        key={item.id_kategori}
                        value={item.id_kategori}>
                            {item.kategori}
                        </option>
                    ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success">Simpan</button>
            </form>
        </div>
    )
}