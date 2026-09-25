import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Nota() {
    const [nota, setNota] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(
            localStorage.getItem("notaTerakhir")
        );

        setNota(data);
    }, []);

    if (!nota) {
        return (
            <div className="container mt-5">

                <div className="text-center border rounded p-5">

                    <h3>
                        Nota Tidak Ditemukan
                    </h3>

                    <p className="text-muted">
                        Belum ada transaksi yang berhasil.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/produk")}
                    >
                        Kembali ke Produk
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div
            className="container mt-4 mb-5"
            style={{ maxWidth: "800px" }}
        >

            {/* NOTA */}

            <div className="card shadow">

                <div className="card-body p-4">

                    {/* HEADER */}

                    <div className="text-center mb-4">

                        <h2 className="fw-bold">
                            GlowList
                        </h2>

                        <h4>
                            Nota Pembayaran
                        </h4>

                        <p className="text-success fw-bold mb-0">
                            ✓ Pembayaran Berhasil
                        </p>

                    </div>


                    {/* INFORMASI TRANSAKSI */}

                    <div className="border rounded p-3 mb-4">

                        <div className="row">

                            <div className="col-6">

                                <p className="mb-2">
                                    <strong>
                                        ID Transaksi
                                    </strong>
                                </p>

                                <p className="mb-0 text-muted">
                                    #{nota.id_transaksi}
                                </p>

                            </div>

                            <div className="col-6 text-end">

                                <p className="mb-2">
                                    <strong>
                                        Tanggal
                                    </strong>
                                </p>

                                <p className="mb-0 text-muted">
                                    {nota.tanggal}
                                </p>

                            </div>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">

                            <span>
                                Metode Pembayaran
                            </span>

                            <strong>
                                {nota.metode}
                            </strong>

                        </div>

                    </div>


                    {/* DETAIL PRODUK */}

                    <h5 className="fw-bold mb-3">
                        Detail Pesanan
                    </h5>

                    <div className="table-responsive">

                        <table className="table table-bordered align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>
                                        No
                                    </th>

                                    <th>
                                        Produk
                                    </th>

                                    <th>
                                        Harga
                                    </th>

                                    <th>
                                        Jumlah
                                    </th>

                                    <th>
                                        Subtotal
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {nota.produk &&
                                    nota.produk.map(
                                        (item, index) => (

                                            <tr
                                                key={
                                                    item.id_produk
                                                }
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>

                                                    <div className="d-flex align-items-center">

                                                        {item.name_file ? (

                                                            <img
                                                                src={`http://localhost:3001/uploads/${item.name_file}`}
                                                                alt={
                                                                    item.judul
                                                                }
                                                                width="55"
                                                                height="55"
                                                                style={{
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius:
                                                                        "8px",
                                                                    marginRight:
                                                                        "10px"
                                                                }}
                                                            />

                                                        ) : (

                                                            <div
                                                                className="border rounded d-flex align-items-center justify-content-center"
                                                                style={{
                                                                    width: "55px",
                                                                    height: "55px",
                                                                    marginRight:
                                                                        "10px",
                                                                    fontSize:
                                                                        "10px"
                                                                }}
                                                            >
                                                                No Foto
                                                            </div>

                                                        )}

                                                        <strong>
                                                            {
                                                                item.judul
                                                            }
                                                        </strong>

                                                    </div>

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
                                                    {
                                                        item.jumlah
                                                    }
                                                </td>

                                                <td>

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

                                                </td>

                                            </tr>

                                        )
                                    )}

                            </tbody>

                        </table>

                    </div>


                    {/* RINGKASAN PEMBAYARAN */}

                    <div className="border rounded p-3 mt-4">

                        <div className="d-flex justify-content-between mb-2">

                            <span>
                                Total Belanja
                            </span>

                            <strong>
                                Rp.{" "}

                                {Number(
                                    nota.total
                                ).toLocaleString(
                                    "id-ID"
                                )}
                            </strong>

                        </div>


                        <div className="d-flex justify-content-between mb-2">

                            <span>
                                Uang Dibayar
                            </span>

                            <span>
                                Rp.{" "}

                                {Number(
                                    nota.bayar
                                ).toLocaleString(
                                    "id-ID"
                                )}
                            </span>

                        </div>


                        <hr />


                        <div className="d-flex justify-content-between">

                            <strong>
                                Kembalian
                            </strong>

                            <strong className="text-success">

                                Rp.{" "}

                                {Number(
                                    nota.kembalian
                                ).toLocaleString(
                                    "id-ID"
                                )}

                            </strong>

                        </div>

                    </div>


                    {/* PESAN */}

                    <div className="text-center mt-4">

                        <p className="mb-1">
                            Terima kasih telah berbelanja
                            di GlowList.
                        </p>

                        <small className="text-muted">
                            Simpan nota ini sebagai bukti
                            pembayaran.
                        </small>

                    </div>


                    {/* TOMBOL */}

                    <div className="d-flex gap-2 mt-4">

                        <button
                            className="btn btn-primary flex-fill"
                            onClick={() =>
                                navigate("/produk")
                            }
                        >
                            Belanja Lagi
                        </button>

                        <button
                            className="btn btn-secondary flex-fill"
                            onClick={() =>
                                navigate("/transaksi")
                            }
                        >
                            Riwayat Transaksi
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}