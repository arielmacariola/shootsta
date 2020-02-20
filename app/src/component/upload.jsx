import React, { Component } from "react";
import { apiHost } from "../utils/restAPI";
import { Link } from "react-router-dom";
const axios = require("axios");

class Upload extends Component {
  state = {
    showFormMessage: false,
    formSuccess: false,
    formMessage: ""
  };

  getFormMessage = (isSuccessful, msg) => {
    this.setState({
      formSuccess: isSuccessful,
      showFormMessage: true,
      formMessage: (
        <React.Fragment>
          <h4 className="alert-heading">
            {isSuccessful ? "Upload Successful" : "Form Error"}
          </h4>{" "}
          {msg}
        </React.Fragment>
      )
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    let inputVideos = document.querySelector("#inputVideos");

    for (var i = 0; i < inputVideos.files.length; i++) {
      let file = inputVideos.files[i];
      formData.append("video", file);
    }

    // Send a POST request
    axios
      .post(apiHost + "/api/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // handle success
        const { data, status } = response;
        if (status === 200) {
          let isSuccessful = true;
          let msg = (
            <React.Fragment>
              <p>
                {data.map((file, index) => (
                  <span key={index}>{file.originalname} </span>
                ))}
              </p>
              <hr />
              <p className="mb-0">
                See latest list of{" "}
                <Link to="/" className="alert-link">
                  videos
                </Link>
              </p>
            </React.Fragment>
          );

          this.getFormMessage(isSuccessful, msg);
        } else {
          let isSuccessful = false;
          let msg = <p>Something went wrong!</p>;

          this.getFormMessage(isSuccessful, msg);
        }

        // Reset the form
        document.getElementById("uploadForm").reset();
      })
      .catch(error => {
        let isSuccessful = false;
        let msg = <p>Something went wrong!</p>;

        this.getFormMessage(isSuccessful, msg);
      });
  };

  inputChangeHandler = e => {
    this.setState({
      showFormMessage: false
    });
  };

  displayFormMessage = () => {
    const formMessageClass = this.state.formSuccess
      ? "alert alert-success"
      : "alert alert-danger";

    if (this.state.showFormMessage) {
      return (
        <div className={formMessageClass} role="alert">
          {this.state.formMessage}
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2 className="page-title">Add More Videos</h2>
        <div className="form-box">
          {this.displayFormMessage()}
          <form
            id="uploadForm"
            encType="multipart/form-data"
            action={this.apiEndPoint}
            method="post"
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="inputUploadVideos">
                Choose video file/s to upload:
              </label>
              <input
                type="file"
                name="inputVideos"
                id="inputVideos"
                className="form-control-file form-control-md"
                onChange={e => this.inputChangeHandler()}
                accept="video/*"
                multiple
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
