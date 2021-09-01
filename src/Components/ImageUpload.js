import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../Databases/firebase";
import firebase from "firebase";
import "../ImageUpload.css";

function ImageUpload(username) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleInputFile = (e) => {
    // get the first file you select
    if (e.target.files[0]) {
      // set the image in state using file you select
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //   access firestore, crate image folder put selected file in input form, into firebase image folder
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //   complete FUnction...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post images to database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            alert("Upload Success");
          });
      }
    );
  };

  return (
    <>
      <div className="app__imageUpload">
        <progress
          className="app__progressBar"
          value={progress}
          max="100"
        ></progress>
        <input
          type="text"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" onChange={handleInputFile} />
        <Button variant="outlined" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </>
  );
}

export default ImageUpload;
