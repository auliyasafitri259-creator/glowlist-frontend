import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        password: "",
        no_hp: ""

    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nama || !formData.email || !formData.password) {
            alert("Semua data harus diisi!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const text = await res.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                console.error("Response server:", text);
                alert("Server tidak mengirim response JSON.");
                return;
            }

            if (res.ok) {
                alert(data.message || "Pendaftaran berhasil!");

                setFormData({
                    nama: "",
                    email: "",
                    password: "",
                    no_hp: ""
                });

                navigate("/login");
            } else {
                alert(data.message || "Pendaftaran gagal");
            }

        } catch (err) {
            console.error("Error:", err);
            alert(
                "Tidak dapat terhubung ke server. Pastikan backend berjalan di port 3001."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                {/* KIRI - LOGO */}
                <div className="register-logo-side">

                    <div className="register-logo">

                        <div className="register-leaf">
                            <span className="register-leaf-left"></span>
                            <span className="register-leaf-right"></span>
                        </div>

                        <h1>glowlist</h1>

                        <p>Beauty in your everyday</p>

                    </div>

                </div>

                {/* KANAN - FORM REGISTER */}
                <div className="register-form-side">

                    <div className="register-title">

                        <h2>
                            Daftar <span>GlowList</span>
                        </h2>

                        <p>
                            Buat akun baru untuk mulai
                            <br />
                            menikmati GlowList.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* NAMA */}
                        <div className="register-input">

                            <label htmlFor="nama">
                                Nama
                            </label>

                            <input
                                id="nama"
                                type="text"
                                name="nama"
                                placeholder="Masukkan nama"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* EMAIL */}
                        <div className="register-input">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="register-input">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Masukkan password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                         <div className="register-input">

                            <label htmlFor="no_hp">
                                No Hp
                            </label>

                            <input
                                id="no_hp"
                                type="no_hp"
                                name="no_hp"
                                placeholder="Masukkan No Hp"
                                value={formData.no_hp}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* TOMBOL DAFTAR */}
                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Mendaftarkan..."
                                : "Daftar Sekarang →"}
                        </button>

                    </form>

                    {/* LOGIN */}
                    <div className="already-account">

                        <span>
                            Sudah punya akun?
                        </span>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Login sekarang →
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}