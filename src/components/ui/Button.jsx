import PropTypes from "prop-types";

const ReusableButton = ({
  type = "button",
  children,
  className = "",
  ...restProps
}) => {
  return (
    <button
      type={type}
      className={`mb-3 inline-block  rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

ReusableButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ReusableButton;
