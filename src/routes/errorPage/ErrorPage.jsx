import React from "react";
import './ErrorPage.css';
import Header from "../Header";
import Footer from "../Footer";

const ErrorMsg = () => {
    return (
        <div id="errorPage">
            <h1>404</h1>
            <p>Not Found!</p>
        </div>
    );
}

const ErrorPage = () => {
    return (
        <>
            <Header />
            <ErrorMsg />
            <Footer />
        </>
    )
}

export {ErrorPage, ErrorMsg};