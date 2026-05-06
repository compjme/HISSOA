import React, { useEffect, useState } from "react";
import "./CommentSection.css";
import ComPic from "../../assets/CommunityPIC.png";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

type Comment = {
  id: string;
  content: string;
  author: string;
  user_id: string | null;
  parent_id: string | null;
  created_at: string;
};

const CommentSection: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyInputs, setReplyInputs] = useState<{
    [commentId: string]: { author: string; text: string; show: boolean };
  }>({});

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error.message);
      return;
    }

    setComments(data || []);
  }

  async function handlePostComment() {
    if (!user) {
      alert("You must be signed in to post.");
      return;
    }

    if (!name.trim() || !commentText.trim()) return;

    const { error } = await supabase.from("comments").insert({
      content: commentText.trim(),
      author: name.trim(),
      user_id: user.id,
      parent_id: null,
    });

    if (error) {
      console.error("Error posting comment:", error.message);
      return;
    }

    setName("");
    setCommentText("");
    fetchComments();
  }

  function toggleReplyBox(commentId: string) {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: prev[commentId]?.author || "",
        text: prev[commentId]?.text || "",
        show: !prev[commentId]?.show,
      },
    }));
  }

  function handleReplyChange(
    commentId: string,
    field: "author" | "text",
    value: string
  ) {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: prev[commentId]?.author || "",
        text: prev[commentId]?.text || "",
        show: true,
        [field]: value,
      },
    }));
  }

  async function handlePostReply(commentId: string) {
    if (!user) {
      alert("You must be signed in to reply.");
      return;
    }

    const replyData = replyInputs[commentId];

    if (!replyData?.author.trim() || !replyData?.text.trim()) return;

    const { error } = await supabase.from("comments").insert({
      content: replyData.text.trim(),
      author: replyData.author.trim(),
      user_id: user.id,
      parent_id: commentId,
    });

    if (error) {
      console.error("Error posting reply:", error.message);
      return;
    }

    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        author: "",
        text: "",
        show: false,
      },
    }));

    fetchComments();
  }

  const mainComments = comments.filter((comment) => comment.parent_id === null);

  function getReplies(commentId: string) {
    return comments.filter((comment) => comment.parent_id === commentId);
  }

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
          {mainComments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <h4>{comment.author}</h4>
                <span>{new Date(comment.created_at).toLocaleString()}</span>
              </div>

              <p className="comment-message">{comment.content}</p>

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

              {getReplies(comment.id).length > 0 && (
                <div className="reply-list">
                  {getReplies(comment.id).map((reply) => (
                    <div key={reply.id} className="reply-item">
                      <div className="comment-header">
                        <h5>{reply.author}</h5>
                        <span>
                          {new Date(reply.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="comment-message">{reply.content}</p>
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