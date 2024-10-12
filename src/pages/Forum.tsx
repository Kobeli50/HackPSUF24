// src/pages/Forum.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface Reply {
  id: number;
  content: string;
  replies: Reply[]; // Allow replies to have their own replies
}

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string; // Optional field for image
  subject: string; // Field for the subject
  replies: Reply[]; // Field for replies
}

const subjects = ['General', 'Mathematics', 'Science', 'Literature', 'History'];

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null); // Track active subject for posts
  const [replyContent, setReplyContent] = useState(''); // For reply content
  const [activeReplyPostId, setActiveReplyPostId] = useState<number | null>(null); // Track which post is being replied to
  const [activeReplyReplyId, setActiveReplyReplyId] = useState<number | null>(null); // Track which reply is being replied to

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && activeSubject) {
      const newPost: Post = {
        id: posts.length + 1,
        title,
        content,
        image: image ? URL.createObjectURL(image) : undefined,
        subject: activeSubject,
        replies: [],
      };
      setPosts([...posts, newPost]);
      resetPostForm();
    }
  };

  const handleReplySubmit = (e: React.FormEvent, postId: number, replyId?: number) => {
    e.preventDefault();
    if (replyContent) {
      const newReply: Reply = {
        id: replyId ? Date.now() : posts[postId - 1].replies.length + 1,
        content: replyContent,
        replies: [], // Initialize with no replies
      };

      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          if (replyId) {
            // If replying to a reply
            return {
              ...post,
              replies: post.replies.map((reply) => 
                reply.id === replyId
                  ? { ...reply, replies: [...reply.replies, newReply] }
                  : reply
              ),
            };
          } else {
            // If replying to the initial post
            return { ...post, replies: [...post.replies, newReply] };
          }
        }
        return post;
      });

      setPosts(updatedPosts);
      setReplyContent('');
      setActiveReplyPostId(null); // Reset active reply post ID
      setActiveReplyReplyId(null); // Reset active reply reply ID
    }
  };

  const resetPostForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
  };

  const renderReplies = (replies: Reply[], postId: number) => {
    return (
      <RepliesSection>
        {replies.map((reply) => (
          <ReplyItem key={reply.id}>
            <p>{reply.content}</p>
            <ReplyButton onClick={() => setActiveReplyReplyId(reply.id)}>
              Reply to this reply
            </ReplyButton>
            {activeReplyReplyId === reply.id && (
              <ReplyForm onSubmit={(e) => handleReplySubmit(e, postId, reply.id)}>
                <ReplyInput
                  type="text"
                  placeholder="Write your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                />
                <Button type="submit">Submit Reply</Button>
              </ReplyForm>
            )}
            {reply.replies.length > 0 && renderReplies(reply.replies, postId)} {/* Recursively render replies */}
          </ReplyItem>
        ))}
        {replies.length === 0 && <p>No replies yet.</p>}
      </RepliesSection>
    );
  };

  return (
    <ForumContainer>
      <h1>Academic Forum</h1>

      <SubjectsContainer>
        {subjects.map((subject) => (
          <SubjectButton
            key={subject}
            onClick={() => setActiveSubject(activeSubject === subject ? null : subject)}
          >
            {subject}
          </SubjectButton>
        ))}
      </SubjectsContainer>

      {activeSubject && (
        <PostForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <ImageInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button type="submit">Create Thread</Button>
        </PostForm>
      )}

      {activeSubject && (
        <PostList>
          {posts
            .filter((post) => post.subject === activeSubject)
            .map((post) => (
              <PostItem key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.image && <ImagePreview src={post.image} alt="Post Image" />}
                <ReplyButton onClick={() => setActiveReplyPostId(post.id)}>
                  Reply
                </ReplyButton>
                {activeReplyPostId === post.id && (
                  <ReplyForm onSubmit={(e) => handleReplySubmit(e, post.id)}>
                    <ReplyInput
                      type="text"
                      placeholder="Write your reply here..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      required
                    />
                    <Button type="submit">Submit Reply</Button>
                  </ReplyForm>
                )}
                {renderReplies(post.replies, post.id)} {/* Render replies for the post */}
              </PostItem>
            ))}
          {posts.filter((post) => post.subject === activeSubject).length === 0 && (
            <p>No posts in this subject yet.</p>
          )}
        </PostList>
      )}
    </ForumContainer>
  );
};

const ForumContainer = styled.div`
  max-width: 1300px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SubjectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SubjectButton = styled.button`
  padding: 10px 15px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #4db8e4;
  }
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* Allows vertical resizing */
`;

const ImageInput = styled.input`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4db8e4;
  }
`;

const PostList = styled.div`
  margin-top: 20px;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
`;

const ReplyButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4db8e4;
  }
`;

const RepliesSection = styled.div`
  margin-top: 10px;
  padding-left: 15px;
  border-left: 2px solid #ccc;
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ReplyInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReplyItem = styled.div`
  margin-top: 5px;
  background-color: #e9ecef;
  padding: 5px;
  border-radius: 4px;
`;

const ImagePreview = styled.img`
  max-width: 100%; // Ensures the image fits within the post item
  height: auto;
  margin-top: 10px;
`;

export default Forum;
