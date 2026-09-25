import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Keranjang() {
    const [keranjang, setKeranjang] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("keranjang")) || [];

        setKeranjang(data);
    }, []);

    const hapusProduk = (id) => {
        const dataBaru = keranjang.filter(
            (item) => item.id_produk !== id
        );

        setKeranjang(dataBaru);

        localStorage.setItem(
            "keranjang",
            JSON.stringify(dataBaru)
        );
    };

    const ubahJumlah = (id, jumlah) => {
        if (jumlah < 1) return;

        const dataBaru = keranjang.map((item) =>
            item.id_produk === id
                ? {
                    ...item,
                    jumlah: jumlah
                }
                : item
        );

        setKeranjang(dataBaru);

        localStorage.setItem(
            "keranjang",
            JSON.stringify(dataBaru)
        );
    };

    const totalHarga = keranjang.reduce(
        (total, item) =>
            total +
            Number(item.harga) * Number(item.jumlah),
        0
    );

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Keranjang Belanja</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/produk")}
                >
                    ← Kembali ke Produk
                </button>

            </div>

            {keranjang.length === 0 ? (

                <div className="text-center p-5 border rounded">

                    <h4>
                        Keranjang masih kosong
                    </h4>

                    <p className="text-muted">
                        Silakan pilih produk terlebih dahulu.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/produk")}
                    >
                        Belanja Sekarang
                    </button>

                </div>

            ) : (

                <>

                    <div className="table-responsive">

                        <table className="table table-bordered align-middle">

                            <thead className="table-light">

                                <tr>
                                    <th>No</th>
                                    <th>Foto</th>
                                    <th>Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
                                    <th>Aksi</th>
                                </tr>

                            </thead>

                            <tbody>

                                {keranjang.map((item, index) => (

                                    <tr key={item.id_produk}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            {item.name_file ? (

                                                <img
                                                    src={`http://localhost:3001/uploads/${item.name_file}`}
                                                    alt={item.judul}
                                                    width="70"
                                                    height="70"
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "8px"
                                                    }}
                                                />

                                            ) : (

                                                <span className="text-muted">
                                                    Tidak ada foto
                                                </span>

                                            )}

                                        </td>

                                        <td>
                                            <strong>
                                                {item.judul}
                                            </strong>
                                        </td>

                                        <td>
                                            Rp.{" "}
                                            {Number(
                                                item.harga
                                            ).toLocaleString("id-ID")}
                                        </td>

                                        <td>

                                            <div className="d-flex align-items-center gap-2">

                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() =>
                                                        ubahJumlah(
                                                            item.id_produk,
                                                            item.jumlah - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {item.jumlah}
                                                </span>

                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() =>
                                                        ubahJumlah(
                                                            item.id_produk,
                                                            item.jumlah + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </td>

                                        <td>

                                            <strong>
                                                Rp.{" "}
                                                {(
                                                    Number(item.harga) *
                                                    Number(item.jumlah)
                                                ).toLocaleString("id-ID")}
                                            </strong>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    hapusProduk(
                                                        item.id_produk
                                                    )
                                                }
                                            >
                                                Hapus
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    <div className="d-flex justify-content-end mt-4">

                        <div
                            className="border rounded p-4"
                            style={{ width: "350px" }}
                        >

                            <h5>
                                Total Belanja
                            </h5>

                            <h3 className="mb-3">
                                Rp.{" "}
                                {totalHarga.toLocaleString("id-ID")}
                            </h3>

                            <button
                                className="btn btn-primary w-100"
                                onClick={() =>
                                    navigate(
                                        "/pembayaran"
                                    )
                                }
                            >
                                Checkout
                            </button>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}