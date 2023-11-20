import PropTypes from "prop-types";

const Label = ({ children, className = "" }) => {
  return (
    <label className={`block font-semibold ${className}`}>{children}</label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
