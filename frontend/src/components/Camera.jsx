import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facingMode: 'user',
      imageURL: '',
      geo: {
        city: '',
        country: '',
      },
      geoCheckbox: true,
      caption: '',
      tags: ''
    };
  }

  videoEle = React.createRef();
  canvasEle = React.createRef();
  imageEle = React.createRef();

  componentDidMount = async () => {
    this.startCamera();
    this.fetchMoreGeoInfo();
  };
  componentWillUnmount = () => {
    this.stopCam();
  };

  //GEO-stuff
  fetchMoreGeoInfo = async () => {
    try {
      let posResponse = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve(pos);
        });
      });

      let response = await fetch(`https://geocode.xyz/${posResponse.coords.latitude},${posResponse.coords.longitude}?geoit=json`);
      let data = await response.json();

      this.setState({
        geo: {
          city: data.city,
          country: data.country,
        },
      });
    } catch (error) {
      console.log(error);
      this.setState({
        geo: {
          city: '',
          country: ''
        },
      });
    }
  };

  // Start Camera
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

  // helper function to convert canvas image to file
  // dataURItoBlob = (dataURI) => {
  //   let byteString = atob(dataURI.split(',')[1]);
  //   let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  //   let ab = new ArrayBuffer(byteString.length);
  //   let ia = new Uint8Array(ab);
  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   let blob = new Blob([ab], {type: mimeString});
  //   return blob;
  // }

  // Take picture
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

    // Get an image dataURL from the canvas 
    const imageDataURL = this.canvasEle.current.toDataURL('image/jpeg');
    this.stopCam();

    this.setState({
      imageURL: imageDataURL,
    });
  };

  // Stop Camera
  stopCam = () => {
    const stream = this.videoEle.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  };

  // Back BTN
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
  handleFilePick = (e) => {
    let imagePickerURL = URL.createObjectURL(e.target.files[0]);
    this.setState({
      imageURL: imagePickerURL,
    });
  };

  handleGeo = () => {
    this.setState({
      geoCheckbox: !this.state.geoCheckbox,
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
      [name]: value
    })
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


  handleSubmit = async (e) => {
    e.preventDefault();
    const postBody = {
      'caption': this.state.caption,
      'imageUrl': this.state.imageURL,
      'tags': this.state.tags.split(' '),
      'location': {
        'city': this.state.geoCheckbox ? this.state.geo.city : '',
        'country': this.state.geoCheckbox ? this.state.geo.country : '',
        'show': this.state.geoCheckbox
      },
      'createdById': localStorage.getItem('pixChatCurrentUserId'),
      'likedBy': []
    }
    try {
      await fetch(`${this.props.globalStore.apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      })
      console.log('post request sent');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <CameraWrapper>
        <div className="selfie">
          {this.state.imageURL === '' && (
            <div className="cam">
              <video width="100%" height="100%" className="video-player" autoPlay={true} ref={this.videoEle}></video>
              <div className="camera-btn-container">
                <label className="btn gallery-btn" htmlFor="fileUpload">
                  <i className="fa fa-picture-o" aria-hidden="true"></i>
                </label>
                <input id="fileUpload" type="file" accept="image/*" onChange={this.handleFilePick} style={{ display: 'none' }}></input>
                <button className="btn capture-btn" onClick={this.takePicture}>
                  <i className="fa fa-camera" aria-hidden="true"></i>
                </button>
                <button className="btn rotate-btn" onClick={this.rotateCamera}>
                  <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
          <canvas ref={this.canvasEle} style={{ display: 'none' }}></canvas>
          {this.state.imageURL !== '' && (
            <div className="preview">
              <form name="photoUpload" onSubmit={this.handleSubmit}>
                <img className="preview-img" src={this.state.imageURL} ref={this.imageEle} />
                <input type="text" name={'caption'} value={this.state.caption} onChange={this.handleChange} placeholder="caption" />
                <input type="text" name={'tags'} value={this.state.tags} onChange={this.handleChange} placeholder="tag1 tag2 tag3" />
                <input type="checkbox" id="geo-checkbox" name="geo-checkbox" onChange={this.handleGeo} checked={this.state.geoCheckbox} />
                <p>Location: {!this.state.geo ? '...loading' : `${this.state.geo.city}, ${this.state.geo.country}`}</p>
                <p>Include location in the post?: {this.state.geoCheckbox.toString()}</p>
                <button type={'submit'} className="btn post-btn">
                  <i className="fa fa-plus-circle"></i>
                </button>
              </form>
              <div className="btn-container">
                <button className="btn back-btn" onClick={this.backToCam}>
                  <i className="fa fa-camera" aria-hidden="true"></i>
                </button>
                <a href={this.state.imageURL} download="pixchat.jpeg" className="btn download-btn">
                  <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </CameraWrapper>
    );
  }
}

export default Camera;

const CameraWrapper = styled.div`
  .selfie {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .cam,
  .preview {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .preview-img {
    display: block;
    width: 100%;
  }
  .camera-btn-container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .btn {
    background: transparent;
    color: #fff;
    border: none;
  }

  .post-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .video-player {
    display: block;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }


  input[type='checkbox']:not(:checked),
  input[type='checkbox']:checked {
    position: relative;
    opacity: 1;
    pointer-events: auto;
  }
`;
