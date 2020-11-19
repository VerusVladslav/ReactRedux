import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

const PhoneFieldGroup = ({
    field,
    value,
    label,
    icon,
    type,
    autoComplete,
    //placeholder,
    error,
    onChange
}) => {
    return (
        <>
            <div className="form-group">
                <label>
                    {label}
                </label>
                <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className={icon}></i> </span>
                </div>
                <InputMask className={classnames("form-control", {"is-invalid": !!error})}
                        onChange={onChange}
                        autoComplete={autoComplete}
                        mask="+99 (999) 999 99 99"
                    //placeholder={placeholder}
                    type={type}
                    id={field}
                    name={field}
                    value={value} />
            </div>
            </div>
            {!!error && <p className="text-danger">{error}</p>}
        </>
    );
};

PhoneFieldGroup.popTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired
};
PhoneFieldGroup.defaultProps = {
    type: "text",
    autoComplete: "on"
};

export default PhoneFieldGroup;