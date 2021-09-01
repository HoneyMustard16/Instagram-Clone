import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../Databases/firebase";
import firebase from "firebase";
import "../Post.css";

function Post({ user, postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div>
      <Card className="post__card">
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className="post__avatar"
              alt={username}
              src=""
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<strong>{username}</strong>}
          subheader="September 14, 2016"
        />
        <CardMedia className="post__image" image={imageUrl} />
        <CardContent className="post__cardContent">
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="post__caption"
          >
            <strong>{username}</strong> <span>{caption}</span>
          </Typography>
          <div className="post__comments">
            {comments.map((comment) => (
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>{comment.username}</strong> {comment.text}
              </Typography>
            ))}
          </div>
        </CardContent>
        {user && (
          <CardActions disableSpacing>
            <form className="post__inputBox">
              <input
                className="post__input"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <div>
                <IconButton
                  className="post__inputButton"
                  variant="contained"
                  color="primary"
                  disabled={!comment}
                  type="submit"
                  onClick={postComment}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </form>
          </CardActions>
        )}
      </Card>
    </div>
  );
}

export default Post;
