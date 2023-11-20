import PropTypes from "prop-types";

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`block font-semibold ${className}`}>
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
