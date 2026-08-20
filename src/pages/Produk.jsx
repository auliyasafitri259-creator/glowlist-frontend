import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Produk () { 
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] =useState(true);

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const getProduk = async () => {
        try {
            const res = await fetch("http://localhost:3001/produk");
            const data = await res.json();
            setProduk(data);
        } catch (err) {
            console.error("Gagal fetch data", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduk()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            try{
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:3001/produk/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                         "Content-Type": "application/json"
                    }
                })
                if (res.ok) {
                    alert("Produk berhasil dihapus")
                    getProduk(); 
                } else {
                    alert("Gagal menghapus produk")
                }
            } catch (err) {
                console.error("Error saat delete:", err)
                alert("Terjadi kesalahan saat menghapus data")
            }
        }
    }

    const handleEdit = (id) => {
        navigate(`/produk/edit/${id}`)
    }
    if (loading) {
        return <div className="container mt-4">Sedang memuat data...</div>
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Daftar Produk Glowlist</h2>
                <Link to="/produk/tambah" className="btn btn-primary">+ Tambah Produk</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.length > 0 ? (
                        produk.map((item) => (
                            <tr key={item.id_produk}>
                                <td>{item.id_produk}</td>
                                <td>
                                    {item.name_file ? (
                                        <img 
                                        src={`http://localhost:3001/uploads/${item.name_file}`}
                                        alt={item.judul}
                                        width="150"
                                        className="rounded"
                                        />
                                    ) : (
                                        <span className="text-muted">Tidak ada foto</span>
                                    )}
                                </td>
                                <td>{item.judul}</td>
                                <td>{item.deskripsi}</td>
                                <td>Rp. {item.harga}</td>
                                <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item.id_produk)}>Edit</button>
                                </td>
                                <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id_produk)}>Delete</button>
                            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                BELUM ADA PRODUK!!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}