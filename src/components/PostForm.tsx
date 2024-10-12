// src/components/PostForm.tsx
import React, { useState } from 'react';

interface PostFormProps {
    onAddPost: (title: string, content: string, author: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content && author) {
            onAddPost(title, content, author);
            setTitle('');
            setContent('');
            setAuthor('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default PostForm;
