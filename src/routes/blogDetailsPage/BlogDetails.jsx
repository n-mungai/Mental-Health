import Markdown from "react-markdown";
import './BlogDetails.css';

import { app } from '../../firebase-options';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getDatabase, ref } from "firebase/database";
import { ref as storageRef } from "firebase/storage";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useObject } from "react-firebase-hooks/database";

const storage = firebase.storage(app);
const database = getDatabase();

const file = `
# Mental Health Awareness Application

This is a basic website to bring awerness to mental health problems and people suffering from them, delivered through blog posts by experts and a way to communicate with them.

## Project Structure
Each page has it's own folder where it's HTML, CSS, and JavaScript code lives in, and each project member works and sticks to that folder so as to avoid merge conflicts.

The website consists of four main pages:
1. Landing page - contained in \`index.html\`, done by Shadrack Mungai - 152522
2. Blog list page - shows a list of available blogs to read, contained in \`BlogListPage/blogList.html\`, done by Junaid Chaudhry - 166335
3. Find experts page - shows a list of available experts to get in touch with, contained in \`Experts/experts.html\`, done by Billy Kibet
4. Account page - if a user is signed in, this page shows the list of blogs they have written recently, contained in the \`UserDetails/userDetails.html\`, done by Kahindo  


\`\`\`c
#include <sdtio.h>

int main() {
  printf("Hello World!\\n");
}
\`\`\`
`;

const BlogDetails = () => {
  const [text, setText] = useState("");
  var title = "";
  var author = "";

  const { blogId } = useParams();

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