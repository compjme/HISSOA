import React, { useState } from "react";
import "./CommentSection.css";
import ComPic from "../../assets/CommunityPIC.png";

type Reply = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
};

type Comment = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  replies: Reply[];
};

const CommentSection: React.FC = () => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Maria Solicito",
      text: "This space feels really welcoming and supportive.",
      timestamp: "Just now",
      replies: [
        {
          id: 11,
          author: "Adam Safor",
          text: "I agree, it's nice to have a place where people can share openly.",
          timestamp: "Just now",
        },
      ],
    },
  ]);

  const [replyInputs, setReplyInputs] = useState<{
    [commentId: number]: { author: string; text: string; show: boolean };
  }>({});

  const handlePostComment = () => {
    if (!name.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: name.trim(),
      text: commentText.trim(),
      timestamp: new Date().toLocaleString(),
      replies: [],
    };

    setComments([newComment, ...comments]);
    setName("");
    setCommentText("");
  };

  const toggleReplyBox = (commentId: number) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: prev[commentId]?.author || "",
        text: prev[commentId]?.text || "",
        show: !prev[commentId]?.show,
      },
    }));
  };

  const handleReplyChange = (
    commentId: number,
    field: "author" | "text",
    value: string,
  ) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: prev[commentId]?.author || "",
        text: prev[commentId]?.text || "",
        show: true,
        [field]: value,
      },
    }));
  };

  const handlePostReply = (commentId: number) => {
    const replyData = replyInputs[commentId];

    if (!replyData?.author.trim() || !replyData?.text.trim()) return;

    const newReply: Reply = {
      id: Date.now(),
      author: replyData.author.trim(),
      text: replyData.text.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment,
    );

    setComments(updatedComments);

    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: "",
        text: "",
        show: false,
      },
    }));
  };

  return (
    <section
      className="comment-section"
      style={{
        backgroundImage: `url(${ComPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="comment-card">
        <h2 className="comment-title">Community Chat!</h2>
        <p className="comment-subtitle">
          Please share your thoughts, experiences, and support with others.
        </p>

        <div className="comment-form">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            className="comment-input"
          />

          <textarea
            placeholder="Leave a comment..."
            value={commentText}
            maxLength={300}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-textarea"
          />

          <button onClick={handlePostComment} className="comment-button">
            Post Comment
          </button>
        </div>

        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <h4>{comment.author}</h4>
                <span>{comment.timestamp}</span>
              </div>

              <p className="comment-message">{comment.text}</p>

              <button
                onClick={() => toggleReplyBox(comment.id)}
                className="reply-toggle-button"
              >
                Reply
              </button>

              {replyInputs[comment.id]?.show && (
                <div className="reply-form">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={replyInputs[comment.id]?.author || ""}
                    maxLength={40}
                    onChange={(e) =>
                      handleReplyChange(comment.id, "author", e.target.value)
                    }
                    className="comment-input"
                  />

                  <textarea
                    placeholder="Write a reply..."
                    value={replyInputs[comment.id]?.text || ""}
                    maxLength={200}
                    onChange={(e) =>
                      handleReplyChange(comment.id, "text", e.target.value)
                    }
                    className="comment-textarea reply-textarea"
                  />

                  <button
                    onClick={() => handlePostReply(comment.id)}
                    className="comment-button"
                  >
                    Post Reply
                  </button>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="reply-list">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="reply-item">
                      <div className="comment-header">
                        <h5>{reply.author}</h5>
                        <span>{reply.timestamp}</span>
                      </div>
                      <p className="comment-message">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
