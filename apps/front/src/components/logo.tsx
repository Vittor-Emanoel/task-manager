import * as React from "react"

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={200}
      height={200}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1113_5135)">
        <path
          d="M0 0a99.977 99.977 0 0029.273 70.71 100.027 100.027 0 0070.71 29.306V0H0zm99.984 100.016H200V0a100.028 100.028 0 00-70.735 29.292 99.976 99.976 0 00-29.281 70.724zm0 0V200H200a99.957 99.957 0 00-29.293-70.703 100.02 100.02 0 00-70.723-29.281zm0 0H0V200a100.017 100.017 0 0070.703-29.292 99.963 99.963 0 0029.28-70.692z"
          fill="url(#paint0_linear_1113_5135)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1113_5135"
          x1={-27}
          y1={185}
          x2={227}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DD37E0" />
          <stop offset={1} stopColor="#0BA7FF" />
        </linearGradient>
        <clipPath id="clip0_1113_5135">
          <path
            fill="#fff"
            transform="rotate(90 100 100)"
            d="M0 0H200V200H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
