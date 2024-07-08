
import { Link } from "react-router-dom";
import {React } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{"color":"skyblue"}} to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/" ? "active": ""}`} aria-current="page" to="/"   style={location.pathname === "/" ? { color: "skyblue" } : {}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about"  style={location.pathname === "/about" ? { color: "skyblue" } : {}}>About</Link>
                            </li>


                        </ul>
                        <form className="d-flex" role="search">
                        <Link className="btn btn-outline-info mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-info mx-1" to="/signup" role="button">Signup</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
