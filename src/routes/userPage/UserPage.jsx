import React from "react";
import "./userPage.css";
import { useParams } from "react-router-dom";

import { app } from '../../firebase-options';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from 'firebase/database';
import { useObject } from "react-firebase-hooks/database";
import { HashLink } from "react-router-hash-link";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorMsg } from "../errorPage/ErrorPage";

const database = getDatabase();
const auth = getAuth();

const BlogCard = ({ blogId, title, desc, author }) => {
    return (
        <div className="blogCard">
            <HashLink to={`/blogs/${blogId}`}>
                <h3>{title}</h3>
                <p>{author}</p>
                <pre>{desc}</pre>
            </HashLink>
        </div>
    )
}

const UserPage = () => {
    // User ID is retrived from react router ID
    const { userId } = useParams();

    // Get the currently logged in user
    const [user] = useAuthState(auth);

    /** Used to store the blog IDs related to the currently logged in user */
    var userBlogs = [];

    // Load the user's blogs
    // ==========================================
    const [blogsSnapshot] = useObject(ref(database, `users/${userId}`));

    if (blogsSnapshot) {
        if (blogsSnapshot.exists()) {
            userBlogs = blogsSnapshot.val();
        }
    }
    // ==========================================

    /** List of react components to show the blogs */
    const blogsList = [];

    // Load the blog details (title, author, description)
    // ==========================================================
    const [allBlogs] = useObject(ref(database, "blogs"));

    if (allBlogs) {
        if (allBlogs.exists()) {
            var data = allBlogs.val();
            for (let key in data) {
                if (userBlogs.includes(key)) {
                    blogsList.push(
                        <BlogCard key={key} blogId={key} title={data[key].title} author={data[key].author} desc={data[key].desc} />
                    )
                }
            }
        }
    }
    // ==========================================================

    return (
        <>
            {
                // If the user is logged out or the url ID doesn't match, show the error screen
                !user ?
                    <ErrorMsg />
                    : (user.uid != userId) ?
                        <ErrorMsg />
                        :
                        <div className="page">
                            <div id="userPage">
                                <div className="header">
                                    <h1>YOUR BLOGS</h1>
                                    <HashLink className="write-blog" to={`/upload/${userId}`}>WRITE A BLOG</HashLink>
                                </div>
                                <div className="blog-posts">
                                    {
                                        blogsList.length == 0 ?
                                            <p>You don't have any blogs yet...</p>
                                            :
                                            blogsList
                                    }
                                </div>
                            </div>
                        </div>

            }
        </>
    );
}

export default UserPage;