import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import './Header.css';

const Header = () => {
    const [scrollStyle, setScrollStyle] = useState("");

    document.addEventListener('scroll', () => {
        if (window.scrollY >= window.innerHeight / 2) {
            setScrollStyle("scrolled");
        } else {
            setScrollStyle("");
        }
    });

    return (
        <nav id="myNav" className={scrollStyle}>
            <div className="content">
                <HashLink to="blogDetails">BLOG DETAILS</HashLink>
                <HashLink to="blogs">BLOG POSTS</HashLink>
                <HashLink to="experts">SEE EXPERTS</HashLink>
            </div>
        </nav>
    )
}

export default Header;