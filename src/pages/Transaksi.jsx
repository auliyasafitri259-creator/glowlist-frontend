import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Transaksi.css";

export default function Transaksi() {
    const [transaksi, setTransaksi] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Semua");
    const navigate = useNavigate();

    useEffect(() => {
        const data =
            JSON.parse(localStorage.getItem("transaksi")) || [];

        setTransaksi(data);
    }, []);

    const hapusTransaksi = (id) => {
        const yakin = window.confirm(
            "Yakin ingin menghapus transaksi ini?"
        );

        if (!yakin) return;

        const dataBaru = transaksi.filter(
            (item) => item.id_transaksi !== id
        );

        setTransaksi(dataBaru);
        localStorage.setItem(
            "transaksi",
            JSON.stringify(dataBaru)
        );
    };

    const totalPendapatan = transaksi.reduce(
        (total, item) => total + Number(item.total),
        0
    );

    const totalProduk = transaksi.reduce(
        (total, item) =>
            total +
            (item.produk || []).reduce(
                (jumlah, produk) =>
                    jumlah + Number(produk.jumlah),
                0
            ),
        0
    );

    const transaksiFilter = transaksi.filter((item) => {
        const teksProduk =
            item.produk
                ?.map((produk) => produk.judul)
                .join(" ")
                .toLowerCase() || "";

        const cocokSearch =
            String(item.id_transaksi)
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            teksProduk.includes(search.toLowerCase());

        const cocokFilter =
            filter === "Semua" || item.metode === filter;

        return cocokSearch && cocokFilter;
    });

    const bukaNota = (item) => {
        localStorage.setItem(
            "notaTerakhir",
            JSON.stringify(item)
        );

        navigate("/nota");
    };

    return (
        <div className="transaksi-page">
            <div className="transaksi-top">
                <div>
                    <h2>Riwayat Transaksi</h2>
                    <p>
                        Kelola dan lihat semua transaksi GlowList
                    </p>
                </div>

                <button
                    className="btn-belanja"
                    onClick={() => navigate("/produk")}
                >
                    + Belanja Lagi
                </button>
            </div>

            <div className="statistik">
                <div className="stat-card">
                    <div className="stat-icon purple">
                        🧾
                    </div>

                    <div>
                        <span>Total Transaksi</span>
                        <h3>{transaksi.length}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pink">
                        🛍️
                    </div>

                    <div>
                        <span>Produk Terjual</span>
                        <h3>{totalProduk}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        💰
                    </div>

                    <div>
                        <span>Total Pendapatan</span>
                        <h3>
                            Rp{" "}
                            {totalPendapatan.toLocaleString(
                                "id-ID"
                            )}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="transaksi-card">
                <div className="table-header">
                    <div>
                        <h3>Daftar Transaksi</h3>
                        <span>
                            {transaksiFilter.length} transaksi
                            ditemukan
                        </span>
                    </div>

                    <div className="table-tools">
                        <div className="search-box">
                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value)
                            }
                        >
                            <option value="Semua">
                                Semua Metode
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
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No Pesanan</th>
                                <th>Produk</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                                <th>Metode</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transaksiFilter.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="empty"
                                    >
                                        <div>
                                            <div className="empty-icon">
                                                🧾
                                            </div>

                                            <h4>
                                                Belum Ada Transaksi
                                            </h4>

                                            <p>
                                                Transaksi yang
                                                berhasil akan
                                                muncul di sini.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                transaksiFilter.map(
                                    (item, index) => (
                                        <tr
                                            key={
                                                item.id_transaksi
                                            }
                                        >
                                            <td>
                                                <span className="nomor">
                                                    {index + 1}
                                                </span>
                                            </td>

                                            <td>
                                                <strong className="order-id">
                                                    #
                                                    {
                                                        item.id_transaksi
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                <div className="produk-list">
                                                    {item.produk
                                                        ?.slice(
                                                            0,
                                                            2
                                                        )
                                                        .map(
                                                            (
                                                                produk
                                                            ) => (
                                                                <div
                                                                    className="produk-item"
                                                                    key={
                                                                        produk.id_produk
                                                                    }
                                                                >
                                                                    {produk.name_file ? (
                                                                        <img
                                                                            src={`http://localhost:3001/uploads/${produk.name_file}`}
                                                                            alt={
                                                                                produk.judul
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <div className="no-image">
                                                                            ✨
                                                                        </div>
                                                                    )}

                                                                    <span>
                                                                        {
                                                                            produk.judul
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}

                                                    {item.produk
                                                        ?.length >
                                                        2 && (
                                                        <small>
                                                            +
                                                            {item
                                                                .produk
                                                                .length -
                                                                2}{" "}
                                                            produk
                                                            lainnya
                                                        </small>
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="tanggal">
                                                    {item.tanggal}
                                                </span>
                                            </td>

                                            <td>
                                                <strong className="harga">
                                                    Rp{" "}
                                                    {Number(
                                                        item.total
                                                    ).toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </strong>
                                            </td>

                                            <td>
                                                <span
                                                    className={`metode ${item.metode?.toLowerCase()}`}
                                                >
                                                    {item.metode}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="status">
                                                    ● Selesai
                                                </span>
                                            </td>

                                            <td>
                                                <div className="aksi">
                                                    <button
                                                        className="btn-detail"
                                                        onClick={() =>
                                                            bukaNota(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Lihat
                                                    </button>

                                                    <button
                                                        className="btn-hapus"
                                                        onClick={() =>
                                                            hapusTransaksi(
                                                                item.id_transaksi
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}