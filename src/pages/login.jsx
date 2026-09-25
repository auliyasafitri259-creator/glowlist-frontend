import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.auth) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("idPengguna", data.id_pengguna);
                localStorage.setItem("nama", data.nama);

                alert("Login berhasil, selamat datang " + data.nama + "!");
                navigate("/produk");
            } else {
                alert(data.message || "Login gagal");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat login");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                {/* KIRI - LOGO */}
                <div className="logo-side">

                    <div className="glowlist-logo">

                        <div className="glowlist-leaf">
                            <span className="leaf-left"></span>
                            <span className="leaf-right"></span>
                        </div>

                        <h1>glowlist</h1>

                        <p>Beauty in your everyday</p>

                    </div>

                </div>

                {/* KANAN - LOGIN */}
                <div className="login-side">

                    <div className="login-title">

                        <h2>
                            Login <span>GlowList</span>
                        </h2>

                        <p>
                            Masuk ke akunmu untuk melanjutkan
                            <br />
                            belanja dan menikmati pengalaman terbaik!
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-box">

                            <label>Email address</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="input-box">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Masukkan password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Sign in →
                        </button>

                    </form>

                    <div className="register">

                        <span>Belum punya akun?</span>

                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Daftar sekarang →
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}