import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("transaksi")) || [];

        setTransaksi(data);
    }, []);

    const hapusTransaksi = (id) => {
        const dataBaru = transaksi.filter(
            (item) => item.id_transaksi !== id
        );

        setTransaksi(dataBaru);
        localStorage.setItem(
            "transaksi",
            JSON.stringify(dataBaru)
        );
    };

    const hapusSemua = () => {
        if (transaksi.length === 0) return;

        const yakin = window.confirm(
            "Yakin ingin menghapus semua transaksi?"
        );

        if (!yakin) return;

        setTransaksi([]);
        localStorage.removeItem("transaksi");
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Riwayat Transaksi</h2>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/produk")}
                    >
                        ← Produk
                    </button>

                    {transaksi.length > 0 && (
                        <button
                            className="btn btn-danger"
                            onClick={hapusSemua}
                        >
                            Hapus Semua
                        </button>
                    )}
                </div>
            </div>

            {transaksi.length === 0 ? (
                <div className="card">
                    <div className="card-body text-center p-5">
                        <h4>Belum Ada Transaksi</h4>
                        <p className="text-muted">
                            Belum ada riwayat transaksi yang tersimpan.
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/produk")}
                        >
                            Mulai Belanja
                        </button>
                    </div>
                </div>
            ) : (
                transaksi.map((item) => (
                    <div
                        className="card mb-4 shadow-sm"
                        key={item.id_transaksi}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h5 className="mb-1">
                                        Transaksi #{item.id_transaksi}
                                    </h5>
                                    <small className="text-muted">
                                        {item.tanggal}
                                    </small>
                                </div>

                                <span className="badge bg-success">
                                    Selesai
                                </span>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Produk</th>
                                            <th>Harga</th>
                                            <th>Jumlah</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {item.produk &&
                                            item.produk.map(
                                                (produk, index) => (
                                                    <tr
                                                        key={
                                                            produk.id_produk
                                                        }
                                                    >
                                                        <td>
                                                            {index + 1}
                                                        </td>

                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                {produk.name_file ? (
                                                                    <img
                                                                        src={`http://localhost:3001/uploads/${produk.name_file}`}
                                                                        alt={
                                                                            produk.judul
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
                                                                        produk.judul
                                                                    }
                                                                </strong>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            Rp.{" "}
                                                            {Number(
                                                                produk.harga
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </td>

                                                        <td>
                                                            {
                                                                produk.jumlah
                                                            }
                                                        </td>

                                                        <td>
                                                            <strong>
                                                                Rp.{" "}
                                                                {(
                                                                    Number(
                                                                        produk.harga
                                                                    ) *
                                                                    Number(
                                                                        produk.jumlah
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

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <p className="mb-2">
                                        <strong>
                                            Metode Pembayaran:
                                        </strong>{" "}
                                        {item.metode}
                                    </p>

                                    <p className="mb-2">
                                        <strong>
                                            Uang Dibayar:
                                        </strong>{" "}
                                        Rp.{" "}
                                        {Number(
                                            item.bayar
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </p>

                                    <p className="mb-2">
                                        <strong>
                                            Kembalian:
                                        </strong>{" "}
                                        Rp.{" "}
                                        {Number(
                                            item.kembalian
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </p>
                                </div>

                                <div className="col-md-6 text-md-end">
                                    <h5>
                                        Total: Rp.{" "}
                                        {Number(
                                            item.total
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </h5>
                                </div>
                            </div>

                            <div className="text-end mt-3">
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        hapusTransaksi(
                                            item.id_transaksi
                                        )
                                    }
                                >
                                    Hapus Transaksi
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}