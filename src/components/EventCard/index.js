import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
    src,
    alt,
    label,
    title,
    date = new Date(),
    small = false,
    ...props
    }) => (
        <div
            className={`EventCard${small ? " EventCard--small" : ""}`}
            data-testid="event-card"
            {...props}
        >
            <div className="EventCard__imageContainer">
                <img src={src} alt={alt} />
                <div className="EventCard__label">{label}</div>
            </div>
            <div className="EventCard__descriptionContainer">
                <div className="EventCard__title">{title}</div>
                <div className="EventCard__month">{getMonth(date)}</div>
            </div>
        </div>
  );

EventCard.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    small: PropTypes.bool,
};

EventCard.defaultProps = {
    alt: "Image",
    small: false,
};

export default EventCard;