import  React from "react";

export default function Navbar() {
    return <nav className="nav">
        {/* <a href="/" className="site-title">Site Name</a> */}
        <ul>
            <li>
                <a href="/home">Home</a>
                <a href="/trips">Trips</a>
            </li>
        </ul>
    </nav>
}