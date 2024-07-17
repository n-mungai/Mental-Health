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
        <HashLink to={`/blogs/${blogId}`} className='blogCard'>
            <h3>{title}</h3>
            <p>{author}</p>
            <pre>{desc}</pre>
        </HashLink>
    )
}

const UserPage = () => {
    const {userId} = useParams();

    // var blogList = [];

    // const [snapshot, loading, error] = useObject(ref(database, `users/${userId}/blogs`));

    // if (!loading && snapshot.exists()) {
    //     const data = snapshot.val();
    //     const blogIds = [];

    //     const array = [];
    //     for (var key in data) {
    //         array.push(
    //             <BlogCard key={key} blogId={key} title={data[key].title} desc={data[key].desc} author={data[key].author} />
    //         )
    //     }
    //     blogList = array;
    // }

    return (
        <div className="page">
            <div id="userPage">
                <div className="header">
                    <h1>YOUR BLOGS</h1>
                    <HashLink className="write-blog" to={`/upload/${userId}`}>WRITE A BLOG</HashLink>
                </div>
                <div className="blog-posts">
                    <div className="blog-post">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.</p>
                        <span className="author">John Doe</span>
                    </div>
                    <div className="blog-post">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.</p>
                        <span className="author">John Doe</span>
                    </div>
                    <div className="blog-post">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.</p>
                        <span className="author">John Doe</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;