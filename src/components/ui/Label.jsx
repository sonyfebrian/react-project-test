import PropTypes from "prop-types";

const Label = ({ children, className = "", htmlFor }) => {
  return (
    <label className={`block font-semibold ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default Label;
