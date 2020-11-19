import React, { Component, useRef } from "react";
import "./Modal.scss";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import classnames from "classnames";
import FileFieldGroup from '../FileFieldGroup';
import PropTypes from "prop-types";

class CropperModal extends Component {

    state = {
        src: "",
        label: '',
        modal: false
    };


    onChange = e => {

        e.preventDefault();
        //console.log("-------john hello---------", e.target.value);
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                const file_name = files[0].name;
                const reader = new FileReader();
                reader.onload = () => {
                    
                    this.setState({ src: reader.result, label: file_name });
                    this.toggle(e);
                };
                reader.readAsDataURL(files[0]);
            } else {
                alert("Невірний тип файлу");
            }
        } else {
            alert("Будь ласка виберіть файл");
        }
    };
    toggle = e => {
        //e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    optionCropImage = (e, option, value) => {
        e.preventDefault();

        if (typeof this.cropper.getCroppedCanvas() === "undefined") {
            return;
        }
        switch (option) {
            case "rotate":
                this.cropper.rotate(value);
                break;
            case "zoom":
                this.cropper.zoom(value);
                break;
            default:
                break;
        }
    };

    onCropperInit(cropper) {
        this.cropper = cropper;
    }

    cropImage = e => {
        e.preventDefault();
        if (typeof this.cropper.getCroppedCanvas() === "undefined") {
            return;
        }
        this.setState({
            src: "",
            modal: false
        });
        this.props.getCroppedImage(this.cropper.getCroppedCanvas().toDataURL());
    };

    render() {
        const { modal, src, label } = this.state;
        return (
            <>
                <FileFieldGroup
                    field="image"
                    label={label}
                    value=""
                    error=""
                    onChange={this.onChange}
                    type="file"
                />

                <div className={classnames("modal", { open: modal })}>
                    <div className="fluid-container">
                        <div className="col-12 col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                        <div style={{ width: "100%" }}>
                                            <Cropper
                                                style={{ height: 400, width: "100%" }}
                                                preview=".img-preview"
                                                aspectRatio={1 / 1}
                                                guides={false}
                                                viewMode={1}
                                                dragMode="move"
                                                src={src}
                                                onInitialized={this.onCropperInit.bind(this)}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <h1>Preview</h1>
                                            <div
                                                className="img-preview"
                                                style={{ width: "100%", float: "left", height: "300px" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col">
                                            <button className="btn btn-success" onClick={this.cropImage}>
                                                Обрізати фото
                                            </button>
                                            <button className="btn btn-danger" onClick={this.toggle}>
                                                Скасувати
                                            </button>
                                        </div>
                                        <div className="order-last">
                                            <div>
                                                <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", -90)}>
                                                    <i className="fa fa-rotate-left" />
                                                </button>
                                                <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", 90)}>
                                                    <i className="fa fa-rotate-right" />
                                                </button>

                                                <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", 0.1)}>
                                                    <i className="fa fa-search-plus" />
                                                </button>
                                                <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", -0.1)}>
                                                    <i className="fa fa-search-minus" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const propTypes = {
    getCroppedImage: PropTypes.func.isRequired,
    error: PropTypes.string
};
const defaultProps = {
    //isSmall: false
};

CropperModal.propTypes = propTypes;
CropperModal.defaultProps = defaultProps;


export default CropperModal;