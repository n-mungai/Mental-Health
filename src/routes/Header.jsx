import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";
import './Header.css';


import accountLight from "../assets/header/account-light.png";
import accountDark from "../assets/header/account-dark.png";

import { app } from "../firebase-options";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

const Header = () => {
    // Controls the scroll css for the nav bar
    const [scrollStyle, setScrollStyle] = useState("");

    // Controls whether the account box is shown or not
    const [hidden, setHidden] = useState(true);

    // Email and password fields for the account box
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Get the currently logged in user.
    const [user] = useAuthState(auth);

    /** Used to hide/show the account sign in/out box */
    const updateAccountBox = () => { setHidden(!hidden); }

    // Used to set the nav bar css when scrolled
    document.addEventListener('scroll', () => {
        if (window.scrollY >= window.innerHeight / 2) {
            setScrollStyle("scrolled");
        } else {
            setScrollStyle("");
        }
    });

    /** Used to sign in a user in firebase */
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
        }).then(() => {
            setHidden(true);
            window.location.reload();
        });
    }

    /** Used to create a new user in firebase */
    const createUser = () => {
        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        }).then((userCredential) => {
            var user = userCredential.user;
            setHidden(true);
            alert("Created new user!");
            window.location.reload();
        })
    }

    /** Used to sign out the user from firebase */
    const signOut = () => {
        auth.signOut();
        setHidden(true);
        window.location.reload();
    }

    return (
        <nav id="myNav" className={scrollStyle}>
            <div className="home">
                <HashLink to="/#landingPage">Tulia</HashLink>
            </div>
            <div className="content">
                <HashLink to="blogs">BLOG POSTS</HashLink>
                <HashLink to="experts">SEE EXPERTS</HashLink>
            </div>
            <div className="account">
                <div className="account-button">
                    <img src={(scrollStyle === "scrolled") ? accountDark : accountLight} alt="" onClick={updateAccountBox}></img>
                    <div id="account-box" className={hidden ? "hidden" : ""}>
                        {
                            (user == null) ?
                                <>
                                    <input type="text" id="email" value={email} onChange={e => { setEmail(e.target.value); }}></input>
                                    <input type="password" id="password" value={password} onChange={e => { setPassword(e.target.value); }}></input>
                                    <button onClick={signIn}>Sign In</button>
                                    <button onClick={createUser}>Create New Account</button>
                                </> :
                                <>
                                    <HashLink to={`/user/${user.uid}`} onClick={() => setHidden(true)}>Go To Profile</HashLink>
                                    <button onClick={signOut}>Sign out</button>
                                </>

                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;