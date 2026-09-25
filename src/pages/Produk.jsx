import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Produk() {

    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getProduk = async () => {

        try {

            const res = await fetch(
                "http://localhost:3001/produk"
            );

            const data = await res.json();

            setProduk(data);

        } catch (err) {

            console.error(
                "Gagal fetch data",
                err
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getProduk();
    }, []);

    const handleDelete = async (id) => {

        if (
            window.confirm(
                "Yakin ingin menghapus produk ini?"
            )
        ) {

            try {

                const res = await fetch(
                    `http://localhost:3001/produk/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type":
                                "application/json"
                        }
                    }
                );

                if (res.ok) {

                    alert(
                        "Produk berhasil dihapus"
                    );

                    getProduk();

                } else {

                    alert(
                        "Gagal menghapus produk"
                    );

                }

            } catch (err) {

                console.error(
                    "Error saat delete:",
                    err
                );

                alert(
                    "Terjadi kesalahan saat menghapus data"
                );

            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/produk/edit/${id}`);
    };

    const handleKeranjang = (item) => {

        const keranjang =
            JSON.parse(
                localStorage.getItem("keranjang")
            ) || [];

        const sudahAda = keranjang.find(
            (produk) =>
                produk.id_produk === item.id_produk
        );

        let dataBaru;

        if (sudahAda) {

            dataBaru = keranjang.map(
                (produk) =>
                    produk.id_produk === item.id_produk
                        ? {
                            ...produk,
                            jumlah:
                                produk.jumlah + 1
                        }
                        : produk
            );

        } else {

            dataBaru = [
                ...keranjang,
                {
                    ...item,
                    jumlah: 1
                }
            ];

        }

        localStorage.setItem(
            "keranjang",
            JSON.stringify(dataBaru)
        );

        navigate("/keranjang");
    };

    if (loading) {
        return (
            <div className="container mt-4">
                Sedang memuat data...
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>
                    Daftar Produk GlowList
                </h2>

                <Link
                    to="/produk/tambah"
                    className="btn btn-primary"
                >
                    + Tambah Produk
                </Link>

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

                        <th>Cek Out</th>

                    </tr>

                </thead>

                <tbody>

                    {produk.length > 0 ? (

                        produk.map((item) => (

                            <tr key={item.id_produk}>

                                <td>
                                    {item.id_produk}
                                </td>

                                <td>

                                    {item.name_file ? (

                                        <img
                                            src={`http://localhost:3001/uploads/${item.name_file}`}
                                            alt={item.judul}
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit:
                                                    "cover"
                                            }}
                                            className="rounded"
                                        />

                                    ) : (

                                        <span className="text-muted">
                                            Tidak ada foto
                                        </span>

                                    )}

                                </td>

                                <td>
                                    {item.judul}
                                </td>

                                <td>
                                    {item.deskripsi}
                                </td>

                                <td>
                                    Rp.{" "}
                                    {Number(
                                        item.harga
                                    ).toLocaleString(
                                        "id-ID"
                                    )}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            handleEdit(
                                                item.id_produk
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(
                                                item.id_produk
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            handleKeranjang(
                                                item
                                            )
                                        }
                                        className="btn btn-light"
                                        title="Masukkan ke keranjang"
                                        style={{
                                            fontSize: "22px"
                                        }}
                                    >
                                        🛒
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center"
                            >
                                BELUM ADA PRODUK!!
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
}