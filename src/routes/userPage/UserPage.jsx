import React, { useState, useEffect } from 'react';
import './UserPage.css';
import showdown from 'showdown';

const converter = new showdown.Converter();

const UserPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [newBlog, setNewBlog] = useState('');
    const [newBlogFile, setNewBlogFile] = useState(null);

    useEffect(() => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
        setBlogs(savedBlogs);
        setDrafts(savedDrafts);
    }, []);

    const handleAddBlog = () => {
        if (newBlog.trim() !== '' || newBlogFile) {
            const blogContent = { text: newBlog, file: newBlogFile };
            const updatedBlogs = [...blogs, blogContent];
            setBlogs(updatedBlogs);
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
            setNewBlog('');
            setNewBlogFile(null);
        }
    };

    const handleKeepDraft = () => {
        if (newBlog.trim() !== '' || newBlogFile) {
            const draftContent = { text: newBlog, file: newBlogFile };
            const updatedDrafts = [...drafts, draftContent];
            setDrafts(updatedDrafts);
            localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
            setNewBlog('');
            setNewBlogFile(null);
        }
    };

    const handleDeleteBlog = (index) => {
        const updatedBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    };

    const handleDeleteDraft = (index) => {
        const updatedDrafts = drafts.filter((_, i) => i !== index);
        setDrafts(updatedDrafts);
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
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

    const renderMarkdown = (markdown) => {
        return { __html: converter.makeHtml(markdown) };
    };

    return (
        <>
            <div className="blogsTitle">
                <div id="titleBackground"></div>
                <div id="titleBackgroundFade"></div>
                <p id="blogsTitle">ADD YOUR BLOG</p>
                <p id="catchphrase">Share Your Thoughts and Experiences</p>
            </div>
            <div id="main">
                <div className="addBlogContainer">
                    <textarea 
                        value={newBlog} 
                        onChange={(e) => setNewBlog(e.target.value)} 
                        placeholder="Write your blog here..."
                    />
                    <input type="file" onChange={handleFileChange} />
                    <div className="buttonsContainer">
                        <button onClick={handleKeepDraft}>Keep Draft</button>
                        <button onClick={handleAddBlog}>Upload Blog</button>
                    </div>
                </div>
                <div className="draftsContainer">
                    <h2>Drafts</h2>
                    {drafts.length === 0 ? (
                        <p className="noDraftsMessage">Your drafts will appear here</p>
                    ) : (
                        drafts.map((draft, index) => (
                            <div key={index} className="draft">
                                {draft.file ? (
                                    <div dangerouslySetInnerHTML={renderMarkdown(draft.file)} />
                                ) : (
                                    <p>{draft.text}</p>
                                )}
                                <button onClick={() => handleDeleteDraft(index)}>Delete Draft</button>
                            </div>
                        ))
                    )}
                </div>
                <div className="blogsContainer">
                    <h2>Blogs</h2>
                    {blogs.length === 0 ? (
                        <p className="noBlogsMessage">Your blogs will appear here</p>
                    ) : (
                        blogs.map((blog, index) => (
                            <div key={index} className="blog">
                                {blog.file ? (
                                    <div dangerouslySetInnerHTML={renderMarkdown(blog.file)} />
                                ) : (
                                    <p>{blog.text}</p>
                                )}
                                <button onClick={() => handleDeleteBlog(index)}>Delete Blog</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default UserPage;
