import './BlogsPage.css';
import { HashLink } from 'react-router-hash-link';

import { app } from '../../firebase-options';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getDatabase, ref } from 'firebase/database';
import { useObject } from "react-firebase-hooks/database";

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

const BlogsPage = () => {
    var blogList = [];

    const [snapshot, loading, error] = useObject(ref(database, "blogs"));

    if (!loading && snapshot.exists()) {
        const data = snapshot.val();
        const array = [];
        for (var key in data) {
            array.push(
                <BlogCard key={key} blogId={key} title={data[key].title} desc={data[key].desc} author={data[key].author} />
            )
        }
        blogList = array;
    }

    return (
        <>
            <div className="blogTitle">
                <div id="titleBackground"></div>
                <div id="titleBackgroundFade"></div>
                <p id="blogTitle">OUR BLOGS</p>
                <p id="catchphrase">Find Inspiration To Continue Moving Forward</p>
            </div>
            <div id="blogList">
                {blogList}
            </div>
        </>
    )
}

export default BlogsPage;