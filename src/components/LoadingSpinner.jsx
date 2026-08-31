const Spinner = ({
  width = 60,
  height = 60,
  color = "#60A5FA",
  className = ""
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(19 19)">
        {/* 8 dots rotating with staggered opacity animation */}
        <g transform="rotate(0)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.125">
            <animate
              attributeName="opacity"
              values="1;0.125"
              dur="1.2s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(45)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.25">
            <animate
              attributeName="opacity"
              values="1;0.25"
              dur="1.2s"
              begin="0.15s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(90)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.375">
            <animate
              attributeName="opacity"
              values="1;0.375"
              dur="1.2s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(135)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.5">
            <animate
              attributeName="opacity"
              values="1;0.5"
              dur="1.2s"
              begin="0.45s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(180)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.625">
            <animate
              attributeName="opacity"
              values="1;0.625"
              dur="1.2s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(225)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.75">
            <animate
              attributeName="opacity"
              values="1;0.75"
              dur="1.2s"
              begin="0.75s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(270)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="0.875">
            <animate
              attributeName="opacity"
              values="1;0.875"
              dur="1.2s"
              begin="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g transform="rotate(315)">
          <circle cx="0" cy="12" r="3" fill={color} opacity="1">
            <animate
              attributeName="opacity"
              values="1;1"
              dur="1.2s"
              begin="1.05s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

export default Spinner;
