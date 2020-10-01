import React, { Component } from "react";
import "./ImageUpload.css";

export default class ImageUpload extends Component {
  state = {
    start: true,
    showImage: false,
    progressBar: false,
    value: 0.1,
    phoneNumber: "",
    filename: "",
    file: null,
    showPhoneNo: false,
  };

  base64convereter = (file) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);

      filereader.onload = () => {
        resolve(filereader.result);
      };

      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  fileUploadHandler = async (e) => {
    console.log(e.target.files[0]);

    const data = await this.base64convereter(e.target.files[0]);

    console.log("====================================");
    console.log("data is ==>", data);
    console.log("====================================");
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <h2>File Upload & Image Preview</h2>
        <p className="lead">
          No Plugins <b>Just Javascript</b>
        </p>

        <form id="file-upload-form" className="uploader">
          <input
            id="file-upload"
            type="file"
            name="fileUpload"
            accept="image/*"
            onChange={this.fileUploadHandler}
          />

          <label htmlFor="file-upload" id="file-drag">
            {this.state.showImage ? (
              <img
                id="file-image"
                src={this.state.file}
                alt="Preview"
                className=""
              />
            ) : (
              ""
            )}

            {this.state.start ? (
              <div id="start" className="">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div>Select a file or drag here</div>
                <div id="notimage" className="hidden">
                  Please select an image
                </div>
                <span id="file-upload-btn" className="btn btn-primary">
                  Select a file
                </span>
              </div>
            ) : (
              ""
            )}
            {this.state.progressBar ? (
              <div id="response" className="">
                <div id="messages"></div>
                <progress
                  className="progress"
                  id="file-progress"
                  value={this.state.value}
                >
                  <span>0</span>%
                </progress>
              </div>
            ) : (
              ""
            )}
          </label>
          {this.state.showPhoneNo && this.state.value >= 1 ? (
            <label>
              <h1>Extrated Phone Number : {this.state.phoneNumber}</h1>
              <p>Filename : {this.state.filename}</p>
            </label>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}
