import Markdown from "react-markdown";
import './BlogDetails.css';

import { app } from '../../firebase-options';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getDatabase, ref } from "firebase/database";
import { ref as storageRef } from "firebase/storage";
import "firebase/compat/storage";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useObject } from "react-firebase-hooks/database";

const storage = firebase.storage(app);
const database = getDatabase();

const BlogDetails = () => {
  // Used to display the content of the blog markdown file
  const [text, setText] = useState("");
  /** Title of blog post */
  var title = "";
  /** Author of blog post */
  var author = "";

  // Get the blog id from the router URL
  const { blogId } = useParams();

  // Retrieve the blog details and download the blog markdown file from firebase
  // ================================================================================
  const [snapshot] = useObject(ref(database, `blogs/${blogId}`));
  const [url, _, error] = useDownloadURL(storageRef(storage, `${blogId}.md`));
  if (!error && url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => setText(data));
  }

  if (snapshot) {
    if (snapshot.exists()) {
      title = snapshot.val()["title"];
      author = snapshot.val()["author"];
    }
  }
  // ================================================================================

  return (
    <div className="posts-page">
      <div className="titleContainer">
        <p id="title">{title}</p>
        <p id="author">{author}</p>
      </div>

      <div className="posts-container">
        <div className="posts">
          <Markdown>
            {text}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails;