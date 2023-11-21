import PropTypes from "prop-types";

const Avatar = ({ src, alt, size }) => {
  return (
    <img
      className={`inline-block rounded-full ring-2 h-10 w-10 ring-white ${size}`}
      src={src}
      alt={alt}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Avatar;
