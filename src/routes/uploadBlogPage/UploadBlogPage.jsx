import React, { useState } from 'react';
import './UploadBlogPage.css';

const UploadBlogPage = () => {
    const [newBlogFile, setNewBlogFile] = useState(null);

    const handleAddBlog = () => {
        if (newBlogFile) {
            console.log(newBlogFile);
            setNewBlogFile(null);
        } else {
            alert("No file has been added!");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/markdown') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewBlogFile(reader.result);
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid Markdown (.md) file');
            setNewBlogFile(null);
        }
    };

    return (
        <>
            <div className="blogsTitle">
                <p id="blogsTitle">ADD YOUR BLOG</p>
                <p id="catchphrase">Share Your Thoughts and Experiences</p>
            </div>
            <div id="main">
                <div className="addBlogContainer">
                    <input type="file" onChange={handleFileChange} />
                    <p>{newBlogFile}</p>
                    <div className="buttonsContainer">
                        <button onClick={handleAddBlog}>Upload Blog</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadBlogPage;
