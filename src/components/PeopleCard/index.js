import PropTypes from "prop-types";
import "./style.scss";

const PeopleCard = ({ src, alt, name, position }) => (
    <div className="PeopleCard" data-testid="people-card">
		<div className="PeopleCard__imageContainer">
			<img src={src} alt={alt} />
		</div>
		<div className="PeopleCard__descriptionContainer">
			<div className="PeopleCard__name">{name}</div>
			<div className="PeopleCard__position">{position}</div>
		</div>
    </div>
);

PeopleCard.propTypes = {
 	src: PropTypes.string.isRequired,
 	alt: PropTypes.string,
	name: PropTypes.string.isRequired,
	position: PropTypes.string.isRequired,
};

PeopleCard.defaultProps = {
  	alt: "",
};

export default PeopleCard;