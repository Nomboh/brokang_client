import "./comments.css";

import React from "react";

function Comments() {
  return (
    <div className="comments">
      <div className="comment_title">
        <h3 className="comment_header">Comment</h3>
        <span className="comment_span">(8)</span>
      </div>
      <div className="comment_wrapper">
        <textarea
          className="comment_textArea"
          name="comment"
          id="comments"
          cols="30"
          rows="5"
          placeholder="please enter a comment"
        ></textarea>

        <button className="comment_btn">Send</button>
      </div>
    </div>
  );
}

export default Comments;
