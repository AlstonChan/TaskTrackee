import PropTypes from "prop-types";

CalenderSvg.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default function CalenderSvg({ color, className }) {
  return (
    <svg
      width={24}
      height={24}
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9H3ZM3 10V6a2 2 0 0 1 2-2h2M7 2v4M21 10V6a2 2 0 0 0-2-2h-.5"
        stroke={color || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
