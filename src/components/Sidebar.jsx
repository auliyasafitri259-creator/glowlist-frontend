import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-light p-3 border-end col-3 min-vh-100">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/produk" className="btn btn-link text-start w-100">produk</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Kategori" className="btn btn-link text-start w-100">kategori</Link>
                </li>
                <li className="nav-item">
                    <Link to="/About" className="btn btn-link text-start w-100">About Me</Link>
                </li>
            </ul>
        </div>
    )
}