import React, { Fragment } from 'react';
import { SvgXml } from 'react-native-svg';

const Round_Btn_Default_Dark = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.718" height="202.718" viewBox="0 0 202.718 202.718">
    <defs>
      <filter id="teal_circle" x="0" y="0" width="202.718" height="202.718" filterUnits="userSpaceOnUse">
        <feOffset dy="3" input="SourceAlpha"/>
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feFlood flood-opacity="0.239"/>
        <feComposite operator="in" in2="blur"/>
        <feComposite in="SourceGraphic"/>
      </filter>
      <linearGradient id="linear-gradient" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0"/>
        <stop offset="0.14" stop-opacity="0.631"/>
        <stop offset="1" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="0.5" y1="1" x2="0.5" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset="0.23" stop-color="#fff" stop-opacity="0.012"/>
        <stop offset="0.36" stop-color="#fff" stop-opacity="0.039"/>
        <stop offset="0.47" stop-color="#fff" stop-opacity="0.102"/>
        <stop offset="0.57" stop-color="#fff" stop-opacity="0.18"/>
        <stop offset="0.67" stop-color="#fff" stop-opacity="0.278"/>
        <stop offset="0.75" stop-color="#fff" stop-opacity="0.412"/>
        <stop offset="0.83" stop-color="#fff" stop-opacity="0.561"/>
        <stop offset="0.91" stop-color="#fff" stop-opacity="0.741"/>
        <stop offset="0.98" stop-color="#fff" stop-opacity="0.929"/>
        <stop offset="1" stop-color="#fff"/>
      </linearGradient>
    </defs>
    <g id="Round_Btn_Default_Dark" data-name="Round Btn Default Dark" transform="translate(18.084 15.141)">
      <g transform="matrix(1, 0, 0, 1, -18.08, -15.14)" filter="url(#teal_circle)">
        <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill="#133c8b"/>
      </g>
      <g id="ic_add_white" transform="translate(62.916 62.859)">
        <path id="ic_add_white-2" data-name="ic_add_white" d="M3465.679,1003.817h-17.862v17.863h-5.954v-17.863H3424v-5.954h17.862V980h5.954v17.863h17.862Z" transform="translate(-3424 -980)" fill="#fff"/>
      </g>
      <g id="Group_332" data-name="Group 332" transform="translate(0.001)" opacity="0.12">
        <path id="gradient_border_2" data-name="gradient border 2" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient)"/>
        <path id="gradient_border_1" data-name="gradient border 1" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient-2)"/>
      </g>
    </g>
  </svg>
`;

const Drop_Down = `
  <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66">
    <g id="Drop_Down" data-name="Drop Down" transform="translate(0.08 0.479)">
      <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(-0.08 -0.479)" fill="#fff" stroke="#133c8b" stroke-width="4">
        <circle cx="33" cy="33" r="33" stroke="none"/>
        <circle cx="33" cy="33" r="31" fill="none"/>
      </g>
      <path id="chevron-back-sharp" d="M9.981,0,0,9.981l9.981,9.981" transform="translate(22.233 38.407) rotate(-90)" fill="none" stroke="#133c8b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
    </g>
  </svg>
`;

const Person_Sharp = `
  <svg xmlns="http://www.w3.org/2000/svg" width="29.191" height="31.437" viewBox="0 0 29.191 31.437">
    <path id="person-sharp" d="M17.971,17.968a7.859,7.859,0,1,0-7.859-7.859A7.859,7.859,0,0,0,17.971,17.968Zm0,2.245c-4.871,0-14.6,3.009-14.6,8.982v4.491H32.566V29.2C32.566,23.223,22.842,20.214,17.971,20.214Z" transform="translate(-3.375 -2.25)" fill="#133c8b"/>
  </svg>
`;

const Person_Sharp_White = `
  <svg xmlns="http://www.w3.org/2000/svg" width="29.191" height="31.437" viewBox="0 0 29.191 31.437">
    <path id="person-sharp" d="M17.971,17.968a7.859,7.859,0,1,0-7.859-7.859A7.859,7.859,0,0,0,17.971,17.968Zm0,2.245c-4.871,0-14.6,3.009-14.6,8.982v4.491H32.566V29.2C32.566,23.223,22.842,20.214,17.971,20.214Z" transform="translate(-3.375 -2.25)" fill="#fff"/>
  </svg>
`;

const Camera = `
  <svg id="camera" xmlns="http://www.w3.org/2000/svg" width="47.214" height="37.097" viewBox="0 0 47.214 37.097">
    <path id="Path_3947" data-name="Path 3947" d="M26.99,21.37a6.745,6.745,0,1,1-6.745-6.745A6.745,6.745,0,0,1,26.99,21.37Z" transform="translate(3.364 -1.135)" fill="#133c8b"/>
    <path id="Path_3948" data-name="Path 3948" d="M44.406,12.37H38.189a1.533,1.533,0,0,1-1.013-.528L34.442,7.527a1.635,1.635,0,0,0-.144-.195A4.705,4.705,0,0,0,30.7,5.625h-9.7a4.7,4.7,0,0,0-3.591,1.709,1.636,1.636,0,0,0-.144.195L14.54,11.85a1.38,1.38,0,0,1-.908.528v-.844a1.686,1.686,0,0,0-1.686-1.686H9.415a1.686,1.686,0,0,0-1.686,1.686v.844H7.308a5.065,5.065,0,0,0-5.059,5.059V37.663a5.065,5.065,0,0,0,5.059,5.059H44.4a5.065,5.065,0,0,0,5.059-5.059V17.429A5.065,5.065,0,0,0,44.4,12.37ZM25.858,35.977A10.117,10.117,0,1,1,35.975,25.86,10.117,10.117,0,0,1,25.858,35.977Z" transform="translate(-2.249 -5.625)" fill="#133c8b"/>
  </svg>
`;

const ChatBoxes = `
  <svg id="chatboxes" xmlns="http://www.w3.org/2000/svg" width="47.711" height="47.711" viewBox="0 0 47.711 47.711">
    <path id="Path_3958" data-name="Path 3958" d="M31.6,33a3.209,3.209,0,0,0-2.006-.515H16.277c-3.98,0-7.4-2.993-7.4-6.791V14.133H8.673a5.211,5.211,0,0,0-5.3,5.218V34.134c0,2.868,2.455,4.657,5.471,4.657h1.869V44.3l6.091-5.161a2.432,2.432,0,0,1,1.514-.344h10.3c2.638,0,5.437-1.308,5.952-3.67L31.6,33Z" transform="translate(-3.375 3.415)" fill="#133c8b"/>
    <path id="Path_3959" data-name="Path 3959" d="M40.31,3.375H15.388C11.409,3.375,9,6.448,9,10.234v19.29a7.04,7.04,0,0,0,7.192,6.882h11.6a3.147,3.147,0,0,1,2.006.481l8.567,6.859v-7.34H40.31a7.06,7.06,0,0,0,7.226-6.87v-19.3A7.052,7.052,0,0,0,40.31,3.375Z" transform="translate(0.175 -3.375)" fill="#133c8b"/>
  </svg>
`;

const Exclamation_Triangle_Fill = `
<svg id="exclamation-triangle-fill" xmlns="http://www.w3.org/2000/svg" width="47.452" height="41.517" viewBox="0 0 47.452 41.517">
  <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)"
    fill="#133c8b" stroke="none">
    <path d="M206 398 c-22 -36 -182 -311 -195 -335 -6 -12 -8 -29 -5 -37 6 -14
    33 -16 233 -14 208 3 226 4 229 21 3 16 -171 328 -206 370 -20 23 -39 22 -56
    -5z m54 -160 c0 -105 -33 -121 -45 -23 -9 65 -3 85 25 85 18 0 20 -6 20 -62z
    m7 -134 c8 -21 -19 -46 -40 -38 -17 6 -23 35 -10 47 12 13 44 7 50 -9z"/>
  </g>
</svg>
`;

const File_Earmark_Text_Fill = `
<svg id="file-earmark-text-fill" xmlns="http://www.w3.org/2000/svg" width="44.442" height="51.849" viewBox="0 0 44.442 51.849">
  <g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)"
    fill="#133c8b" stroke="none">
    <path d="M25 495 c-25 -24 -25 -25 -25 -233 0 -277 -17 -256 212 -260 165 -3
      175 -2 201 18 l27 21 0 163 0 163 -79 76 -79 77 -116 0 c-111 0 -118 -1 -141
      -25z m375 -157 c0 -12 -98 -10 -121 2 -16 9 -19 22 -19 78 l0 66 70 -69 c39
      -38 70 -73 70 -77z m-32 -95 c-3 -16 -19 -18 -142 -21 -78 -1 -144 2 -149 7
      -24 24 9 31 149 31 133 0 145 -1 142 -17z m0 -75 c3 -17 -9 -18 -142 -18 -86
      0 -147 4 -151 10 -16 25 11 30 148 28 126 -3 142 -5 145 -20z m-110 -75 c-3
      -15 -16 -18 -82 -21 -75 -3 -113 8 -100 29 3 5 46 9 95 9 81 0 90 -2 87 -17z"/>
    </g>
  </svg>
`;

const Sale = `
  <svg xmlns="http://www.w3.org/2000/svg" width="55.072" height="55.072" viewBox="0 0 55.072 55.072">
    <path id="sale" d="M48.188,27.536l6.884,6.884-8.6,3.442,1.721,10.326L37.862,46.467l-3.442,8.6-6.884-6.884-6.884,6.884-3.442-8.6L6.884,48.188,8.6,37.862,0,34.42l6.884-6.884L0,20.652,8.6,17.21,6.884,6.884,17.21,8.6,20.652,0l6.884,6.884L34.42,0l3.442,8.6L48.188,6.884,46.467,17.21l8.6,3.442ZM18.931,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0,7.919,7.919,0,0,0,1.505-4.868,7.893,7.893,0,0,0-1.505-4.868,4.451,4.451,0,0,0-3.658-2.016Zm17.21,0H34.42a1.01,1.01,0,0,0-.4.081q-.188.081-.3.135a1.1,1.1,0,0,0-.3.3q-.188.242-.242.323t-.242.43q-.188.349-.242.457L17.479,39.583a.889.889,0,0,0,.161,1.183,1.766,1.766,0,0,0,1.291.538h1.721a1.808,1.808,0,0,0,.35-.028.856.856,0,0,0,.3-.135,1.632,1.632,0,0,0,.242-.188,1.831,1.831,0,0,0,.216-.3q.135-.214.188-.323t.216-.376q.162-.268.216-.376l15.22-24.094a.889.889,0,0,0-.161-1.183,1.766,1.766,0,0,0-1.291-.538Zm0,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0A7.919,7.919,0,0,0,41.3,34.42,7.893,7.893,0,0,0,39.8,29.552,4.451,4.451,0,0,0,36.141,27.536Zm0,10.326q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q36.84,37.862,36.141,37.862ZM18.931,24.094q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q19.63,24.094,18.931,24.094Z" fill="#133c8b"/>
  </svg>
`;

const Geo = `
  <svg id="geo" xmlns="http://www.w3.org/2000/svg" width="31.797" height="51.227" viewBox="0 0 31.797 51.227">
    <path id="Path_3961" data-name="Path 3961" d="M32.448,12.849a10.6,10.6,0,1,1-10.6-10.6A10.6,10.6,0,0,1,32.448,12.849Z" transform="translate(-5.949 -2.25)" fill="#133c8b"/>
    <path id="Path_3962" data-name="Path 3962" d="M16.875,9h3.533V40.8a1.766,1.766,0,1,1-3.533,0Z" transform="translate(-2.741 1.599)" fill="#133c8b"/>
    <path id="Path_3963" data-name="Path 3963" d="M18.435,27.724a1.766,1.766,0,0,1-1.354,2.1,14.5,14.5,0,0,0-4.543,1.668c-1.066.678-1.131,1.134-1.131,1.2,0,.046.017.3.515.741A8.027,8.027,0,0,0,14.4,34.78a27.786,27.786,0,0,0,9.373,1.441,27.746,27.746,0,0,0,9.373-1.441,8.133,8.133,0,0,0,2.476-1.35c.495-.441.515-.7.515-.741,0-.063-.063-.52-1.131-1.2a14.44,14.44,0,0,0-4.543-1.668,1.766,1.766,0,1,1,.749-3.451,17.886,17.886,0,0,1,5.689,2.14,5.155,5.155,0,0,1,2.77,4.175,4.554,4.554,0,0,1-1.707,3.384,11.339,11.339,0,0,1-3.579,2.013,31.222,31.222,0,0,1-10.613,1.668,31.278,31.278,0,0,1-10.613-1.664,11.421,11.421,0,0,1-3.579-2.018,4.559,4.559,0,0,1-1.707-3.384,5.159,5.159,0,0,1,2.767-4.175,17.779,17.779,0,0,1,5.692-2.14,1.767,1.767,0,0,1,2.1,1.354Z" transform="translate(-7.874 11.475)" fill="#133c8b"/>
  </svg>
`;

const Filter = `
  <svg xmlns="http://www.w3.org/2000/svg" width="97" height="98" viewBox="0 0 97 98">
    <g id="Filter" transform="translate(-0.476 -0.227)">
      <rect id="Rectangle_1646" data-name="Rectangle 1646" width="97" height="98" rx="7" transform="translate(0.476 0.227)" fill="#133c8b"/>
      <g id="options" transform="translate(24.074 28.749)">
        <path id="Path_570" data-name="Path 570" d="M14.64,4.5a10.145,10.145,0,0,1,9.82,7.6H54.572v5.07H24.461A10.141,10.141,0,1,1,14.64,4.5Zm0,15.21a5.07,5.07,0,1,0-5.07-5.07A5.07,5.07,0,0,0,14.64,19.71Z" transform="translate(-4.5 -4.5)" fill="#fff"/>
        <path id="Path_571" data-name="Path 571" d="M44.432,38.27a10.145,10.145,0,0,1-9.82-7.6H4.5V25.6H34.612A10.141,10.141,0,1,1,44.432,38.27Zm0-5.07a5.07,5.07,0,1,0-5.07-5.07A5.07,5.07,0,0,0,44.432,33.2Z" transform="translate(-4.5 4.825)" fill="#fff"/>
      </g>
    </g>
  </svg>
`;

const Insert_Invitation = `
  <svg id="insert_invitation_black_24dp" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <path id="Path_3979" data-name="Path 3979" d="M0,0H30V30H0Z" fill="none"/>
    <path id="Path_3980" data-name="Path 3980" d="M23,3.5H21.75V1h-2.5V3.5h-10V1H6.75V3.5H5.5A2.489,2.489,0,0,0,3.013,6L3,23.5A2.5,2.5,0,0,0,5.5,26H23a2.507,2.507,0,0,0,2.5-2.5V6A2.507,2.507,0,0,0,23,3.5Zm0,20H5.5V11H23Zm0-15H5.5V6H23Zm-2.5,6.25H14.25V21H20.5Z" transform="translate(0.75 0.25)" fill="#fff"/>
  </svg>
`;

const Green_Star = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="87" viewBox="0 0 86 87">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2617" data-name="Rectangle 2617" width="86" height="87" transform="translate(0.135 -0.131)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Green_Star" data-name="Green Star" transform="translate(-0.135 0.131)">
      <g id="Group_4581" data-name="Group 4581" clip-path="url(#clip-path)">
        <path id="Path_4367" data-name="Path 4367" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#0ad10a"/>
        <path id="Path_4368" data-name="Path 4368" d="M46.631,28.274l2,4.724.969,2.29,2.476.207,5.1.433L53.294,39.29l-1.877,1.63.557,2.434,1.155,4.972-4.374-2.641-2.125-1.32-2.125,1.279-4.373,2.641,1.155-4.971.557-2.435-1.877-1.629-3.878-3.363,5.095-.433,2.476-.207.97-2.29,2-4.682M45.312,20.8,41.17,30.573a1.431,1.431,0,0,1-1.2.868l-10.591.9a1.431,1.431,0,0,0-.816,2.509l8.045,6.97a1.429,1.429,0,0,1,.457,1.407L34.652,53.583a1.432,1.432,0,0,0,2.135,1.551l9.1-5.5a1.434,1.434,0,0,1,1.48,0l9.1,5.5a1.432,1.432,0,0,0,2.134-1.551L56.193,43.226a1.431,1.431,0,0,1,.457-1.407l8.046-6.97a1.432,1.432,0,0,0-.817-2.509l-10.59-.9a1.434,1.434,0,0,1-1.2-.868L47.949,20.8a1.432,1.432,0,0,0-2.636,0" transform="translate(-3.798 -2.696)" fill="#fff"/>
      </g>
    </g>
  </svg>
`;

const Home_Black_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="home_black_24dp_1_" data-name="home_black_24dp (1)" transform="translate(-6.946 -6.947)">
      <path id="Path_3985" data-name="Path 3985" d="M0,0H69.466V69.466H0Z" transform="translate(6.946 6.946)" fill="none"/>
      <path id="Path_3986" data-name="Path 3986" d="M29.786,62.046V41.206H43.679v20.84H61.046V34.259h10.42L36.733,3,2,34.259H12.42V62.046Z" transform="translate(4.947 7.42)" fill="#b8b8b8"/>
    </g>
  </svg>
`;

const Home_Black = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="home_black_24dp_1_" data-name="home_black_24dp (1)" transform="translate(-6.946 -6.947)">
      <path id="Path_3985" data-name="Path 3985" d="M0,0H69.466V69.466H0Z" transform="translate(6.946 6.946)" fill="none"/>
      <path id="Path_3986" data-name="Path 3986" d="M29.786,62.046V41.206H43.679v20.84H61.046V34.259h10.42L36.733,3,2,34.259H12.42V62.046Z" transform="translate(4.947 7.42)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Android_More_Horizontal_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4802" data-name="Group 4802" transform="translate(1113 -2665)">
      <g id="Dots" transform="translate(-11 6)">
        <circle id="Ellipse_3" data-name="Ellipse 3" cx="8.5" cy="8.5" r="8.5" transform="translate(-1101 2685)" fill="#b8b8b8"/>
        <circle id="Ellipse_4" data-name="Ellipse 4" cx="8.5" cy="8.5" r="8.5" transform="translate(-1076 2685)" fill="#b8b8b8"/>
        <circle id="Ellipse_5" data-name="Ellipse 5" cx="8.5" cy="8.5" r="8.5" transform="translate(-1051 2685)" fill="#b8b8b8"/>
      </g>
      <path id="Path_4388" data-name="Path 4388" d="M0,0H69.466V69.466H0Z" transform="translate(-1113 2665)" fill="none"/>
    </g>
  </svg>
`;

const Android_More_Horizontal = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4802" data-name="Group 4802" transform="translate(1113 -2665)">
      <g id="Dots" transform="translate(-11 6)">
        <circle id="Ellipse_3" data-name="Ellipse 3" cx="8.5" cy="8.5" r="8.5" transform="translate(-1101 2685)" fill="#133c8b"/>
        <circle id="Ellipse_4" data-name="Ellipse 4" cx="8.5" cy="8.5" r="8.5" transform="translate(-1076 2685)" fill="#133c8b"/>
        <circle id="Ellipse_5" data-name="Ellipse 5" cx="8.5" cy="8.5" r="8.5" transform="translate(-1051 2685)" fill="#133c8b"/>
      </g>
      <path id="Path_4388" data-name="Path 4388" d="M0,0H69.466V69.466H0Z" transform="translate(-1113 2665)" fill="none"/>
    </g>
  </svg>
`;

const Calendar_Event_Fill_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4800" data-name="Group 4800" transform="translate(1526 -2662)">
      <g id="calendar-event-fill" transform="translate(-1519.914 2668.086)">
        <path id="Path_3942" data-name="Path 3942" d="M14.342,1.793a1.793,1.793,0,1,0-3.586,0V3.586H7.171A7.171,7.171,0,0,0,0,10.757v3.586H57.37V10.757A7.171,7.171,0,0,0,50.2,3.586H46.613V1.793a1.793,1.793,0,1,0-3.586,0V3.586H14.342ZM0,17.928H57.37V50.2A7.171,7.171,0,0,1,50.2,57.37H7.171A7.171,7.171,0,0,1,0,50.2ZM44.82,25.1a1.793,1.793,0,0,0-1.793,1.793v3.586a1.793,1.793,0,0,0,1.793,1.793h3.586A1.793,1.793,0,0,0,50.2,30.478V26.892A1.793,1.793,0,0,0,48.406,25.1Z" transform="translate(0)" fill="#b8b8b8"/>
      </g>
      <path id="Path_4386" data-name="Path 4386" d="M0,0H69.466V69.466H0Z" transform="translate(-1526 2662)" fill="none"/>
    </g>
  </svg>
`;

const Calendar_Event_Fill = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4800" data-name="Group 4800" transform="translate(1526 -2662)">
      <g id="calendar-event-fill" transform="translate(-1519.914 2668.086)">
        <path id="Path_3942" data-name="Path 3942" d="M14.342,1.793a1.793,1.793,0,1,0-3.586,0V3.586H7.171A7.171,7.171,0,0,0,0,10.757v3.586H57.37V10.757A7.171,7.171,0,0,0,50.2,3.586H46.613V1.793a1.793,1.793,0,1,0-3.586,0V3.586H14.342ZM0,17.928H57.37V50.2A7.171,7.171,0,0,1,50.2,57.37H7.171A7.171,7.171,0,0,1,0,50.2ZM44.82,25.1a1.793,1.793,0,0,0-1.793,1.793v3.586a1.793,1.793,0,0,0,1.793,1.793h3.586A1.793,1.793,0,0,0,50.2,30.478V26.892A1.793,1.793,0,0,0,48.406,25.1Z" transform="translate(0)" fill="#133c8b"/>
      </g>
      <path id="Path_4386" data-name="Path 4386" d="M0,0H69.466V69.466H0Z" transform="translate(-1526 2662)" fill="none"/>
    </g>
  </svg>
`;

const Pipeline_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4801" data-name="Group 4801" transform="translate(1299 -2661)">
      <g id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" transform="translate(-1307.893 2652.214)">
        <path id="Path_4220" data-name="Path 4220" d="M28.417,49.572H42.941V42.31H28.417ZM3,6v7.262H68.357V6ZM13.893,31.417H57.464V24.155H13.893Z" transform="translate(7.893 15.786)" fill="#9d9fa2"/>
      </g>
      <path id="Path_4387" data-name="Path 4387" d="M0,0H69.466V69.466H0Z" transform="translate(-1299 2661)" fill="none"/>
    </g>
  </svg>
`;

const Pipeline = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4801" data-name="Group 4801" transform="translate(1299 -2661)">
      <g id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" transform="translate(-1307.893 2652.214)">
        <path id="Path_4220" data-name="Path 4220" d="M28.417,49.572H42.941V42.31H28.417ZM3,6v7.262H68.357V6ZM13.893,31.417H57.464V24.155H13.893Z" transform="translate(7.893 15.786)" fill="#133c8b"/>
      </g>
      <path id="Path_4387" data-name="Path 4387" d="M0,0H69.466V69.466H0Z" transform="translate(-1299 2661)" fill="none"/>
    </g>
  </svg>
`;

const Travel_Explore_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
    <g id="travel_explore_black_24dp" transform="translate(0 0.167)">
      <rect id="Rectangle_2834" data-name="Rectangle 2834" width="71" height="71" transform="translate(0 -0.167)" fill="none"/>
      <path id="Path_4401" data-name="Path 4401" d="M52.772,45.729a14.13,14.13,0,0,0,2.054-7.044A13.207,13.207,0,1,0,41.62,51.892a14.13,14.13,0,0,0,7.044-2.054l9.391,9.391,4.109-4.109Zm-11.152.293a7.337,7.337,0,1,1,7.337-7.337A7.266,7.266,0,0,1,41.62,46.022Zm-10.272,8.8V60.7A29.348,29.348,0,1,1,60.109,25.478H54.034A23.478,23.478,0,0,0,40.152,9.6v1.2a5.887,5.887,0,0,1-5.87,5.87h-5.87v5.87a2.943,2.943,0,0,1-2.935,2.935h-5.87v5.87h5.87v8.8H22.544L8.486,26.095a23.824,23.824,0,0,0-.616,5.253A23.51,23.51,0,0,0,31.348,54.826Z" transform="translate(3.503 3.934)" fill="#b8b8b8"/>
    </g>
  </svg>
`;

const Travel_Explore = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
    <g id="travel_explore_black_24dp" transform="translate(0 0.167)">
      <rect id="Rectangle_2834" data-name="Rectangle 2834" width="71" height="71" transform="translate(0 -0.167)" fill="none"/>
      <path id="Path_4401" data-name="Path 4401" d="M52.772,45.729a14.13,14.13,0,0,0,2.054-7.044A13.207,13.207,0,1,0,41.62,51.892a14.13,14.13,0,0,0,7.044-2.054l9.391,9.391,4.109-4.109Zm-11.152.293a7.337,7.337,0,1,1,7.337-7.337A7.266,7.266,0,0,1,41.62,46.022Zm-10.272,8.8V60.7A29.348,29.348,0,1,1,60.109,25.478H54.034A23.478,23.478,0,0,0,40.152,9.6v1.2a5.887,5.887,0,0,1-5.87,5.87h-5.87v5.87a2.943,2.943,0,0,1-2.935,2.935h-5.87v5.87h5.87v8.8H22.544L8.486,26.095a23.824,23.824,0,0,0-.616,5.253A23.51,23.51,0,0,0,31.348,54.826Z" transform="translate(3.503 3.934)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Ballot_Gray = `
  <svg id="ballot_black_24dp" xmlns="http://www.w3.org/2000/svg" width="70.435" height="70.435" viewBox="0 0 70.435 70.435">
    <path id="Path_4394" data-name="Path 4394" d="M0,0H70.435V70.435H0Z" fill="none"/>
    <path id="Path_4395" data-name="Path 4395" d="M32.348,16.207H47.022v5.87H32.348Zm0,20.544H47.022v5.87H32.348ZM49.957,3H8.87A5.887,5.887,0,0,0,3,8.87V49.957a5.887,5.887,0,0,0,5.87,5.87H49.957a5.887,5.887,0,0,0,5.87-5.87V8.87A5.887,5.887,0,0,0,49.957,3Zm0,46.957H8.87V8.87H49.957ZM26.478,11.8H11.8V26.478H26.478ZM23.544,23.544h-8.8v-8.8h8.8Zm2.935,8.8H11.8V47.022H26.478ZM23.544,44.087h-8.8v-8.8h8.8Z" transform="translate(5.804 5.804)" fill="#b8b8b8"/>
  </svg>
`;

const Ballot = `
  <svg id="ballot_black_24dp" xmlns="http://www.w3.org/2000/svg" width="80.202" height="80.202" viewBox="0 0 80.202 80.202">
    <path id="Path_4394" data-name="Path 4394" d="M0,0H80.2V80.2H0Z" fill="none"/>
    <path id="Path_4395" data-name="Path 4395" d="M36.417,18.038H53.126v6.683H36.417Zm0,23.392H53.126v6.683H36.417ZM56.468,3H9.683A6.7,6.7,0,0,0,3,9.683V56.468a6.7,6.7,0,0,0,6.683,6.683H56.468a6.7,6.7,0,0,0,6.683-6.683V9.683A6.7,6.7,0,0,0,56.468,3Zm0,53.468H9.683V9.683H56.468ZM29.734,13.025H13.025V29.734H29.734ZM26.392,26.392H16.367V16.367H26.392Zm3.342,10.025H13.025V53.126H29.734ZM26.392,49.784H16.367V39.759H26.392Z" transform="translate(7.025 7.025)" fill="#133c8b"/>
  </svg>
`;

const Location_Arrow_White = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill="#fff"/>
  </svg>
`;

const Location_Arrow_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill="#b8b8b8"/>
  </svg>
`;

const Location_Arrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill="#133c8b"/>
  </svg>
`;

const Check = `
  <svg id="done_black_24dp_7_" data-name="done_black_24dp (7)" xmlns="http://www.w3.org/2000/svg" width="68.645" height="68.645" viewBox="0 0 68.645 68.645">
    <path id="Path_5308" data-name="Path 5308" d="M0,0H68.645V68.645H0Z" fill="none"/>
    <path id="Path_5309" data-name="Path 5309" d="M19.417,35.918,7.4,23.905l-4,4L19.417,43.927,53.739,9.6l-4-4Z" transform="translate(6.325 10.417)" fill="#133c8b"/>
  </svg>
`;

const Close = `
  <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59">
    <g id="Group_4932" data-name="Group 4932" transform="translate(-905 -158)">
      <g id="Ellipse_132" data-name="Ellipse 132" transform="translate(905 158)" fill="#fff" stroke="#23282d" stroke-width="4">
        <circle cx="29.5" cy="29.5" r="29.5" stroke="none"/>
        <circle cx="29.5" cy="29.5" r="27.5" fill="none"/>
      </g>
      <g id="close_black_24dp_2_" data-name="close_black_24dp (2)" transform="translate(909.535 162.535)">
        <path id="Path_5282" data-name="Path 5282" d="M0,0H49.931V49.931H0Z" fill="none"/>
        <path id="Path_5283" data-name="Path 5283" d="M34.126,7.933,31.193,5,19.563,16.63,7.933,5,5,7.933l11.63,11.63L5,31.193l2.933,2.933L19.563,22.5l11.63,11.63,2.933-2.933L22.5,19.563Z" transform="translate(5.402 5.402)" fill="#23282d"/>
      </g>
    </g>
  </svg>
`;

const Account_Circle = `
  <svg id="account_circle_black_24dp_2_" data-name="account_circle_black_24dp (2)" xmlns="http://www.w3.org/2000/svg" width="70.435" height="70.436" viewBox="0 0 70.435 70.436">
    <path id="Path_4402" data-name="Path 4402" d="M0,0H70.435V70.436H0Z" fill="none"/>
    <path id="Path_4403" data-name="Path 4403" d="M31.348,2A29.348,29.348,0,1,0,60.7,31.348,29.359,29.359,0,0,0,31.348,2ZM16.879,49.779c1.262-2.641,8.951-5.224,14.469-5.224s13.236,2.583,14.469,5.224a23.259,23.259,0,0,1-28.937,0Zm33.134-4.255c-4.2-5.107-14.381-6.838-18.665-6.838s-14.469,1.732-18.665,6.838a23.479,23.479,0,1,1,37.331,0ZM31.348,13.739A10.272,10.272,0,1,0,41.62,24.011,10.246,10.246,0,0,0,31.348,13.739Zm0,14.674a4.4,4.4,0,1,1,4.4-4.4A4.4,4.4,0,0,1,31.348,28.413Z" transform="translate(3.87 3.87)" fill="#133c8b"/>
  </svg>
`;

const Cloud_Off = `
  <svg xmlns="http://www.w3.org/2000/svg" width="70.435" height="70.435" viewBox="0 0 70.435 70.435">
    <g id="cloud_off_black_24dp" transform="translate(-0.001)">
      <path id="Path_4396" data-name="Path 4396" d="M0,0H70.435V70.435H0Z" transform="translate(0.001)" fill="none"/>
      <path id="Path_4397" data-name="Path 4397" d="M70.435,36.554A14.6,14.6,0,0,0,56.788,22,21.981,21.981,0,0,0,35.218,4.271,21.7,21.7,0,0,0,24.506,7.118l4.373,4.373a15.836,15.836,0,0,1,6.339-1.35A16.132,16.132,0,0,1,51.359,26.282v1.467h4.4A8.79,8.79,0,0,1,61.014,43.6l4.138,4.138A14.576,14.576,0,0,0,70.435,36.554ZM12.942,3.86,8.8,8l8.129,8.129H15.7a17.6,17.6,0,0,0,1.908,35.1H52.034L57.9,57.1l4.138-4.138Zm4.666,41.5a11.739,11.739,0,0,1,0-23.478h5.077L46.164,45.358Z" transform="translate(0.001 7.468)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Support_Agent_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="70" viewBox="0 0 71 70">
    <g id="support_agent_black_24dp" transform="translate(0 -0.198)">
      <g id="Group_4808" data-name="Group 4808" transform="translate(0 0)">
        <rect id="Rectangle_2833" data-name="Rectangle 2833" width="71" height="70" transform="translate(0 0.198)" fill="none"/>
      </g>
      <g id="Group_4810" data-name="Group 4810" transform="translate(6.046 8.869)">
        <g id="Group_4809" data-name="Group 4809">
          <path id="Path_4399" data-name="Path 4399" d="M57.761,30.059C57.761,13.947,45.259,3,31.348,3,17.584,3,4.935,13.712,4.935,30.235A5.775,5.775,0,0,0,2,35.283v5.87a5.887,5.887,0,0,0,5.87,5.87H10.8V29.12a20.544,20.544,0,1,1,41.087,0V49.957H28.413v5.87H51.892a5.887,5.887,0,0,0,5.87-5.87v-3.58A5.426,5.426,0,0,0,60.7,41.563v-6.75A5.4,5.4,0,0,0,57.761,30.059Z" transform="translate(-2 -3)" fill="#b8b8b8"/>
          <ellipse id="Ellipse_129" data-name="Ellipse 129" cx="3.5" cy="3" rx="3.5" ry="3" transform="translate(16.955 26.33)" fill="#b8b8b8"/>
          <ellipse id="Ellipse_130" data-name="Ellipse 130" cx="2.5" cy="3" rx="2.5" ry="3" transform="translate(35.955 26.33)" fill="#b8b8b8"/>
          <path id="Path_4400" data-name="Path 4400" d="M41.207,20.762A17.729,17.729,0,0,0,23.745,6c-8.892,0-18.46,7.366-17.7,18.929A23.7,23.7,0,0,0,20.311,7.643,23.587,23.587,0,0,0,41.207,20.762Z" transform="translate(5.75 2.804)" fill="#b8b8b8"/>
        </g>
      </g>
    </g>
  </svg>
`;

const Support_Agent = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="70" viewBox="0 0 71 70">
    <g id="support_agent_black_24dp" transform="translate(0 -0.198)">
      <g id="Group_4808" data-name="Group 4808" transform="translate(0 0)">
        <rect id="Rectangle_2833" data-name="Rectangle 2833" width="71" height="70" transform="translate(0 0.198)" fill="none"/>
      </g>
      <g id="Group_4810" data-name="Group 4810" transform="translate(6.046 8.869)">
        <g id="Group_4809" data-name="Group 4809">
          <path id="Path_4399" data-name="Path 4399" d="M57.761,30.059C57.761,13.947,45.259,3,31.348,3,17.584,3,4.935,13.712,4.935,30.235A5.775,5.775,0,0,0,2,35.283v5.87a5.887,5.887,0,0,0,5.87,5.87H10.8V29.12a20.544,20.544,0,1,1,41.087,0V49.957H28.413v5.87H51.892a5.887,5.887,0,0,0,5.87-5.87v-3.58A5.426,5.426,0,0,0,60.7,41.563v-6.75A5.4,5.4,0,0,0,57.761,30.059Z" transform="translate(-2 -3)" fill="#133c8b"/>
          <ellipse id="Ellipse_129" data-name="Ellipse 129" cx="3.5" cy="3" rx="3.5" ry="3" transform="translate(16.955 26.33)" fill="#133c8b"/>
          <ellipse id="Ellipse_130" data-name="Ellipse 130" cx="2.5" cy="3" rx="2.5" ry="3" transform="translate(35.955 26.33)" fill="#133c8b"/>
          <path id="Path_4400" data-name="Path 4400" d="M41.207,20.762A17.729,17.729,0,0,0,23.745,6c-8.892,0-18.46,7.366-17.7,18.929A23.7,23.7,0,0,0,20.311,7.643,23.587,23.587,0,0,0,41.207,20.762Z" transform="translate(5.75 2.804)" fill="#133c8b"/>
        </g>
      </g>
    </g>
  </svg>
`;

const Angle_Left = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32.311" height="61.743" viewBox="0 0 32.311 61.743">
    <path id="angle-down" d="M61.743,4.607a1.675,1.675,0,0,1-.618,1.277L32.295,31.756a2.1,2.1,0,0,1-2.846,0L.618,5.885a1.629,1.629,0,0,1,0-2.554L3.711.555a2.1,2.1,0,0,1,2.846,0L30.871,22.374,55.185.555a2.1,2.1,0,0,1,2.846,0L61.124,3.33A1.675,1.675,0,0,1,61.743,4.607Z" transform="translate(0 61.743) rotate(-90)" fill="#133c8b"/>
  </svg>
`;

const Description = `
  <svg xmlns="http://www.w3.org/2000/svg" width="76.132" height="76.133" viewBox="0 0 76.132 76.133">
    <g id="description_black_24dp_2_" data-name="description_black_24dp (2)" transform="translate(0 0)">
      <path id="Path_4109" data-name="Path 4109" d="M0,0H76.132V76.133H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4110" data-name="Path 4110" d="M16.689,46.411H42.066v6.344H16.689Zm0-12.689H42.066v6.344H16.689ZM35.722,2H10.344A6.363,6.363,0,0,0,4,8.344V59.1a6.336,6.336,0,0,0,6.313,6.344h38.1A6.363,6.363,0,0,0,54.755,59.1V21.033ZM48.41,59.1H10.344V8.344H32.55V24.205H48.41Z" transform="translate(8.689 4.344)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Wallpaper = `
  <svg xmlns="http://www.w3.org/2000/svg" width="76.132" height="76.133" viewBox="0 0 76.132 76.133">
    <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(0 0)">
      <path id="Path_4107" data-name="Path 4107" d="M0,0H76.132V76.133H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4108" data-name="Path 4108" d="M8.344,8.344H30.55V2H8.344A6.363,6.363,0,0,0,2,8.344V30.55H8.344Zm19.033,28.55L14.689,52.755H52.755L43.238,40.066l-6.44,8.6ZM49.583,22.619a4.758,4.758,0,1,0-4.758,4.758A4.752,4.752,0,0,0,49.583,22.619ZM59.1,2H36.894V8.344H59.1V30.55h6.344V8.344A6.363,6.363,0,0,0,59.1,2Zm0,57.1H36.894v6.344H59.1A6.363,6.363,0,0,0,65.443,59.1V36.894H59.1ZM8.344,36.894H2V59.1a6.363,6.363,0,0,0,6.344,6.344H30.55V59.1H8.344Z" transform="translate(4.344 4.344)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Video_Library = `
  <svg xmlns="http://www.w3.org/2000/svg" width="73.289" height="73.289" viewBox="0 0 73.289 73.289">
    <g id="video_library_black_24dp" transform="translate(0 0)">
      <path id="Path_4111" data-name="Path 4111" d="M0,0H73.289V73.289H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4112" data-name="Path 4112" d="M8.107,14.215H2V56.967a6.125,6.125,0,0,0,6.107,6.107H50.859V56.967H8.107ZM56.967,2H20.322a6.125,6.125,0,0,0-6.107,6.107V44.752a6.125,6.125,0,0,0,6.107,6.107H56.967a6.125,6.125,0,0,0,6.107-6.107V8.107A6.125,6.125,0,0,0,56.967,2Zm0,42.752H20.322V8.107H56.967ZM32.537,12.688V40.171L50.859,26.43Z" transform="translate(4.107 4.108)" fill="#133c8b"/>
    </g>
  </svg>
`;

const Path = `
  <svg xmlns="http://www.w3.org/2000/svg" width="66.904" height="84.171" viewBox="0 0 66.904 84.171">
    <path id="Path_4114" data-name="Path 4114" d="M83.211,41.452A33.452,33.452,0,1,0,24.272,63.088l-.011,0,.13.148c.076.088.154.175.23.262L49.789,92.171l25.172-28.75.158-.18.137-.157-.011,0A33.3,33.3,0,0,0,83.211,41.452ZM49.759,59.311A17.859,17.859,0,1,1,67.618,41.452,17.879,17.879,0,0,1,49.759,59.311Z" transform="translate(-16.307 -8)" fill="#143f76"/>
  </svg>
`;

const Contact_Mail = `
  <svg id="contact_mail_black_24dp_1_" data-name="contact_mail_black_24dp (1)" xmlns="http://www.w3.org/2000/svg" width="65.682" height="65.682" viewBox="0 0 65.682 65.682">
    <path id="Path_5312" data-name="Path 5312" d="M0,0H65.682V65.682H0Z" fill="none"/>
    <path id="Path_5313" data-name="Path 5313" d="M60.208,3H5.473A5.49,5.49,0,0,0,0,8.473V46.788a5.49,5.49,0,0,0,5.473,5.473H60.208a5.466,5.466,0,0,0,5.446-5.473l.027-38.314A5.49,5.49,0,0,0,60.208,3Zm0,43.788H5.473V8.473H60.208ZM57.471,11.21H38.314V24.894H57.471Zm-2.737,5.473-6.842,4.789-6.842-4.789V13.947l6.842,4.789,6.842-4.789Zm-30.1,10.947a8.21,8.21,0,1,0-8.21-8.21A8.234,8.234,0,0,0,24.631,27.631Zm0-10.947a2.737,2.737,0,1,1-2.737,2.737A2.745,2.745,0,0,1,24.631,16.684Zm16.42,23.509c0-6.842-10.865-9.8-16.42-9.8S8.21,33.35,8.21,40.192v3.859H41.051ZM15,38.578a19.466,19.466,0,0,1,9.633-2.737,19.271,19.271,0,0,1,9.633,2.737Z" transform="translate(0 5.21)" fill="#133c8b"/>
  </svg>
`;

const WhatsApp = `
  <svg xmlns="http://www.w3.org/2000/svg" width="63.994" height="64" viewBox="0 0 63.994 64">
    <path id="icons8-whatsapp" d="M34.037,2a31.966,31.966,0,0,0-27.7,47.925L2,66l16.744-3.956a31.94,31.94,0,0,0,15.275,3.887h.012A31.966,31.966,0,1,0,34.037,2Zm-.006,6.4A25.566,25.566,0,1,1,21.813,56.425L19.656,55.25l-2.381.563-6.3,1.488,1.538-5.713.694-2.563-1.325-2.3A25.564,25.564,0,0,1,34.031,8.4ZM22.725,19.2a2.934,2.934,0,0,0-2.131,1,8.931,8.931,0,0,0-2.8,6.656c0,3.93,2.862,7.728,3.262,8.262s5.525,8.85,13.644,12.05c6.745,2.659,8.116,2.134,9.581,2s4.728-1.928,5.394-3.794a6.709,6.709,0,0,0,.469-3.8c-.2-.333-.731-.531-1.531-.931s-4.724-2.328-5.456-2.594-1.269-.4-1.8.4-2.058,2.594-2.525,3.125-.931.606-1.731.206a21.988,21.988,0,0,1-6.425-3.969,24.058,24.058,0,0,1-4.444-5.525c-.464-.8-.044-1.234.356-1.631.358-.358.794-.933,1.194-1.4a5.556,5.556,0,0,0,.8-1.331,1.478,1.478,0,0,0-.068-1.4c-.2-.4-1.752-4.344-2.463-5.925-.6-1.328-1.23-1.359-1.8-1.381C23.786,19.2,23.256,19.2,22.725,19.2Z" transform="translate(-2 -2)" fill="#123a86"/>
  </svg>
`;

const Quiz = `
<svg id="quiz_black_24dp" xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74">
  <g id="Group_4931" data-name="Group 4931">
    <path id="Path_5310" data-name="Path 5310" d="M0,0H74V74H0Z" fill="none"/>
  </g>
  <g id="Group_4932" data-name="Group 4932" transform="translate(6.167 6.167)">
    <path id="Path_5311" data-name="Path 5311" d="M8.167,14.333H2V57.5a6.185,6.185,0,0,0,6.167,6.167H51.333V57.5H8.167ZM57.5,2h-37a6.185,6.185,0,0,0-6.167,6.167v37A6.185,6.185,0,0,0,20.5,51.333h37a6.185,6.185,0,0,0,6.167-6.167v-37A6.185,6.185,0,0,0,57.5,2Zm0,43.167h-37v-37h37ZM37.489,27.16c1.264-2.251,3.638-3.577,5.026-5.55,1.48-2.1.648-5.982-3.515-5.982-2.713,0-4.07,2.066-4.625,3.792l-4.224-1.757a9.189,9.189,0,0,1,8.818-6.413,8.721,8.721,0,0,1,7.739,3.885c1.141,1.85,1.788,5.334.031,7.924-1.942,2.867-3.792,3.731-4.81,5.581-.4.74-.555,1.233-.555,3.638H36.687C36.718,31.014,36.5,28.948,37.489,27.16ZM35.762,38.846A3.192,3.192,0,0,1,39,35.639a3.222,3.222,0,0,1,0,6.444A3.237,3.237,0,0,1,35.762,38.846Z" transform="translate(-2 -2)" fill="#133c8b"/>
  </g>
</svg>
`;

const File_Download = `
  <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
    <g id="file_download_black_24dp_1_" data-name="file_download_black_24dp (1)" transform="translate(0.039 0.158)">
      <g id="Group_4404" data-name="Group 4404" transform="translate(0.119 0)">
        <rect id="Rectangle_2390" data-name="Rectangle 2390" width="57" height="57" transform="translate(-0.158 -0.158)" fill="none"/>
      </g>
      <g id="Group_4405" data-name="Group 4405" transform="translate(8.844 8.715)">
        <path id="Path_4198" data-name="Path 4198" d="M37.715,30.49v7.225H8.816V30.49H4v7.225a4.831,4.831,0,0,0,4.816,4.816h28.9a4.831,4.831,0,0,0,4.816-4.816V30.49Zm-2.408-9.633-3.4-3.4-6.237,6.213V4H20.857V23.675L14.62,17.462l-3.4,3.4L23.266,32.9Z" transform="translate(-4 -4)" fill="#133c8b"/>
      </g>
    </g>
  </svg>
`;

export default ({icon, width = "100%", height = "100%", style={}}) => (
    <Fragment>
        {icon == "Round_Btn_Default_Dark" && <SvgXml style={style} xml={Round_Btn_Default_Dark} width={width} height={height} />}
        {icon == "Drop_Down" && <SvgXml style={style} xml={Drop_Down} width={width} height={height} />}
        {icon == "Person_Sharp" && <SvgXml style={style} xml={Person_Sharp} width={width} height={height} />}
        {icon == "Person_Sharp_White" && <SvgXml style={style} xml={Person_Sharp_White} width={width} height={height} />}
        {icon == "Camera" && <SvgXml style={style} xml={Camera} width={width} height={height} />}
        {icon == "ChatBoxes" && <SvgXml style={style} xml={ChatBoxes} width={width} height={height} />}
        {icon == "Exclamation_Triangle_Fill" && <SvgXml style={style} xml={Exclamation_Triangle_Fill} width={width} height={height} />}
        {icon == "File_Earmark_Text_Fill" && <SvgXml style={style} xml={File_Earmark_Text_Fill} width={width} height={height} />}
        {icon == "Sale" && <SvgXml style={style} xml={Sale} width={width} height={height} />}
        {icon == "Geo" && <SvgXml style={style} xml={Geo} width={width} height={height} />}
        {icon == "Location_Arrow_White" && <SvgXml style={style} xml={Location_Arrow_White} width={width} height={height} />}
        {icon == "Filter" && <SvgXml style={style} xml={Filter} width={width} height={height} />}
        {icon == "Location_Arrow" && <SvgXml style={style} xml={Location_Arrow} width={width} height={height} />}
        {icon == "Location_Arrow_Gray" && <SvgXml style={style} xml={Location_Arrow_Gray} width={width} height={height} />}
        {icon == "Home_Black_Gray" && <SvgXml style={style} xml={Home_Black_Gray} width={width} height={height} />}
        {icon == "Home_Black" && <SvgXml style={style} xml={Home_Black} width={width} height={height} />}
        {icon == "Android_More_Horizontal" && <SvgXml style={style} xml={Android_More_Horizontal} width={width} height={height} />}
        {icon == "Android_More_Horizontal_Gray" && <SvgXml style={style} xml={Android_More_Horizontal_Gray} width={width} height={height} />}
        {icon == "Calendar_Event_Fill_Gray" && <SvgXml style={style} xml={Calendar_Event_Fill_Gray} width={width} height={height} />}
        {icon == "Calendar_Event_Fill" && <SvgXml style={style} xml={Calendar_Event_Fill} width={width} height={height} />}
        {icon == "Pipeline_Gray" && <SvgXml style={style} xml={Pipeline_Gray} width={width} height={height} />}
        {icon == "Pipeline" && <SvgXml style={style} xml={Pipeline} width={width} height={height} />}
        {icon == "Travel_Explore_Gray" && <SvgXml style={style} xml={Travel_Explore_Gray} width={width} height={height} />}
        {icon == "Travel_Explore" && <SvgXml style={style} xml={Travel_Explore} width={width} height={height} />}
        {icon == "Ballot_Gray" && <SvgXml style={style} xml={Ballot_Gray} width={width} height={height} />}
        {icon == "Ballot" && <SvgXml style={style} xml={Ballot} width={width} height={height} />}
        {icon == "Insert_Invitation" && <SvgXml style={style} xml={Insert_Invitation} width={width} height={height} />}
        {icon == "Green_Star" && <SvgXml style={style} xml={Green_Star} width={width} height={height} />}
        {icon == "Check" && <SvgXml style={style} xml={Check} width={width} height={height} />}
        {icon == "Close" && <SvgXml style={style} xml={Close} width={width} height={height} />}
        {icon == "Account_Circle" && <SvgXml style={style} xml={Account_Circle} width={width} height={height} />}
        {icon == "Cloud_Off" && <SvgXml style={style} xml={Cloud_Off} width={width} height={height} />}
        {icon == "Support_Agent" && <SvgXml style={style} xml={Support_Agent} width={width} height={height} />}
        {icon == "Support_Agent_Gray" && <SvgXml style={style} xml={Support_Agent_Gray} width={width} height={height} />}
        {icon == "Angle_Left" && <SvgXml style={style} xml={Angle_Left} width={width} height={height} />}
        {icon == "Description" && <SvgXml style={style} xml={Description} width={width} height={height} />}
        {icon == "Wallpaper" && <SvgXml style={style} xml={Wallpaper} width={width} height={height} />}
        {icon == "Video_Library" && <SvgXml style={style} xml={Video_Library} width={width} height={height} />}
        {icon == "Path" && <SvgXml style={style} xml={Path} width={width} height={height} />}
        {icon == "Contact_Mail" && <SvgXml style={style} xml={Contact_Mail} width={width} height={height} />}
        {icon == "WhatsApp" && <SvgXml style={style} xml={WhatsApp} width={width} height={height} />}
        {icon == "Quiz" && <SvgXml style={style} xml={Quiz} width={width} height={height} />}
        {icon == "File_Download" && <SvgXml style={style} xml={File_Download} width={width} height={height} />}
    </Fragment>
);