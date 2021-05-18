import React, { Component, useRef } from 'react';
import '../camera.css';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      facingMode: 'user',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  videoEle = React.createRef();
  canvasEle = React.createRef();
  imageEle = React.createRef();

  componentDidMount = async () => {
    this.startCamera();
  };

  startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.state.facingMode,
        },
      });

      this.videoEle.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };

  takePicture = async () => {
    // Get the exact size of the video element.
    const width = this.videoEle.current.videoWidth;
    const height = this.videoEle.current.videoHeight;

    // get the context object of hidden canvas
    const ctx = this.canvasEle.current.getContext('2d');

    // Set the canvas to the same dimensions as the video.
    this.canvasEle.current.width = width;
    this.canvasEle.current.height = height;

    // Draw the current frame from the video on the canvas.
    ctx.drawImage(this.videoEle.current, 0, 0, width, height);

    // Get an image dataURL from the canvas.
    const imageDataURL = this.canvasEle.current.toDataURL('image/png');
    this.stopCam();

    this.setState({
      imageURL: imageDataURL,
    });
  };

  stopCam = () => {
    const stream = this.videoEle.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  };

  backToCam = () => {
    this.setState(
      {
        imageURL: '',
      },
      () => {
        this.startCamera();
      }
    );
  };

  // load image from file-picker
  handleChange(e) {
    let imagePickerURL = URL.createObjectURL(e.target.files[0]);
    this.setState({
      imageURL: imagePickerURL,
    });
  }

  // Toogle Camera
  rotateCamera = () => {
    const camera = this.state.facingMode;
    if (camera === 'user') {
      this.setState({ facingMode: 'environment' });
    }
    if (camera === 'environment') {
      this.setState({ facingMode: 'user' });
    }
  };

  render() {
    return (
      <div className="selfie">
        {this.state.imageURL === '' && (
          <div className="cam">
            <video width="100%" height="100%" className="video-player" autoPlay={true} ref={this.videoEle}></video>
            <div className="camera-btn-container">
              <label className="btn gallery-btn" htmlFor="fileUpload">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
              </label>
              <input id="fileUpload" type="file" accept="image/*" onChange={this.handleChange} style={{ display: 'none' }}></input>
              <button className="btn capture-btn" onClick={this.takePicture}>
                <i class="fa fa-camera" aria-hidden="true"></i>
              </button>
              <button className="btn rotate-btn" onClick={this.rotateCamera}>
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        <canvas ref={this.canvasEle} style={{ display: 'none' }}></canvas>
        {this.state.imageURL !== '' && (
          <div className="preview">
            <img className="preview-img" src={this.state.imageURL} ref={this.imageEle} />

            <div className="btn-container">
              <button className="btn back-btn" onClick={this.backToCam}>
                <i class="fa fa-camera" aria-hidden="true"></i>
              </button>
              <button className="btn post-btn">
                <i class="fa fa-plus-circle"></i>
              </button>
              <a href={this.state.imageURL} download="pixchat.png" className="btn download-btn">
                <i class="fa fa-download" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Camera;
