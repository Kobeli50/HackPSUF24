// src/components/Post.tsx
import React from 'react';

interface PostProps {
    title: string;
    content: string;
    author: string;
    date: string;
}

const Post: React.FC<PostProps> = ({ title, content, author, date }) => {
    return (
        <div className="post">
            <h2>{title}</h2>
            <p>{content}</p>
            <small>
                Posted by {author} on {date}
            </small>
        </div>
    );
};

export default Post;
