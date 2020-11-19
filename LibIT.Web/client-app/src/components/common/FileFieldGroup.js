import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FileFieldGroup = ({
    field,
    value,
    label,
    type,
    error,
    onChange
}) => {
    return (
        <>
             <div className="custom-file">
            <input
                onChange={onChange}
                value={value}
                type={type}
                id={field}
                name={field}
                className={classnames("custom-file-input", {
                    "is-invalid": !!error
                })}
            />

            <label className="custom-file-label" htmlFor={field}>
                {label}
            </label>
            {!!error && <p className="text-danger">{error}</p>}
        </div>
        </>
    );
};

FileFieldGroup.popTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
FileFieldGroup.defaultProps = {
    type: "file"
};

export default FileFieldGroup;