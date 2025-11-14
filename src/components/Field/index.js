import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
    INPUT_TEXT: 1,
    TEXTAREA: 2,
};

const Field = ({ type, name, placeholder, label }) => {
    let component;

    switch (type) {
        case FIELD_TYPES.TEXTAREA:
            component = (
                <textarea
                    name={name}
                    placeholder={placeholder} 
                    data-testid="field"
                />
            );
        break;
        default:
            component = (
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    data-testid="field"
                />
            );
        break;
    };

    return (
        <div className="inputField">
            <span>{label}</span>
            {component}
        </div>
    );
};

Field.propTypes = {
    type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

Field.defaultProps = {
    type: FIELD_TYPES.INPUT_TEXT,
    name: "",
    placeholder: "",
    label: "",
};

export default Field;