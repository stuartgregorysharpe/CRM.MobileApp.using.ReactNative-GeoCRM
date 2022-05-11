import React, {Fragment} from 'react';
import {SvgXml} from 'react-native-svg';
import {whiteLabel} from '../constants/Colors';

const actionIconBackground = whiteLabel().clickButtonBackground;
const actionIconFill = whiteLabel().clickButtonFill;
const actionButtonIconFill = whiteLabel().actionFullButtonIcon;
const navIconActive = whiteLabel().activeIcon;
const navIconInActive = whiteLabel().inactiveIcon;
const selectedIcon = whiteLabel().itemSelectedIconFill;
const actionFullButtonIconFill = whiteLabel().actionFullButtonBackground;
const actionOutlineButtonText = whiteLabel().actionOutlineButtonText;

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
        <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill=${actionIconBackground}/>
      </g>
      <g id="ic_add_white" transform="translate(62.916 62.859)">
        <path id="ic_add_white-2" data-name="ic_add_white" d="M3465.679,1003.817h-17.862v17.863h-5.954v-17.863H3424v-5.954h17.862V980h5.954v17.863h17.862Z" transform="translate(-3424 -980)" fill=${actionIconFill}/>
      </g>
      <g id="Group_332" data-name="Group 332" transform="translate(0.001)" opacity="0.12">
        <path id="gradient_border_2" data-name="gradient border 2" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient)"/>
        <path id="gradient_border_1" data-name="gradient border 1" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient-2)"/>
      </g>
    </g>
  </svg>
`;

const DISPOSITION_POST = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="151.464" height="151.464" viewBox="0 0 151.464 151.464">
  <defs>
    <filter id="teal_circle" x="0" y="0" width="151.464" height="151.464" filterUnits="userSpaceOnUse">
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
  <g id="Group_4949" data-name="Group 4949" transform="translate(-881.084 -2048)">
    <g id="Group_4806" data-name="Group 4806" transform="translate(899.084 2063)">
      <g id="Round_Btn_Default_Dark" data-name="Round Btn Default Dark">
        <g transform="matrix(1, 0, 0, 1, -18, -15)" filter="url(#teal_circle)">
          <path id="teal_circle-2" data-name="teal circle" d="M57.732,0A57.732,57.732,0,1,1,0,57.732,57.732,57.732,0,0,1,57.732,0Z" transform="translate(18 15)" fill=${actionIconBackground}/>
        </g>
        <g id="Group_332" data-name="Group 332" transform="translate(0.001)" opacity="0.12">
          <path id="gradient_border_2" data-name="gradient border 2" d="M3460.732,960.031a56.7,56.7,0,1,1-56.7,56.7,56.7,56.7,0,0,1,56.7-56.7m0-1.031a57.732,57.732,0,1,0,57.732,57.732A57.732,57.732,0,0,0,3460.732,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient)"/>
          <path id="gradient_border_1" data-name="gradient border 1" d="M3460.732,960.031a56.7,56.7,0,1,1-56.7,56.7,56.7,56.7,0,0,1,56.7-56.7m0-1.031a57.732,57.732,0,1,0,57.732,57.732A57.732,57.732,0,0,0,3460.732,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient-2)"/>
        </g>
      </g>
    </g>
    <g id="save_alt_black_24dp" transform="translate(926.659 2090.575)">
      <path id="Path_4396" data-name="Path 4396" d="M0,0H60.314V60.314H0Z" fill="none"/>
      <path id="Path_4397" data-name="Path 4397" d="M43.209,25.618V43.209H8.026V25.618H3V43.209a5.041,5.041,0,0,0,5.026,5.026H43.209a5.041,5.041,0,0,0,5.026-5.026V25.618ZM28.131,27.3l6.509-6.484,3.543,3.543L25.618,36.927,13.052,24.361,16.6,20.818,23.1,27.3V3h5.026Z" transform="translate(4.539 4.539)" fill=${actionIconFill}/>
    </g>
  </g>
  </svg>
`;

const Drop_Down = `
  <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66">
    <g id="Drop_Down" data-name="Drop Down" transform="translate(0.08 0.479)">
      <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(-0.08 -0.479)" fill=${actionIconFill} stroke=${actionIconBackground} stroke-width="4">
        <circle cx="33" cy="33" r="33" stroke="none"/>
        <circle cx="33" cy="33" r="31" fill="none"/>
      </g>
      <path id="chevron-back-sharp" d="M9.981,0,0,9.981l9.981,9.981" transform="translate(22.233 38.407) rotate(-90)" fill="none" stroke=${actionIconBackground} stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
    </g>
  </svg>
`;

const Re_loop = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 192 191">
<defs>
  <filter id="Path_4379" x="0" y="0" width="192" height="191" filterUnits="userSpaceOnUse">
    <feOffset dy="5" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="7.5" result="blur"/>
    <feFlood flood-opacity="0.078"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Re-Loop_Button" data-name="Re-Loop Button" transform="translate(-967.5 -1072)">
  <g transform="matrix(1, 0, 0, 1, 967.5, 1072)" filter="url(#Path_4379)">
    <g id="Path_4379-2" data-name="Path 4379" transform="translate(22.5 17.5)" fill="none">
      <path d="M7,0H140a7,7,0,0,1,7,7V139a7,7,0,0,1-7,7H7a7,7,0,0,1-7-7V7A7,7,0,0,1,7,0Z" stroke="none"/>
      <path d="M 7 5 C 5.897201538085938 5 5 5.897201538085938 5 7 L 5 139 C 5 140.1027984619141 5.897201538085938 141 7 141 L 140 141 C 141.1027984619141 141 142 140.1027984619141 142 139 L 142 7 C 142 5.897201538085938 141.1027984619141 5 140 5 L 7 5 M 7 0 L 140 0 C 143.8659973144531 0 147 3.134002685546875 147 7 L 147 139 C 147 142.8659973144531 143.8659973144531 146 140 146 L 7 146 C 3.134002685546875 146 0 142.8659973144531 0 139 L 0 7 C 0 3.134002685546875 3.134002685546875 0 7 0 Z" stroke="none" fill=${actionIconBackground}/>
    </g>
  </g>
  <g id="restart_alt_black_24dp" transform="translate(1010.397 1107.158)">
    <g id="Group_4676" data-name="Group 4676">
      <path id="Path_4377" data-name="Path 4377" d="M0,0H106.205V106.2H0Z" fill="none"/>
    </g>
    <g id="Group_4678" data-name="Group 4678" transform="translate(17.701 11.063)">
      <g id="Group_4677" data-name="Group 4677">
        <path id="Path_4378" data-name="Path 4378" d="M12.85,48.965A26.459,26.459,0,0,1,20.639,30.2l-6.284-6.284A35.4,35.4,0,0,0,34.976,84.057V75.118A26.582,26.582,0,0,1,12.85,48.965Zm61.953,0a35.392,35.392,0,0,0-35.4-35.4c-.266,0-.531.044-.8.044l4.823-4.823L37.189,2.5,21.7,17.988,37.189,33.476l6.24-6.24-4.779-4.779c.266,0,.531-.044.752-.044a26.537,26.537,0,0,1,4.425,52.7v8.939A35.35,35.35,0,0,0,74.8,48.965Z" transform="translate(-4 -2.5)" fill=${actionIconBackground}/>
      </g>
    </g>
  </g>
</g>
</svg>
`;

const Person_Sharp = `
  <svg xmlns="http://www.w3.org/2000/svg" width="29.191" height="31.437" viewBox="0 0 29.191 31.437">
    <path id="person-sharp" d="M17.971,17.968a7.859,7.859,0,1,0-7.859-7.859A7.859,7.859,0,0,0,17.971,17.968Zm0,2.245c-4.871,0-14.6,3.009-14.6,8.982v4.491H32.566V29.2C32.566,23.223,22.842,20.214,17.971,20.214Z" transform="translate(-3.375 -2.25)" fill=${actionIconBackground}/>
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

const Form = `
<svg id="file-earmark-text-fill" xmlns="http://www.w3.org/2000/svg" width="44.442" height="51.849" viewBox="0 0 44.442 51.849">
  <g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)"
    fill=${navIconActive} stroke="none">
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

const Form_inactive = `
<svg id="file-earmark-text-fill" xmlns="http://www.w3.org/2000/svg" width="44.442" height="51.849" viewBox="0 0 44.442 51.849">
  <g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)"
    fill=${navIconInActive} stroke="none">
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
    <path id="sale" d="M48.188,27.536l6.884,6.884-8.6,3.442,1.721,10.326L37.862,46.467l-3.442,8.6-6.884-6.884-6.884,6.884-3.442-8.6L6.884,48.188,8.6,37.862,0,34.42l6.884-6.884L0,20.652,8.6,17.21,6.884,6.884,17.21,8.6,20.652,0l6.884,6.884L34.42,0l3.442,8.6L48.188,6.884,46.467,17.21l8.6,3.442ZM18.931,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0,7.919,7.919,0,0,0,1.505-4.868,7.893,7.893,0,0,0-1.505-4.868,4.451,4.451,0,0,0-3.658-2.016Zm17.21,0H34.42a1.01,1.01,0,0,0-.4.081q-.188.081-.3.135a1.1,1.1,0,0,0-.3.3q-.188.242-.242.323t-.242.43q-.188.349-.242.457L17.479,39.583a.889.889,0,0,0,.161,1.183,1.766,1.766,0,0,0,1.291.538h1.721a1.808,1.808,0,0,0,.35-.028.856.856,0,0,0,.3-.135,1.632,1.632,0,0,0,.242-.188,1.831,1.831,0,0,0,.216-.3q.135-.214.188-.323t.216-.376q.162-.268.216-.376l15.22-24.094a.889.889,0,0,0-.161-1.183,1.766,1.766,0,0,0-1.291-.538Zm0,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0A7.919,7.919,0,0,0,41.3,34.42,7.893,7.893,0,0,0,39.8,29.552,4.451,4.451,0,0,0,36.141,27.536Zm0,10.326q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q36.84,37.862,36.141,37.862ZM18.931,24.094q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q19.63,24.094,18.931,24.094Z" fill=${navIconActive}/>
  </svg>
`;

const Sale_inactive = `
  <svg xmlns="http://www.w3.org/2000/svg" width="55.072" height="55.072" viewBox="0 0 55.072 55.072">
    <path id="sale" d="M48.188,27.536l6.884,6.884-8.6,3.442,1.721,10.326L37.862,46.467l-3.442,8.6-6.884-6.884-6.884,6.884-3.442-8.6L6.884,48.188,8.6,37.862,0,34.42l6.884-6.884L0,20.652,8.6,17.21,6.884,6.884,17.21,8.6,20.652,0l6.884,6.884L34.42,0l3.442,8.6L48.188,6.884,46.467,17.21l8.6,3.442ZM18.931,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0,7.919,7.919,0,0,0,1.505-4.868,7.893,7.893,0,0,0-1.505-4.868,4.451,4.451,0,0,0-3.658-2.016Zm17.21,0H34.42a1.01,1.01,0,0,0-.4.081q-.188.081-.3.135a1.1,1.1,0,0,0-.3.3q-.188.242-.242.323t-.242.43q-.188.349-.242.457L17.479,39.583a.889.889,0,0,0,.161,1.183,1.766,1.766,0,0,0,1.291.538h1.721a1.808,1.808,0,0,0,.35-.028.856.856,0,0,0,.3-.135,1.632,1.632,0,0,0,.242-.188,1.831,1.831,0,0,0,.216-.3q.135-.214.188-.323t.216-.376q.162-.268.216-.376l15.22-24.094a.889.889,0,0,0-.161-1.183,1.766,1.766,0,0,0-1.291-.538Zm0,13.768a4.451,4.451,0,0,0-3.658,2.016,7.893,7.893,0,0,0-1.505,4.868,7.919,7.919,0,0,0,1.505,4.868,4.326,4.326,0,0,0,7.315,0A7.919,7.919,0,0,0,41.3,34.42,7.893,7.893,0,0,0,39.8,29.552,4.451,4.451,0,0,0,36.141,27.536Zm0,10.326q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q36.84,37.862,36.141,37.862ZM18.931,24.094q-.7,0-1.21-1.022a5.42,5.42,0,0,1-.511-2.448,5.246,5.246,0,0,1,.511-2.42q.511-.994,1.21-.994t1.21.994a5.246,5.246,0,0,1,.511,2.42,5.42,5.42,0,0,1-.511,2.448Q19.63,24.094,18.931,24.094Z" fill=${navIconActive}/>
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
      <rect id="Rectangle_1646" data-name="Rectangle 1646" width="97" height="98" rx="7" transform="translate(0.476 0.227)" fill=${actionIconBackground}/>
      <g id="options" transform="translate(24.074 28.749)">
        <path id="Path_570" data-name="Path 570" d="M14.64,4.5a10.145,10.145,0,0,1,9.82,7.6H54.572v5.07H24.461A10.141,10.141,0,1,1,14.64,4.5Zm0,15.21a5.07,5.07,0,1,0-5.07-5.07A5.07,5.07,0,0,0,14.64,19.71Z" transform="translate(-4.5 -4.5)" fill=${actionIconFill}/>
        <path id="Path_571" data-name="Path 571" d="M44.432,38.27a10.145,10.145,0,0,1-9.82-7.6H4.5V25.6H34.612A10.141,10.141,0,1,1,44.432,38.27Zm0-5.07a5.07,5.07,0,1,0-5.07-5.07A5.07,5.07,0,0,0,44.432,33.2Z" transform="translate(-4.5 4.825)" fill=${actionIconFill}/>
      </g>
    </g>
  </svg>
`;
const Filter_GRAY = `
  <svg xmlns="http://www.w3.org/2000/svg" width="97" height="98" viewBox="0 0 97 98">
    <g id="Filter" transform="translate(-0.476 -0.227)">
      <rect id="Rectangle_1646" data-name="Rectangle 1646" width="97" height="98" rx="7" transform="translate(0.476 0.227)" fill="#d1d1d1"/>
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
    <path id="Path_3980" data-name="Path 3980" d="M23,3.5H21.75V1h-2.5V3.5h-10V1H6.75V3.5H5.5A2.489,2.489,0,0,0,3.013,6L3,23.5A2.5,2.5,0,0,0,5.5,26H23a2.507,2.507,0,0,0,2.5-2.5V6A2.507,2.507,0,0,0,23,3.5Zm0,20H5.5V11H23Zm0-15H5.5V6H23Zm-2.5,6.25H14.25V21H20.5Z" transform="translate(0.75 0.25)" fill="#FFF"/>
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
      <path id="Path_3986" data-name="Path 3986" d="M29.786,62.046V41.206H43.679v20.84H61.046V34.259h10.42L36.733,3,2,34.259H12.42V62.046Z" transform="translate(4.947 7.42)" fill=${navIconInActive}/>
    </g>
  </svg>
`;

const Home_Black = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="home_black_24dp_1_" data-name="home_black_24dp (1)" transform="translate(-6.946 -6.947)">
      <path id="Path_3985" data-name="Path 3985" d="M0,0H69.466V69.466H0Z" transform="translate(6.946 6.946)" fill="none"/>
      <path id="Path_3986" data-name="Path 3986" d="M29.786,62.046V41.206H43.679v20.84H61.046V34.259h10.42L36.733,3,2,34.259H12.42V62.046Z" transform="translate(4.947 7.42)" fill=${navIconActive}/>
    </g>
  </svg>
`;

const Android_More_Horizontal_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4802" data-name="Group 4802" transform="translate(1113 -2665)">
      <g id="Dots" transform="translate(-11 6)">
        <circle id="Ellipse_3" data-name="Ellipse 3" cx="8.5" cy="8.5" r="8.5" transform="translate(-1101 2685)" fill=${navIconInActive}/>
        <circle id="Ellipse_4" data-name="Ellipse 4" cx="8.5" cy="8.5" r="8.5" transform="translate(-1076 2685)" fill=${navIconInActive}/>
        <circle id="Ellipse_5" data-name="Ellipse 5" cx="8.5" cy="8.5" r="8.5" transform="translate(-1051 2685)" fill=${navIconInActive}/>
      </g>
      <path id="Path_4388" data-name="Path 4388" d="M0,0H69.466V69.466H0Z" transform="translate(-1113 2665)" fill="none"/>
    </g>
  </svg>
`;

const Android_More_Horizontal = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4802" data-name="Group 4802" transform="translate(1113 -2665)">
      <g id="Dots" transform="translate(-11 6)">
        <circle id="Ellipse_3" data-name="Ellipse 3" cx="8.5" cy="8.5" r="8.5" transform="translate(-1101 2685)" fill=${navIconActive}/>
        <circle id="Ellipse_4" data-name="Ellipse 4" cx="8.5" cy="8.5" r="8.5" transform="translate(-1076 2685)" fill=${navIconActive}/>
        <circle id="Ellipse_5" data-name="Ellipse 5" cx="8.5" cy="8.5" r="8.5" transform="translate(-1051 2685)" fill=${navIconActive}/>
      </g>
      <path id="Path_4388" data-name="Path 4388" d="M0,0H69.466V69.466H0Z" transform="translate(-1113 2665)" fill="none"/>
    </g>
  </svg>
`;

const Calendar_Event_Fill_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4800" data-name="Group 4800" transform="translate(1526 -2662)">
      <g id="calendar-event-fill" transform="translate(-1519.914 2668.086)">
        <path id="Path_3942" data-name="Path 3942" d="M14.342,1.793a1.793,1.793,0,1,0-3.586,0V3.586H7.171A7.171,7.171,0,0,0,0,10.757v3.586H57.37V10.757A7.171,7.171,0,0,0,50.2,3.586H46.613V1.793a1.793,1.793,0,1,0-3.586,0V3.586H14.342ZM0,17.928H57.37V50.2A7.171,7.171,0,0,1,50.2,57.37H7.171A7.171,7.171,0,0,1,0,50.2ZM44.82,25.1a1.793,1.793,0,0,0-1.793,1.793v3.586a1.793,1.793,0,0,0,1.793,1.793h3.586A1.793,1.793,0,0,0,50.2,30.478V26.892A1.793,1.793,0,0,0,48.406,25.1Z" transform="translate(0)" fill=${navIconInActive}/>
      </g>
      <path id="Path_4386" data-name="Path 4386" d="M0,0H69.466V69.466H0Z" transform="translate(-1526 2662)" fill="none"/>
    </g>
  </svg>
`;

const Calendar_Event_Fill = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4800" data-name="Group 4800" transform="translate(1526 -2662)">
      <g id="calendar-event-fill" transform="translate(-1519.914 2668.086)">
        <path id="Path_3942" data-name="Path 3942" d="M14.342,1.793a1.793,1.793,0,1,0-3.586,0V3.586H7.171A7.171,7.171,0,0,0,0,10.757v3.586H57.37V10.757A7.171,7.171,0,0,0,50.2,3.586H46.613V1.793a1.793,1.793,0,1,0-3.586,0V3.586H14.342ZM0,17.928H57.37V50.2A7.171,7.171,0,0,1,50.2,57.37H7.171A7.171,7.171,0,0,1,0,50.2ZM44.82,25.1a1.793,1.793,0,0,0-1.793,1.793v3.586a1.793,1.793,0,0,0,1.793,1.793h3.586A1.793,1.793,0,0,0,50.2,30.478V26.892A1.793,1.793,0,0,0,48.406,25.1Z" transform="translate(0)" fill=${navIconActive}/>
      </g>
      <path id="Path_4386" data-name="Path 4386" d="M0,0H69.466V69.466H0Z" transform="translate(-1526 2662)" fill="none"/>
    </g>
  </svg>
`;

const Pipeline_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4801" data-name="Group 4801" transform="translate(1299 -2661)">
      <g id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" transform="translate(-1307.893 2652.214)">
        <path id="Path_4220" data-name="Path 4220" d="M28.417,49.572H42.941V42.31H28.417ZM3,6v7.262H68.357V6ZM13.893,31.417H57.464V24.155H13.893Z" transform="translate(7.893 15.786)" fill=${navIconInActive}/>
      </g>
      <path id="Path_4387" data-name="Path 4387" d="M0,0H69.466V69.466H0Z" transform="translate(-1299 2661)" fill="none"/>
    </g>
  </svg>
`;

const Pipeline = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4801" data-name="Group 4801" transform="translate(1299 -2661)">
      <g id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" transform="translate(-1307.893 2652.214)">
        <path id="Path_4220" data-name="Path 4220" d="M28.417,49.572H42.941V42.31H28.417ZM3,6v7.262H68.357V6ZM13.893,31.417H57.464V24.155H13.893Z" transform="translate(7.893 15.786)" fill=${navIconActive}/>
      </g>
      <path id="Path_4387" data-name="Path 4387" d="M0,0H69.466V69.466H0Z" transform="translate(-1299 2661)" fill="none"/>
    </g>
  </svg>
`;

const Travel_Explore_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
    <g id="travel_explore_black_24dp" transform="translate(0 0.167)">
      <rect id="Rectangle_2834" data-name="Rectangle 2834" width="71" height="71" transform="translate(0 -0.167)" fill="none"/>
      <path id="Path_4401" data-name="Path 4401" d="M52.772,45.729a14.13,14.13,0,0,0,2.054-7.044A13.207,13.207,0,1,0,41.62,51.892a14.13,14.13,0,0,0,7.044-2.054l9.391,9.391,4.109-4.109Zm-11.152.293a7.337,7.337,0,1,1,7.337-7.337A7.266,7.266,0,0,1,41.62,46.022Zm-10.272,8.8V60.7A29.348,29.348,0,1,1,60.109,25.478H54.034A23.478,23.478,0,0,0,40.152,9.6v1.2a5.887,5.887,0,0,1-5.87,5.87h-5.87v5.87a2.943,2.943,0,0,1-2.935,2.935h-5.87v5.87h5.87v8.8H22.544L8.486,26.095a23.824,23.824,0,0,0-.616,5.253A23.51,23.51,0,0,0,31.348,54.826Z" transform="translate(3.503 3.934)" fill=${navIconInActive}/>
    </g>
  </svg>
`;

const Travel_Explore = `
  <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
    <g id="travel_explore_black_24dp" transform="translate(0 0.167)">
      <rect id="Rectangle_2834" data-name="Rectangle 2834" width="71" height="71" transform="translate(0 -0.167)" fill="none"/>
      <path id="Path_4401" data-name="Path 4401" d="M52.772,45.729a14.13,14.13,0,0,0,2.054-7.044A13.207,13.207,0,1,0,41.62,51.892a14.13,14.13,0,0,0,7.044-2.054l9.391,9.391,4.109-4.109Zm-11.152.293a7.337,7.337,0,1,1,7.337-7.337A7.266,7.266,0,0,1,41.62,46.022Zm-10.272,8.8V60.7A29.348,29.348,0,1,1,60.109,25.478H54.034A23.478,23.478,0,0,0,40.152,9.6v1.2a5.887,5.887,0,0,1-5.87,5.87h-5.87v5.87a2.943,2.943,0,0,1-2.935,2.935h-5.87v5.87h5.87v8.8H22.544L8.486,26.095a23.824,23.824,0,0,0-.616,5.253A23.51,23.51,0,0,0,31.348,54.826Z" transform="translate(3.503 3.934)" fill=${navIconActive}/>
    </g>
  </svg>
`;

const Ballot_Gray = `
  <svg id="ballot_black_24dp" xmlns="http://www.w3.org/2000/svg" width="70.435" height="70.435" viewBox="0 0 70.435 70.435">
    <path id="Path_4394" data-name="Path 4394" d="M0,0H70.435V70.435H0Z" fill="none"/>
    <path id="Path_4395" data-name="Path 4395" d="M32.348,16.207H47.022v5.87H32.348Zm0,20.544H47.022v5.87H32.348ZM49.957,3H8.87A5.887,5.887,0,0,0,3,8.87V49.957a5.887,5.887,0,0,0,5.87,5.87H49.957a5.887,5.887,0,0,0,5.87-5.87V8.87A5.887,5.887,0,0,0,49.957,3Zm0,46.957H8.87V8.87H49.957ZM26.478,11.8H11.8V26.478H26.478ZM23.544,23.544h-8.8v-8.8h8.8Zm2.935,8.8H11.8V47.022H26.478ZM23.544,44.087h-8.8v-8.8h8.8Z" transform="translate(5.804 5.804)" fill=${navIconInActive}/>
  </svg>
`;

const Ballot = `
  <svg id="ballot_black_24dp" xmlns="http://www.w3.org/2000/svg" width="80.202" height="80.202" viewBox="0 0 80.202 80.202">
    <path id="Path_4394" data-name="Path 4394" d="M0,0H80.2V80.2H0Z" fill="none"/>
    <path id="Path_4395" data-name="Path 4395" d="M36.417,18.038H53.126v6.683H36.417Zm0,23.392H53.126v6.683H36.417ZM56.468,3H9.683A6.7,6.7,0,0,0,3,9.683V56.468a6.7,6.7,0,0,0,6.683,6.683H56.468a6.7,6.7,0,0,0,6.683-6.683V9.683A6.7,6.7,0,0,0,56.468,3Zm0,53.468H9.683V9.683H56.468ZM29.734,13.025H13.025V29.734H29.734ZM26.392,26.392H16.367V16.367H26.392Zm3.342,10.025H13.025V53.126H29.734ZM26.392,49.784H16.367V39.759H26.392Z" transform="translate(7.025 7.025)" fill=${navIconActive}/>
  </svg>
`;

const Location_Arrow_White = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill="#fff"/>
  </svg>
`;

const Location_Arrow_Gray = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill=${navIconInActive}/>
  </svg>
`;

const Location_Arrow = `
  <svg xmlns="http://www.w3.org/2000/svg" width="33.527" height="33.522" viewBox="0 0 33.527 33.522">
    <path id="location-arrow" d="M33.356,2.214,18.118,32.689a1.4,1.4,0,0,1-1.357.833,2.015,2.015,0,0,1-.358-.047,1.438,1.438,0,0,1-.846-.535,1.5,1.5,0,0,1-.32-.94V18.285H1.524a1.5,1.5,0,0,1-.94-.321,1.437,1.437,0,0,1-.535-.845,1.543,1.543,0,0,1,.095-1,1.435,1.435,0,0,1,.69-.714L31.308.167A1.43,1.43,0,0,1,32,0,1.416,1.416,0,0,1,33.07.453a1.417,1.417,0,0,1,.44.821A1.451,1.451,0,0,1,33.356,2.214Z" transform="translate(-0.005)" fill=${navIconActive}/>
  </svg>
`;

const Check = `
  <svg id="done_black_24dp_7_" data-name="done_black_24dp (7)" xmlns="http://www.w3.org/2000/svg" width="68.645" height="68.645" viewBox="0 0 68.645 68.645">
    <path id="Path_5308" data-name="Path 5308" d="M0,0H68.645V68.645H0Z" fill="none"/>
    <path id="Path_5309" data-name="Path 5309" d="M19.417,35.918,7.4,23.905l-4,4L19.417,43.927,53.739,9.6l-4-4Z" transform="translate(6.325 10.417)" fill=${selectedIcon}/>
  </svg>
`;

const Yes_No_Button_Check = `
  <svg id="done_black_24dp_7_" data-name="done_black_24dp (7)" xmlns="http://www.w3.org/2000/svg" width="68.645" height="68.645" viewBox="0 0 68.645 68.645">
    <path id="Path_5308" data-name="Path 5308" d="M0,0H68.645V68.645H0Z" fill="none"/>
    <path id="Path_5309" data-name="Path 5309" d="M19.417,35.918,7.4,23.905l-4,4L19.417,43.927,53.739,9.6l-4-4Z" transform="translate(6.325 10.417)" fill="#FFFFFF"/>
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
    <path id="Path_4403" data-name="Path 4403" d="M31.348,2A29.348,29.348,0,1,0,60.7,31.348,29.359,29.359,0,0,0,31.348,2ZM16.879,49.779c1.262-2.641,8.951-5.224,14.469-5.224s13.236,2.583,14.469,5.224a23.259,23.259,0,0,1-28.937,0Zm33.134-4.255c-4.2-5.107-14.381-6.838-18.665-6.838s-14.469,1.732-18.665,6.838a23.479,23.479,0,1,1,37.331,0ZM31.348,13.739A10.272,10.272,0,1,0,41.62,24.011,10.246,10.246,0,0,0,31.348,13.739Zm0,14.674a4.4,4.4,0,1,1,4.4-4.4A4.4,4.4,0,0,1,31.348,28.413Z" transform="translate(3.87 3.87)" fill=${navIconActive}/>
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
          <path id="Path_4399" data-name="Path 4399" d="M57.761,30.059C57.761,13.947,45.259,3,31.348,3,17.584,3,4.935,13.712,4.935,30.235A5.775,5.775,0,0,0,2,35.283v5.87a5.887,5.887,0,0,0,5.87,5.87H10.8V29.12a20.544,20.544,0,1,1,41.087,0V49.957H28.413v5.87H51.892a5.887,5.887,0,0,0,5.87-5.87v-3.58A5.426,5.426,0,0,0,60.7,41.563v-6.75A5.4,5.4,0,0,0,57.761,30.059Z" transform="translate(-2 -3)" fill=${navIconInActive}/>
          <ellipse id="Ellipse_129" data-name="Ellipse 129" cx="3.5" cy="3" rx="3.5" ry="3" transform="translate(16.955 26.33)" fill=${navIconInActive}/>
          <ellipse id="Ellipse_130" data-name="Ellipse 130" cx="2.5" cy="3" rx="2.5" ry="3" transform="translate(35.955 26.33)" fill=${navIconInActive}/>
          <path id="Path_4400" data-name="Path 4400" d="M41.207,20.762A17.729,17.729,0,0,0,23.745,6c-8.892,0-18.46,7.366-17.7,18.929A23.7,23.7,0,0,0,20.311,7.643,23.587,23.587,0,0,0,41.207,20.762Z" transform="translate(5.75 2.804)" fill=${navIconInActive}/>
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
          <path id="Path_4399" data-name="Path 4399" d="M57.761,30.059C57.761,13.947,45.259,3,31.348,3,17.584,3,4.935,13.712,4.935,30.235A5.775,5.775,0,0,0,2,35.283v5.87a5.887,5.887,0,0,0,5.87,5.87H10.8V29.12a20.544,20.544,0,1,1,41.087,0V49.957H28.413v5.87H51.892a5.887,5.887,0,0,0,5.87-5.87v-3.58A5.426,5.426,0,0,0,60.7,41.563v-6.75A5.4,5.4,0,0,0,57.761,30.059Z" transform="translate(-2 -3)" fill=${navIconActive}/>
          <ellipse id="Ellipse_129" data-name="Ellipse 129" cx="3.5" cy="3" rx="3.5" ry="3" transform="translate(16.955 26.33)" fill=${navIconActive}/>
          <ellipse id="Ellipse_130" data-name="Ellipse 130" cx="2.5" cy="3" rx="2.5" ry="3" transform="translate(35.955 26.33)" fill=${navIconActive}/>
          <path id="Path_4400" data-name="Path 4400" d="M41.207,20.762A17.729,17.729,0,0,0,23.745,6c-8.892,0-18.46,7.366-17.7,18.929A23.7,23.7,0,0,0,20.311,7.643,23.587,23.587,0,0,0,41.207,20.762Z" transform="translate(5.75 2.804)" fill=${navIconActive}/>
        </g>
      </g>
    </g>
  </svg>
`;

const Angle_Left = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32.311" height="61.743" viewBox="0 0 32.311 61.743">
    <path id="angle-down" d="M61.743,4.607a1.675,1.675,0,0,1-.618,1.277L32.295,31.756a2.1,2.1,0,0,1-2.846,0L.618,5.885a1.629,1.629,0,0,1,0-2.554L3.711.555a2.1,2.1,0,0,1,2.846,0L30.871,22.374,55.185.555a2.1,2.1,0,0,1,2.846,0L61.124,3.33A1.675,1.675,0,0,1,61.743,4.607Z" transform="translate(0 61.743) rotate(-90)" fill=${actionButtonIconFill}/>
  </svg>
`;

const Angle_Left_form = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32.311" height="61.743" viewBox="0 0 32.311 61.743">
    <path id="angle-down" d="M61.743,4.607a1.675,1.675,0,0,1-.618,1.277L32.295,31.756a2.1,2.1,0,0,1-2.846,0L.618,5.885a1.629,1.629,0,0,1,0-2.554L3.711.555a2.1,2.1,0,0,1,2.846,0L30.871,22.374,55.185.555a2.1,2.1,0,0,1,2.846,0L61.124,3.33A1.675,1.675,0,0,1,61.743,4.607Z" transform="translate(0 61.743) rotate(-90)" fill=${actionFullButtonIconFill}/>
  </svg>
`;

const Logout = `
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill=${actionButtonIconFill}><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
`;

const Description = `
  <svg xmlns="http://www.w3.org/2000/svg" width="76.132" height="76.133" viewBox="0 0 76.132 76.133">
    <g id="description_black_24dp_2_" data-name="description_black_24dp (2)" transform="translate(0 0)">
      <path id="Path_4109" data-name="Path 4109" d="M0,0H76.132V76.133H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4110" data-name="Path 4110" d="M16.689,46.411H42.066v6.344H16.689Zm0-12.689H42.066v6.344H16.689ZM35.722,2H10.344A6.363,6.363,0,0,0,4,8.344V59.1a6.336,6.336,0,0,0,6.313,6.344h38.1A6.363,6.363,0,0,0,54.755,59.1V21.033ZM48.41,59.1H10.344V8.344H32.55V24.205H48.41Z" transform="translate(8.689 4.344)" fill=${actionIconBackground}/>
    </g>
  </svg>
`;

const Wallpaper = `
  <svg xmlns="http://www.w3.org/2000/svg" width="76.132" height="76.133" viewBox="0 0 76.132 76.133">
    <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(0 0)">
      <path id="Path_4107" data-name="Path 4107" d="M0,0H76.132V76.133H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4108" data-name="Path 4108" d="M8.344,8.344H30.55V2H8.344A6.363,6.363,0,0,0,2,8.344V30.55H8.344Zm19.033,28.55L14.689,52.755H52.755L43.238,40.066l-6.44,8.6ZM49.583,22.619a4.758,4.758,0,1,0-4.758,4.758A4.752,4.752,0,0,0,49.583,22.619ZM59.1,2H36.894V8.344H59.1V30.55h6.344V8.344A6.363,6.363,0,0,0,59.1,2Zm0,57.1H36.894v6.344H59.1A6.363,6.363,0,0,0,65.443,59.1V36.894H59.1ZM8.344,36.894H2V59.1a6.363,6.363,0,0,0,6.344,6.344H30.55V59.1H8.344Z" transform="translate(4.344 4.344)" fill=${actionIconBackground}/>
    </g>
  </svg>
`;

const Video_Library = `
  <svg xmlns="http://www.w3.org/2000/svg" width="73.289" height="73.289" viewBox="0 0 73.289 73.289">
    <g id="video_library_black_24dp" transform="translate(0 0)">
      <path id="Path_4111" data-name="Path 4111" d="M0,0H73.289V73.289H0Z" transform="translate(0 0)" fill="none"/>
      <path id="Path_4112" data-name="Path 4112" d="M8.107,14.215H2V56.967a6.125,6.125,0,0,0,6.107,6.107H50.859V56.967H8.107ZM56.967,2H20.322a6.125,6.125,0,0,0-6.107,6.107V44.752a6.125,6.125,0,0,0,6.107,6.107H56.967a6.125,6.125,0,0,0,6.107-6.107V8.107A6.125,6.125,0,0,0,56.967,2Zm0,42.752H20.322V8.107H56.967ZM32.537,12.688V40.171L50.859,26.43Z" transform="translate(4.107 4.108)" fill=${actionIconBackground}/>
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
        <path id="Path_4198" data-name="Path 4198" d="M37.715,30.49v7.225H8.816V30.49H4v7.225a4.831,4.831,0,0,0,4.816,4.816h28.9a4.831,4.831,0,0,0,4.816-4.816V30.49Zm-2.408-9.633-3.4-3.4-6.237,6.213V4H20.857V23.675L14.62,17.462l-3.4,3.4L23.266,32.9Z" transform="translate(-4 -4)" fill=${actionIconBackground}/>
      </g>
    </g>
  </svg>
`;

const Faq = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="404" height="632" viewBox="0 0 404 632">
<defs>
  <clipPath id="clip-path">
    <rect id="Rectangle_2966" data-name="Rectangle 2966" width="404" height="632" transform="translate(0 0.421)" fill="#133c8b"/>
  </clipPath>
</defs>
<g id="Group_4966" data-name="Group 4966" transform="translate(0 -0.421)">
  <g id="Group_4965" data-name="Group 4965" clip-path="url(#clip-path)">
    <path id="Path_5331" data-name="Path 5331" d="M109.855,7.5h44.492a6.356,6.356,0,1,1,0,12.712H109.855a6.356,6.356,0,0,1,0-12.712" transform="translate(225.42 16.335)" fill=${actionIconBackground}/>
    <path id="Path_5332" data-name="Path 5332" d="M11.855,7.5H37.279a6.356,6.356,0,1,1,0,12.712H11.855a6.356,6.356,0,1,1,0-12.712" transform="translate(11.977 16.335)" fill=${actionIconBackground}/>
    <path id="Path_5333" data-name="Path 5333" d="M11.678,52.5h7.945a3.178,3.178,0,0,1,0,6.356H11.678a3.178,3.178,0,1,1,0-6.356" transform="translate(18.513 114.345)" fill=${actionIconBackground}/>
    <path id="Path_5334" data-name="Path 5334" d="M11.678,57.5H176.934a3.178,3.178,0,1,1,0,6.356H11.678a3.178,3.178,0,1,1,0-6.356" transform="translate(18.513 125.235)" fill=${actionIconBackground}/>
    <path id="Path_5335" data-name="Path 5335" d="M24.678,62.5H189.931a3.178,3.178,0,0,1,0,6.356H24.678a3.178,3.178,0,0,1,0-6.356" transform="translate(46.827 136.125)" fill=${actionIconBackground}/>
    <path id="Path_5336" data-name="Path 5336" d="M229.933,67.5H64.677a3.178,3.178,0,1,0,0,6.356H229.933a3.178,3.178,0,0,0,0-6.356" transform="translate(133.944 147.015)" fill=${actionIconBackground}/>
    <path id="Path_5337" data-name="Path 5337" d="M209.933,72.5H44.677a3.178,3.178,0,1,0,0,6.356H209.933a3.178,3.178,0,1,0,0-6.356" transform="translate(90.385 157.905)" fill=${actionIconBackground}/>
    <path id="Path_5338" data-name="Path 5338" d="M367.291,68.369H12.945A7.954,7.954,0,0,1,5,60.424V42.945A7.954,7.954,0,0,1,12.945,35H367.291a7.954,7.954,0,0,1,7.945,7.945V60.424a7.954,7.954,0,0,1-7.945,7.945M12.945,38.178a4.773,4.773,0,0,0-4.767,4.767V60.424a4.773,4.773,0,0,0,4.767,4.767H367.291a4.773,4.773,0,0,0,4.767-4.767V42.945a4.773,4.773,0,0,0-4.767-4.767Z" transform="translate(10.89 76.23)" fill=${actionIconBackground}/>
    <path id="Path_5339" data-name="Path 5339" d="M367.291,153.285H12.945A7.954,7.954,0,0,1,5,145.34V57.945A7.954,7.954,0,0,1,12.945,50H367.291a7.954,7.954,0,0,1,7.945,7.945V145.34a7.954,7.954,0,0,1-7.945,7.945M12.945,53.178a4.773,4.773,0,0,0-4.767,4.767V145.34a4.773,4.773,0,0,0,4.767,4.767H367.291a4.773,4.773,0,0,0,4.767-4.767V57.945a4.773,4.773,0,0,0-4.767-4.767Z" transform="translate(10.89 108.9)" fill=${actionIconBackground}/>
    <path id="Path_5340" data-name="Path 5340" d="M11.678,106.5h7.945a3.178,3.178,0,1,1,0,6.356H11.678a3.178,3.178,0,1,1,0-6.356" transform="translate(18.513 231.956)" fill=${actionIconBackground}/>
    <path id="Path_5341" data-name="Path 5341" d="M11.678,111.5H176.934a3.178,3.178,0,1,1,0,6.356H11.678a3.178,3.178,0,1,1,0-6.356" transform="translate(18.513 242.846)" fill=${actionIconBackground}/>
    <path id="Path_5342" data-name="Path 5342" d="M24.678,115.5H189.931a3.178,3.178,0,0,1,0,6.356H24.678a3.178,3.178,0,0,1,0-6.356" transform="translate(46.827 251.558)" fill=${actionIconBackground}/>
    <path id="Path_5343" data-name="Path 5343" d="M367.291,122.369H12.945A7.954,7.954,0,0,1,5,114.424V96.945A7.954,7.954,0,0,1,12.945,89H367.291a7.954,7.954,0,0,1,7.945,7.945v17.479a7.954,7.954,0,0,1-7.945,7.945M12.945,92.178a4.773,4.773,0,0,0-4.767,4.767v17.479a4.773,4.773,0,0,0,4.767,4.767H367.291a4.773,4.773,0,0,0,4.767-4.767V96.945a4.773,4.773,0,0,0-4.767-4.767Z" transform="translate(10.89 193.841)" fill=${actionIconBackground}/>
    <path id="Path_5344" data-name="Path 5344" d="M367.291,207.285H12.945A7.954,7.954,0,0,1,5,199.34V111.945A7.954,7.954,0,0,1,12.945,104H367.291a7.954,7.954,0,0,1,7.945,7.945V199.34a7.954,7.954,0,0,1-7.945,7.945M12.945,107.178a4.773,4.773,0,0,0-4.767,4.767V199.34a4.773,4.773,0,0,0,4.767,4.767H367.291a4.773,4.773,0,0,0,4.767-4.767V111.945a4.773,4.773,0,0,0-4.767-4.767Z" transform="translate(10.89 226.511)" fill=${actionIconBackground}/>
    <path id="Path_5345" data-name="Path 5345" d="M392.482,632.421H11.123A11.135,11.135,0,0,1,0,621.3V11.123A11.135,11.135,0,0,1,11.123,0H392.482a11.135,11.135,0,0,1,11.123,11.123V621.3a11.135,11.135,0,0,1-11.123,11.123M11.123,9.534a1.592,1.592,0,0,0-1.589,1.589V621.3a1.594,1.594,0,0,0,1.589,1.589H392.482a1.594,1.594,0,0,0,1.589-1.589V11.123a1.592,1.592,0,0,0-1.589-1.589Z" fill=${actionIconBackground}/>
    <rect id="Rectangle_2965" data-name="Rectangle 2965" width="387.715" height="9.534" transform="translate(7.945 84.217)" fill=${actionIconBackground}/>
    <rect id="Rectangle_2967" data-name="Rectangle 2967" width="387.715" height="9.534" transform="translate(7.945 569.217)" fill=${actionIconBackground}/>
    <path id="Path_5346" data-name="Path 5346" d="M189.933,132.856H24.677a3.178,3.178,0,1,1,0-6.356H189.933a3.178,3.178,0,1,1,0,6.356" transform="translate(46.825 275.516)" fill=${actionIconBackground}/>
    <path id="Path_5347" data-name="Path 5347" d="M176.934,128.856H11.678a3.178,3.178,0,1,1,0-6.356H176.934a3.178,3.178,0,1,1,0,6.356" transform="translate(18.513 266.804)" fill=${actionIconBackground}/>
  </g>
</g>
</svg>
`;

const Right_Arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66">
<g id="Group_4113" data-name="Group 4113" transform="translate(0.216 65.811) rotate(-90)">
  <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(-0.189 -0.216)" fill="#fff" stroke=${actionIconBackground} stroke-width="4">
    <circle cx="33" cy="33" r="33" stroke="none"/>
    <circle cx="33" cy="33" r="31" fill="none"/>
  </g>
  <path id="chevron-back-sharp" d="M9.973,0,0,9.973l9.973,9.973" transform="translate(22.214 38.374) rotate(-90)" fill="none" stroke=${actionIconBackground} stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
</g>
</svg>
`;

const Item_Selected = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;

const Calendar_Optimize = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.718" height="202.718" viewBox="0 0 202.718 202.718">
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
<g id="Group_4807" data-name="Group 4807" transform="translate(-881.084 -2048)">
  <g id="Group_4806" data-name="Group 4806">
    <g id="Round_Btn_Default_Dark" data-name="Round Btn Default Dark" transform="translate(899.084 2063)">
      <g transform="matrix(1, 0, 0, 1, -18, -15)" filter="url(#teal_circle)">
        <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill="#133c8b"/>
      </g>
      <g id="Group_332" data-name="Group 332" transform="translate(0.001)" opacity="0.12">
        <path id="gradient_border_2" data-name="gradient border 2" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient)"/>
        <path id="gradient_border_1" data-name="gradient border 1" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient-2)"/>
      </g>
    </g>
  </g>
  <g id="save_alt_black_24dp" transform="translate(938.9 2102.815)">
    <path id="Path_4396" data-name="Path 4396" d="M0,0H87.087V87.087H0Z" fill="none"/>
    <path id="Path_5349" data-name="Path 5349" d="M52.839,6l8.316,8.316L43.434,32.037,28.909,17.512,2,44.456l5.12,5.12L28.909,27.788,43.434,42.314,66.312,19.472l8.316,8.316V6Z" transform="translate(5.263 15.788)" fill="#fff"/>
  </g>
</g>
</svg>
`;

const Arrow_Right = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41">
<g id="ic_add_white" transform="translate(9.25 8.75)">
  <g id="chevron_right_black_24dp" transform="translate(-9.25 -8.75)">
    <path id="Path_4400" data-name="Path 4400" d="M0,0H41V41H0Z" fill="none"/>
    <path id="Path_4401" data-name="Path 4401" d="M11,6,8.59,8.409l7.824,7.841L8.59,24.091,11,26.5l10.25-10.25Z" transform="translate(6.085 4.25)" fill=${actionButtonIconFill}/>
  </g>
</g>
</svg>
`;

const Add_Image = `<svg xmlns="http://www.w3.org/2000/svg" width="238" height="254.93" viewBox="0 0 238 254.93">
<g id="Group_4817" data-name="Group 4817" transform="translate(-789.725 -193.833)">
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(808.525 193.833)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H202.235V202.235H0Z" transform="translate(0 0)" fill=${actionIconFill}/>
    <path id="Path_4181" data-name="Path 4181" d="M18.853,18.853H77.838V2H18.853A16.9,16.9,0,0,0,2,18.853V77.838H18.853ZM69.412,94.691,35.706,136.824H136.824l-25.279-33.706L94.438,125.953ZM128.4,56.772a12.64,12.64,0,1,0-12.64,12.64A12.623,12.623,0,0,0,128.4,56.772ZM153.676,2H94.691V18.853h58.985V77.838h16.853V18.853A16.9,16.9,0,0,0,153.676,2Zm0,151.677H94.691v16.853h58.985a16.9,16.9,0,0,0,16.853-16.853V94.691H153.676ZM18.853,94.691H2v58.985a16.9,16.9,0,0,0,16.853,16.853H77.838V153.677H18.853Z" transform="translate(14.853 14.853)" fill=${actionIconBackground}/>
  </g>
  <text id="Checkout" transform="translate(908.725 436.764)" fill=${actionIconBackground} font-size="49" font-family="Product Sans" font-weight="500"><tspan x="-118" y="0">Add Image</tspan></text>
</g>
</svg>
`;
const Arrow_Left = `<svg xmlns="http://www.w3.org/2000/svg" width="16.3" height="26.99" viewBox="0 0 16.3 26.99">
<g id="Group_4283" data-name="Group 4283" transform="translate(22.737 37.649) rotate(180)">
  <path id="angle-down" d="M26.99,2.324a.9.9,0,0,1-.27.644L14.117,16.02a.832.832,0,0,1-1.244,0L.27,2.969a.9.9,0,0,1,0-1.289L1.622.28a.832.832,0,0,1,1.244,0L13.5,11.287,24.124.28a.832.832,0,0,1,1.244,0l1.352,1.4A.9.9,0,0,1,26.99,2.324Z" transform="translate(6.437 37.649) rotate(-90)" fill=${actionButtonIconFill}/>
</g>
</svg>
`;
const Arrow_Left_alt = `<svg xmlns="http://www.w3.org/2000/svg" width="16.3" height="26.99" viewBox="0 0 16.3 26.99">
<g id="Group_4283" data-name="Group 4283" transform="translate(22.737 37.649) rotate(180)">
  <path id="angle-down" d="M26.99,2.324a.9.9,0,0,1-.27.644L14.117,16.02a.832.832,0,0,1-1.244,0L.27,2.969a.9.9,0,0,1,0-1.289L1.622.28a.832.832,0,0,1,1.244,0L13.5,11.287,24.124.28a.832.832,0,0,1,1.244,0l1.352,1.4A.9.9,0,0,1,26.99,2.324Z" transform="translate(6.437 37.649) rotate(-90)" fill=${actionOutlineButtonText}/>
</g>
</svg>
`;
const Arrow_Right_Button = `<svg xmlns="http://www.w3.org/2000/svg" width="16.3" height="26.99" viewBox="0 0 16.3 26.99">
<g id="Group_4984" data-name="Group 4984" transform="translate(-6.437 -10.659)">
  <path id="angle-down" d="M26.99,2.324a.9.9,0,0,1-.27.644L14.117,16.02a.832.832,0,0,1-1.244,0L.27,2.969a.9.9,0,0,1,0-1.289L1.622.28a.832.832,0,0,1,1.244,0L13.5,11.287,24.124.28a.832.832,0,0,1,1.244,0l1.352,1.4A.9.9,0,0,1,26.99,2.324Z" transform="translate(6.437 37.649) rotate(-90)" fill=${actionButtonIconFill}/>
</g>
</svg>`;

const Arrow_Right_Button_alt = `<svg xmlns="http://www.w3.org/2000/svg" width="16.3" height="26.99" viewBox="0 0 16.3 26.99">
<g id="Group_4984" data-name="Group 4984" transform="translate(-6.437 -10.659)">
  <path id="angle-down" d="M26.99,2.324a.9.9,0,0,1-.27.644L14.117,16.02a.832.832,0,0,1-1.244,0L.27,2.969a.9.9,0,0,1,0-1.289L1.622.28a.832.832,0,0,1,1.244,0L13.5,11.287,24.124.28a.832.832,0,0,1,1.244,0l1.352,1.4A.9.9,0,0,1,26.99,2.324Z" transform="translate(6.437 37.649) rotate(-90)" fill=${actionOutlineButtonText}/>
</g>
</svg>`;

const GPS_LOCATION = `<svg id="gps_fixed_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path id="Path_5365" data-name="Path 5365" d="M0,0H24V24H0Z" fill="none"/>
<path id="Path_5366" data-name="Path 5366" d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm8.94,3A8.994,8.994,0,0,0,13,3.06V1H11V3.06A8.994,8.994,0,0,0,3.06,11H1v2H3.06A8.994,8.994,0,0,0,11,20.94V23h2V20.94A8.994,8.994,0,0,0,20.94,13H23V11H20.94ZM12,19a7,7,0,1,1,7-7A6.995,6.995,0,0,1,12,19Z" fill="#666"/>
</svg>
`;
const Add_Image_Gray = `<svg xmlns="http://www.w3.org/2000/svg" width="202.235" height="202.235" viewBox="0 0 202.235 202.235">
<g id="Group_4817" data-name="Group 4817" transform="translate(-808.525 -193.833)">
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(808.525 193.833)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H202.235V202.235H0Z" transform="translate(0 0)" fill="rgba(0,0,0,0)"/>
    <path id="Path_4181" data-name="Path 4181" d="M18.853,18.853H77.838V2H18.853A16.9,16.9,0,0,0,2,18.853V77.838H18.853ZM69.412,94.691,35.706,136.824H136.824l-25.279-33.706L94.438,125.953ZM128.4,56.772a12.64,12.64,0,1,0-12.64,12.64A12.623,12.623,0,0,0,128.4,56.772ZM153.676,2H94.691V18.853h58.985V77.838h16.853V18.853A16.9,16.9,0,0,0,153.676,2Zm0,151.677H94.691v16.853h58.985a16.9,16.9,0,0,0,16.853-16.853V94.691H153.676ZM18.853,94.691H2v58.985a16.9,16.9,0,0,0,16.853,16.853H77.838V153.677H18.853Z" transform="translate(14.853 14.853)" fill="#c1c1c1"/>
  </g>
</g>
</svg>
`;
const Roop_Gray = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="192" height="191" viewBox="0 0 192 191">
<defs>
  <filter id="Path_4379" x="0" y="0" width="192" height="191" filterUnits="userSpaceOnUse">
    <feOffset dy="5" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="7.5" result="blur"/>
    <feFlood flood-opacity="0.078"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Re-Loop_Button" data-name="Re-Loop Button" transform="translate(-967.5 -1072)">
  <g transform="matrix(1, 0, 0, 1, 967.5, 1072)" filter="url(#Path_4379)">
    <g id="Path_4379-2" data-name="Path 4379" transform="translate(22.5 17.5)" fill="none">
      <path d="M7,0H140a7,7,0,0,1,7,7V139a7,7,0,0,1-7,7H7a7,7,0,0,1-7-7V7A7,7,0,0,1,7,0Z" stroke="none"/>
      <path d="M 7 5 C 5.897201538085938 5 5 5.897201538085938 5 7 L 5 139 C 5 140.1027984619141 5.897201538085938 141 7 141 L 140 141 C 141.1027984619141 141 142 140.1027984619141 142 139 L 142 7 C 142 5.897201538085938 141.1027984619141 5 140 5 L 7 5 M 7 0 L 140 0 C 143.8659973144531 0 147 3.134002685546875 147 7 L 147 139 C 147 142.8659973144531 143.8659973144531 146 140 146 L 7 146 C 3.134002685546875 146 0 142.8659973144531 0 139 L 0 7 C 0 3.134002685546875 3.134002685546875 0 7 0 Z" stroke="none" fill="#c1c1c1"/>
    </g>
  </g>
  <g id="restart_alt_black_24dp" transform="translate(1010.397 1107.158)">
    <g id="Group_4676" data-name="Group 4676">
      <path id="Path_4377" data-name="Path 4377" d="M0,0H106.205V106.2H0Z" fill="none"/>
    </g>
    <g id="Group_4678" data-name="Group 4678" transform="translate(17.701 11.063)">
      <g id="Group_4677" data-name="Group 4677">
        <path id="Path_4378" data-name="Path 4378" d="M12.85,48.965A26.459,26.459,0,0,1,20.639,30.2l-6.284-6.284A35.4,35.4,0,0,0,34.976,84.057V75.118A26.582,26.582,0,0,1,12.85,48.965Zm61.953,0a35.392,35.392,0,0,0-35.4-35.4c-.266,0-.531.044-.8.044l4.823-4.823L37.189,2.5,21.7,17.988,37.189,33.476l6.24-6.24-4.779-4.779c.266,0,.531-.044.752-.044a26.537,26.537,0,0,1,4.425,52.7v8.939A35.35,35.35,0,0,0,74.8,48.965Z" transform="translate(-4 -2.5)" fill="#c1c1c1"/>
      </g>
    </g>
  </g>
</g>
</svg>
`;

const Forms_Red_Compulsory = `<svg xmlns="http://www.w3.org/2000/svg" width="71.389" height="71.389" viewBox="0 0 71.389 71.389">
<g id="Group_4469" data-name="Group 4469" transform="translate(0 0)">
  <path id="Path_4091" data-name="Path 4091" d="M571.5,372.5h71.389v71.389H571.5Z" transform="translate(-571.5 -372.5)" fill="none"/>
  <path id="Path_4200" data-name="Path 4200" d="M615.66,432.449H605.3c-1.041-3.45-3.769-5.949-6.99-5.949s-5.949,2.5-6.99,5.949h-10.36c-2.728,0-4.959,2.677-4.959,5.949v41.644c0,3.272,2.231,5.949,4.959,5.949h34.7c2.728,0,4.959-2.677,4.959-5.949V438.4C620.618,435.126,618.387,432.449,615.66,432.449ZM600.986,475.58h-5.354v-5.354h5.354Zm0-10.708h-5.354V448.809h5.354ZM598.309,438.4a2.975,2.975,0,1,1,2.975-2.974A2.983,2.983,0,0,1,598.309,438.4Z" transform="translate(-562.615 -423.66)" fill="#dc143c"/>
</g>
</svg>
`;
const Forms_Green_Done = `<svg xmlns="http://www.w3.org/2000/svg" width="71.389" height="71.389" viewBox="0 0 71.389 71.389">
<g id="Group_4256" data-name="Group 4256" transform="translate(0 0)">
  <path id="Path_4091" data-name="Path 4091" d="M571.5,372.5h71.389v71.389H571.5Z" transform="translate(-571.5 -372.5)" fill="none"/>
  <path id="Path_4092" data-name="Path 4092" d="M615.66,379.449H605.3c-1.041-3.45-3.769-5.949-6.99-5.949s-5.949,2.5-6.99,5.949h-10.36c-2.728,0-4.959,2.677-4.959,5.949v41.644c0,3.272,2.231,5.949,4.959,5.949h34.7c2.728,0,4.959-2.677,4.959-5.949V385.4C620.618,382.126,618.387,379.449,615.66,379.449Zm-17.351,0a2.975,2.975,0,1,1-2.975,2.975A2.983,2.983,0,0,1,598.309,379.449Zm-3.965,36.974-7.933-7.933,2.8-2.8,5.137,5.116,13.067-13.067,2.8,2.817Z" transform="translate(-562.615 -370.525)" fill="#0ad10a"/>
</g>
</svg>
`;

const Signature_Btn_Right_Arrow = `<svg xmlns="http://www.w3.org/2000/svg" width="23.751" height="40.728" viewBox="0 0 23.751 40.728">
<path id="angle-down" d="M40.728,3.387a1.29,1.29,0,0,1-.408.939L21.3,23.343a1.285,1.285,0,0,1-1.878,0L.408,4.326a1.285,1.285,0,0,1,0-1.878L2.448.408a1.285,1.285,0,0,1,1.878,0L20.364,16.446,36.4.408a1.285,1.285,0,0,1,1.878,0l2.04,2.04A1.29,1.29,0,0,1,40.728,3.387Z" transform="translate(0 40.728) rotate(-90)" fill=${actionFullButtonIconFill}/>
</svg>
`;

const Question_Btn_Done = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
<g id="task_alt_black_24dp" transform="translate(0.317 0.413)">
  <rect id="Rectangle_2379" data-name="Rectangle 2379" width="45" height="45" transform="translate(-0.317 -0.413)" fill="none"/>
  <path id="Path_4193" data-name="Path 4193" d="M39.339,7.937l-21.3,21.321-7.916-7.916,2.632-2.632,5.284,5.284,18.67-18.67Zm-4.126,9.41A14.926,14.926,0,1,1,20.67,5.734,14.788,14.788,0,0,1,28.66,8.068l2.688-2.688A18.483,18.483,0,0,0,20.67,2a18.719,18.719,0,1,0,17.55,12.341Z" transform="translate(1.734 1.734)" fill="#fff"/>
</g>
</svg>
`;
const Question_Calendar = `
  <svg xmlns="http://www.w3.org/2000/svg" width="69.466" height="69.466" viewBox="0 0 69.466 69.466">
    <g id="Group_4800" data-name="Group 4800" transform="translate(1526 -2662)">
      <g id="calendar-event-fill" transform="translate(-1519.914 2668.086)">
        <path id="Path_3942" data-name="Path 3942" d="M14.342,1.793a1.793,1.793,0,1,0-3.586,0V3.586H7.171A7.171,7.171,0,0,0,0,10.757v3.586H57.37V10.757A7.171,7.171,0,0,0,50.2,3.586H46.613V1.793a1.793,1.793,0,1,0-3.586,0V3.586H14.342ZM0,17.928H57.37V50.2A7.171,7.171,0,0,1,50.2,57.37H7.171A7.171,7.171,0,0,1,0,50.2ZM44.82,25.1a1.793,1.793,0,0,0-1.793,1.793v3.586a1.793,1.793,0,0,0,1.793,1.793h3.586A1.793,1.793,0,0,0,50.2,30.478V26.892A1.793,1.793,0,0,0,48.406,25.1Z" transform="translate(0)" fill=${actionFullButtonIconFill}/>
      </g>
      <path id="Path_4386" data-name="Path 4386" d="M0,0H69.466V69.466H0Z" transform="translate(-1526 2662)" fill="none"/>
    </g>
  </svg>
`;

const Person_Sharp_feature_card = `<svg xmlns="http://www.w3.org/2000/svg" width="34.189" height="36.819" viewBox="0 0 34.189 36.819">
<path id="person-sharp" d="M20.47,20.659a9.2,9.2,0,1,0-9.2-9.2A9.2,9.2,0,0,0,20.47,20.659Zm0,2.63c-5.705,0-17.095,3.524-17.095,10.52v5.26H37.564v-5.26C37.564,26.813,26.175,23.289,20.47,23.289Z" transform="translate(-3.375 -2.25)" fill=${
  whiteLabel().feature_card_icon_fill
}/>
</svg>
`;

const Form_feature_card = `<svg id="file-earmark-text-fill" xmlns="http://www.w3.org/2000/svg" width="44.442" height="51.849" viewBox="0 0 44.442 51.849">
<path id="Path_3960" data-name="Path 3960" d="M4.5,9.657A7.407,7.407,0,0,1,11.907,2.25h19.6a3.7,3.7,0,0,1,2.619,1.085L47.857,17.064a3.7,3.7,0,0,1,1.085,2.619V46.692A7.407,7.407,0,0,1,41.535,54.1H11.907A7.407,7.407,0,0,1,4.5,46.692Zm25.925,7.407V5.954L45.239,20.768H34.128A3.7,3.7,0,0,1,30.425,17.064ZM13.759,28.175a1.852,1.852,0,1,0,0,3.7H39.683a1.852,1.852,0,1,0,0-3.7Zm-1.852,9.259a1.852,1.852,0,0,1,1.852-1.852H39.683a1.852,1.852,0,1,1,0,3.7H13.759A1.852,1.852,0,0,1,11.907,37.433Zm0,7.407a1.852,1.852,0,0,1,1.852-1.852H28.573a1.852,1.852,0,0,1,0,3.7H13.759A1.852,1.852,0,0,1,11.907,44.84Z" transform="translate(-4.5 -2.25)" fill=${
  whiteLabel().feature_card_icon_fill
} fill-rule="evenodd"/>
</svg>
`;

const Activity_Comments = `<svg id="chatboxes" xmlns="http://www.w3.org/2000/svg" width="47.711" height="47.711" viewBox="0 0 47.711 47.711">
<path id="Path_3958" data-name="Path 3958" d="M31.6,33a3.209,3.209,0,0,0-2.006-.515H16.277c-3.98,0-7.4-2.993-7.4-6.791V14.133H8.673a5.211,5.211,0,0,0-5.3,5.218V34.134c0,2.868,2.455,4.657,5.471,4.657h1.869V44.3l6.091-5.161a2.432,2.432,0,0,1,1.514-.344h10.3c2.638,0,5.437-1.308,5.952-3.67L31.6,33Z" transform="translate(-3.375 3.415)" fill=${
  whiteLabel().feature_card_icon_fill
}/>
<path id="Path_3959" data-name="Path 3959" d="M40.31,3.375H15.388C11.409,3.375,9,6.448,9,10.234v19.29a7.04,7.04,0,0,0,7.192,6.882h11.6a3.147,3.147,0,0,1,2.006.481l8.567,6.859v-7.34H40.31a7.06,7.06,0,0,0,7.226-6.87v-19.3A7.052,7.052,0,0,0,40.31,3.375Z" transform="translate(0.175 -3.375)" fill=${
  whiteLabel().feature_card_icon_fill
}/>
</svg>
`;

const Sales_Pipeline_feature_Card = `<svg id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" xmlns="http://www.w3.org/2000/svg" width="54.239" height="54.239" viewBox="0 0 54.239 54.239">
<path id="Path_4228" data-name="Path 4228" d="M0,0H54.239V54.239H0Z" fill="none"/>
<path id="Path_4229" data-name="Path 4229" d="M18.82,33.12h9.04V28.6H18.82ZM3,6v4.52H43.679V6ZM9.78,21.82H36.9V17.3H9.78Z" transform="translate(3.78 7.56)" fill=${
  whiteLabel().feature_card_icon_fill
}/>
</svg>
`;

const Arrow_feature_Card = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39">
<g id="Group_5046" data-name="Group 5046" transform="translate(-320 -168.999)">
  <path id="View_all_location_information_-_" data-name="View all location information -&gt;" d="M26.752-3.584V-8.7H1.792v-2.432h24.96v-5.12L33.088-9.92Z" transform="translate(322.207 198.255)" fill=${
    whiteLabel().helpText
  }/>
  <rect id="Rectangle_3013" data-name="Rectangle 3013" width="40" height="39" transform="translate(320 168.999)" fill="none"/>
</g>
</svg>
`;
const Calendar_Previous = `<svg xmlns="http://www.w3.org/2000/svg" width="24.319" height="58.664" viewBox="0 0 24.319 58.664">
<path id="chevron-back" d="M31.272,7.875,12.938,33.721,31.272,59.568" transform="translate(-10.438 -4.389)" fill="none" stroke="#133c8b" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
</svg>
`;

const Calendar_Next = `<svg xmlns="http://www.w3.org/2000/svg" width="24.319" height="58.664" viewBox="0 0 24.319 58.664">
<path id="chevron-back" d="M18.334,0,0,25.846,18.334,51.693" transform="translate(21.819 55.178) rotate(180)" fill="none" stroke="#133c8b" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
</svg>
`;

const Time_Up = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>`;
const Time_Down = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>`;
const File = `<svg id="description_black_24dp_2_" data-name="description_black_24dp (2)" xmlns="http://www.w3.org/2000/svg" width="76.154" height="76.155" viewBox="0 0 76.154 76.155">
<path id="Path_4109" data-name="Path 4109" d="M0,0H76.154V76.155H0Z" fill="none"/>
<path id="Path_4110" data-name="Path 4110" d="M16.692,46.424H42.077V52.77H16.692Zm0-12.692H42.077v6.346H16.692ZM35.731,2H10.346A6.365,6.365,0,0,0,4,8.346v50.77a6.338,6.338,0,0,0,6.314,6.346H48.423a6.365,6.365,0,0,0,6.346-6.346V21.039ZM48.423,59.116H10.346V8.346H32.558V24.212H48.423Z" transform="translate(8.692 4.346)" fill=${actionIconBackground}/>
</svg>
`;
const File_Upload = `<svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 129 129">
<g id="file_upload_black_24dp" transform="translate(-0.256 -0.311)">
  <g id="Group_4459" data-name="Group 4459" transform="translate(0 0)">
    <rect id="Rectangle_2420" data-name="Rectangle 2420" width="129" height="129" transform="translate(0.256 0.311)" fill="none"/>
  </g>
  <g id="Group_4460" data-name="Group 4460" transform="translate(21.891 21.891)">
    <path id="Path_4199" data-name="Path 4199" d="M78.9,62.848V78.9H14.7V62.848H4V78.9A10.731,10.731,0,0,0,14.7,89.6H78.9A10.731,10.731,0,0,0,89.6,78.9V62.848Zm-58.848-32.1,7.543,7.543,13.856-13.8V68.2h10.7V24.49L66,38.292l7.543-7.543L46.8,4Z" transform="translate(-4 -4)" fill=${actionIconBackground}/>
  </g>
</g>
</svg>
`;
const Check_Circle = `<svg id="check_circle_black_24dp_2_" data-name="check_circle_black_24dp (2)" xmlns="http://www.w3.org/2000/svg" width="78.352" height="78.352" viewBox="0 0 78.352 78.352">
<path id="Path_4183" data-name="Path 4183" d="M0,0H78.352V78.352H0Z" fill="none"/>
<path id="Path_4184" data-name="Path 4184" d="M34.646,2A32.646,32.646,0,1,0,67.293,34.646,32.658,32.658,0,0,0,34.646,2Zm0,58.764A26.117,26.117,0,1,1,60.764,34.646,26.152,26.152,0,0,1,34.646,60.764ZM49.631,20.217,28.117,41.731l-8.455-8.423-4.6,4.6L28.117,50.97,54.234,24.853Z" transform="translate(4.529 4.529)" fill=${actionIconBackground}/>
</svg>
`;
const Chevron_Back = `<svg xmlns="http://www.w3.org/2000/svg" 
width="25.16" height="45.32" viewBox="0 0 25.16 45.32">
  <path id="chevron-back" d="M32.062,7.875,12.938,27,32.062,46.124" 
  transform="translate(-10.438 -4.34)" fill="none" 
  stroke=${actionIconBackground} stroke-linecap="round" 
  stroke-linejoin="round" stroke-width="5" />
</svg>
`;
const Slider_Arrow_Right = `<svg xmlns="http://www.w3.org/2000/svg" width="28.357" height="57.75" viewBox="0 0 28.357 57.75">
  <path id="chevron-back-sharp" d="M21.728,0,0,25l21.728,25" transform="translate(25.607 53.87) rotate(180)" fill="none" stroke=${actionIconBackground} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5.5"/>
</svg>`;
const Slider_Arrow_Left = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.357 57.75">
  <path id="chevron-back-sharp" d="M21.728,0,0,25l21.728,25" transform="translate(2.75 3.88)" fill="none" stroke=${actionIconBackground} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="5.5"/>
</svg>`;

const Scan_Icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98">
  <g id="Group_5347" data-name="Group 5347" transform="translate(-979 -18.114)">
    <rect id="Rectangle_2047" data-name="Rectangle 2047" width="98" height="98" rx="7" transform="translate(979 18.114)" fill=${actionIconBackground}/>
    <g id="upc-scan" transform="translate(1002.79 41.413)">
      <path id="Path_3975" data-name="Path 3975" d="M4.994,3.329A1.665,1.665,0,0,0,3.329,4.994v9.988a1.665,1.665,0,0,1-3.329,0V4.994A4.994,4.994,0,0,1,4.994,0h9.988a1.665,1.665,0,0,1,0,3.329ZM36.621,1.665A1.665,1.665,0,0,1,38.286,0h9.988a4.994,4.994,0,0,1,4.994,4.994v9.988a1.665,1.665,0,1,1-3.329,0V4.994a1.665,1.665,0,0,0-1.665-1.665H38.286A1.665,1.665,0,0,1,36.621,1.665ZM1.665,36.621a1.665,1.665,0,0,1,1.665,1.665v9.988a1.665,1.665,0,0,0,1.665,1.665h9.988a1.665,1.665,0,1,1,0,3.329H4.994A4.994,4.994,0,0,1,0,48.273V38.286a1.665,1.665,0,0,1,1.665-1.665Zm49.938,0a1.665,1.665,0,0,1,1.665,1.665v9.988a4.994,4.994,0,0,1-4.994,4.994H38.286a1.665,1.665,0,1,1,0-3.329h9.988a1.665,1.665,0,0,0,1.665-1.665V38.286A1.665,1.665,0,0,1,51.6,36.621Z" fill=${actionIconFill} fill-rule="evenodd"/>
      <path id="Path_3976" data-name="Path 3976" d="M6.75,10.665a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0A1.665,1.665,0,0,1,28.39,9h3.329a1.665,1.665,0,0,1,1.665,1.665v23.3a1.665,1.665,0,0,1-1.665,1.665H28.39a1.665,1.665,0,0,1-1.665-1.665Zm9.988,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Z" transform="translate(3.238 4.317)" fill=${actionIconFill}/>
    </g>
  </g>
</svg>`;
export default ({icon, width = '100%', height = '100%', style = {}}) => (
  <Fragment>
    {icon == 'Round_Btn_Default_Dark' && (
      <SvgXml
        style={style}
        xml={Round_Btn_Default_Dark}
        width={width}
        height={height}
      />
    )}
    {icon == 'DISPOSITION_POST' && (
      <SvgXml
        style={style}
        xml={DISPOSITION_POST}
        width={width}
        height={height}
      />
    )}
    {icon == 'Drop_Down' && (
      <SvgXml style={style} xml={Drop_Down} width={width} height={height} />
    )}
    {icon == 'Person_Sharp' && (
      <SvgXml style={style} xml={Person_Sharp} width={width} height={height} />
    )}
    {icon == 'Person_Sharp_White' && (
      <SvgXml
        style={style}
        xml={Person_Sharp_White}
        width={width}
        height={height}
      />
    )}
    {icon == 'Camera' && (
      <SvgXml style={style} xml={Camera} width={width} height={height} />
    )}
    {icon == 'ChatBoxes' && (
      <SvgXml style={style} xml={ChatBoxes} width={width} height={height} />
    )}
    {icon == 'Exclamation_Triangle_Fill' && (
      <SvgXml
        style={style}
        xml={Exclamation_Triangle_Fill}
        width={width}
        height={height}
      />
    )}
    {icon == 'Form' && (
      <SvgXml style={style} xml={Form} width={width} height={height} />
    )}
    {icon == 'Form_inactive' && (
      <SvgXml style={style} xml={Form_inactive} width={width} height={height} />
    )}
    {icon == 'Sale' && (
      <SvgXml style={style} xml={Sale} width={width} height={height} />
    )}
    {icon == 'Sale_inactive' && (
      <SvgXml style={style} xml={Sale_inactive} width={width} height={height} />
    )}
    {icon == 'Geo' && (
      <SvgXml style={style} xml={Geo} width={width} height={height} />
    )}
    {icon == 'Location_Arrow_White' && (
      <SvgXml
        style={style}
        xml={Location_Arrow_White}
        width={width}
        height={height}
      />
    )}
    {icon == 'Filter' && (
      <SvgXml style={style} xml={Filter} width={width} height={height} />
    )}
    {icon == 'Filter_GRAY' && (
      <SvgXml style={style} xml={Filter_GRAY} width={width} height={height} />
    )}
    {icon == 'Location_Arrow' && (
      <SvgXml
        style={style}
        xml={Location_Arrow}
        width={width}
        height={height}
      />
    )}
    {icon == 'Location_Arrow_Gray' && (
      <SvgXml
        style={style}
        xml={Location_Arrow_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Home_Black_Gray' && (
      <SvgXml
        style={style}
        xml={Home_Black_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Home_Black' && (
      <SvgXml style={style} xml={Home_Black} width={width} height={height} />
    )}
    {icon == 'Android_More_Horizontal' && (
      <SvgXml
        style={style}
        xml={Android_More_Horizontal}
        width={width}
        height={height}
      />
    )}
    {icon == 'Android_More_Horizontal_Gray' && (
      <SvgXml
        style={style}
        xml={Android_More_Horizontal_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Calendar_Event_Fill_Gray' && (
      <SvgXml
        style={style}
        xml={Calendar_Event_Fill_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Calendar_Event_Fill' && (
      <SvgXml
        style={style}
        xml={Calendar_Event_Fill}
        width={width}
        height={height}
      />
    )}
    {icon == 'Pipeline_Gray' && (
      <SvgXml style={style} xml={Pipeline_Gray} width={width} height={height} />
    )}
    {icon == 'Pipeline' && (
      <SvgXml style={style} xml={Pipeline} width={width} height={height} />
    )}
    {icon == 'Travel_Explore_Gray' && (
      <SvgXml
        style={style}
        xml={Travel_Explore_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Travel_Explore' && (
      <SvgXml
        style={style}
        xml={Travel_Explore}
        width={width}
        height={height}
      />
    )}
    {icon == 'Ballot_Gray' && (
      <SvgXml style={style} xml={Ballot_Gray} width={width} height={height} />
    )}
    {icon == 'Ballot' && (
      <SvgXml style={style} xml={Ballot} width={width} height={height} />
    )}
    {icon == 'Insert_Invitation' && (
      <SvgXml
        style={style}
        xml={Insert_Invitation}
        width={width}
        height={height}
      />
    )}
    {icon == 'Green_Star' && (
      <SvgXml style={style} xml={Green_Star} width={width} height={height} />
    )}
    {icon == 'Check' && (
      <SvgXml style={style} xml={Check} width={width} height={height} />
    )}
    {icon == 'Close' && (
      <SvgXml style={style} xml={Close} width={width} height={height} />
    )}
    {icon == 'Account_Circle' && (
      <SvgXml
        style={style}
        xml={Account_Circle}
        width={width}
        height={height}
      />
    )}
    {icon == 'Cloud_Off' && (
      <SvgXml style={style} xml={Cloud_Off} width={width} height={height} />
    )}
    {icon == 'Support_Agent' && (
      <SvgXml style={style} xml={Support_Agent} width={width} height={height} />
    )}
    {icon == 'Support_Agent_Gray' && (
      <SvgXml
        style={style}
        xml={Support_Agent_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Angle_Left' && (
      <SvgXml style={style} xml={Angle_Left} width={width} height={height} />
    )}
    {icon == 'Description' && (
      <SvgXml style={style} xml={Description} width={width} height={height} />
    )}
    {icon == 'Wallpaper' && (
      <SvgXml style={style} xml={Wallpaper} width={width} height={height} />
    )}
    {icon == 'Video_Library' && (
      <SvgXml style={style} xml={Video_Library} width={width} height={height} />
    )}
    {icon == 'Path' && (
      <SvgXml style={style} xml={Path} width={width} height={height} />
    )}
    {icon == 'Contact_Mail' && (
      <SvgXml style={style} xml={Contact_Mail} width={width} height={height} />
    )}
    {icon == 'WhatsApp' && (
      <SvgXml style={style} xml={WhatsApp} width={width} height={height} />
    )}
    {icon == 'Quiz' && (
      <SvgXml style={style} xml={Quiz} width={width} height={height} />
    )}
    {icon == 'File_Download' && (
      <SvgXml style={style} xml={File_Download} width={width} height={height} />
    )}
    {icon == 'Right_Arrow' && (
      <SvgXml style={style} xml={Right_Arrow} width={width} height={height} />
    )}
    {icon == 'Item_Selected' && (
      <SvgXml style={style} xml={Item_Selected} width={width} height={height} />
    )}
    {icon == 'Calendar_Optimize' && (
      <SvgXml
        style={style}
        xml={Calendar_Optimize}
        width={width}
        height={height}
      />
    )}
    {icon == 'Arrow_Right' && (
      <SvgXml style={style} xml={Arrow_Right} width={width} height={height} />
    )}
    {icon == 'Add_Image' && (
      <SvgXml style={style} xml={Add_Image} width={width} height={height} />
    )}
    {icon == 'Arrow_Left_Btn' && (
      <SvgXml style={style} xml={Arrow_Left} width={width} height={height} />
    )}
    {icon == 'Arrow_Left_Btn_alt' && (
      <SvgXml
        style={style}
        xml={Arrow_Left_alt}
        width={width}
        height={height}
      />
    )}
    {icon == 'Arrow_Right_Btn' && (
      <SvgXml
        style={style}
        xml={Arrow_Right_Button}
        width={width}
        height={height}
      />
    )}
    {icon == 'Arrow_Right_Btn_alt' && (
      <SvgXml
        style={style}
        xml={Arrow_Right_Button_alt}
        width={width}
        height={height}
      />
    )}
    {icon == 'GPS_LOCATION' && (
      <SvgXml style={style} xml={GPS_LOCATION} width={width} height={height} />
    )}
    {icon == 'Add_Image_Gray' && (
      <SvgXml
        style={style}
        xml={Add_Image_Gray}
        width={width}
        height={height}
      />
    )}
    {icon == 'Roop_Gray' && (
      <SvgXml style={style} xml={Roop_Gray} width={width} height={height} />
    )}
    {icon == 'Forms_Red_Compulsory' && (
      <SvgXml
        style={style}
        xml={Forms_Red_Compulsory}
        width={width}
        height={height}
      />
    )}
    {icon == 'Forms_Green_Done' && (
      <SvgXml
        style={style}
        xml={Forms_Green_Done}
        width={width}
        height={height}
      />
    )}
    {icon == 'Re_loop' && (
      <SvgXml style={style} xml={Re_loop} width={width} height={height} />
    )}
    {icon == 'Logout' && (
      <SvgXml style={style} xml={Logout} width={width} height={height} />
    )}
    {icon == 'Faq' && (
      <SvgXml style={style} xml={Faq} width={width} height={height} />
    )}
    {icon == 'Signature_Btn_Right_Arrow' && (
      <SvgXml
        style={style}
        xml={Signature_Btn_Right_Arrow}
        width={width}
        height={height}
      />
    )}
    {icon == 'Question_Btn_Done' && (
      <SvgXml
        style={style}
        xml={Question_Btn_Done}
        width={width}
        height={height}
      />
    )}
    {icon == 'Question_Calendar' && (
      <SvgXml
        style={style}
        xml={Question_Calendar}
        width={width}
        height={height}
      />
    )}
    {icon == 'Angle_Left_form' && (
      <SvgXml
        style={style}
        xml={Angle_Left_form}
        width={width}
        height={height}
      />
    )}
    {icon == 'Person_Sharp_feature_card' && (
      <SvgXml
        style={style}
        xml={Person_Sharp_feature_card}
        width={width}
        height={height}
      />
    )}
    {icon == 'Form_feature_card' && (
      <SvgXml
        style={style}
        xml={Form_feature_card}
        width={width}
        height={height}
      />
    )}
    {icon == 'Sales_Pipeline_feature_Card' && (
      <SvgXml
        style={style}
        xml={Sales_Pipeline_feature_Card}
        width={width}
        height={height}
      />
    )}
    {icon == 'Arrow_feature_Card' && (
      <SvgXml
        style={style}
        xml={Arrow_feature_Card}
        width={width}
        height={height}
      />
    )}
    {icon == 'Yes_No_Button_Check' && (
      <SvgXml
        style={style}
        xml={Yes_No_Button_Check}
        width={width}
        height={height}
      />
    )}
    {icon == 'Calendar_Previous' && (
      <SvgXml
        style={style}
        xml={Calendar_Previous}
        width={width}
        height={height}
      />
    )}
    {icon == 'Calendar_Next' && (
      <SvgXml style={style} xml={Calendar_Next} width={width} height={height} />
    )}
    {icon == 'Time_Up' && (
      <SvgXml style={style} xml={Time_Up} width={width} height={height} />
    )}
    {icon == 'Time_Down' && (
      <SvgXml style={style} xml={Time_Down} width={width} height={height} />
    )}
    {icon == 'Activity_Comments' && (
      <SvgXml
        style={style}
        xml={Activity_Comments}
        width={width}
        height={height}
      />
    )}
    {icon == 'File' && (
      <SvgXml style={style} xml={File} width={width} height={height} />
    )}
    {icon == 'File_Upload' && (
      <SvgXml style={style} xml={File_Upload} width={width} height={height} />
    )}
    {icon == 'Check_Circle' && (
      <SvgXml style={style} xml={Check_Circle} width={width} height={height} />
    )}
    {icon == 'Chevron_Back' && (
      <SvgXml style={style} xml={Chevron_Back} width={width} height={height} />
    )}
    {icon == 'Slider_Arrow_Right' && (
      <SvgXml
        style={style}
        xml={Slider_Arrow_Right}
        width={width}
        height={height}
      />
    )}
    {icon == 'Slider_Arrow_Left' && (
      <SvgXml
        style={style}
        xml={Slider_Arrow_Left}
        width={width}
        height={height}
      />
    )}
    {icon == 'Scan_Icon' && (
      <SvgXml style={style} xml={Scan_Icon} width={width} height={height} />
    )}
  </Fragment>
);
