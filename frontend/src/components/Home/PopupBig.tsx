import { BannerProps } from "@utils/get-banner-image";
import { useState } from "react";

const PopupBig = ({ image, text, date }: BannerProps) => {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div id="pop-up-big">
      <span className="like" onClick={toggleLike}>
        {liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g clip-path="url(#clip0_401_451)">
              <g filter="url(#filter0_d_401_451)">
                <path
                  d="M29.9998 12.25C30.002 13.2023 29.8153 14.1456 29.4505 15.0253C29.0858 15.905 28.5502 16.7036 27.8748 17.375L16.7123 28.7025C16.6193 28.797 16.5084 28.872 16.386 28.9232C16.2637 28.9745 16.1324 29.0008 15.9998 29.0008C15.8672 29.0008 15.7359 28.9745 15.6136 28.9232C15.4913 28.872 15.3804 28.797 15.2873 28.7025L4.12482 17.375C2.76393 16.0158 1.99873 14.1716 1.99756 12.2482C1.99639 10.3248 2.75934 8.47964 4.11857 7.11875C5.47781 5.75786 7.32198 4.99266 9.2454 4.99149C11.1688 4.99031 13.0139 5.75327 14.3748 7.1125L15.9998 8.63125L17.6361 7.1075C18.6516 6.09699 19.9438 5.41001 21.3495 5.13329C22.7552 4.85657 24.2113 5.00252 25.5341 5.55272C26.8569 6.10291 27.987 7.03268 28.7818 8.22465C29.5766 9.41662 30.0005 10.8173 29.9998 12.25Z"
                  fill="#fff"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_401_451"
                x="-2.00244"
                y="0.991486"
                width="36.0024"
                height="32.0094"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_401_451"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_401_451"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_401_451">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g clip-path="url(#clip0_401_455)">
              <g filter="url(#filter0_d_401_455)">
                <path
                  d="M27.3477 6.55479C25.9415 5.15273 24.0376 4.36411 22.0519 4.36116C20.0662 4.35821 18.16 5.14118 16.7496 6.53905L15.4999 7.69913L14.2502 6.53905C12.8403 5.13269 10.9295 4.344 8.93811 4.3465C6.94672 4.349 5.03788 5.14247 3.63152 6.55237C2.22516 7.96226 1.43647 9.87309 1.43897 11.8645C1.44147 13.8559 2.23494 15.7647 3.64484 17.1711L14.4646 28.1482C14.5998 28.2855 14.7609 28.3946 14.9387 28.469C15.1164 28.5434 15.3072 28.5817 15.4999 28.5817C15.6926 28.5817 15.8834 28.5434 16.0611 28.469C16.2389 28.3946 16.4001 28.2855 16.5353 28.1482L27.3477 17.1783C28.0452 16.4811 28.5985 15.6533 28.976 14.7422C29.3536 13.8311 29.5479 12.8546 29.5479 11.8684C29.5479 10.8822 29.3536 9.90563 28.976 8.99453C28.5985 8.08343 28.0452 7.25563 27.3477 6.55842V6.55479ZM25.2891 15.127L15.4999 25.0543L5.70706 15.1185C4.84706 14.255 4.36477 13.0855 4.36604 11.8667C4.3673 10.648 4.85201 9.47949 5.7138 8.6177C6.57559 7.75591 7.74407 7.2712 8.96283 7.26993C10.1816 7.26867 11.3511 7.75096 12.2146 8.61096C12.2268 8.62307 12.2389 8.63518 12.2522 8.64608L14.5094 10.7483C14.7783 10.9989 15.1323 11.1382 15.4999 11.1382C15.8675 11.1382 16.2215 10.9989 16.4905 10.7483L18.7477 8.64608C18.761 8.63518 18.7731 8.62307 18.7852 8.61096C19.213 8.18415 19.7208 7.84578 20.2794 7.61519C20.838 7.38459 21.4366 7.26628 22.0409 7.26701C22.6453 7.26774 23.2435 7.3875 23.8016 7.61944C24.3596 7.85139 24.8666 8.19098 25.2934 8.61883C25.7202 9.04669 26.0586 9.55441 26.2892 10.113C26.5197 10.6716 26.6381 11.2702 26.6373 11.8746C26.6366 12.4789 26.5168 13.0772 26.2849 13.6352C26.0529 14.1933 25.7134 14.7002 25.2855 15.127H25.2891Z"
                  fill="#fff"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_401_455"
                x="-2.56104"
                y="0.346497"
                width="36.1089"
                height="32.2352"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_401_455"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_401_455"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_401_455">
                <rect width="31" height="31" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </span>
      <div className="big-content">
        <img src={image} alt={text} />
        <div className="big-gradiant"></div>
        <p className="big-name">{text}</p>
        <p className="big-date">{date}</p>
      </div>
    </div>
  );
};

export default PopupBig;
