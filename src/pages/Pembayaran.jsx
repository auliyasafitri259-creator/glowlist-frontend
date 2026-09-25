import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pembayaran() {
    const [keranjang, setKeranjang] = useState([]);
    const [metode, setMetode] = useState("");
    const [bayar, setBayar] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("keranjang")) || [];

        setKeranjang(data);
    }, []);

    const totalHarga = keranjang.reduce(
        (total, item) =>
            total +
            Number(item.harga) * Number(item.jumlah),
        0
    );

    const jumlahBayar = Number(bayar) || 0;

    const kembalian =
        jumlahBayar >= totalHarga
            ? jumlahBayar - totalHarga
            : 0;

    const handleBayar = () => {

        if (keranjang.length === 0) {
            alert("Keranjang masih kosong");
            navigate("/keranjang");
            return;
        }

        if (!metode) {
            alert("Silakan pilih metode pembayaran");
            return;
        }

        if (!bayar) {
            alert("Masukkan jumlah pembayaran");
            return;
        }

        if (jumlahBayar < totalHarga) {
            alert("Uang pembayaran kurang");
            return;
        }

        const transaksiLama =
            JSON.parse(
                localStorage.getItem("transaksi")
            ) || [];

        const transaksiBaru = {
            id_transaksi: Date.now(),
            tanggal: new Date().toLocaleString("id-ID"),
            produk: keranjang,
            total: totalHarga,
            metode: metode,
            bayar: jumlahBayar,
            kembalian: kembalian
        };

        const dataTransaksi = [
            transaksiBaru,
            ...transaksiLama
        ];

        localStorage.setItem(
            "transaksi",
            JSON.stringify(dataTransaksi)
        );

        localStorage.setItem(
            "notaTerakhir",
            JSON.stringify(transaksiBaru)
        );

        localStorage.removeItem("keranjang");

        alert("Pembayaran berhasil!");

        navigate("/nota");
    };

    return (
        <div
            className="container mt-4"
            style={{ maxWidth: "1000px" }}
        >

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Pembayaran
                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/keranjang")
                    }
                >
                    ← Kembali ke Keranjang
                </button>

            </div>


            {/* CONTENT */}

            <div className="row g-4">

                {/* DETAIL PESANAN */}

                <div className="col-md-7">

                    <div className="card">

                        <div className="card-body">

                            <h4 className="mb-4">
                                Detail Pesanan
                            </h4>


                            {keranjang.length === 0 ? (

                                <div className="text-center p-4">

                                    <h5>
                                        Keranjang kosong
                                    </h5>

                                    <p className="text-muted">
                                        Silakan pilih produk
                                        terlebih dahulu.
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate("/produk")
                                        }
                                    >
                                        Belanja Sekarang
                                    </button>

                                </div>

                            ) : (

                                keranjang.map((item) => (

                                    <div
                                        key={item.id_produk}
                                        className="d-flex align-items-center border-bottom pb-3 mb-3"
                                    >

                                        {/* FOTO PRODUK */}

                                        {item.name_file ? (

                                            <img
                                                src={`http://localhost:3001/uploads/${item.name_file}`}
                                                alt={item.judul}
                                                width="80"
                                                height="80"
                                                style={{
                                                    objectFit:
                                                        "cover",
                                                    borderRadius:
                                                        "10px",
                                                    marginRight:
                                                        "15px"
                                                }}
                                            />

                                        ) : (

                                            <div
                                                className="border rounded d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    marginRight:
                                                        "15px",
                                                    fontSize:
                                                        "12px"
                                                }}
                                            >
                                                Tidak ada foto
                                            </div>

                                        )}


                                        {/* NAMA PRODUK */}

                                        <div
                                            style={{
                                                flex: 1
                                            }}
                                        >

                                            <h6 className="mb-1">
                                                {item.judul}
                                            </h6>

                                            <p className="text-muted mb-0">

                                                {item.jumlah} × Rp.{" "}

                                                {Number(
                                                    item.harga
                                                ).toLocaleString(
                                                    "id-ID"
                                                )}

                                            </p>

                                        </div>


                                        <strong>

                                            Rp.{" "}

                                            {(
                                                Number(
                                                    item.harga
                                                ) *
                                                Number(
                                                    item.jumlah
                                                )
                                            ).toLocaleString(
                                                "id-ID"
                                            )}

                                        </strong>

                                    </div>

                                ))

                            )}


                            {keranjang.length > 0 && (

                                <div className="d-flex justify-content-between align-items-center mt-4">

                                    <h5 className="mb-0">
                                        Total Pembayaran
                                    </h5>

                                    <h5 className="mb-0">

                                        Rp.{" "}

                                        {totalHarga.toLocaleString(
                                            "id-ID"
                                        )}

                                    </h5>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

                <div className="col-md-5">

                    <div className="card">

                        <div className="card-body">

                            <h4 className="mb-4">
                                Pembayaran
                            </h4>

                            <div className="mb-3">

                                <label className="form-label">
                                    Metode Pembayaran
                                </label>

                                <select
                                    className="form-select"
                                    value={metode}
                                    onChange={(e) =>
                                        setMetode(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        -- Pilih Metode --
                                    </option>

                                    <option value="Cash">
                                        Cash
                                    </option>

                                    <option value="Transfer">
                                        Transfer
                                    </option>

                                    <option value="QRIS">
                                        QRIS
                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Uang Dibayar
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Masukkan jumlah uang"
                                    value={bayar}
                                    onChange={(e) =>
                                        setBayar(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="border rounded p-3 mb-4">

                                <div className="d-flex justify-content-between">

                                    <span>
                                        Total Belanja
                                    </span>

                                    <strong>

                                        Rp.{" "}

                                        {totalHarga.toLocaleString(
                                            "id-ID"
                                        )}

                                    </strong>

                                </div>


                                <div className="d-flex justify-content-between mt-2">

                                    <span>
                                        Dibayar
                                    </span>

                                    <span>

                                        Rp.{" "}

                                        {jumlahBayar.toLocaleString(
                                            "id-ID"
                                        )}

                                    </span>

                                </div>


                                <hr />


                                <div className="d-flex justify-content-between">

                                    <strong>
                                        Kembalian
                                    </strong>

                                    <strong>

                                        Rp.{" "}

                                        {kembalian.toLocaleString(
                                            "id-ID"
                                        )}

                                    </strong>

                                </div>

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleBayar}
                                disabled={
                                    keranjang.length === 0
                                }
                            >
                                Bayar Sekarang
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}