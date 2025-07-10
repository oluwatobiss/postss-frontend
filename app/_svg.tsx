import Svg from "./_components/Svg";

export const svg = {
  boxArrowRight: (
    <Svg
      ariaLabel="Logout"
      viewBox="0 0 24 24"
      style={{ fill: "transparent", height: "31px", width: "31px" }}
    >
      <path
        stroke="#4d4d4d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 7.6V4.5c0-.3-.2-.5-.5-.5h-9c-.3 0-.5.2-.5.5v15c0 .3.2.5.5.5h9c.3 0 .5-.2.5-.5v-3.1M10 12h11m0 0-3-3.5m3 3.5-3 3.5"
      />
    </Svg>
  ),
  chat: (
    <Svg
      ariaLabel="Reply"
      viewBox="0 0 18 18"
      style={{ fill: "transparent", height: "18px", width: "18px" }}
    >
      <path
        d="M15.376 13.2177L16.2861 16.7955L12.7106 15.8848C12.6781 15.8848 12.6131 15.8848 12.5806 15.8848C11.3779 16.5678 9.94767 16.8931 8.41995 16.7955C4.94194 16.5353 2.08152 13.7381 1.72397 10.2578C1.2689 5.63919 5.13697 1.76863 9.75264 2.22399C13.2307 2.58177 16.0261 5.41151 16.2861 8.92429C16.4161 10.453 16.0586 11.8841 15.376 13.0876C15.376 13.1526 15.376 13.1852 15.376 13.2177Z"
        stroke="#ccc"
        strokeLinejoin="round"
        strokeWidth="1.25"
      ></path>
    </Svg>
  ),
  heart: (
    <Svg
      ariaLabel="Like"
      viewBox="0 0 18 18"
      style={{ fill: "transparent", height: "19px", width: "18.75px" }}
    >
      <path
        d="M1.34375 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z"
        stroke="#ccc"
        strokeWidth="1.25"
      ></path>
    </Svg>
  ),
  person: (
    <Svg
      ariaLabel="Profile"
      viewBox="0 0 26 26"
      style={{ fill: "transparent", height: "24px", width: "24px" }}
    >
      <circle cx="13" cy="7.3" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path
        stroke="currentColor"
        strokeWidth="2.5"
        d="M6.3 23.8h13.4c1.9 0 2.8-.6 2.8-1.7 0-2.7-3.7-6.4-9.5-6.4s-9.5 3.7-9.5 6.4c0 1.1.9 1.6 2.8 1.6Z"
      />
    </Svg>
  ),
  plus: (
    <Svg
      ariaLabel="Create"
      viewBox="0 0 12 12"
      style={{ fill: "currentColor", height: "24px", width: "24px" }}
    >
      <path
        d="M6 2v8m4-4H2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      ></path>
    </Svg>
  ),
};
