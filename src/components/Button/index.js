import PropTypes from "prop-types";

import "./style.scss";

export const BUTTON_TYPES = {
    DEFAULT: 1,
    SUBMIT: 2,
};

const Button = ({ type, title, disabled, children, onClick }) => {
    switch (type) {
        case BUTTON_TYPES.SUBMIT:
        return (
            <input
                className="Button"
                data-testid="button"
                type="submit"
                title={title}
                value={children}
                disabled={disabled}
                onClick={onClick}
            />
        );
        default:
        return (
            <button
                className="Button"
                data-testid="button"
                type="button"
                title={title}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    };
};

// eslint-disable-next-line react/no-typos
Button.propTypes = {
    type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};
Button.defaultProps = {
    type: BUTTON_TYPES.DEFAULT,
    title: "",
    disabled: false,
    onClick: () => null,
    children: null,
};

export default Button;