import React from "react";
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <Link to={'/'}> Home </Link>
            <Link to={'/books'}> All Books </Link>
            <Link to={'/user'}> My Account </Link>
        </nav>
    )
};

export default connect(state => state)(Nav);