type DecorativeBarsProps = {
  barColor?: string
}

export default function DecorativeBars({ barColor}: DecorativeBarsProps) {
  return (
    <div className="3xl:block hidden">
      <div className="absolute left-0 top-0 h-full text-enei-workshop z-30 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 268 1214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M240.151 -1.21731e-06C266.816 86.5537 274.194 175.918 262.88 352.397C251.566 528.877 208.768 644.094 200.898 812.143C193.428 971.635 202.301 1101.03 240.151 1214L-109.979 1214C-109.979 959.784 -109.979 705.566 -109.979 451.348C-109.979 324.24 -109.979 197.132 -109.979 70.022C-109.979 64.8428 -110.072 -1.6526e-05 -109.869 -1.65172e-05C-107.926 -1.64323e-05 -105.985 -1.63474e-05 -104.044 -1.62626e-05C-93.1519 -1.57865e-05 -82.2589 -1.53103e-05 -71.367 -1.48342e-05C46.4661 -9.68355e-06 122.318 -6.36796e-06 240.151 -1.21731e-06Z"
            fill={barColor}
            fillOpacity="0.25"
          />
        </svg>
      </div>

      <div className="absolute right-0 top-0 h-full text-enei-workshop z-30 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 288 1214"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.8488 1214C1.1845 1127.45 -6.19445 1038.08 5.11969 861.603C16.4338 685.123 59.2316 569.906 67.1023 401.857C74.5723 242.365 65.6986 112.969 27.8489 1.21731e-06L377.979 1.6522e-05C377.979 254.216 377.979 508.434 377.979 762.652C377.979 889.76 377.979 1016.87 377.979 1143.98C377.979 1149.16 378.072 1214 377.869 1214C375.926 1214 373.985 1214 372.044 1214C361.152 1214 350.259 1214 339.367 1214C221.534 1214 145.682 1214 27.8488 1214Z"
            fill={barColor}
            fillOpacity="0.25"
          />
        </svg>
      </div>
    </div>
  )
}
