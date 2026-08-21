import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    })

    const [fileBaru, setFileBaru] = useState(null);
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                //Ambil data produk
                const resProduk = await fetch(`http://localhost:3001/produk/${id}`);

                const dataProduk = await resProduk.json()
                setFormData(dataProduk[0])

                //Ambil data kategori
                const resKategi = await fetch("http://localhost:3001/kategori");

                const dataKategori = await resKategi.json()
                setKategori(dataKategori)

                setLoading(false)
            } catch (err) {
                console.error(err)
                setLoading(false)
            } 
        }

        getData()
    }, [id])

    const handleChange = (e) => { 
        setFormData({...formData, [e.target.name]: e.target.value,})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const yakin = window.confirm(
            "Yakin ingin menyimpan perubahan ini"
        )

        if (!yakin) {
            return
        }
        if(fileBaru && fileBaru.size > 2 * 1024 * 1024) {
            alert("Ukuran file terlalu besar, maksimal 2 mb")
            return;
        }

        try {
            const data = new FormData();

            data.append("judul", formData.judul)
            data.append("deskripsi", formData.deskripsi)
            data.append("harga", formData.harga)
            data.append("id_kategori", formData.id_kategori)

            if(fileBaru) {
                data.append("name_file", fileBaru) // hanya kirim kalau ada foto baru
            }

            const response = await fetch(`http://localhost:3001/produk/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: data,
            }
            );
            if (!response.ok) {
                throw new Error("Gagal memperbarui produk")
            }

            alert("Produk berhasil diperbarui")

            navigate("/produk")
        } catch (err) {
            console.error(err)
           alert("Gagal memperbarui produk")
        }
    }
    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Update Produk</h2>
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
                    <label className="form-label">Foto Saat ini</label>
                    <div>
                        {formData.name_file ? (
                            <img
                            src={`http://localhost:3001/uploads/${formData.name_file}`}
                            alt="Foto lama"
                            style={{ width: "120px", borderRadius: "8px" }}
                            />
                        ) : (
                            <p>Tidak ada foto</p>
                        )}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ganti Foto (opsional)</label>
                    <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setFileBaru(e.target.files[0])}
                    />
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