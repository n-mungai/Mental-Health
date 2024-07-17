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
    const [newBlogFile, setNewBlogFile] = useState(null);

    const { userId } = useParams();

    const [user] = useAuthState(auth);

    let blogs = [];

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");

    const [blogNoSnapshot] = useObject(ref(database, "NoBlogs"));

    var noBlogs = 0;

    if (blogNoSnapshot) {
        if (blogNoSnapshot.exists()) {
            noBlogs = blogNoSnapshot.val();
        }
    }
    var blogID = String(noBlogs).padStart(6, "0");

    const [blogsSnapshot] = useObject(ref(database, `users/${userId}`));
    if (blogsSnapshot) {
        if (blogsSnapshot.exists()) {
            blogs = blogsSnapshot.val();
        }
    }


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
