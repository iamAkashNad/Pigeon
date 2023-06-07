import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" data-country="" onClick={props.changeCountry} to="/">
                Pigeon
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" data-country="in" onClick={props.changeCountry} to="/">India</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" data-country="us" onClick={props.changeCountry} to="/">USA</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Choose Category
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/">General</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/technology">Technology</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/sports">Sports</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/science">Science</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/health">Health</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/entertainment">Entertainment</Link></li>
                            <li><Link className="dropdown-item" onClick={props.clearQuery} to="/business">Business</Link></li>
                        </ul>
                    </li>
                </ul>
                <form className="d-flex" role="search" onSubmit={ props.searchQuery }>
                    <input className="form-control me-2" id='search-bar' type="search" placeholder="Search Topics" aria-label="Search" />
                    <button className="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </div>
        </div>
        </nav>  
    );
}
