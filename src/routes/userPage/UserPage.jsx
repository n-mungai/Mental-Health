import React from "react";
import "./userPage.css";
import { useParams } from "react-router-dom";

import { app } from '../../firebase-options';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getDatabase, ref } from 'firebase/database';
import { useObject } from "react-firebase-hooks/database";
import { HashLink } from "react-router-hash-link";

const database = getDatabase();

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
    const { userId } = useParams();

    var userBlogs = [];

    const [blogsSnapshot] = useObject(ref(database, `users/${userId}`));

    if (blogsSnapshot) {
        if (blogsSnapshot.exists()) {
            userBlogs = blogsSnapshot.val();
        }
    }

    const blogsList = [];


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


    return (
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
    );
}

export default UserPage;