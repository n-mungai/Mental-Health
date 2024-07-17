import React, { useState } from 'react';
import './UploadBlogPage.css';

import firebase from 'firebase/compat/app';
import { app } from '../../firebase-options';
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { getAuth } from 'firebase/auth';
import { ref, getDatabase, update, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadString } from "firebase/storage";
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { ErrorMsg } from '../errorPage/ErrorPage';

const database = getDatabase();
const storage = getStorage();
const auth = getAuth();

const UploadBlogPage = () => {
    // Used to store the text from the uploaded file
    const [newBlogFile, setNewBlogFile] = useState(null);

    // Get the user ID from the router id
    const { userId } = useParams();

    // Get the currently logged in user
    const [user] = useAuthState(auth);

    /** Used to store the current blogs linked to the user */
    let blogs = [];

    // Title, author, and description field values for the form input
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");

    // Get the number of blogs already posted on the site
    // ===============================================================
    const [blogNoSnapshot] = useObject(ref(database, "NoBlogs"));

    var noBlogs = 0;

    if (blogNoSnapshot) {
        if (blogNoSnapshot.exists()) {
            noBlogs = blogNoSnapshot.val();
        }
    }
    /** Store the blogID for the next blog to be uploaded */
    var blogID = String(noBlogs).padStart(6, "0");
    // ===============================================================

    // Get the list of blogs related to the user
    // ===============================================================
    const [blogsSnapshot] = useObject(ref(database, `users/${userId}`));
    if (blogsSnapshot) {
        if (blogsSnapshot.exists()) {
            blogs = blogsSnapshot.val();
        }
    }
    // ===============================================================

    /** 
     * Called when the upload blog button is pressed.  
     * Adds the blog file to firebase storage and it's details from the form to firebase database
     */
    const handleAddBlog = () => {
        if (newBlogFile && title.length > 0 && author.length > 0 && desc.length > 0) {
            console.log(newBlogFile);
            console.log(blogID)
            blogs.push(blogID);
            uploadString(storageRef(storage, `${blogID}.md`), newBlogFile).then((uploadResult) => {
                set(ref(database, `users/${userId}`), blogs);
                update(ref(database, "blogs"), {
                    [blogID]: {
                        "title": title,
                        "author": author,
                        "desc": desc
                    }
                });
                set(ref(database, "NoBlogs"), ++noBlogs);
                setNewBlogFile(null);
                alert("Blog has been uploaded!");
                window.location.reload();
            });
        } else {
            alert("No file has been added and some fields are empty!");
        }
    };

    /** Called when a file is loaded from local storage. */
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
            {
                // If the user is logged out or the url ID doesn't match, show the error screen
                !user ?
                    <ErrorMsg />
                    :
                    user.uid != userId ?
                        <ErrorMsg />
                        :
                        <>
                            <div className="blogsTitle">
                                <p id="blogsTitle">ADD YOUR BLOG</p>
                                <p id="catchphrase">Share Your Thoughts and Experiences</p>
                            </div>
                            <div id="uploadContent">
                                <div className="addBlogContainer">
                                    <input type='text' value={title} placeholder='Blog Title' onChange={(e) => setTitle(e.target.value)} />
                                    <input type='text' value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} />
                                    <textarea rows={4} type='text' value={desc} placeholder='Description' onChange={(e) => setDesc(e.target.value)} />
                                    <input type="file" onChange={handleFileChange} id="file-input" />
                                    <button onClick={handleAddBlog}>Upload Blog</button>
                                </div>
                            </div>
                        </>
            }
        </>
    );
};

export default UploadBlogPage;
