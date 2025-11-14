import PropTypes from "prop-types";
import "./style.scss";

const ServiceCard = ({ src, alt, children }) => (
    <div className="ServiceCard" data-testid="service-card">
		<div className="ServiceCard__imageContainer">
			<img src={src} alt={alt} />
		</div>
		<div className="ServiceCard__textContainer">{children}</div>
    </div>
);

ServiceCard.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	children: PropTypes.node.isRequired,
};

ServiceCard.defaultProps = {
  	alt: "image",
};

export default ServiceCard;