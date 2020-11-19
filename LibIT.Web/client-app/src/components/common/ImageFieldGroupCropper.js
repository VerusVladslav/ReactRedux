import React, { Component } from "react";
import CropperModal from "./cropper/CropperModal";
import PropTypes from "prop-types";

export class ImageFieldGroupCropper extends Component {
    render() {
      const { photo, error } = this.props;
      let image =
        "https://ae01.alicdn.com/kf/H493bb4d7e44f469ca1f64c9508101e19K/PrettyAngel-Good-Smile-GSC-No-1157-My-Hero-academic-Ochaco-Uraraka-Hero.jpg_q50.jpg";
      if (!!photo) {
        image = photo;
      }
      return (
        // <div className="container">
        //   <div className="row">
         <div className="form-group row">
            <div className="offset-md-2 col-md-2 col-3 d-flex justify-content-center">
              <img
                src={image}
                width="100"
                className="rounded-circle"
                alt="Foto user"
              />
            </div>
            <div className="col-md-8 col-9 d-flex align-content-center flex-wrap">
                  <CropperModal
                      getCroppedImage={this.props.getCroppedImage}
                      error={ error } />
            </div>
            {!!error && <p className="text-danger">{error}</p>}
          </div>
        //   </div>
        // </div>
      );
    }
  }
  
  ImageFieldGroupCropper.propTypes = {
     getCroppedImage: PropTypes.func.isRequired,
     error: PropTypes.string,
     photo: PropTypes.string.isRequired
  };
  
  ImageFieldGroupCropper.defaultProps = {};
  
  export default ImageFieldGroupCropper;