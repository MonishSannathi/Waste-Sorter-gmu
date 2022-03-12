import React from "react";
import { useEffect, useRef } from "react";

//import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    let videoRef = useRef(null);

    let photoRef = useRef(null)

    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const takePicture = () => {
      const width = 400
      const height = width / (16 / 9)
      
      let video = videoRef.current

      let photo = photoRef.current

      photo.width = width

      photo.height = height

      let ctx = photo.getContext('2d')

      ctx.drawImage(video, 0, 0, width, height)
      
    }

    const clearImage = () => {
      let photo = photoRef.current

      let ctx = photo.getContext('2d')

      ctx.clearRect(0,0,photo.width,photo.height)
    }

    const saveImage = () =>{
      let photo = photoRef.current

      photo = getBase64Image(photo)

      localStorage.setItem("imgData", photo)
    }

    useEffect(() => {
      getVideo();
    }, [videoRef]);

  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
            <h1 className="text-center">Trashy Image</h1>
            <video ref={videoRef} className="container"></video>

            <button onClick={takePicture} className="btn btn-danger container">Take Picture</button>

            <canvas className="container" ref={photoRef}></canvas>

            <button onClick={clearImage} className="btn btn-primary container">Clear Image</button>
            <button onClick={saveImage} className="btn btn-primary container">Save Image</button>
          <br/><br/>
        </div>
      </div>
    </div>
  );
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

export default Home;
