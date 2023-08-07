import React, { Fragment } from 'react';
import { SvgXml } from 'react-native-svg';
import Colors, { whiteLabel } from '../constants/Colors';

const actionIconBackground = whiteLabel().clickButtonBackground;
const actionIconFill = whiteLabel().clickButtonFill;
const actionButtonIconFill = whiteLabel().actionFullButtonIcon;
const navIconActive = whiteLabel().activeIcon;
const navIconInActive = whiteLabel().inactiveIcon;
const selectedIcon = whiteLabel().itemSelectedIconFill;
const actionFullButtonIconFill = whiteLabel().actionFullButtonBackground;
const actionOutlineButtonText = whiteLabel().actionOutlineButtonText;
const buttonInActive = Colors.skeletonColor;

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

const Round_Btn_Default_Dark_Gray = `
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
        <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill=${buttonInActive}/>
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
    <path id="Path_3947" data-name="Path 3947" d="M26.99,21.37a6.745,6.745,0,1,1-6.745-6.745A6.745,6.745,0,0,1,26.99,21.37Z" transform="translate(3.364 -1.135)" fill="${actionIconBackground}"/>
    <path id="Path_3948" data-name="Path 3948" d="M44.406,12.37H38.189a1.533,1.533,0,0,1-1.013-.528L34.442,7.527a1.635,1.635,0,0,0-.144-.195A4.705,4.705,0,0,0,30.7,5.625h-9.7a4.7,4.7,0,0,0-3.591,1.709,1.636,1.636,0,0,0-.144.195L14.54,11.85a1.38,1.38,0,0,1-.908.528v-.844a1.686,1.686,0,0,0-1.686-1.686H9.415a1.686,1.686,0,0,0-1.686,1.686v.844H7.308a5.065,5.065,0,0,0-5.059,5.059V37.663a5.065,5.065,0,0,0,5.059,5.059H44.4a5.065,5.065,0,0,0,5.059-5.059V17.429A5.065,5.065,0,0,0,44.4,12.37ZM25.858,35.977A10.117,10.117,0,1,1,35.975,25.86,10.117,10.117,0,0,1,25.858,35.977Z" transform="translate(-2.249 -5.625)" fill="${actionIconBackground}"/>
  </svg>
`;
const Camera_Icon = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72" height="72" viewBox="0 0 72 72">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_3076" data-name="Rectangle 3076" width="59.129" height="47.059" transform="translate(0 0)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Group_5601" data-name="Group 5601" transform="translate(-1010 -1552)">
      <rect id="Rectangle_3074" data-name="Rectangle 3074" width="72" height="72" rx="9" transform="translate(1010 1552)" fill="#133c8b"/>
      <g id="Group_5108" data-name="Group 5108" transform="translate(1016.436 1564.471)">
        <g id="Group_5108-2" data-name="Group 5108" clip-path="url(#clip-path)">
          <path id="Path_5358" data-name="Path 5358" d="M.018,20.607V41.642a5.484,5.484,0,0,0,0,.639A5.05,5.05,0,0,0,5.334,47.05H30.457c7.811,0,15.595,0,23.292-.005a6.03,6.03,0,0,0,.632,0,5.052,5.052,0,0,0,4.739-5.349l0-21.1H43.056A15.136,15.136,0,0,1,44.578,27.4a14.823,14.823,0,0,1-1.739,6.818,15.006,15.006,0,0,1-21.814,5.328,14.644,14.644,0,0,1-5.537-7.15,15.081,15.081,0,0,1,.566-11.79Z" fill="#fff"/>
          <path id="Path_5359" data-name="Path 5359" d="M8.592,17.738c2.769,0,5.571,0,8.342.022h.05a1.946,1.946,0,0,0,1.534-.671,15.163,15.163,0,0,1,11.176-4.9,14.986,14.986,0,0,1,11.052,5.028,1.485,1.485,0,0,0,1.187.539c3.949-.014,7.922-.014,11.763-.014h4.539c.191,0,.376-.011.57-.023l.315-.018V12.664c.005-.137.005-.242,0-.347a5.073,5.073,0,0,0-5.186-4.959c-.449,0-.855,0-1.279,0H51.643l.032-1.311a.82.82,0,0,0-.206-.662.823.823,0,0,0-.615-.175c-.8.033-1.57.033-2.575.005a.8.8,0,0,0-.634.2.755.755,0,0,0-.162.547l.009,1.4-1.009-.009c-.6-.005-1.164-.009-1.736.011l-.8.028-.206-.769c-.37-1.389-.771-2.743-1.116-3.89A3.481,3.481,0,0,0,39.069.007C32.928,0,26.585,0,20.17.008a3.538,3.538,0,0,0-3.649,2.71L16.3,3.43c-.306,1.017-.618,2.05-.863,3.08l-.245.851-.894,0C11.45,7.332,8.509,7.328,5.3,7.356A5.046,5.046,0,0,0,.05,12.015C-.018,13.283,0,14.554.016,15.9c.008.6.015,1.217.015,1.84H4.893l3.7,0" fill="#fff"/>
          <path id="Path_5360" data-name="Path 5360" d="M29.473,37.991A10.764,10.764,0,0,1,18.792,27.145c0-.071,0-.142,0-.214a10.774,10.774,0,1,1,10.677,11.06M23.094,27.2a6.5,6.5,0,0,0,6.484,6.507H29.6a6.5,6.5,0,0,0,6.453-6.547v-.016a6.482,6.482,0,0,0-12.963.056Z" fill="#fff"/>
        </g>
      </g>
    </g>
  </svg>
`;
const ChatBoxes = `
  <svg id="chatboxes" xmlns="http://www.w3.org/2000/svg" width="47.711" height="47.711" viewBox="0 0 47.711 47.711">
    <path id="Path_3958" data-name="Path 3958" d="M31.6,33a3.209,3.209,0,0,0-2.006-.515H16.277c-3.98,0-7.4-2.993-7.4-6.791V14.133H8.673a5.211,5.211,0,0,0-5.3,5.218V34.134c0,2.868,2.455,4.657,5.471,4.657h1.869V44.3l6.091-5.161a2.432,2.432,0,0,1,1.514-.344h10.3c2.638,0,5.437-1.308,5.952-3.67L31.6,33Z" transform="translate(-3.375 3.415)" fill="${actionIconBackground}"/>
    <path id="Path_3959" data-name="Path 3959" d="M40.31,3.375H15.388C11.409,3.375,9,6.448,9,10.234v19.29a7.04,7.04,0,0,0,7.192,6.882h11.6a3.147,3.147,0,0,1,2.006.481l8.567,6.859v-7.34H40.31a7.06,7.06,0,0,0,7.226-6.87v-19.3A7.052,7.052,0,0,0,40.31,3.375Z" transform="translate(0.175 -3.375)" fill="${actionIconBackground}"/>
  </svg>
`;

const Exclamation_Triangle_Fill = `
<svg id="exclamation-triangle-fill" xmlns="http://www.w3.org/2000/svg" width="47.452" height="41.517" viewBox="0 0 47.452 41.517">
  <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)"
    fill="${actionIconBackground}" stroke="none">
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
      <rect id="Rectangle_1646" data-name="Rectangle 1646" width="97" height="98" rx="7" transform="translate(0.476 0.227)" fill=${buttonInActive}/>
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

const Angle_Left_form_blue = `<svg xmlns="http://www.w3.org/2000/svg" width="86.703" height="86.703" viewBox="0 0 86.703 86.703">
<path id="expand_circle_down_FILL1_wght400_GRAD0_opsz48" d="M47.351,61.332,66.1,42.583l-4.66-4.552L47.351,52.12,33.262,38.031,28.6,42.583Zm0,29.371a41.947,41.947,0,0,1-16.8-3.414A43.677,43.677,0,0,1,7.414,64.15,41.946,41.946,0,0,1,4,47.351,42.213,42.213,0,0,1,7.414,30.444,43.325,43.325,0,0,1,16.734,16.68,44.439,44.439,0,0,1,30.553,7.414,41.946,41.946,0,0,1,47.351,4,42.214,42.214,0,0,1,64.258,7.414a43.284,43.284,0,0,1,23.03,23.03A42.214,42.214,0,0,1,90.7,47.351a41.947,41.947,0,0,1-3.414,16.8,44.44,44.44,0,0,1-9.266,13.818,43.325,43.325,0,0,1-13.764,9.321A42.214,42.214,0,0,1,47.351,90.7Z" transform="translate(-4 90.703) rotate(-90)" fill="#133c8b"/>
</svg>`;

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
        <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill=${actionIconBackground}/>
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


const Add_Image = `<svg xmlns="http://www.w3.org/2000/svg" width="222" height="222" viewBox="0 0 222 222">
<g id="Group_5940" data-name="Group 5940" transform="translate(-265.146 -2090.146)">
  <g id="Rectangle_2384" data-name="Rectangle 2384" transform="translate(265.146 2090.146)" fill="none" stroke=${actionIconBackground} stroke-width="5">
    <rect width="222" height="222" rx="17" stroke="none"/>
    <rect x="2.5" y="2.5" width="217" height="217" rx="14.5" fill="none"/>
  </g>
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(298.78 2102.007)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H154.736V154.736H0Z" fill="rgba(0,0,0,0)"/>
    <path id="Path_4181" data-name="Path 4181" d="M14.895,14.895H60.026V2H14.895A12.933,12.933,0,0,0,2,14.895V60.026H14.895ZM53.579,72.921,27.789,105.158h77.368L85.816,79.368,72.727,96.84ZM98.71,43.908a9.671,9.671,0,1,0-9.671,9.671A9.658,9.658,0,0,0,98.71,43.908ZM118.052,2H72.921V14.895h45.131V60.026h12.895V14.895A12.933,12.933,0,0,0,118.052,2Zm0,116.052H72.921v12.895h45.131a12.933,12.933,0,0,0,12.895-12.895V72.921H118.052ZM14.895,72.921H2v45.131a12.933,12.933,0,0,0,12.895,12.895H60.026V118.052H14.895Z" transform="translate(10.895 10.895)" fill=${actionIconBackground}/>
  </g>
  <text id="Checkout" transform="translate(375.146 2287.146)" fill=${actionIconBackground} font-size="37" font-family="SegoeUI, Segoe UI"><tspan x="-89.627" y="0">Add Image</tspan></text>
</g>
</svg>`;

const Add_Image_Compulsory = `<svg xmlns="http://www.w3.org/2000/svg" width="222" height="222" viewBox="0 0 222 222">
<g id="Group_5940" data-name="Group 5940" transform="translate(-265.146 -2090.146)">
  <g id="Rectangle_2384" data-name="Rectangle 2384" transform="translate(265.146 2090.146)" fill="none" stroke="#DC143C" stroke-width="5">
    <rect width="222" height="222" rx="17" stroke="none"/>
    <rect x="2.5" y="2.5" width="217" height="217" rx="14.5" fill="none"/>
  </g>
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(298.78 2102.007)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H154.736V154.736H0Z" fill="rgba(0,0,0,0)"/>
    <path id="Path_4181" data-name="Path 4181" d="M14.895,14.895H60.026V2H14.895A12.933,12.933,0,0,0,2,14.895V60.026H14.895ZM53.579,72.921,27.789,105.158h77.368L85.816,79.368,72.727,96.84ZM98.71,43.908a9.671,9.671,0,1,0-9.671,9.671A9.658,9.658,0,0,0,98.71,43.908ZM118.052,2H72.921V14.895h45.131V60.026h12.895V14.895A12.933,12.933,0,0,0,118.052,2Zm0,116.052H72.921v12.895h45.131a12.933,12.933,0,0,0,12.895-12.895V72.921H118.052ZM14.895,72.921H2v45.131a12.933,12.933,0,0,0,12.895,12.895H60.026V118.052H14.895Z" transform="translate(10.895 10.895)" fill=${actionIconBackground}/>
  </g>
  <text id="Checkout" transform="translate(375.146 2287.146)" fill=${actionIconBackground} font-size="37" font-family="SegoeUI, Segoe UI"><tspan x="-89.627" y="0">Add Image</tspan></text>
</g>
</svg>`;



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
<path id="person-sharp" d="M20.47,20.659a9.2,9.2,0,1,0-9.2-9.2A9.2,9.2,0,0,0,20.47,20.659Zm0,2.63c-5.705,0-17.095,3.524-17.095,10.52v5.26H37.564v-5.26C37.564,26.813,26.175,23.289,20.47,23.289Z" transform="translate(-3.375 -2.25)" fill=${whiteLabel().feature_card_icon_fill
  }/>
</svg>
`;

const Form_feature_card = `<svg id="file-earmark-text-fill" xmlns="http://www.w3.org/2000/svg" width="44.442" height="51.849" viewBox="0 0 44.442 51.849">
<path id="Path_3960" data-name="Path 3960" d="M4.5,9.657A7.407,7.407,0,0,1,11.907,2.25h19.6a3.7,3.7,0,0,1,2.619,1.085L47.857,17.064a3.7,3.7,0,0,1,1.085,2.619V46.692A7.407,7.407,0,0,1,41.535,54.1H11.907A7.407,7.407,0,0,1,4.5,46.692Zm25.925,7.407V5.954L45.239,20.768H34.128A3.7,3.7,0,0,1,30.425,17.064ZM13.759,28.175a1.852,1.852,0,1,0,0,3.7H39.683a1.852,1.852,0,1,0,0-3.7Zm-1.852,9.259a1.852,1.852,0,0,1,1.852-1.852H39.683a1.852,1.852,0,1,1,0,3.7H13.759A1.852,1.852,0,0,1,11.907,37.433Zm0,7.407a1.852,1.852,0,0,1,1.852-1.852H28.573a1.852,1.852,0,0,1,0,3.7H13.759A1.852,1.852,0,0,1,11.907,44.84Z" transform="translate(-4.5 -2.25)" fill=${whiteLabel().feature_card_icon_fill
  } fill-rule="evenodd"/>
</svg>
`;

const Activity_Comments = `<svg id="chatboxes" xmlns="http://www.w3.org/2000/svg" width="47.711" height="47.711" viewBox="0 0 47.711 47.711">
<path id="Path_3958" data-name="Path 3958" d="M31.6,33a3.209,3.209,0,0,0-2.006-.515H16.277c-3.98,0-7.4-2.993-7.4-6.791V14.133H8.673a5.211,5.211,0,0,0-5.3,5.218V34.134c0,2.868,2.455,4.657,5.471,4.657h1.869V44.3l6.091-5.161a2.432,2.432,0,0,1,1.514-.344h10.3c2.638,0,5.437-1.308,5.952-3.67L31.6,33Z" transform="translate(-3.375 3.415)" fill=${whiteLabel().feature_card_icon_fill
  }/>
<path id="Path_3959" data-name="Path 3959" d="M40.31,3.375H15.388C11.409,3.375,9,6.448,9,10.234v19.29a7.04,7.04,0,0,0,7.192,6.882h11.6a3.147,3.147,0,0,1,2.006.481l8.567,6.859v-7.34H40.31a7.06,7.06,0,0,0,7.226-6.87v-19.3A7.052,7.052,0,0,0,40.31,3.375Z" transform="translate(0.175 -3.375)" fill=${whiteLabel().feature_card_icon_fill
  }/>
</svg>
`;

const Sales_Pipeline_feature_Card = `<svg id="filter_list_black_24dp_1_" data-name="filter_list_black_24dp (1)" xmlns="http://www.w3.org/2000/svg" width="54.239" height="54.239" viewBox="0 0 54.239 54.239">
<path id="Path_4228" data-name="Path 4228" d="M0,0H54.239V54.239H0Z" fill="none"/>
<path id="Path_4229" data-name="Path 4229" d="M18.82,33.12h9.04V28.6H18.82ZM3,6v4.52H43.679V6ZM9.78,21.82H36.9V17.3H9.78Z" transform="translate(3.78 7.56)" fill=${whiteLabel().feature_card_icon_fill
  }/>
</svg>
`;

const Arrow_feature_Card = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="39" viewBox="0 0 40 39">
<g id="Group_5046" data-name="Group 5046" transform="translate(-320 -168.999)">
  <path id="View_all_location_information_-_" data-name="View all location information -&gt;" d="M26.752-3.584V-8.7H1.792v-2.432h24.96v-5.12L33.088-9.92Z" transform="translate(322.207 198.255)" fill=${whiteLabel().helpText
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
const Sync = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="205" height="203" viewBox="0 0 205 203">
<g id="Group_5132" data-name="Group 5132" transform="translate(22.065 17.386)"> 
  <path id="Path_3988" data-name="Path 3988" d="M41.172,14.94V1L22.586,19.586,41.172,38.172V24.233A27.9,27.9,0,0,1,69.052,52.112,27.278,27.278,0,0,1,65.8,65.122l6.784,6.784A37.107,37.107,0,0,0,41.172,14.94Zm0,65.052A27.9,27.9,0,0,1,13.293,52.112,27.277,27.277,0,0,1,16.546,39.1L9.762,32.318A37.107,37.107,0,0,0,41.172,89.284v13.94L59.758,84.638,41.172,66.052Z" transform="translate(41.669 26.147)" fill="#fff"/>
</g>
</svg>
`;
const Colored_Sync = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="205" height="203" viewBox="0 0 205 203">
<g id="Group_5132" data-name="Group 5132" transform="translate(22.065 17.386)"> 
  <path id="Path_3988" data-name="Path 3988" d="M41.172,14.94V1L22.586,19.586,41.172,38.172V24.233A27.9,27.9,0,0,1,69.052,52.112,27.278,27.278,0,0,1,65.8,65.122l6.784,6.784A37.107,37.107,0,0,0,41.172,14.94Zm0,65.052A27.9,27.9,0,0,1,13.293,52.112,27.277,27.277,0,0,1,16.546,39.1L9.762,32.318A37.107,37.107,0,0,0,41.172,89.284v13.94L59.758,84.638,41.172,66.052Z" transform="translate(41.669 26.147)" fill=${actionIconBackground}/>
</g>
</svg>
`;

const Up_Arrow2 = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M14.15 30.75 12 28.6 24 16.6 36 28.55 33.85 30.7 24 20.85Z " fill="#9d9fa2" /></svg>`;

const Up_Arrow = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M14.15 30.75 12 28.6 24 16.6 36 28.55 33.85 30.7 24 20.85Z" fill="#9d9fa2"/></svg>`;
const Bottom_Arrow = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"> <path d="M24 30.75 12 18.75 14.15 16.6 24 26.5 33.85 16.65 36 18.8Z" fill="#9d9fa2"/></svg>`;

const Profile_Done = `<svg id="how_to_reg_black_24dp" xmlns="http://www.w3.org/2000/svg" width="55.326" height="55.326" viewBox="0 0 55.326 55.326">
<path id="Path_3995" data-name="Path 3995" d="M0,0H55.326V55.326H0Z" fill="none"/>
<path id="Path_3996" data-name="Path 3996" d="M21.442,22.442a9.221,9.221,0,1,0-9.221-9.221A9.219,9.219,0,0,0,21.442,22.442Zm0-13.832a4.611,4.611,0,1,1-4.611,4.611A4.624,4.624,0,0,1,21.442,8.611ZM7.611,36.274c.461-1.452,5.925-3.873,11.434-4.472l4.7-4.611a21.533,21.533,0,0,0-2.305-.138C15.287,27.053,3,30.142,3,36.274v4.611H23.747l-4.611-4.611ZM43.573,23.595,31.747,35.513l-4.772-4.795-3.227,3.25,8,8.068L46.8,26.845Z" transform="translate(3.916 5.221)" fill="#fff"/>
</svg>
`;
const Hour_Glass = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
<g id="hourglass_bottom_black_24dp" transform="translate(-0.13 0.198)">
  <g id="Group_4141" data-name="Group 4141" transform="translate(0 0)">
    <rect id="Rectangle_2053" data-name="Rectangle 2053" width="45" height="45" transform="translate(0.13 -0.198)" fill="none"/>
  </g>
  <g id="Group_4142" data-name="Group 4142" transform="translate(10.956 4.485)">
    <path id="Path_3997" data-name="Path 3997" d="M27.911,38.519l-.018-10.956-7.286-7.3,7.286-7.322L27.911,2H6V12.956l7.3,7.3L6,27.545V38.519ZM9.652,12.043V5.652H24.26v6.391l-7.3,7.3Z" transform="translate(-6 -2)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const Activity = `<svg id="leaderboard_black_24dp" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
<rect id="Rectangle_2933" data-name="Rectangle 2933" width="46" height="46" fill="none"/>
<g id="Group_4903" data-name="Group 4903" transform="translate(3.807 5.711)">
  <path id="Path_5276" data-name="Path 5276" d="M28.652,18.23V3H13.422V14.422H2V37.267H40.074V18.23ZM17.23,6.807h7.615V33.459H17.23ZM5.807,18.23h7.615v15.23H5.807Zm30.459,15.23H28.652V22.037h7.615Z" transform="translate(-2 -3)" fill="${actionIconBackground}"/>
</g>
</svg>
`;
const Activity_Items = `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
<g id="Group_5155" data-name="Group 5155" transform="translate(-61.427 -1754.392)">
  <path id="Path_5277" data-name="Path 5277" d="M34.459,24.037H4V20.23H34.459Zm0,3.807H4v3.807H34.459ZM24.941,16.422l9.519-6.758V5l-9.519,6.758L15.422,5,4,11.968v4.455L15.27,9.55Z" transform="translate(65.197 1758)" fill="${actionIconBackground}"/>
  <rect id="Rectangle_3115" data-name="Rectangle 3115" width="46" height="46" transform="translate(61.427 1754.392)" fill="none"/>
</g>
</svg>
`;
const Stock = `<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
<g id="Group_5331" data-name="Group 5331" transform="translate(-16127.548 -9163.547)">
  <g id="inventory_2_black_24dp_1_" data-name="inventory_2_black_24dp (1)" transform="translate(16128 9164)">
    <g id="Group_5331-2" data-name="Group 5331" transform="translate(0 0)">
      <rect id="Rectangle_3236" data-name="Rectangle 3236" width="71" height="71" transform="translate(-0.452 -0.453)" fill="none"/>
    </g>
    <g id="Group_5333" data-name="Group 5333" transform="translate(5.827 5.982)">
      <g id="Group_5332" data-name="Group 5332">
      <rect id="Rectangle_3237" data-name="Rectangle 3237" width="17" height="5" transform="translate(20.721 29.565)" fill="${navIconActive}"/>
      <path id="Path_5433" data-name="Path 5433" d="M54.455,2H7.828A6.043,6.043,0,0,0,2,7.828V16.6a5.887,5.887,0,0,0,2.914,4.925v32.93a6.262,6.262,0,0,0,5.828,5.828h40.8a6.262,6.262,0,0,0,5.828-5.828V21.525A5.887,5.887,0,0,0,60.284,16.6V7.828A6.043,6.043,0,0,0,54.455,2ZM51.541,54.455h-40.8V22.4h40.8Zm2.914-37.884H7.828V7.828H54.455Z" transform="translate(-2 -2)" fill="${navIconActive}"/>
      </g>
    </g>
  </g>
</g>
</svg>
`;
const Stock_Gray = `<svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71">
<g id="Group_5331" data-name="Group 5331" transform="translate(-16127.548 -9163.547)">
  <g id="inventory_2_black_24dp_1_" data-name="inventory_2_black_24dp (1)" transform="translate(16128 9164)">
    <g id="Group_5331-2" data-name="Group 5331" transform="translate(0 0)">
      <rect id="Rectangle_3236" data-name="Rectangle 3236" width="71" height="71" transform="translate(-0.452 -0.453)" fill="none"/>
    </g>
    <g id="Group_5333" data-name="Group 5333" transform="translate(5.827 5.982)">
      <g id="Group_5332" data-name="Group 5332">
      <rect id="Rectangle_3237" data-name="Rectangle 3237" width="17" height="5" transform="translate(20.721 29.565)" fill="${navIconInActive}"/>
      <path id="Path_5433" data-name="Path 5433" d="M54.455,2H7.828A6.043,6.043,0,0,0,2,7.828V16.6a5.887,5.887,0,0,0,2.914,4.925v32.93a6.262,6.262,0,0,0,5.828,5.828h40.8a6.262,6.262,0,0,0,5.828-5.828V21.525A5.887,5.887,0,0,0,60.284,16.6V7.828A6.043,6.043,0,0,0,54.455,2ZM51.541,54.455h-40.8V22.4h40.8Zm2.914-37.884H7.828V7.828H54.455Z" transform="translate(-2 -2)" fill="${navIconInActive}"/>
      </g>
    </g>
  </g>
</g>
</svg>
`;

const Add_Stock = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.718" height="202.718" viewBox="0 0 202.718 202.718">
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
<g id="Group_5321" data-name="Group 5321" transform="translate(-668.641 -2074.924)">
  <g id="Round_Btn_Default_Dark" data-name="Round Btn Default Dark" transform="translate(686.641 2089.924)">
    <g transform="matrix(1, 0, 0, 1, -18, -15)" filter="url(#teal_circle)">
      <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill="${actionIconBackground}"/>
    </g>
    <g id="Group_332" data-name="Group 332" transform="translate(0.001)" opacity="0.12">
      <path id="gradient_border_2" data-name="gradient border 2" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient)"/>
      <path id="gradient_border_1" data-name="gradient border 1" d="M3486.358,960.488a81.87,81.87,0,1,1-81.871,81.87,81.87,81.87,0,0,1,81.871-81.87m0-1.489a83.359,83.359,0,1,0,83.359,83.359A83.359,83.359,0,0,0,3486.358,959Z" transform="translate(-3403 -959)" fill="url(#linear-gradient-2)"/>
    </g>
  </g>
  <g id="qr_code_scanner_black_24dp" transform="translate(730.236 2133.52)">
    <rect id="Rectangle_3072" data-name="Rectangle 3072" width="79.523" height="79.523" transform="translate(0.002 0.002)" fill="none"/>
    <path id="Path_5354" data-name="Path 5354" d="M26.853,16.912v9.941H16.912V16.912h9.941m4.971-4.971H11.941V31.823H31.823V11.941Zm-4.971,31.48v9.941H16.912V43.421h9.941m4.971-4.971H11.941V58.333H31.823V38.451ZM53.362,16.912v9.941H43.421V16.912h9.941m4.971-4.971H38.451V31.823H58.333V11.941ZM38.451,38.451h4.971v4.971H38.451Zm4.971,4.971h4.971v4.971H43.421Zm4.971-4.971h4.971v4.971H48.392Zm-9.941,9.941h4.971v4.971H38.451Zm4.971,4.971h4.971v4.971H43.421Zm4.971-4.971h4.971v4.971H48.392Zm4.971-4.971h4.971v4.971H53.362Zm0,9.941h4.971v4.971H53.362ZM68.274,18.568H61.646V8.627H51.705V2H68.274Zm0,49.705V51.705H61.646v9.941H51.705v6.627ZM2,68.274H18.568V61.646H8.627V51.705H2ZM2,2V18.568H8.627V8.627h9.941V2Z" transform="translate(4.627 4.627)" fill="#fff"/>
  </g>
</g>
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
const Scan_Icon_Gray = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98">
  <g id="Group_5347" data-name="Group 5347" transform="translate(-979 -18.114)">
    <rect id="Rectangle_2047" data-name="Rectangle 2047" width="98" height="98" rx="7" transform="translate(979 18.114)" fill=${buttonInActive}/>
    <g id="upc-scan" transform="translate(1002.79 41.413)">
      <path id="Path_3975" data-name="Path 3975" d="M4.994,3.329A1.665,1.665,0,0,0,3.329,4.994v9.988a1.665,1.665,0,0,1-3.329,0V4.994A4.994,4.994,0,0,1,4.994,0h9.988a1.665,1.665,0,0,1,0,3.329ZM36.621,1.665A1.665,1.665,0,0,1,38.286,0h9.988a4.994,4.994,0,0,1,4.994,4.994v9.988a1.665,1.665,0,1,1-3.329,0V4.994a1.665,1.665,0,0,0-1.665-1.665H38.286A1.665,1.665,0,0,1,36.621,1.665ZM1.665,36.621a1.665,1.665,0,0,1,1.665,1.665v9.988a1.665,1.665,0,0,0,1.665,1.665h9.988a1.665,1.665,0,1,1,0,3.329H4.994A4.994,4.994,0,0,1,0,48.273V38.286a1.665,1.665,0,0,1,1.665-1.665Zm49.938,0a1.665,1.665,0,0,1,1.665,1.665v9.988a4.994,4.994,0,0,1-4.994,4.994H38.286a1.665,1.665,0,1,1,0-3.329h9.988a1.665,1.665,0,0,0,1.665-1.665V38.286A1.665,1.665,0,0,1,51.6,36.621Z" fill=${actionIconFill} fill-rule="evenodd"/>
      <path id="Path_3976" data-name="Path 3976" d="M6.75,10.665a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Zm6.658,0A1.665,1.665,0,0,1,28.39,9h3.329a1.665,1.665,0,0,1,1.665,1.665v23.3a1.665,1.665,0,0,1-1.665,1.665H28.39a1.665,1.665,0,0,1-1.665-1.665Zm9.988,0a1.665,1.665,0,1,1,3.329,0v23.3a1.665,1.665,0,0,1-3.329,0Z" transform="translate(3.238 4.317)" fill=${actionIconFill}/>
    </g>
  </g>
</svg>`;


const Action_Item = `<svg id="exclamation-triangle-fill" xmlns="http://www.w3.org/2000/svg" width="47.452" height="41.517" viewBox="0 0 47.452 41.517">
<path id="Path_3957" data-name="Path 3957" d="M26.633,3.93a3.35,3.35,0,0,0-5.812,0L.489,38.524a3.46,3.46,0,0,0,2.906,5.24H44.056a3.46,3.46,0,0,0,2.906-5.24ZM23.722,14.112a2.683,2.683,0,0,0-2.669,2.951l1.037,10.4a1.637,1.637,0,0,0,3.262,0l1.037-10.4a2.683,2.683,0,0,0-2.667-2.951ZM23.728,31.9a2.965,2.965,0,1,0,2.965,2.965A2.965,2.965,0,0,0,23.728,31.9Z" transform="translate(-0.001 -2.247)" fill=${actionIconBackground} fill-rule="evenodd"/>
</svg>
`;

const Customer_Sales = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
<g id="paid_black_24dp" transform="translate(0.104 0.104)">
  <g id="Group_5351" data-name="Group 5351">
    <rect id="Rectangle_3241" data-name="Rectangle 3241" width="50" height="50" transform="translate(-0.104 -0.104)" fill="none"/>
  </g>
  <g id="Group_5352" data-name="Group 5352" transform="translate(4.149 4.149)">
    <path id="Path_5444" data-name="Path 5444" d="M22.747,2A20.747,20.747,0,1,0,43.494,22.747,20.755,20.755,0,0,0,22.747,2Zm0,37.345a16.6,16.6,0,1,1,16.6-16.6A16.62,16.62,0,0,1,22.747,39.345ZM24.594,20.88c-3.693-1.224-5.477-1.992-5.477-3.942,0-2.116,2.3-2.884,3.755-2.884a4.009,4.009,0,0,1,3.942,2.78l3.278-1.39a7.107,7.107,0,0,0-5.519-4.627V8.224H20.942v2.614a6.4,6.4,0,0,0-5.436,6.141c0,4.71,4.668,6.037,6.95,6.867,3.278,1.162,4.73,2.22,4.73,4.212,0,2.344-2.178,3.34-4.108,3.34-3.776,0-4.855-3.88-4.979-4.336l-3.444,1.39a8.375,8.375,0,0,0,6.266,6.141V37.27h3.631V34.7c1.079-.187,6.266-1.224,6.266-6.681C30.838,25.133,29.573,22.6,24.594,20.88Z" transform="translate(-2 -2)" fill="${actionIconBackground}"/>
  </g>
</g>
</svg>
`;

const Drop_Up = `<svg xmlns="http://www.w3.org/2000/svg" width="65" height="66" viewBox="0 0 65 66">
<g id="Group_5325" data-name="Group 5325" transform="translate(65 66.188) rotate(180)">
  <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(0 0.188)" fill="none" stroke="${navIconInActive}" stroke-width="4">
    <ellipse cx="32.5" cy="33" rx="32.5" ry="33" stroke="none"/>
    <ellipse cx="32.5" cy="33" rx="30.5" ry="31" fill="none"/>
  </g>
  <path id="chevron-back-sharp" d="M9.981,0,0,9.981l9.981,9.981" transform="translate(22.313 38.287) rotate(-90)" fill="none" stroke="${navIconInActive}" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
</g>
</svg>
`;

const Shoping_Card = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M14.35 43.95Q12.85 43.95 11.8 42.9Q10.75 41.85 10.75 40.35Q10.75 38.85 11.8 37.8Q12.85 36.75 14.35 36.75Q15.8 36.75 16.875 37.8Q17.95 38.85 17.95 40.35Q17.95 41.85 16.9 42.9Q15.85 43.95 14.35 43.95ZM34.35 43.95Q32.85 43.95 31.8 42.9Q30.75 41.85 30.75 40.35Q30.75 38.85 31.8 37.8Q32.85 36.75 34.35 36.75Q35.8 36.75 36.875 37.8Q37.95 38.85 37.95 40.35Q37.95 41.85 36.9 42.9Q35.85 43.95 34.35 43.95ZM11.75 10.95 17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35L37.9 10.95Q37.9 10.95 37.9 10.95Q37.9 10.95 37.9 10.95ZM10.25 7.95H39.7Q41.3 7.95 41.725 8.925Q42.15 9.9 41.45 11.1L34.7 23.25Q34.2 24.1 33.3 24.725Q32.4 25.35 31.35 25.35H16.2L13.4 30.55Q13.4 30.55 13.4 30.55Q13.4 30.55 13.4 30.55H37.95V33.55H13.85Q11.75 33.55 10.825 32.15Q9.9 30.75 10.85 29L14.05 23.1L6.45 7H2.55V4H8.4ZM17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35Z" fill="${actionIconBackground}"/></svg>`;
const Shoping_Card_Gray = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M14.35 43.95Q12.85 43.95 11.8 42.9Q10.75 41.85 10.75 40.35Q10.75 38.85 11.8 37.8Q12.85 36.75 14.35 36.75Q15.8 36.75 16.875 37.8Q17.95 38.85 17.95 40.35Q17.95 41.85 16.9 42.9Q15.85 43.95 14.35 43.95ZM34.35 43.95Q32.85 43.95 31.8 42.9Q30.75 41.85 30.75 40.35Q30.75 38.85 31.8 37.8Q32.85 36.75 34.35 36.75Q35.8 36.75 36.875 37.8Q37.95 38.85 37.95 40.35Q37.95 41.85 36.9 42.9Q35.85 43.95 34.35 43.95ZM11.75 10.95 17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35L37.9 10.95Q37.9 10.95 37.9 10.95Q37.9 10.95 37.9 10.95ZM10.25 7.95H39.7Q41.3 7.95 41.725 8.925Q42.15 9.9 41.45 11.1L34.7 23.25Q34.2 24.1 33.3 24.725Q32.4 25.35 31.35 25.35H16.2L13.4 30.55Q13.4 30.55 13.4 30.55Q13.4 30.55 13.4 30.55H37.95V33.55H13.85Q11.75 33.55 10.825 32.15Q9.9 30.75 10.85 29L14.05 23.1L6.45 7H2.55V4H8.4ZM17.25 22.35H31.65Q31.65 22.35 31.65 22.35Q31.65 22.35 31.65 22.35Z" fill="${navIconInActive}"/></svg>`;

const Access = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M24 2Q27.95 2 30.725 4.775Q33.5 7.55 33.5 11.5V16.3H37Q38.25 16.3 39.125 17.175Q40 18.05 40 19.3V41Q40 42.25 39.125 43.125Q38.25 44 37 44H11Q9.75 44 8.875 43.125Q8 42.25 8 41V19.3Q8 18.05 8.875 17.175Q9.75 16.3 11 16.3H14.5V11.5Q14.5 7.55 17.275 4.775Q20.05 2 24 2ZM24 5Q21.3 5 19.4 6.9Q17.5 8.8 17.5 11.5V16.3H30.5V11.5Q30.5 8.8 28.6 6.9Q26.7 5 24 5ZM11 41H37Q37 41 37 41Q37 41 37 41V19.3Q37 19.3 37 19.3Q37 19.3 37 19.3H11Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41ZM24 26.3Q22.4 26.3 21.275 27.525Q20.15 28.75 20.15 30.25Q20.15 31.8 21.275 32.9Q22.4 34 24 34Q25.6 34 26.725 32.9Q27.85 31.8 27.85 30.25Q27.85 28.75 26.725 27.525Q25.6 26.3 24 26.3ZM11 19.3Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41Q11 41 11 41Q11 41 11 41V19.3Q11 19.3 11 19.3Q11 19.3 11 19.3Z" fill="${actionIconBackground}" /></svg>`;
const Access_Gray = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M24 2Q27.95 2 30.725 4.775Q33.5 7.55 33.5 11.5V16.3H37Q38.25 16.3 39.125 17.175Q40 18.05 40 19.3V41Q40 42.25 39.125 43.125Q38.25 44 37 44H11Q9.75 44 8.875 43.125Q8 42.25 8 41V19.3Q8 18.05 8.875 17.175Q9.75 16.3 11 16.3H14.5V11.5Q14.5 7.55 17.275 4.775Q20.05 2 24 2ZM24 5Q21.3 5 19.4 6.9Q17.5 8.8 17.5 11.5V16.3H30.5V11.5Q30.5 8.8 28.6 6.9Q26.7 5 24 5ZM11 41H37Q37 41 37 41Q37 41 37 41V19.3Q37 19.3 37 19.3Q37 19.3 37 19.3H11Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41ZM24 26.3Q22.4 26.3 21.275 27.525Q20.15 28.75 20.15 30.25Q20.15 31.8 21.275 32.9Q22.4 34 24 34Q25.6 34 26.725 32.9Q27.85 31.8 27.85 30.25Q27.85 28.75 26.725 27.525Q25.6 26.3 24 26.3ZM11 19.3Q11 19.3 11 19.3Q11 19.3 11 19.3V41Q11 41 11 41Q11 41 11 41Q11 41 11 41Q11 41 11 41V19.3Q11 19.3 11 19.3Q11 19.3 11 19.3Z" fill="${navIconInActive}" /></svg>`;
const Business_Directory = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M7.2 46V43H40.8V46ZM7.2 5V2H40.8V5ZM24 25.8Q26.5 25.8 28.2 24.1Q29.9 22.4 29.9 19.9Q29.9 17.4 28.2 15.7Q26.5 14 24 14Q21.5 14 19.8 15.7Q18.1 17.4 18.1 19.9Q18.1 22.4 19.8 24.1Q21.5 25.8 24 25.8ZM6.6 40Q5.4 40 4.5 39.1Q3.6 38.2 3.6 37V11Q3.6 9.7 4.5 8.85Q5.4 8 6.6 8H41.4Q42.6 8 43.5 8.9Q44.4 9.8 44.4 11V37Q44.4 38.2 43.5 39.1Q42.6 40 41.4 40ZM11 37Q13.55 33.85 17.05 32.275Q20.55 30.7 24 30.7Q27.4 30.7 30.975 32.275Q34.55 33.85 37 37H41.4Q41.4 37 41.4 37Q41.4 37 41.4 37V11Q41.4 11 41.4 11Q41.4 11 41.4 11H6.6Q6.6 11 6.6 11Q6.6 11 6.6 11V37Q6.6 37 6.6 37Q6.6 37 6.6 37ZM15.7 37H32.4Q30.85 35.5 28.775 34.6Q26.7 33.7 24 33.7Q21.3 33.7 19.275 34.6Q17.25 35.5 15.7 37ZM24 22.8Q22.8 22.8 21.975 21.95Q21.15 21.1 21.15 19.9Q21.15 18.7 21.975 17.85Q22.8 17 24 17Q25.2 17 26.025 17.85Q26.85 18.7 26.85 19.9Q26.85 21.1 26.025 21.95Q25.2 22.8 24 22.8ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z" fill="${actionIconBackground}" /></svg>`;
const Business_Directory_Gray = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 45 45"><path d="M7.2 46V43H40.8V46ZM7.2 5V2H40.8V5ZM24 25.8Q26.5 25.8 28.2 24.1Q29.9 22.4 29.9 19.9Q29.9 17.4 28.2 15.7Q26.5 14 24 14Q21.5 14 19.8 15.7Q18.1 17.4 18.1 19.9Q18.1 22.4 19.8 24.1Q21.5 25.8 24 25.8ZM6.6 40Q5.4 40 4.5 39.1Q3.6 38.2 3.6 37V11Q3.6 9.7 4.5 8.85Q5.4 8 6.6 8H41.4Q42.6 8 43.5 8.9Q44.4 9.8 44.4 11V37Q44.4 38.2 43.5 39.1Q42.6 40 41.4 40ZM11 37Q13.55 33.85 17.05 32.275Q20.55 30.7 24 30.7Q27.4 30.7 30.975 32.275Q34.55 33.85 37 37H41.4Q41.4 37 41.4 37Q41.4 37 41.4 37V11Q41.4 11 41.4 11Q41.4 11 41.4 11H6.6Q6.6 11 6.6 11Q6.6 11 6.6 11V37Q6.6 37 6.6 37Q6.6 37 6.6 37ZM15.7 37H32.4Q30.85 35.5 28.775 34.6Q26.7 33.7 24 33.7Q21.3 33.7 19.275 34.6Q17.25 35.5 15.7 37ZM24 22.8Q22.8 22.8 21.975 21.95Q21.15 21.1 21.15 19.9Q21.15 18.7 21.975 17.85Q22.8 17 24 17Q25.2 17 26.025 17.85Q26.85 18.7 26.85 19.9Q26.85 21.1 26.025 21.95Q25.2 22.8 24 22.8ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z" fill="${navIconInActive}"/></svg>`;

const Avatar_Placeholder = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="92" height="92" viewBox="0 0 92 92">
  <defs>
    <clipPath id="clip-path">
      <circle id="Ellipse_173" data-name="Ellipse 173" cx="46" cy="46" r="46" transform="translate(117 741.766)" fill="none" stroke="#133c8b" stroke-width="4"/>
    </clipPath>
  </defs>
  <g id="Mask_Group_34" data-name="Mask Group 34" transform="translate(-117 -741.766)" clip-path="url(#clip-path)">
    <g id="account_circle_black_24dp_3_" data-name="account_circle_black_24dp (3)" transform="translate(109.908 734.751)">
      <path id="Path_5427" data-name="Path 5427" d="M0,0H106.184V106.184H0Z" fill="none"/>
      <path id="Path_5428" data-name="Path 5428" d="M46.243,2A44.243,44.243,0,1,0,90.486,46.243,44.259,44.259,0,0,0,46.243,2Zm0,13.273A13.273,13.273,0,1,1,32.97,28.546,13.255,13.255,0,0,1,46.243,15.273Zm0,62.825A31.857,31.857,0,0,1,19.7,63.852c.133-8.8,17.7-13.627,26.546-13.627,8.8,0,26.413,4.823,26.546,13.627A31.857,31.857,0,0,1,46.243,78.1Z" transform="translate(6.849 6.849)" fill="${actionIconBackground}"/>
    </g>
  </g>
</svg>
`;
const Description_Black = `<svg xmlns="http://www.w3.org/2000/svg" width="61.742" height="61.743" viewBox="0 0 61.742 61.743">
  <g id="description_black_24dp_2_" data-name="description_black_24dp (2)" transform="translate(0 0)">
    <path id="Path_4109" data-name="Path 4109" d="M0,0H61.742V61.743H0Z" transform="translate(0 0)" fill="none"/>
    <path id="Path_4110" data-name="Path 4110" d="M14.29,38.017H34.871v5.145H14.29Zm0-10.29H34.871v5.145H14.29ZM29.726,2H9.145A5.16,5.16,0,0,0,4,7.145V48.307a5.138,5.138,0,0,0,5.119,5.145h30.9a5.16,5.16,0,0,0,5.145-5.145V17.436Zm10.29,46.307H9.145V7.145H27.153V20.008H40.016Z" transform="translate(6.29 3.145)" fill="${actionIconBackground}"/>
  </g>
</svg>
`;
const DoubleArrow = `<svg id="Blue_Double_Arrow" data-name="Blue Double Arrow" xmlns="http://www.w3.org/2000/svg" width="62.627" height="48.308" viewBox="0 0 62.627 48.308">
<path id="angle-down" d="M48.308,4.16a1.612,1.612,0,0,1-.484,1.153L25.267,28.673a1.488,1.488,0,0,1-2.227,0L.484,5.313a1.617,1.617,0,0,1,0-2.306L2.9.5A1.488,1.488,0,0,1,5.131.5L24.154,20.2,43.177.5A1.488,1.488,0,0,1,45.4.5l2.42,2.506A1.612,1.612,0,0,1,48.308,4.16Z" transform="translate(0 48.308) rotate(-90)" fill="${actionIconBackground}"/>
<path id="angle-down-2" data-name="angle-down" d="M48.308,4.16a1.612,1.612,0,0,1-.484,1.153L25.267,28.673a1.488,1.488,0,0,1-2.227,0L.484,5.313a1.617,1.617,0,0,1,0-2.306L2.9.5A1.488,1.488,0,0,1,5.131.5L24.154,20.2,43.177.5A1.488,1.488,0,0,1,45.4.5l2.42,2.506A1.612,1.612,0,0,1,48.308,4.16Z" transform="translate(33.453 48.308) rotate(-90)" fill="${actionIconBackground}"/>
</svg>
`;
const DoubleArrowWhite = `<svg id="Blue_Double_Arrow" data-name="Blue Double Arrow" xmlns="http://www.w3.org/2000/svg" width="62.627" height="48.308" viewBox="0 0 62.627 48.308">
<path id="angle-down" d="M48.308,4.16a1.612,1.612,0,0,1-.484,1.153L25.267,28.673a1.488,1.488,0,0,1-2.227,0L.484,5.313a1.617,1.617,0,0,1,0-2.306L2.9.5A1.488,1.488,0,0,1,5.131.5L24.154,20.2,43.177.5A1.488,1.488,0,0,1,45.4.5l2.42,2.506A1.612,1.612,0,0,1,48.308,4.16Z" transform="translate(0 48.308) rotate(-90)" fill="#fff"/>
<path id="angle-down-2" data-name="angle-down" d="M48.308,4.16a1.612,1.612,0,0,1-.484,1.153L25.267,28.673a1.488,1.488,0,0,1-2.227,0L.484,5.313a1.617,1.617,0,0,1,0-2.306L2.9.5A1.488,1.488,0,0,1,5.131.5L24.154,20.2,43.177.5A1.488,1.488,0,0,1,45.4.5l2.42,2.506A1.612,1.612,0,0,1,48.308,4.16Z" transform="translate(33.453 48.308) rotate(-90)" fill="#fff"/>
</svg>
`;

const QR_SCAN = `<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
<g id="qr_code_scanner_black_24dp" transform="translate(-0.002 -0.002)">
  <rect id="Rectangle_3072" data-name="Rectangle 3072" width="62" height="62" transform="translate(0.002 0.002)" fill="none"/>
  <path id="Path_5354" data-name="Path 5354" d="M21.376,13.626v7.75h-7.75v-7.75h7.75M25.251,9.75H9.75v15.5h15.5V9.75ZM21.376,34.294v7.75h-7.75v-7.75h7.75m3.875-3.875H9.75v15.5h15.5v-15.5ZM42.044,13.626v7.75h-7.75v-7.75h7.75M45.919,9.75h-15.5v15.5h15.5V9.75Zm-15.5,20.668h3.875v3.875H30.418Zm3.875,3.875h3.875v3.875H34.294Zm3.875-3.875h3.875v3.875H38.169Zm-7.75,7.75h3.875v3.875H30.418Zm3.875,3.875h3.875v3.875H34.294Zm3.875-3.875h3.875v3.875H38.169Zm3.875-3.875h3.875v3.875H42.044Zm0,7.75h3.875v3.875H42.044ZM53.67,14.917H48.5V7.167h-7.75V2H53.67Zm0,38.752V40.752H48.5V48.5h-7.75V53.67ZM2,53.67H14.917V48.5H7.167v-7.75H2ZM2,2V14.917H7.167V7.167h7.75V2Z" transform="translate(3.167 3.167)" fill="#fff"/>
</g>
</svg>
`;
const Check_List = `<svg id="checklist_black_24dp" xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68">
<rect id="Rectangle_3409" data-name="Rectangle 3409" width="68" height="68" fill="none"/>
<path id="Path_5443" data-name="Path 5443" d="M58.667,12.628h-25.5V18.3h25.5Zm0,22.667h-25.5v5.667h25.5ZM12.03,23.962,2,13.932,5.995,9.937,12,15.943,24.015,3.93,28.01,7.925Zm0,22.667L2,36.6,5.995,32.6,12,38.61,24.015,26.6l3.995,3.995Z" transform="translate(3.667 7.205)" fill="#fff"/>
</svg>
`;
const Check_List_Active = `<svg id="checklist_black_24dp" xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68">
<rect id="Rectangle_3409" data-name="Rectangle 3409" width="68" height="68" fill="none"/>
<path id="Path_5443" data-name="Path 5443" d="M58.667,12.628h-25.5V18.3h25.5Zm0,22.667h-25.5v5.667h25.5ZM12.03,23.962,2,13.932,5.995,9.937,12,15.943,24.015,3.93,28.01,7.925Zm0,22.667L2,36.6,5.995,32.6,12,38.61,24.015,26.6l3.995,3.995Z" transform="translate(3.667 7.205)" fill="${actionIconBackground}"/>
</svg>
`;
const DELETE = `<svg id="delete_black_24dp_7_" data-name="delete_black_24dp (7)" xmlns="http://www.w3.org/2000/svg" width="61.531" height="61.531" viewBox="0 0 61.531 61.531">
<path id="Path_5446" data-name="Path 5446" d="M0,0H61.531V61.531H0Z" fill="none"/>
<path id="Path_5447" data-name="Path 5447" d="M7.564,44.021a5.143,5.143,0,0,0,5.128,5.128H33.2a5.143,5.143,0,0,0,5.128-5.128V13.255H7.564ZM40.893,5.564H31.92L29.356,3H16.537L13.973,5.564H5v5.128H40.893Z" transform="translate(7.819 4.691)" fill="#dc143c"/>
</svg>
`;
const DEVICES = `<svg id="Group_5337" data-name="Group 5337" xmlns="http://www.w3.org/2000/svg" width="46.564" height="51.738" viewBox="0 0 46.564 51.738">
<g id="Group_5336" data-name="Group 5336">
  <path id="Path_5435" data-name="Path 5435" d="M44.39,6.174H33.577a7.73,7.73,0,0,0-14.59,0H8.174A5.189,5.189,0,0,0,3,11.348V47.564a5.189,5.189,0,0,0,5.174,5.174H44.39a5.189,5.189,0,0,0,5.174-5.174V11.348A5.189,5.189,0,0,0,44.39,6.174ZM26.282,5.527a1.94,1.94,0,1,1-1.94,1.94A1.954,1.954,0,0,1,26.282,5.527ZM44.39,47.564H8.174V11.348H44.39Z" transform="translate(-3 -1)" fill="${actionIconBackground}"/>
  <path id="Path_5436" data-name="Path 5436" d="M27.9,14.394,22.418,8.91,7,24.3v5.536h5.432Z" transform="translate(3.348 11.552)" fill="${actionIconBackground}"/>
  <path id="Path_5437" data-name="Path 5437" d="M21.9,12.872a1.281,1.281,0,0,0,0-1.837L18.249,7.388a1.281,1.281,0,0,0-1.837,0L13.67,10.13l5.484,5.484Z" transform="translate(13.932 8.521)" fill="${actionIconBackground}"/>
</g>
</svg>
`;

const Touchpoints = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="40" viewBox="0 0 36 40">
  <path id="assignment_FILL1_wght400_GRAD0_opsz48_1_" data-name="assignment_FILL1_wght400_GRAD0_opsz48 (1)" d="M9,42a2.988,2.988,0,0,1-3-3V9A2.988,2.988,0,0,1,9,6H19.25a4.437,4.437,0,0,1,1.6-2.875,4.972,4.972,0,0,1,6.3,0A4.437,4.437,0,0,1,28.75,6H39a2.988,2.988,0,0,1,3,3V39a2.988,2.988,0,0,1-3,3Zm5-8H27.65V31H14Zm0-8.5H34v-3H14ZM14,17H34V14H14ZM24,8.15a1.679,1.679,0,0,0,1.225-.525,1.692,1.692,0,0,0,0-2.45,1.692,1.692,0,0,0-2.45,0,1.692,1.692,0,0,0,0,2.45A1.679,1.679,0,0,0,24,8.15Z" transform="translate(-6 -2)" fill="${actionIconBackground}"/>
</svg>
`;

const Image_Capture = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="107" viewBox="0 0 108 107">
<g id="Group_5585" data-name="Group 5585" transform="translate(-11735.545 -17748.498)">
  <g id="Rectangle_3294" data-name="Rectangle 3294" transform="translate(11735.545 17748.498)" fill="none" stroke="#133c8b" stroke-width="5">
    <rect width="108" height="107" rx="7" stroke="none"/>
    <rect x="2.5" y="2.5" width="103" height="102" rx="4.5" fill="none"/>
  </g>
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(11752.545 17754.107)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H74.823V74.823H0Z" fill="rgba(0,0,0,0)"/>
    <path id="Path_4181" data-name="Path 4181" d="M8.235,8.235H30.059V2H8.235A6.254,6.254,0,0,0,2,8.235V30.059H8.235ZM26.941,36.294,14.47,51.882H51.882l-9.353-12.47L36.2,47.86ZM48.764,22.265a4.676,4.676,0,1,0-4.676,4.676A4.67,4.67,0,0,0,48.764,22.265ZM58.117,2H36.294V8.235H58.117V30.059h6.235V8.235A6.254,6.254,0,0,0,58.117,2Zm0,56.117H36.294v6.235H58.117a6.254,6.254,0,0,0,6.235-6.235V36.294H58.117ZM8.235,36.294H2V58.117a6.254,6.254,0,0,0,6.235,6.235H30.059V58.117H8.235Z" transform="translate(4.235 4.235)" fill="#133c8b"/>
  </g>
  <text id="Checkout" transform="translate(11789.545 17843.498)" fill="#133c8b" font-size="22" font-family="ProductSans-Medium, Product Sans Medium" font-weight="500"><tspan x="-39.996" y="0">Capture</tspan></text>
</g>
</svg>
`;

const Image_Capture_Disable = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="107" viewBox="0 0 108 107">
<g id="Group_5376" data-name="Group 5376" transform="translate(-11735.545 -17748.498)">
  <g id="Rectangle_3294" data-name="Rectangle 3294" transform="translate(11735.545 17748.498)" fill="none" stroke="#b4b4b4" stroke-width="5">
    <rect width="108" height="107" rx="7" stroke="none"/>
    <rect x="2.5" y="2.5" width="103" height="102" rx="4.5" fill="none"/>
  </g>
  <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(11752.546 17754.107)">
    <path id="Path_4180" data-name="Path 4180" d="M0,0H74.823V74.823H0Z" fill="rgba(0,0,0,0)"/>
    <path id="Path_4181" data-name="Path 4181" d="M8.235,8.235H30.059V2H8.235A6.254,6.254,0,0,0,2,8.235V30.059H8.235ZM26.941,36.294,14.47,51.882H51.882l-9.353-12.47L36.2,47.86ZM48.764,22.265a4.676,4.676,0,1,0-4.676,4.676A4.67,4.67,0,0,0,48.764,22.265ZM58.117,2H36.294V8.235H58.117V30.059h6.235V8.235A6.254,6.254,0,0,0,58.117,2Zm0,56.117H36.294v6.235H58.117a6.254,6.254,0,0,0,6.235-6.235V36.294H58.117ZM8.235,36.294H2V58.117a6.254,6.254,0,0,0,6.235,6.235H30.059V58.117H8.235Z" transform="translate(4.235 4.235)" fill="#9d9fa2"/>
  </g>
  <text id="Checkout" transform="translate(11789.546 17843.498)" fill="#9d9fa2" font-size="22" font-family="ProductSans-Medium, Product Sans Medium" font-weight="500"><tspan x="-39.996" y="0">Capture</tspan></text>
</g>
</svg>
`;

const Pluse_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
<g id="Group_5546" data-name="Group 5546" transform="translate(-61 -1893)">
  <path id="Path_5455" data-name="Path 5455" d="M17.608-22.563H3.422v-6.345H17.608V-43.451h6.416v14.543H38.247v6.345H24.024V-8.091H17.608Z" transform="translate(61.914 1940.5)" fill="#fff"/>
  <g id="Rectangle_3431" data-name="Rectangle 3431" transform="translate(61 1893)" fill="none" stroke="rgba(112,112,112,0)" stroke-width="1" opacity="0.24">
    <rect width="44" height="44" stroke="none"/>
    <rect x="0.5" y="0.5" width="43" height="43" fill="none"/>
  </g>
</g>
</svg>
`;

const Cow_Green_Group_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="61" height="44" viewBox="0 0 61 44">
  <g id="Group_5905" data-name="Group 5905" transform="translate(-52 -1305)">
    <g id="Rectangle_3235" data-name="Rectangle 3235" transform="translate(52 1305)" fill="#b2fa00" stroke="#133c8b" stroke-width="2">
      <rect width="61" height="44" stroke="none"/>
      <rect x="1" y="1" width="59" height="42" fill="none"/>
    </g>
    <path id="Path_4183" data-name="Path 4183" d="M36.726,19.341c-1.373-1.053-2.886-2.651-2.684-4.852a2.883,2.883,0,0,0,1.9-1.5,2.189,2.189,0,0,0-.394-2.627.157.157,0,0,0-.274.114,1.7,1.7,0,0,1-1.4,2.082c-1.618.332-4.4-.066-5.334-.92-.864-.787-.955-1.731-.173-3.2a.157.157,0,0,0-.206-.213,3.042,3.042,0,0,0-2.007,2.993A3,3,0,0,0,28,13.992c-5.041,1.537-7.12-.313-12.843-.394-4.763-.066-5.877,3.851-5.613,7.863a30.17,30.17,0,0,0,.562,4.733c.259,1.043.845,1.65.792,2.974a10.06,10.06,0,0,0-.014,2.518.535.535,0,0,0,.4.427,2.82,2.82,0,0,0,1.546.014c.259-.076.456-.213.4-.441-.466-2-.9-4.709-.442-6.507a.429.429,0,0,1,.682-.294,9.38,9.38,0,0,1,2.2,1.807,11.865,11.865,0,0,1,2.794,6.16.726.726,0,0,0,.447.664,2.275,2.275,0,0,0,1.815-.071.38.38,0,0,0,.206-.422c-.485-1.944-2.065-4.287-2.2-6.355-.029-.422.12-.46.466-.4a10.827,10.827,0,0,0,1.34.142.466.466,0,0,1,.341.161c1.608,1.944,3.423,4.7,3.294,7.564a.5.5,0,0,0,.192.408c.552.451.562,1.456.653,2.376a.5.5,0,0,0,.322.432,3.253,3.253,0,0,0,2.223.024.277.277,0,0,0,.187-.294c-.264-1.807-1.709-3.32-1.368-6.023.072-.588.543-1.432.859-2.523.754-2.585.567-3.405,1.306-4.875.475-.949,1.556-2.172,3.058-1.314a4.175,4.175,0,0,0,2.78.683,3.428,3.428,0,0,0,2.7-2.717A.966.966,0,0,0,36.726,19.341Z" transform="translate(59.203 1304.116)" fill="#000"/>
  </g>
</svg>

`;
const Price_Rise_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
  <g id="Group_5918" data-name="Group 5918" transform="translate(-6936 -12299)">
    <path id="Path_5500" data-name="Path 5500" d="M16.1,25.5V9.7l-6,6L8,13.6l9.65-9.65L27.3,13.6l-2.1,2.1L19.1,9.65V25.5Z" transform="translate(6928 12295.05)" fill="#26b21c"/>
    <path id="Path_5501" data-name="Path 5501" d="M30.35,43.95l-9.65-9.7,2.1-2.05,6,6V22.4h3V38.25l6.1-6.05L40,34.3Z" transform="translate(6928 12295.05)" fill="#9d9fa2"/>
  </g>
</svg>
`;
const Price_Fall_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
  <g id="Group_5904" data-name="Group 5904" transform="translate(-6887 -12299)">
    <path id="Path_5498" data-name="Path 5498" d="M16.1,25.5V9.7l-6,6L8,13.6l9.65-9.65L27.3,13.6l-2.1,2.1L19.1,9.65V25.5Z" transform="translate(6879 12295.05)" fill="#9d9fa2"/>
    <path id="Path_5499" data-name="Path 5499" d="M30.35,43.95l-9.65-9.7,2.1-2.05,6,6V22.4h3V38.25l6.1-6.05L40,34.3Z" transform="translate(6879 12295.05)" fill="#ee921b"/>
  </g>
</svg>
`;

const Sim_Card_Alert_Icon = `<svg id="sim_card_alert_black_24dp" xmlns="http://www.w3.org/2000/svg" width="39.892" height="39.892" viewBox="0 0 39.892 39.892">
  <g id="Group_4463" data-name="Group 4463" transform="translate(0)">
    <rect id="Rectangle_2421" data-name="Rectangle 2421" width="39.892" height="39.892" fill="none"/>
  </g>
  <g id="Group_4467" data-name="Group 4467" transform="translate(6.736 3.316)">
    <g id="Group_4466" data-name="Group 4466">
      <g id="Group_4465" data-name="Group 4465">
        <g id="Group_4464" data-name="Group 4464">
          <path id="Path_4201" data-name="Path 4201" d="M27.209,2H13.947L4.033,11.947,4,31.84a3.325,3.325,0,0,0,3.316,3.316H27.209a3.325,3.325,0,0,0,3.316-3.316V5.316A3.325,3.325,0,0,0,27.209,2Zm0,29.84Z" transform="translate(-4 -2)" fill="${actionIconBackground}"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;


const Special = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="42" viewBox="0 0 44 42">
<path id="new_releases_FILL0_wght400_GRAD0_opsz48" d="M17.3,45l-3.8-6.5L5.95,36.95,6.8,29.6,2,24l4.8-5.55L5.95,11.1,13.5,9.55,17.3,3,24,6.1,30.7,3l3.85,6.55,7.5,1.55-.85,7.35L46,24l-4.8,5.6.85,7.35-7.5,1.55L30.7,45,24,41.9Zm1.35-3.95L24,38.8l5.5,2.25,3.35-5,5.85-1.5-.6-5.95L42.15,24,38.1,19.3l.6-5.95-5.85-1.4-3.45-5L24,9.2,18.5,6.95l-3.35,5L9.3,13.35l.6,5.95L5.85,24,9.9,28.6l-.6,6.05,5.85,1.4ZM24,24Zm-2.15,6.65L33.2,19.4l-2.25-2.05-9.1,9L17.1,21.4l-2.3,2.25Z" transform="translate(-2 -3)" fill="#dc143c"/>
</svg>
`;

const Sales_Cart = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.718" height="202.718" viewBox="0 0 202.718 202.718">
<defs>
  <filter id="teal_circle" x="0" y="0" width="202.718" height="202.718" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feFlood flood-opacity="0.239"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_5642" data-name="Group 5642" transform="translate(18 15)">
  <g transform="matrix(1, 0, 0, 1, -18, -15)" filter="url(#teal_circle)">
    <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill="${actionIconBackground}"/>
  </g>
  <path id="shopping_bag_FILL0_wght400_GRAD0_opsz48" d="M15.526,104.351a7.221,7.221,0,0,1-5.268-2.258A7.221,7.221,0,0,1,8,96.825V31.6a7.221,7.221,0,0,1,2.258-5.268,7.221,7.221,0,0,1,5.268-2.258h13.8V22.816A18.169,18.169,0,0,1,34.781,9.457,18.168,18.168,0,0,1,48.14,4,18.168,18.168,0,0,1,61.5,9.457a18.169,18.169,0,0,1,5.457,13.359V24.07h13.8A7.717,7.717,0,0,1,88.281,31.6V96.825a7.717,7.717,0,0,1-7.526,7.526Zm0-7.526H80.755V31.6h-13.8V42.886a3.764,3.764,0,1,1-7.526,0V31.6H36.851V42.886a3.764,3.764,0,1,1-7.526,0V31.6h-13.8ZM36.851,24.07H59.43V22.816A11.139,11.139,0,0,0,48.14,11.526a11.139,11.139,0,0,0-11.29,11.289ZM15.526,96.825v0Z" transform="translate(34.775 27.901)" fill="#f9f9f9"/>
</g>
</svg>
`;

const Sales_Cart_Gray = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="202.718" height="202.718" viewBox="0 0 202.718 202.718">
<defs>
  <filter id="teal_circle" x="0" y="0" width="202.718" height="202.718" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feFlood flood-opacity="0.239"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_5642" data-name="Group 5642" transform="translate(18 15)">
  <g transform="matrix(1, 0, 0, 1, -18, -15)" filter="url(#teal_circle)">
    <path id="teal_circle-2" data-name="teal circle" d="M83.359,0A83.359,83.359,0,1,1,0,83.359,83.359,83.359,0,0,1,83.359,0Z" transform="translate(18 15)" fill="${buttonInActive}"/>
  </g>
  <path id="shopping_bag_FILL0_wght400_GRAD0_opsz48" d="M15.526,104.351a7.221,7.221,0,0,1-5.268-2.258A7.221,7.221,0,0,1,8,96.825V31.6a7.221,7.221,0,0,1,2.258-5.268,7.221,7.221,0,0,1,5.268-2.258h13.8V22.816A18.169,18.169,0,0,1,34.781,9.457,18.168,18.168,0,0,1,48.14,4,18.168,18.168,0,0,1,61.5,9.457a18.169,18.169,0,0,1,5.457,13.359V24.07h13.8A7.717,7.717,0,0,1,88.281,31.6V96.825a7.717,7.717,0,0,1-7.526,7.526Zm0-7.526H80.755V31.6h-13.8V42.886a3.764,3.764,0,1,1-7.526,0V31.6H36.851V42.886a3.764,3.764,0,1,1-7.526,0V31.6h-13.8ZM36.851,24.07H59.43V22.816A11.139,11.139,0,0,0,48.14,11.526a11.139,11.139,0,0,0-11.29,11.289ZM15.526,96.825v0Z" transform="translate(34.775 27.901)" fill="#f9f9f9"/>
</g>
</svg>
`;


const Repeat = `<svg xmlns="http://www.w3.org/2000/svg" width="133" height="133" viewBox="0 0 133 133">
<g id="Group_5645" data-name="Group 5645" transform="translate(-2847 -5599)">
  <rect id="Rectangle_3166" data-name="Rectangle 3166" width="133" height="133" rx="9" transform="translate(2847 5599)" fill="${actionIconBackground}"/>
  <g id="repeat_black_24dp" transform="translate(2869.771 5623.391)">
    <path id="Path_3982" data-name="Path 3982" d="M17.036,19.545H52.127V30.073L66.163,16.036,52.127,2V12.527H10.018V33.582h7.018ZM52.127,54.636H17.036V44.109L3,58.145,17.036,72.182V61.654H59.145V40.6H52.127Z" transform="translate(7.527 5.018)" fill="#fff"/>
  </g>
</g>
</svg>
`;

const Inactive_Repeat = `<svg xmlns="http://www.w3.org/2000/svg" width="133" height="133" viewBox="0 0 133 133">
<g id="Group_5645" data-name="Group 5645" transform="translate(-2847 -5599)">
  <rect id="Rectangle_3166" data-name="Rectangle 3166" width="133" height="133" rx="9" transform="translate(2847 5599)" fill="${buttonInActive}"/>
  <g id="repeat_black_24dp" transform="translate(2869.771 5623.391)">
    <path id="Path_3982" data-name="Path 3982" d="M17.036,19.545H52.127V30.073L66.163,16.036,52.127,2V12.527H10.018V33.582h7.018ZM52.127,54.636H17.036V44.109L3,58.145,17.036,72.182V61.654H59.145V40.6H52.127Z" transform="translate(7.527 5.018)" fill="#fff"/>
  </g>
</g>
</svg>
`;


const Setting = `<svg xmlns="http://www.w3.org/2000/svg" width="56.802" height="56.802" viewBox="0 0 56.802 56.802">
<path id="settings_FILL1_wght400_GRAD0_opsz48" d="M25.869,60.8l-1.42-8.946a19.025,19.025,0,0,1-2.84-1.349,19.514,19.514,0,0,1-2.627-1.775L10.6,52.565,4,40.921l7.668-5.609a8.441,8.441,0,0,1-.178-1.456q-.036-.817-.036-1.456t.036-1.456a8.441,8.441,0,0,1,.178-1.456L4,23.881l6.6-11.644,8.378,3.834A19.514,19.514,0,0,1,21.608,14.3a14.693,14.693,0,0,1,2.84-1.278L25.869,4H38.933l1.42,8.946a23.019,23.019,0,0,1,2.876,1.314A12.222,12.222,0,0,1,45.82,16.07L54.2,12.236l6.6,11.644-7.668,5.467a10,10,0,0,1,.177,1.527q.036.817.036,1.527t-.036,1.491a9.886,9.886,0,0,1-.177,1.491L60.8,40.921,54.2,52.565,45.82,48.731a23.555,23.555,0,0,1-2.592,1.811,12.373,12.373,0,0,1-2.876,1.314L38.933,60.8ZM32.4,41.631a9.212,9.212,0,0,0,9.23-9.23,9.212,9.212,0,0,0-9.23-9.23,9.212,9.212,0,0,0-9.23,9.23,9.212,9.212,0,0,0,9.23,9.23Z" transform="translate(-4 -4)" fill="#fff"/>
</svg>
`;


const SaleStore = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M42 22.05V39q0 1.2-.9 2.1-.9.9-2.1.9H8.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V22.05q-1.4-1.2-1.85-2.95-.45-1.75.1-3.5l2.15-6.75q.4-1.35 1.4-2.1 1-.75 2.3-.75H37.7q1.4 0 2.45.775 1.05.775 1.45 2.075l2.2 6.75q.55 1.75.075 3.5Q43.4 20.85 42 22.05ZM28.5 20.5q1.45 0 2.45-.95 1-.95.8-2.3L30.5 9h-5v8.25q0 1.3.85 2.275.85.975 2.15.975Zm-9.35 0q1.4 0 2.375-.95.975-.95.975-2.3V9h-5l-1.25 8.25q-.2 1.3.7 2.275.9.975 2.2.975Zm-9.1 0q1.2 0 2.075-.825.875-.825 1.025-2.025L14.45 9h-5l-2.3 7.3q-.5 1.55.4 2.875t2.5 1.325Zm27.85 0q1.6 0 2.525-1.3.925-1.3.425-2.9L38.55 9h-5l1.3 8.65q.15 1.2 1.025 2.025.875.825 2.025.825ZM8.95 39H39V23.45q.05.05-.325.05H37.9q-1.25 0-2.375-.525T33.3 21.35q-.8 1-2 1.575t-2.65.575q-1.5 0-2.575-.425Q25 22.65 24 21.65q-.75.9-1.9 1.375t-2.6.475q-1.55 0-2.75-.55t-2.05-1.6q-1.2 1.05-2.35 1.6-1.15.55-2.3.55h-.675q-.325 0-.425-.05V39ZM39 39H8.95 39Z" fill="${actionIconBackground}"/></svg>`;
const SaleStore_Gray = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"><path d="M42 22.05V39q0 1.2-.9 2.1-.9.9-2.1.9H8.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V22.05q-1.4-1.2-1.85-2.95-.45-1.75.1-3.5l2.15-6.75q.4-1.35 1.4-2.1 1-.75 2.3-.75H37.7q1.4 0 2.45.775 1.05.775 1.45 2.075l2.2 6.75q.55 1.75.075 3.5Q43.4 20.85 42 22.05ZM28.5 20.5q1.45 0 2.45-.95 1-.95.8-2.3L30.5 9h-5v8.25q0 1.3.85 2.275.85.975 2.15.975Zm-9.35 0q1.4 0 2.375-.95.975-.95.975-2.3V9h-5l-1.25 8.25q-.2 1.3.7 2.275.9.975 2.2.975Zm-9.1 0q1.2 0 2.075-.825.875-.825 1.025-2.025L14.45 9h-5l-2.3 7.3q-.5 1.55.4 2.875t2.5 1.325Zm27.85 0q1.6 0 2.525-1.3.925-1.3.425-2.9L38.55 9h-5l1.3 8.65q.15 1.2 1.025 2.025.875.825 2.025.825ZM8.95 39H39V23.45q.05.05-.325.05H37.9q-1.25 0-2.375-.525T33.3 21.35q-.8 1-2 1.575t-2.65.575q-1.5 0-2.575-.425Q25 22.65 24 21.65q-.75.9-1.9 1.375t-2.6.475q-1.55 0-2.75-.55t-2.05-1.6q-1.2 1.05-2.35 1.6-1.15.55-2.3.55h-.675q-.325 0-.425-.05V39ZM39 39H8.95 39Z" fill="${navIconInActive}"/></svg>`;

const Sales_Value_Toggle_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="283.84" height="85.336" viewBox="0 0 283.84 85.336">
<g id="Group_6111" data-name="Group 6111" transform="translate(1148.25 589.336) rotate(180)">
  <path id="toggle" d="M191.172,7.875H-7.332A42.716,42.716,0,0,0-50,50.543,42.716,42.716,0,0,0-7.332,93.211h198.5a42.668,42.668,0,1,0,0-85.336Zm0,75.854a33.186,33.186,0,1,1,33.186-33.186,33.186,33.186,0,0,1-33.186,33.186Z" transform="translate(914.41 496.125)" fill="#9d9fa2"/>
  <g id="Group_5821" data-name="Group 5821" transform="translate(1009.481 569.668) rotate(180)">
    <text id="Value" transform="translate(-28 37)" fill="#fff" font-size="38" font-family="Gilroy-Medium, Gilroy ☞" font-weight="500"><tspan x="0" y="0">Value</tspan></text>
  </g>
</g>
</svg>`;

const Sales_Volume_Toggle_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="283.84" height="85.336" viewBox="0 0 283.84 85.336">
<g id="Group_6112" data-name="Group 6112" transform="translate(-864.41 -504)">
  <path id="toggle" d="M191.172,7.875H-7.332A42.716,42.716,0,0,0-50,50.543,42.716,42.716,0,0,0-7.332,93.211h198.5a42.668,42.668,0,1,0,0-85.336Zm0,75.854a33.186,33.186,0,1,1,33.186-33.186,33.186,33.186,0,0,1-33.186,33.186Z" transform="translate(914.41 496.125)" fill="#133c8b"/>
  <g id="Group_5821" data-name="Group 5821" transform="translate(937.481 523.668)">
    <text id="Volume" transform="translate(-28 37)" fill="#fff" font-size="38" font-family="Gilroy-Medium, Gilroy ☞" font-weight="500"><tspan x="0" y="0">Volume</tspan></text>
  </g>
</g>
</svg>`;


const Bottom_Arrow_White = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48"> <path d="M24 30.75 12 18.75 14.15 16.6 24 26.5 33.85 16.65 36 18.8Z" fill="#fff"/></svg>`;


const Google_Map_Icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232597 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M151444 5419C140355 1916 128560 0 116311 0 80573 0 48591 16155 27269 41534l54942 46222 69232-82338z" fill="#1a73e8"/><path d="M27244 41534C10257 61747 0 87832 0 116286c0 21876 4360 39594 11517 55472l70669-84002-54942-46222z" fill="#ea4335"/><path d="M116311 71828c24573 0 44483 19910 44483 44483 0 10938-3957 20969-10509 28706 0 0 35133-41786 69232-82313-14089-27093-38510-47936-68048-57286L82186 87756c8166-9753 20415-15928 34125-15928z" fill="#4285f4"/><path d="M116311 160769c-24573 0-44483-19910-44483-44483 0-10863 3906-20818 10358-28555l-70669 84027c12072 26791 32159 48289 52851 75381l85891-102122c-8141 9628-20339 15752-33948 15752z" fill="#fbbc04"/><path d="M148571 275014c38787-60663 84026-88210 84026-158728 0-19331-4738-37552-13080-53581L64393 247140c6578 8620 13206 17793 19683 27900 23590 36444 17037 58294 32260 58294 15172 0 8644-21876 32235-58320z" fill="#34a853"/></svg>`;


const Sell_In_Icon = `<svg id="local_atm_black_24dp" xmlns="http://www.w3.org/2000/svg" width="43.07" height="43.07" viewBox="0 0 43.07 43.07">
<path id="Path_4234" data-name="Path 4234" d="M0,0H43.07V43.07H0Z" fill="none"/>
<path id="Path_4235" data-name="Path 4235" d="M18.151,27.329H21.74V25.535h1.795a1.8,1.8,0,0,0,1.795-1.795V18.357a1.8,1.8,0,0,0-1.795-1.795H18.151V14.767h7.178V11.178H21.74V9.384H18.151v1.795H16.357a1.8,1.8,0,0,0-1.795,1.795v5.384a1.8,1.8,0,0,0,1.795,1.795H21.74v1.795H14.562v3.589h3.589ZM34.3,4H5.589A3.562,3.562,0,0,0,2.018,7.589L2,29.124a3.577,3.577,0,0,0,3.589,3.589H34.3a3.577,3.577,0,0,0,3.589-3.589V7.589A3.577,3.577,0,0,0,34.3,4Zm0,25.124H5.589V7.589H34.3Z" transform="translate(1.589 3.178)" fill=${actionIconBackground}/>
</svg>`;

const Mobility_Icon = `<svg id="transfer_within_a_station_black_24dp" xmlns="http://www.w3.org/2000/svg" width="41.729" height="41.729" viewBox="0 0 41.729 41.729">
<path id="Path_4249" data-name="Path 4249" d="M0,0H41.729V41.729H0Z" fill="none"/>
<path id="Path_4250" data-name="Path 4250" d="M27.194,25.842V22.8l-4.329,4.347,4.329,4.347V28.45h9.58V25.842Zm5.251,7.39h-9.58v2.608h9.58v3.043l4.329-4.347-4.329-4.347ZM15.04,8.455a3.477,3.477,0,1,0-3.477-3.477A3.488,3.488,0,0,0,15.04,8.455ZM8.52,14.366,3.739,38.882H7.39l3.043-13.91,3.738,3.477V38.882h3.477V25.755l-3.564-3.564,1.043-5.216A12.132,12.132,0,0,0,24.6,21.5V18.018a8.914,8.914,0,0,1-7.563-4.26l-1.652-2.782a3.391,3.391,0,0,0-2.956-1.652,3.488,3.488,0,0,0-1.3.261L2,13.323V21.5H5.477V15.67l3.043-1.3" transform="translate(1.477 1.108)" fill=${actionIconBackground}/>
</svg>`;

const Festival_Icon = `<svg id="visibility_black_24dp" xmlns="http://www.w3.org/2000/svg" width="41.676" height="41.677" viewBox="0 0 41.676 41.677">
<path id="Path_4203" data-name="Path 4203" d="M0,0H41.676V41.676H0Z" fill="none"/>
<path id="Path_4204" data-name="Path 4204" d="M20.1,7.473a16.966,16.966,0,0,1,15.316,9.551,17.056,17.056,0,0,1-30.632,0A16.966,16.966,0,0,1,20.1,7.473M20.1,4A20.538,20.538,0,0,0,1,17.024a20.52,20.52,0,0,0,38.2,0A20.538,20.538,0,0,0,20.1,4Zm0,8.683a4.341,4.341,0,1,1-4.341,4.341A4.343,4.343,0,0,1,20.1,12.683m0-3.473a7.814,7.814,0,1,0,7.814,7.814A7.826,7.826,0,0,0,20.1,9.21Z" transform="translate(0.737 2.946)" fill=${actionIconBackground}/>
</svg>`;

const Tracking_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="31.364" height="41.445" viewBox="0 0 31.364 41.445">
<g id="Group_4577" data-name="Group 4577" transform="translate(-954 -502.643)">
  <path id="Path_4245" data-name="Path 4245" d="M969.275,506.887a10.58,10.58,0,0,1,10.609,10.926c0,4.583-3.65,9.907-10.609,15.531-6.959-5.624-10.609-10.969-10.609-15.531a10.58,10.58,0,0,1,10.609-10.926m0-4.244a14.783,14.783,0,0,0-14.851,15.17q0,9.93,14.851,20.9,14.864-10.947,14.851-20.9A14.783,14.783,0,0,0,969.275,502.643Z" transform="translate(0.407 0)" fill=${actionIconBackground}/>
  <path id="Path_4246" data-name="Path 4246" d="M954,521.5h31.364v4.481H954Z" transform="translate(0 18.107)" fill=${actionIconBackground}/>
  <path id="Path_4247" data-name="Path 4247" d="M962.736,522.325h3.136v-1.568h1.568a1.573,1.573,0,0,0,1.568-1.568v-4.7a1.573,1.573,0,0,0-1.568-1.568h-4.7v-1.568h6.273v-3.136h-3.136v-1.568h-3.136v1.568h-1.568a1.573,1.573,0,0,0-1.568,1.568v4.7a1.573,1.573,0,0,0,1.568,1.568h4.7v1.568H959.6v3.137h3.136Z" transform="translate(5.377 3.841)" fill=${actionIconBackground}/>
</g>
</svg>`

const Compliance_Icon = `<svg id="playlist_add_check_circle_black_24dp" xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46">
<rect id="Rectangle_2630" data-name="Rectangle 2630" width="46" height="46" fill="none"/>
<path id="Path_4248" data-name="Path 4248" d="M21.167,5.833A15.333,15.333,0,1,1,5.833,21.167,15.354,15.354,0,0,1,21.167,5.833Zm0-3.833A19.167,19.167,0,1,0,40.333,21.167,19.174,19.174,0,0,0,21.167,2ZM25,17.333H11.583v3.833H25Zm0-5.75H11.583v3.833H25ZM11.583,26.917h5.75V23.083h-5.75Zm23-3.048-2.7-2.7L25.1,27.952l-2.7-2.7-2.7,2.7,5.424,5.424Z" transform="translate(1.833 1.833)" fill=${actionIconBackground}/>
</svg>`;
const Bi = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.29367 0.188696C9.43739 0.05969 9.62751 -0.00793186 9.82211 0.000742409C13.9358 0.123889 17.3739 3.11022 17.997 7.10157C18.0009 7.1254 18.0009 7.1497 17.997 7.17353C18.0104 7.36239 17.9465 7.5487 17.8196 7.69126C17.6926 7.83383 17.513 7.92089 17.3205 7.9332L10.4089 8.38899C10.1804 8.40926 9.95369 8.33404 9.78459 8.18183C9.61548 8.02962 9.51961 7.81451 9.52055 7.58935L9.05597 0.800385V0.688435C9.06443 0.497498 9.14995 0.317703 9.29367 0.188696ZM8.81969 10.1643L14.8102 9.78047L14.851 9.79646C15.1082 9.80066 15.3532 9.90498 15.5321 10.0864C15.7109 10.2679 15.8089 10.5116 15.8046 10.764C15.5685 14.2039 13.0465 17.0781 9.61449 17.8185C6.18244 18.559 2.66416 16.988 0.979003 13.9626C0.483496 13.0912 0.170372 12.1315 0.0580086 11.1399C0.0144282 10.846 -0.00465264 10.5492 0.000955789 10.2523C0.0123142 6.59446 2.61655 3.43726 6.26046 2.66365C6.70158 2.58108 7.14386 2.80133 7.33631 3.19941C7.38422 3.27164 7.42257 3.34957 7.45042 3.4313C7.51873 4.48573 7.58958 5.53018 7.66014 6.57022C7.71586 7.39158 7.77139 8.21019 7.82534 9.0288C7.82255 9.22164 7.85286 9.41357 7.91499 9.59655C8.06125 9.95656 8.42523 10.185 8.81969 10.1643Z" fill="${actionIconBackground}"/>
</svg>`;
const Birthday = `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M16.0327 5.26646H15.4917C15.0983 5.26646 14.754 4.96552 14.6556 4.56426C14.0655 1.95611 11.754 0 8.9999 0C6.2458 0 3.98351 1.95611 3.39335 4.56426C3.29499 4.96552 2.95072 5.26646 2.55728 5.26646H2.0163C0.98351 5.26646 0.0982642 6.01881 -9.64026e-05 7.02194C-0.0984571 8.17555 0.786789 9.17868 1.91794 9.17868H16.0819C17.213 9.17868 18.0983 8.17555 17.9999 7.02194C17.9015 6.01881 17.0163 5.26646 16.0327 5.26646Z" fill="${actionIconBackground}"/>
<path d="M6.58995 16H5.99979C5.2129 16 4.4752 15.4984 4.18012 14.7461L2.75389 10.9843C2.60634 10.6332 2.85225 10.2821 3.19651 10.2821H5.85225C6.09815 10.2821 6.29487 10.4827 6.34405 10.6834L7.08175 15.3981C7.08175 15.699 6.88503 16 6.58995 16Z" fill="${actionIconBackground}"/>
<path d="M9.98332 16H8.36037C8.11447 16 7.91775 15.7993 7.86857 15.5486L7.32759 10.8338C7.27841 10.5329 7.52431 10.2821 7.81939 10.2821H10.4751C10.7702 10.2821 11.0161 10.5329 10.9669 10.8338L10.4751 15.5486C10.4259 15.7993 10.2292 16 9.98332 16Z" fill="${actionIconBackground}"/>
<path d="M12.3441 16H11.754C11.4589 16 11.213 15.699 11.2622 15.3981L11.9999 10.6834C12.049 10.4326 12.2458 10.2821 12.4917 10.2821H15.1474C15.4917 10.2821 15.7376 10.6332 15.59 10.9843L14.1638 14.7461C13.8687 15.4984 13.131 16 12.3441 16Z" fill="${actionIconBackground}"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="18" height="16" fill="${actionIconBackground}"/>
</clipPath>
</defs>
</svg>`;
const Career = `<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1858 4.23474H13.3799C15.9302 4.23474 18 6.36631 18 8.98105V14.2105C18 16.8253 15.9302 18.9474 13.3799 18.9474H4.62012C2.06982 18.9474 0 16.8253 0 14.2105V8.98105C0 6.36631 2.06982 4.23474 4.62012 4.23474H4.81417C4.83265 3.09789 5.26694 2.03684 6.05236 1.24105C6.84702 0.435789 7.86345 0.028421 9.00924 0C11.3008 0 13.1581 1.89474 13.1858 4.23474ZM7.02254 2.25475C6.50509 2.78528 6.21864 3.48633 6.20016 4.23475H11.7998C11.772 2.68107 10.5338 1.42107 9.0092 1.42107C8.2977 1.42107 7.55848 1.71475 7.02254 2.25475ZM12.5112 7.88206C12.8993 7.88206 13.2042 7.55995 13.2042 7.17153V6.07258C13.2042 5.68416 12.8993 5.36206 12.5112 5.36206C12.1324 5.36206 11.8182 5.68416 11.8182 6.07258V7.17153C11.8182 7.55995 12.1324 7.88206 12.5112 7.88206ZM6.09851 7.17154C6.09851 7.55996 5.79358 7.88207 5.40549 7.88207C5.02664 7.88207 4.71247 7.55996 4.71247 7.17154V6.0726C4.71247 5.68418 5.02664 5.36207 5.40549 5.36207C5.79358 5.36207 6.09851 5.68418 6.09851 6.0726V7.17154Z" fill="${actionIconBackground}"/>
</svg>`;
const Danger = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="18" fill="${actionIconBackground}"/>
<rect width="1440" height="900" transform="translate(-73 -305)" fill="${actionIconBackground}"/>
<rect x="-20.5" y="-13.5" width="327" height="96" rx="11.5" fill="${actionIconFill}" stroke="${actionIconBackground}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4773 1.44209L19.746 14.0572C19.906 14.4338 19.976 14.7399 19.996 15.058C20.036 15.8012 19.776 16.5236 19.2661 17.0795C18.7562 17.6334 18.0663 17.9604 17.3164 18H2.6789C2.36896 17.9812 2.05901 17.9108 1.76906 17.8018C0.319302 17.2172 -0.380581 15.5723 0.20932 14.1464L7.52809 1.43317C7.77804 0.986278 8.15798 0.600818 8.6279 0.353094C9.98767 -0.40098 11.7174 0.0944694 12.4773 1.44209ZM10.8675 9.75573C10.8675 10.2314 10.4776 10.6287 9.99767 10.6287C9.51775 10.6287 9.11782 10.2314 9.11782 9.75573V6.95248C9.11782 6.47585 9.51775 6.09039 9.99767 6.09039C10.4776 6.09039 10.8675 6.47585 10.8675 6.95248V9.75573ZM9.99767 14.0176C9.51775 14.0176 9.11782 13.6202 9.11782 13.1456C9.11782 12.669 9.51775 12.2726 9.99767 12.2726C10.4776 12.2726 10.8675 12.6601 10.8675 13.1347C10.8675 13.6202 10.4776 14.0176 9.99767 14.0176Z" fill="${actionIconBackground}"/>
</svg>`;
const Fraud = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7013 2.32867C16.4461 2.57382 16.9493 3.26122 16.9493 4.02608L16.9997 10.6637C17.0097 12.674 16.275 14.6253 14.9263 16.1561C14.3123 16.8621 13.5172 17.4603 12.5107 17.9996L8.93772 19.9117C8.82701 19.9706 8.70623 20 8.58545 20C8.46467 20 8.33383 19.9706 8.22312 19.9117L4.61991 18.0486C3.60336 17.5191 2.80824 16.9307 2.18422 16.2345C0.8154 14.7244 0.0504725 12.773 0.0404076 10.7628L0.000148279 4.12316C-0.00991656 3.3583 0.493325 2.67286 1.22806 2.41693L7.84065 0.103698C8.23318 -0.034566 8.66597 -0.034566 9.06856 0.103698L15.7013 2.32867ZM10.9205 12.0866C11.2124 11.8022 11.2124 11.3315 10.9205 11.0472L9.56174 9.72237L10.9205 8.39954C11.2124 8.11517 11.2124 7.65429 10.9205 7.35913C10.6286 7.07476 10.1455 7.07476 9.85362 7.35913L8.49487 8.68392L7.13612 7.35913C6.84424 7.07476 6.37119 7.07476 6.06924 7.35913C5.77736 7.65429 5.77736 8.11517 6.06924 8.39954L7.428 9.72237L6.06924 11.0472C5.77736 11.3315 5.77736 11.8022 6.06924 12.0866C6.22022 12.2337 6.41145 12.3013 6.60268 12.3013C6.80398 12.3013 6.99521 12.2337 7.13612 12.0866L8.49487 10.7628L9.85362 12.0866C10.0046 12.2337 10.1958 12.3013 10.3871 12.3013C10.5783 12.3013 10.7796 12.2337 10.9205 12.0866Z" fill="${actionIconBackground}"/>
</svg>`;
const Health_Safety = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0312 7.53125V11.4688C18.0309 11.8167 17.8924 12.1503 17.6464 12.3964C17.4003 12.6424 17.0667 12.7809 16.7188 12.7812H12.7812V16.7188C12.7809 17.0667 12.6424 17.4003 12.3964 17.6464C12.1503 17.8924 11.8167 18.0309 11.4688 18.0312H7.53125C7.18328 18.0309 6.84967 17.8924 6.60361 17.6464C6.35756 17.4003 6.21915 17.0667 6.21875 16.7188V12.7812H2.28125C1.93328 12.7809 1.59967 12.6424 1.35361 12.3964C1.10756 12.1503 0.969148 11.8167 0.96875 11.4688V7.53125C0.969148 7.18328 1.10756 6.84967 1.35361 6.60361C1.59967 6.35756 1.93328 6.21915 2.28125 6.21875H6.21875V2.28125C6.21915 1.93328 6.35756 1.59967 6.60361 1.35361C6.84967 1.10756 7.18328 0.969148 7.53125 0.96875H11.4688C11.8167 0.969148 12.1503 1.10756 12.3964 1.35361C12.6424 1.59967 12.7809 1.93328 12.7812 2.28125V6.21875H16.7188C17.0667 6.21915 17.4003 6.35756 17.6464 6.60361C17.8924 6.84967 18.0309 7.18328 18.0312 7.53125Z" fill="#0097F7"/>
</svg>`;
const Info = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="18" height="18" fill="${actionIconBackground}"/>
<rect width="1440" height="900" transform="translate(-74 -201)" fill="${actionIconBackground}"/>
<rect x="-21.5" y="-15.5" width="327" height="99" rx="11.5" fill="${actionIconFill}" stroke="${actionIconBackground}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 -2.25984e-06 9 -2.69415e-06C4.032 -3.12847e-06 -6.86227e-07 4.032 -1.12054e-06 9C-1.55486e-06 13.968 4.032 18 9 18ZM8.09998 4.50016L9.89998 4.50016L9.89998 6.30016L8.09998 6.30016L8.09998 4.50016ZM8.09998 8.1L9.89998 8.1L9.89998 13.5L8.09998 13.5L8.09998 8.1Z" fill="${actionIconBackground}"/>
</svg>`;
const Marketing = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.29367 0.188696C9.43739 0.05969 9.62751 -0.00793186 9.82211 0.000742409C13.9358 0.123889 17.3739 3.11022 17.997 7.10157C18.0009 7.1254 18.0009 7.1497 17.997 7.17353C18.0104 7.36239 17.9465 7.5487 17.8196 7.69126C17.6926 7.83383 17.513 7.92089 17.3205 7.9332L10.4089 8.38899C10.1804 8.40926 9.95369 8.33404 9.78459 8.18183C9.61548 8.02962 9.51961 7.81451 9.52055 7.58935L9.05597 0.800385V0.688435C9.06443 0.497498 9.14995 0.317703 9.29367 0.188696ZM8.81969 10.1643L14.8102 9.78047L14.851 9.79646C15.1082 9.80066 15.3532 9.90498 15.5321 10.0864C15.7109 10.2679 15.8089 10.5116 15.8046 10.764C15.5685 14.2039 13.0465 17.0781 9.61449 17.8185C6.18244 18.559 2.66416 16.988 0.979003 13.9626C0.483496 13.0912 0.170372 12.1315 0.0580086 11.1399C0.0144282 10.846 -0.00465264 10.5492 0.000955789 10.2523C0.0123142 6.59446 2.61655 3.43726 6.26046 2.66365C6.70158 2.58108 7.14386 2.80133 7.33631 3.19941C7.38422 3.27164 7.42257 3.34957 7.45042 3.4313C7.51873 4.48573 7.58958 5.53018 7.66014 6.57022C7.71586 7.39158 7.77139 8.21019 7.82534 9.0288C7.82255 9.22164 7.85286 9.41357 7.91499 9.59655C8.06125 9.95656 8.42523 10.185 8.81969 10.1643Z" fill="${actionIconBackground}"/>
</svg>`;
const News = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.15917 0.833313H12.8418C15.6733 0.833313 17.25 2.46498 17.25 5.26081V14.73C17.25 17.5716 15.6733 19.1666 12.8418 19.1666H5.15917C2.3725 19.1666 0.75 17.5716 0.75 14.73V5.26081C0.75 2.46498 2.3725 0.833313 5.15917 0.833313ZM5.40667 5.10498V5.09582H8.14658C8.54167 5.09582 8.8625 5.41665 8.8625 5.8099C8.8625 6.21415 8.54167 6.53498 8.14658 6.53498H5.40667C5.01158 6.53498 4.69167 6.21415 4.69167 5.81998C4.69167 5.42582 5.01158 5.10498 5.40667 5.10498ZM5.40667 10.6783H12.5933C12.9875 10.6783 13.3083 10.3575 13.3083 9.96331C13.3083 9.56915 12.9875 9.2474 12.5933 9.2474H5.40667C5.01158 9.2474 4.69167 9.56915 4.69167 9.96331C4.69167 10.3575 5.01158 10.6783 5.40667 10.6783ZM5.40667 14.8675H12.5933C12.9591 14.8308 13.235 14.5182 13.235 14.1525C13.235 13.7766 12.9591 13.465 12.5933 13.4283H5.40667C5.13167 13.4008 4.86584 13.5291 4.71917 13.7675C4.5725 13.9966 4.5725 14.2991 4.71917 14.5375C4.86584 14.7666 5.13167 14.9041 5.40667 14.8675Z" fill="${actionIconBackground}"/>
</svg>`;
const Notify = `<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="15" height="16" fill="${actionIconBackground}"/>
<rect width="1440" height="900" transform="translate(-748 -445)" fill="${actionIconBackground}"/>
<rect x="-24.5" y="-20.5" width="327" height="119" rx="11.5" fill="${actionIconFill}" stroke="${actionIconBackground}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8656 5.43706C12.8656 6.44181 13.1312 7.03402 13.7156 7.71647C14.1584 8.21925 14.3 8.86464 14.3 9.56482C14.3 10.2642 14.0702 10.9281 13.6098 11.4671C13.0071 12.1133 12.1572 12.5259 11.2897 12.5976C10.0327 12.7047 8.77488 12.795 7.50035 12.795C6.22503 12.795 4.96799 12.741 3.71095 12.5976C2.84272 12.5259 1.99277 12.1133 1.39088 11.4671C0.930527 10.9281 0.699951 10.2642 0.699951 9.56482C0.699951 8.86464 0.842272 8.21925 1.28434 7.71647C1.88702 7.03402 2.13509 6.44181 2.13509 5.43706V5.09624C2.13509 3.75067 2.47061 2.87082 3.16155 2.00949C4.1888 0.753357 5.83543 0 7.46457 0H7.53613C9.20025 0 10.9001 0.789615 11.9099 2.09973C12.5651 2.94333 12.8656 3.78612 12.8656 5.09624V5.43706ZM5.15898 14.4486C5.15898 14.0458 5.5287 13.8613 5.87059 13.7823C6.27052 13.6977 8.70747 13.6977 9.1074 13.7823C9.44929 13.8613 9.819 14.0458 9.819 14.4486C9.79912 14.8322 9.57411 15.1722 9.26323 15.3881C8.86012 15.7024 8.38705 15.9014 7.8925 15.9731C7.61899 16.0085 7.35025 16.0093 7.08628 15.9731C6.59094 15.9014 6.11786 15.7024 5.71555 15.3873C5.40387 15.1722 5.17886 14.8322 5.15898 14.4486Z" fill="${actionIconBackground}"/>
</svg>`;
const Office = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.1657 5.43706C12.1657 6.44181 12.4312 7.03402 13.0156 7.71647C13.4585 8.21925 13.6 8.86464 13.6 9.56482C13.6 10.2642 13.3702 10.9281 12.9099 11.4671C12.3072 12.1133 11.4572 12.5259 10.5898 12.5976C9.33276 12.7047 8.07493 12.795 6.8004 12.795C5.52507 12.795 4.26804 12.741 3.011 12.5976C2.14277 12.5259 1.29281 12.1133 0.690932 11.4671C0.230576 10.9281 0 10.2642 0 9.56482C0 8.86464 0.142321 8.21925 0.584391 7.71647C1.18707 7.03402 1.43514 6.44181 1.43514 5.43706V5.09624C1.43514 3.75067 1.77066 2.87082 2.4616 2.00949C3.48885 0.753357 5.13548 0 6.76462 0H6.83618C8.5003 0 10.2002 0.789615 11.21 2.09973C11.8651 2.94333 12.1657 3.78612 12.1657 5.09624V5.43706ZM4.45903 14.4486C4.45903 14.0458 4.82875 13.8613 5.17064 13.7823C5.57057 13.6977 8.00752 13.6977 8.40745 13.7823C8.74933 13.8613 9.11905 14.0458 9.11905 14.4486C9.09917 14.8322 8.87416 15.1722 8.56328 15.3881C8.16017 15.7024 7.6871 15.9014 7.19255 15.9731C6.91904 16.0085 6.6503 16.0093 6.38633 15.9731C5.89099 15.9014 5.41791 15.7024 5.0156 15.3873C4.70392 15.1722 4.47891 14.8322 4.45903 14.4486Z" fill="${actionIconBackground}"/>
</svg>`;
const Sales = `<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9511 0.0754655L9.50853 3.26172C8.98507 3.51662 8.94481 4.23883 9.38773 4.5787L10.9581 5.72575L8.74348 9.03945L5.48195 4.91857C5.03903 4.36628 4.23371 4.45125 3.87132 5.00354L0.166867 11.0787C-0.114993 11.546 -0.0344619 12.1832 0.368196 12.5231L1.13325 13.1603C1.61643 13.5427 2.30095 13.4577 2.62308 12.9479L4.87796 9.50677L8.17976 13.6277C8.58241 14.1375 9.38773 14.1375 9.75012 13.5427L13.6156 7.67999L15.2665 8.86952C15.7095 9.20939 16.3537 8.912 16.4342 8.31724L16.998 0.840166C17.0382 0.245399 16.4745 -0.179435 15.9511 0.0754655Z" fill="${actionIconBackground}"/>
</svg>`;
const Shield_Fail = `<svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1079 3.35114C14.1079 2.7145 13.689 2.14234 13.0691 1.93828L7.54827 0.0863137C7.21317 -0.0287712 6.85294 -0.0287712 6.52622 0.0863137L1.02218 2.01174C0.410622 2.22477 -0.00825411 2.7953 0.000123421 3.43194L0.0336335 8.95847C0.042011 10.6317 0.678703 12.2559 1.81805 13.5129C2.33745 14.0924 2.99928 14.5821 3.84541 15.0229L6.84456 16.5737C6.93671 16.6226 7.04562 16.6471 7.14615 16.6471C7.24668 16.6471 7.34721 16.6226 7.43937 16.5737L10.4134 14.9821C11.2511 14.5332 11.913 14.0353 12.424 13.4476C13.5466 12.1735 14.1581 10.5493 14.1498 8.87603L14.1079 3.35114Z" fill="${actionIconBackground}"/>
</svg>`;
const Star = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.121 11.2275C14.8749 11.466 14.7619 11.8108 14.8179 12.1489L15.6624 16.8223C15.7336 17.2184 15.5664 17.6192 15.2349 17.8482C14.9101 18.0856 14.4779 18.1141 14.1236 17.9242L9.91659 15.7299C9.77031 15.6521 9.60788 15.6103 9.44165 15.6055H9.18423C9.09494 15.6188 9.00756 15.6473 8.92777 15.691L4.71982 17.8957C4.51179 18.0001 4.27622 18.0372 4.0454 18.0001C3.48308 17.8938 3.10788 17.358 3.20001 16.7929L4.0454 12.1195C4.10145 11.7785 3.98841 11.4318 3.74239 11.1895L0.312391 7.86497C0.0255287 7.58666 -0.0742083 7.16871 0.0568746 6.79161C0.184158 6.41546 0.509016 6.14095 0.901314 6.07921L5.6222 5.39435C5.98125 5.3573 6.29661 5.13883 6.45809 4.81587L8.53832 0.550928C8.58771 0.45594 8.65135 0.368552 8.72829 0.294462L8.81378 0.22797C8.85842 0.178577 8.90972 0.137732 8.96671 0.104486L9.07025 0.0664913L9.23173 0H9.63162C9.98878 0.0370452 10.3032 0.250767 10.4675 0.569926L12.5753 4.81587C12.7273 5.12648 13.0227 5.3421 13.3637 5.39435L18.0846 6.07921C18.4835 6.1362 18.8169 6.41166 18.949 6.79161C19.0734 7.17251 18.9661 7.59046 18.6735 7.86497L15.121 11.2275Z" fill="${actionIconBackground}"/>
</svg>`;
const Survey = `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.2124 4.76241C12.2124 7.40617 10.0489 9.52482 7.34933 9.52482C4.6507 9.52482 2.48631 7.40617 2.48631 4.76241C2.48631 2.11865 4.6507 0 7.34933 0C10.0489 0 12.2124 2.11865 12.2124 4.76241ZM0 14.9174C0 12.47 3.38553 11.8577 7.34933 11.8577C11.3347 11.8577 14.6987 12.4911 14.6987 14.9404C14.6987 17.3877 11.3131 18 7.34933 18C3.364 18 0 17.3666 0 14.9174ZM14.1734 4.84875C14.1734 6.19506 13.7605 7.45131 13.0364 8.49482C12.9611 8.60214 13.0276 8.74683 13.1587 8.76983C13.3407 8.79954 13.5276 8.81774 13.7184 8.82158C15.6167 8.87045 17.3202 7.67362 17.7908 5.87118C18.4885 3.19676 16.4415 0.795428 13.8339 0.795428C13.5511 0.795428 13.2801 0.824175 13.0159 0.876878C12.9797 0.884544 12.9405 0.901792 12.921 0.932455C12.8955 0.971743 12.9141 1.02253 12.9396 1.05607C13.7233 2.13216 14.1734 3.44206 14.1734 4.84875ZM17.3173 10.7023C18.5932 10.9466 19.4317 11.444 19.7791 12.1694C20.0736 12.7635 20.0736 13.4534 19.7791 14.0475C19.2478 15.1705 17.5335 15.5318 16.8672 15.6247C16.7292 15.6439 16.6186 15.5289 16.6333 15.3928C16.9738 12.2805 14.2664 10.8048 13.5658 10.4656C13.5364 10.4493 13.5296 10.4263 13.5325 10.411C13.5345 10.4014 13.5472 10.3861 13.5697 10.3832C15.0854 10.3545 16.7155 10.5586 17.3173 10.7023Z" fill="${actionIconBackground}"/>
</svg>`;
const Product_Sales_Item = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1155" height="369" viewBox="0 0 1155 369">
<defs>
  <filter id="Rectangle_1645" x="0" y="0" width="1155" height="369" filterUnits="userSpaceOnUse">
    <feOffset dy="5" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="7.5" result="blur"/>
    <feFlood flood-opacity="0.078"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_5665" data-name="Group 5665" transform="translate(-7.5 -651.5)">
  <g transform="matrix(1, 0, 0, 1, 7.5, 651.5)" filter="url(#Rectangle_1645)">
    <rect id="Rectangle_1645-2" data-name="Rectangle 1645" width="1110" height="324" rx="7" transform="translate(22.5 17.5)" fill="#fff"/>
  </g>
  <text id="Location_Information_CRM_" data-name="Location Information (CRM)" transform="translate(553.999 925)" fill="#9d9fa2" font-size="42" font-family="Gilroy-Medium, Gilroy ☞" font-weight="500"><tspan x="-13.23" y="0">0</tspan></text>
  <rect id="Rectangle_1648" data-name="Rectangle 1648" width="52" height="53" rx="3" transform="translate(458.999 883)" fill="#b8b8b8"/>
  <path id="minus" d="M25.043,19.318H0V16.031H25.043Z" transform="translate(472.018 893.688)" fill="#fff"/>
  <rect id="Rectangle_1649" data-name="Rectangle 1649" width="52" height="53" rx="3" transform="translate(596.999 883)" fill="#b8b8b8"/>
  <path id="minus-2" data-name="minus" d="M29.973,20.242H0V16.031H29.973Z" transform="translate(608.438 891.777)" fill="#fff"/>
  <path id="minus-3" data-name="minus" d="M29.973,4.211H0V0H29.973Z" transform="translate(621.319 924.9) rotate(-90)" fill="#fff"/>
  <path id="angle-down" d="M40.574,14.51a1.274,1.274,0,0,1-.4.927L21.4,34.211a1.268,1.268,0,0,1-1.854,0L.769,15.436a1.268,1.268,0,0,1,0-1.854l2.014-2.014a1.268,1.268,0,0,1,1.854,0L20.47,27.4,36.3,11.569a1.268,1.268,0,0,1,1.854,0l2.014,2.014A1.274,1.274,0,0,1,40.574,14.51Z" transform="translate(1030.445 726.454)" fill="#9d9fa2"/>
  <g id="Group_5655" data-name="Group 5655" transform="translate(-704.833 521.596)">
    <g id="Rectangle_2268" data-name="Rectangle 2268" transform="translate(763.617 178.545)" fill="none" stroke="#c1c1c1" stroke-width="4">
      <rect width="268.919" height="267.994" rx="7" stroke="none"/>
      <rect x="2" y="2" width="264.919" height="263.994" rx="5" fill="none"/>
    </g>
    <g id="Group_4817" data-name="Group 4817" transform="translate(805.229 218.845)">
      <g id="wallpaper_black_24dp_1_" data-name="wallpaper_black_24dp (1)" transform="translate(0 0)">
        <path id="Path_4180" data-name="Path 4180" d="M0,0H187.394V187.394H0Z" transform="translate(0 0)" fill="rgba(0,0,0,0)"/>
        <path id="Path_4181" data-name="Path 4181" d="M17.616,17.616H72.273V2H17.616A15.662,15.662,0,0,0,2,17.616V72.273H17.616ZM64.465,87.889,33.232,126.93h93.7L103.505,95.7l-15.85,21.16Zm54.657-35.136a11.712,11.712,0,1,0-11.712,11.712A11.7,11.7,0,0,0,119.121,52.753ZM142.546,2H87.889V17.616h54.657V72.273h15.616V17.616A15.662,15.662,0,0,0,142.546,2Zm0,140.546H87.889v15.616h54.657a15.662,15.662,0,0,0,15.616-15.616V87.889H142.546ZM17.616,87.889H2v54.657a15.662,15.662,0,0,0,15.616,15.616H72.273V142.546H17.616Z" transform="translate(13.616 13.616)" fill="#c1c1c1"/>
      </g>
    </g>
    <g id="Path_5365" data-name="Path 5365" transform="translate(763.616 178.545)" fill="none">
      <path d="M6.486,0H262.432a6.486,6.486,0,0,1,6.486,6.486V261.508a6.486,6.486,0,0,1-6.486,6.486H6.486A6.486,6.486,0,0,1,0,261.508V6.486A6.486,6.486,0,0,1,6.486,0Z" stroke="none"/>
      <path d="M 6.486297607421875 4 C 5.115325927734375 4 3.999969482421875 5.1153564453125 3.999969482421875 6.486297607421875 L 3.999969482421875 261.5080871582031 C 3.999969482421875 262.8790283203125 5.115325927734375 263.994384765625 6.486297607421875 263.994384765625 L 262.4322509765625 263.994384765625 C 263.80322265625 263.994384765625 264.9185485839844 262.8790283203125 264.9185485839844 261.5080871582031 L 264.9185485839844 6.486297607421875 C 264.9185485839844 5.1153564453125 263.80322265625 4 262.4322509765625 4 L 6.486297607421875 4 M 6.486297607421875 0 L 262.4322509765625 0 C 266.0145568847656 0 268.9185485839844 2.90399169921875 268.9185485839844 6.486297607421875 L 268.9185485839844 261.5080871582031 C 268.9185485839844 265.09033203125 266.0145568847656 267.994384765625 262.4322509765625 267.994384765625 L 6.486297607421875 267.994384765625 C 2.904022216796875 267.994384765625 -3.0517578125e-05 265.09033203125 -3.0517578125e-05 261.5080871582031 L -3.0517578125e-05 6.486297607421875 C -3.0517578125e-05 2.90399169921875 2.904022216796875 0 6.486297607421875 0 Z" stroke="none" fill="#c1c1c1"/>
    </g>
  </g>
  <rect id="Rectangle_3173" data-name="Rectangle 3173" width="253" height="39" rx="19.5" transform="translate(846.966 890.927)" fill="#c1c1c1"/>
  <rect id="Rectangle_3170" data-name="Rectangle 3170" width="104" height="25" rx="12.5" transform="translate(362.966 813.75)" fill="#c1c1c1"/>
  <rect id="Rectangle_3172" data-name="Rectangle 3172" width="68" height="25" rx="12.5" transform="translate(357.966 899.75)" fill="#c1c1c1"/>
  <rect id="Rectangle_3171" data-name="Rectangle 3171" width="186" height="25" rx="12.5" transform="translate(533 813.75)" fill="#c1c1c1"/>
  <rect id="Rectangle_3174" data-name="Rectangle 3174" width="253" height="39" rx="19.5" transform="translate(362.966 730.5)" fill="#c1c1c1"/>
</g>
</svg>
`;

const Sim_Card = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
<path id="sim_card_FILL1_wght400_GRAD0_opsz48_1_" data-name="sim_card_FILL1_wght400_GRAD0_opsz48 (1)" d="M13.7,38.35h3v-3h-3Zm0-7.8h3v-8.3h-3Zm8.7,7.8h3v-8.5h-3Zm0-13.1h3v-3h-3Zm9.1,13.1h3v-3h-3Zm0-7.8h3v-8.3h-3ZM11,44a2.878,2.878,0,0,1-2.1-.9A2.878,2.878,0,0,1,8,41V15.95L19.95,4H37a2.878,2.878,0,0,1,2.1.9A2.878,2.878,0,0,1,40,7V41a3.076,3.076,0,0,1-3,3Z" transform="translate(-8 -4)" fill="${actionIconBackground}"/>
</svg>
`;

const Learning = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.65 34.71">
  <path d="m13.29,33.06l-4.77-2.62c-2.32-1.27-3.76-3.71-3.76-6.35v-5.02c0-.39.42-.64.77-.45l10.9,5.3c2.07,1.14,4.59,1.14,6.66,0l11.04-5.08c.34-.19.77.06.77.45l-.13,4.8c0,2.64-1.44,5.08-3.76,6.35l-4.77,2.62c-4.03,2.21-8.9,2.21-12.93,0Z" style="fill: ${actionIconBackground};"/>
  <path d="m18.82,21.28L1.04,12.53c-1.39-.76-1.39-2.76,0-3.52L18.82.25c.6-.33,1.32-.33,1.92,0l17.86,8.76c1.39.76,1.39,2.77,0,3.53l-17.86,8.76c-.6.33-1.32.33-1.92,0Z" style="fill: ${actionIconBackground};"/>
</svg>`;
const Learning_Gray = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.65 34.71">
  <path d="m13.29,33.06l-4.77-2.62c-2.32-1.27-3.76-3.71-3.76-6.35v-5.02c0-.39.42-.64.77-.45l10.9,5.3c2.07,1.14,4.59,1.14,6.66,0l11.04-5.08c.34-.19.77.06.77.45l-.13,4.8c0,2.64-1.44,5.08-3.76,6.35l-4.77,2.62c-4.03,2.21-8.9,2.21-12.93,0Z" style="fill: #a2a5ae;"/>
  <path d="m18.82,21.28L1.04,12.53c-1.39-.76-1.39-2.76,0-3.52L18.82.25c.6-.33,1.32-.33,1.92,0l17.86,8.76c1.39.76,1.39,2.77,0,3.53l-17.86,8.76c-.6.33-1.32.33-1.92,0Z" style="fill: #a2a5ae;"/>
</svg>`;

const Verified = `<svg xmlns="http://www.w3.org/2000/svg" width="46.095" height="44" viewBox="0 0 46.095 44">
  <path id="verified_FILL1_wght400_GRAD0_opsz48" d="M18.029,47l-3.981-6.81-7.91-1.624.89-7.7L2,25l5.029-5.814-.89-7.7,7.91-1.624L18.029,3l7.019,3.248L32.067,3,36.1,9.862l7.857,1.624-.89,7.7L48.1,25l-5.029,5.867.89,7.7L36.1,40.19,32.067,47l-7.019-3.248ZM22.8,31.967l11.89-11.786-2.357-2.148L22.8,27.462l-4.976-5.186-2.41,2.357Z" transform="translate(-2 -3)" style="fill: ${actionIconBackground};"/>
</svg>
`;
const Verified_Grey = `<svg xmlns="http://www.w3.org/2000/svg" width="46.095" height="44" viewBox="0 0 46.095 44">
<path id="verified_FILL1_wght400_GRAD0_opsz48" d="M18.029,47l-3.981-6.81-7.91-1.624.89-7.7L2,25l5.029-5.814-.89-7.7,7.91-1.624L18.029,3l7.019,3.248L32.067,3,36.1,9.862l7.857,1.624-.89,7.7L48.1,25l-5.029,5.867.89,7.7L36.1,40.19,32.067,47l-7.019-3.248ZM22.8,31.967l11.89-11.786-2.357-2.148L22.8,27.462l-4.976-5.186-2.41,2.357Z" transform="translate(-2 -3)" style="fill: #a2a5ae;"/>
</svg>
`;

const Pass_Key = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
  <path id="lock_FILL1_wght400_GRAD0_opsz48" d="M11,44a2.988,2.988,0,0,1-3-3V19.3a2.988,2.988,0,0,1,3-3h3.5V11.5a9.159,9.159,0,0,1,2.775-6.725A9.159,9.159,0,0,1,24,2a9.159,9.159,0,0,1,6.725,2.775A9.159,9.159,0,0,1,33.5,11.5v4.8H37a2.988,2.988,0,0,1,3,3V41a2.988,2.988,0,0,1-3,3ZM24,34a3.754,3.754,0,0,0,2.725-1.1,3.572,3.572,0,0,0,1.125-2.65,3.936,3.936,0,0,0-1.125-2.725,3.643,3.643,0,0,0-5.45,0A3.936,3.936,0,0,0,20.15,30.25a3.572,3.572,0,0,0,1.125,2.65A3.754,3.754,0,0,0,24,34ZM17.5,16.3h13V11.5a6.265,6.265,0,0,0-1.9-4.6,6.518,6.518,0,0,0-9.2,0,6.265,6.265,0,0,0-1.9,4.6Z"  transform="translate(-2 -3)" style="fill: #000000;"/>
</svg>
`;

const Question = `<svg xmlns="http://www.w3.org/2000/svg" width="41.928" height="41.928" viewBox="0 0 41.928 41.928">
<path id="help_center_FILL1_wght700_GRAD0_opsz48" d="M25.36,38.416a2.4,2.4,0,0,0,1.74-.761,2.455,2.455,0,0,0,.761-1.795,2.308,2.308,0,0,0-.761-1.713,2.5,2.5,0,0,0-1.795-.734,2.348,2.348,0,0,0-1.713.734,2.409,2.409,0,0,0-.734,1.767,2.438,2.438,0,0,0,.734,1.74,2.367,2.367,0,0,0,1.767.761Zm-2.23-8.048h3.915a6.626,6.626,0,0,1,.489-2.583A8.021,8.021,0,0,1,29.548,25.2a12.344,12.344,0,0,0,2.094-2.828,6.741,6.741,0,0,0,.734-3.154,5.973,5.973,0,0,0-1.958-4.786,7.314,7.314,0,0,0-4.949-1.686,7.909,7.909,0,0,0-5.057,1.631A9.764,9.764,0,0,0,17.366,18.4l3.752,1.523a9.344,9.344,0,0,1,1.74-2.2,3.634,3.634,0,0,1,2.556-.9,2.943,2.943,0,0,1,2.175.761,2.582,2.582,0,0,1,.761,1.9,3.332,3.332,0,0,1-.6,1.876,11.669,11.669,0,0,1-1.468,1.767,11.037,11.037,0,0,0-2.665,3.426,11.38,11.38,0,0,0-.489,3.807ZM9.862,46.628a4.926,4.926,0,0,1-3.616-1.5,4.926,4.926,0,0,1-1.5-3.616V9.866a5.017,5.017,0,0,1,1.5-3.644A4.883,4.883,0,0,1,9.862,4.7h31.65a4.971,4.971,0,0,1,3.644,1.523,4.971,4.971,0,0,1,1.523,3.644v31.65a4.883,4.883,0,0,1-1.523,3.616,5.017,5.017,0,0,1-3.644,1.5Z" transform="translate(-4.75 -4.7)" fill="#133c8b"/>
</svg>`;

const CheckSelectedBox = `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68">
<g id="Group_5307" data-name="Group 5307" transform="translate(67.832 68.444) rotate(180)">
  <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(-0.168 0.444)" fill="none" stroke="#000" stroke-width="4">
    <circle cx="34" cy="34" r="34" stroke="none"/>
    <circle cx="34" cy="34" r="32" fill="none"/>
  </g>
</g>
</svg>`;

const CheckBox = `<svg id="check_circle_black_24dp_3_" data-name="check_circle_black_24dp (3)" xmlns="http://www.w3.org/2000/svg" width="81.475" height="81.475" viewBox="0 0 81.475 81.475">
<path id="Path_4189" data-name="Path 4189" d="M0,0H81.475V81.475H0Z" fill="none"/>
<path id="Path_4190" data-name="Path 4190" d="M35.948,2A33.948,33.948,0,1,0,69.9,35.948,33.96,33.96,0,0,0,35.948,2Zm-6.79,50.922L12.184,35.948l4.787-4.787L29.158,43.315,54.925,17.548l4.787,4.821Z" transform="translate(4.79 4.79)" fill="#133c8b"/>
</svg>`;

const successAnswerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
<g id="Group_5189" data-name="Group 5189" transform="translate(-465 -979)">
  <circle id="Ellipse_156" data-name="Ellipse 156" cx="120" cy="120" r="120" transform="translate(465 979)" fill="#dc143c"/>
  <path id="warning_FILL0_wght400_GRAD0_opsz48" d="M2,129.226,74.5,4,147,129.226Zm17.136-9.886H129.862L74.5,23.772Zm56.022-9.392a4.79,4.79,0,1,0-3.543-1.4A4.8,4.8,0,0,0,75.158,109.947Zm-4.943-18.29H80.1V54.749H70.215ZM74.5,71.556Z" transform="translate(511 1025)" fill="#fff"/>
</g>
</svg>`;
const failAnswerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
<g id="Group_5192" data-name="Group 5192" transform="translate(-465 -899)">
  <g id="Group_5189" data-name="Group 5189" transform="translate(0 -80)">
    <circle id="Ellipse_156" data-name="Ellipse 156" cx="120" cy="120" r="120" transform="translate(465 979)" fill="#133c8b"/>
  </g>
  <path id="verified_FILL0_wght400_GRAD0_opsz48" d="M53.618,144.7,40.8,122.767l-25.472-5.229,2.868-24.8L2,73.848,18.194,55.124l-2.868-24.8L40.8,25.1,53.618,3l22.6,10.459L98.826,3l12.989,22.1,25.3,5.229-2.868,24.8,16.194,18.724L134.249,92.741l2.868,24.8-25.3,5.229L98.826,144.7l-22.6-10.458Zm4.555-13.326,18.049-7.591,18.555,7.591,11.3-16.869,19.736-5.061-2.024-20.074,13.664-15.519L123.791,57.992l2.024-20.074-19.736-4.723L94.44,16.326,76.222,23.917,57.666,16.326l-11.3,16.869L26.628,37.918l2.024,20.074L14.989,73.848,28.652,89.367l-2.024,20.411L46.364,114.5ZM76.222,73.848ZM68.968,96.283,107.26,58.329l-7.591-6.916-30.7,30.363-16.025-16.7-7.76,7.591Z" transform="translate(508.638 945.518)" fill="#fff"/>
</g>
</svg>`;

const svgMap = {
  Round_Btn_Default_Dark: Round_Btn_Default_Dark,
  Round_Btn_Default_Dark_Gray: Round_Btn_Default_Dark_Gray,
  DISPOSITION_POST: DISPOSITION_POST,
  Drop_Down: Drop_Down,
  Person_Sharp: Person_Sharp,
  Person_Sharp_White: Person_Sharp_White,
  Camera: Camera,
  ChatBoxes: ChatBoxes,
  Exclamation_Triangle_Fill: Exclamation_Triangle_Fill,
  Form: Form,
  Form_inactive: Form_inactive,
  Sale: SaleStore,
  Sale_Gray: SaleStore_Gray,  
  Sale_inactive: Sale_inactive,
  Geo: Geo,
  Location_Arrow_White: Location_Arrow_White,
  Filter: Filter,
  Filter_GRAY, Filter_GRAY,
  Location_Arrow: Location_Arrow,
  Location_Arrow_Gray: Location_Arrow_Gray,
  Home_Black_Gray: Home_Black_Gray,
  Home_Black, Home_Black,
  Android_More_Horizontal: Android_More_Horizontal,
  Android_More_Horizontal_Gray: Android_More_Horizontal_Gray,
  Calendar_Event_Fill_Gray: Calendar_Event_Fill_Gray,
  Calendar_Event_Fill: Calendar_Event_Fill,
  Pipeline_Gray: Pipeline_Gray,
  Pipeline: Pipeline,
  Travel_Explore_Gray: Travel_Explore_Gray,
  Travel_Explore: Travel_Explore,
  Ballot_Gray: Ballot_Gray,
  Ballot: Ballot,
  Insert_Invitation: Insert_Invitation,
  Green_Star: Green_Star,
  Check: Check,
  Close: Close,
  Support_Agent: Support_Agent,
  Account_Circle: Account_Circle,
  Support_Agent_Gray: Support_Agent_Gray,
  Angle_Left: Angle_Left,
  Description: Description,
  Wallpaper: Wallpaper,
  Video_Library: Video_Library,
  Path: Path,
  Contact_Mail: Contact_Mail,
  WhatsApp: WhatsApp,
  Quiz: Quiz,
  File_Download: File_Download,
  Right_Arrow: Right_Arrow,
  Item_Selected: Item_Selected,
  Calendar_Optimize: Calendar_Optimize,
  Arrow_Right: Arrow_Right,
  Add_Image: Add_Image,
  Add_Image_Compulsory: Add_Image_Compulsory,
  Arrow_Left_Btn: Arrow_Left,
  Arrow_Left_Btn_alt:Arrow_Left_alt,
  Arrow_Right_Btn: Arrow_Right_Button,
  Arrow_Right_Btn_alt: Arrow_Right_Button_alt,
  GPS_LOCATION: GPS_LOCATION,
  Add_Image_Gray: Add_Image_Gray,
  Roop_Gray: Roop_Gray,
  Forms_Red_Compulsory: Forms_Red_Compulsory,
  Forms_Green_Done: Forms_Green_Done,
  Re_loop: Re_loop,
  Logout: Logout,
  Faq: Faq,
  Signature_Btn_Right_Arrow: Signature_Btn_Right_Arrow,
  Question_Btn_Done: Question_Btn_Done,
  Question_Calendar: Question_Calendar,
  Angle_Left_form: Angle_Left_form,
  Person_Sharp_feature_card: Person_Sharp_feature_card,
  Form_feature_card: Form_feature_card,
  Sales_Pipeline_feature_Card: Sales_Pipeline_feature_Card,
  Arrow_feature_Card: Arrow_feature_Card,
  Yes_No_Button_Check: Yes_No_Button_Check,
  Calendar_Previous: Calendar_Previous,
  Calendar_Next: Calendar_Next,
  Time_Up: Time_Up,
  Time_Down: Time_Down,
  Activity_Comments: Activity_Comments,
  File: File,
  File_Upload: File_Upload,
  Check_Circle: Check_Circle,
  Sync: Sync,
  Colored_Sync: Colored_Sync,
  Bottom_Arrow: Bottom_Arrow,
  Up_Arrow: Up_Arrow,
  Profile_Done: Profile_Done,
  Hour_Glass: Hour_Glass,
  Activity: Activity,
  Activity_Items: Activity_Items,
  Stock: Stock,
  Stock_Gray: Stock_Gray,
  Add_Stock: Add_Stock,
  Chevron_Back: Chevron_Back,
  Slider_Arrow_Right: Slider_Arrow_Right,
  Slider_Arrow_Left: Slider_Arrow_Left,
  Scan_Icon: Scan_Icon,
  Scan_Icon_Gray: Scan_Icon_Gray,
  Action_Item: Action_Item,
  Customer_Sales: Customer_Sales,
  Drop_Up: Drop_Up,
  Shoping_Card: Shoping_Card,
  Shoping_Card_Gray: Shoping_Card_Gray,
  Access: Access,
  Access_Gray: Access_Gray,
  Business_Directory: Business_Directory,
  Business_Directory_Gray: Business_Directory_Gray,
  Avatar_Placeholder: Avatar_Placeholder,
  Description_Black: Description_Black,
  DoubleArrow: DoubleArrow,
  DoubleArrowWhite: DoubleArrowWhite,
  QR_SCAN: QR_SCAN,
  Check_List: Check_List,
  Check_List_Active: Check_List_Active,
  DELETE: DELETE,
  DEVICES: DEVICES,
  Touchpoints: Touchpoints,
  Image_Capture: Image_Capture,
  Image_Capture_Disable: Image_Capture_Disable,
  Pluse_Icon: Pluse_Icon,
  Cow_Green_Group_Icon: Cow_Green_Group_Icon,
  Price_Rise_Icon: Price_Rise_Icon,
  Price_Fall_Icon: Price_Fall_Icon,
  Sim_Card_Alert_Icon: Sim_Card_Alert_Icon,
  Camera_Icon: Camera_Icon,
  Special: Special,
  Sales_Cart: Sales_Cart,
  Sales_Cart_Gray: Sales_Cart_Gray,
  Repeat: Repeat,
  Inactive_Repeat: Inactive_Repeat,
  Setting: Setting,
  Sales_Value_Toggle_Icon: Sales_Value_Toggle_Icon,
  Sales_Volume_Toggle_Icon: Sales_Volume_Toggle_Icon,
  Bottom_Arrow_White: Bottom_Arrow_White,
  Google_Map_Icon: Google_Map_Icon,
  Sell_In_Icon: Sell_In_Icon,
  Mobility_Icon: Mobility_Icon,
  Festival_Icon: Festival_Icon,
  Tracking_Icon: Tracking_Icon,
  Compliance_Icon: Compliance_Icon,
  Product_Sales_Item: Product_Sales_Item,
  Bi: Bi,
  Birthday: Birthday,
  Career: Career,
  Danger: Danger,
  Fraud: Fraud,
  Health_Safety: Health_Safety,
  Info: Info,
  Learning: Learning,
  Marketing: Marketing,
  News: News,
  Notify: Notify,
  Office: Office,
  Sales: Sales,
  Shield_Fail: Shield_Fail,
  Star: Star,
  Survey: Survey,
  Sim_Card : Sim_Card,
  Learning: Learning,
  Learning_Gray: Learning_Gray,
  Verified: Verified,
  Verified_Grey:Verified_Grey,
  Angle_Left_form_blue: Angle_Left_form_blue,
  Pass_Key: Pass_Key,
  Question: Question,
  CheckSelectedBox: CheckSelectedBox,
  CheckBox: CheckBox,
  successAnswerIcon: successAnswerIcon,
  failAnswerIcon: failAnswerIcon,
}

export default ({
  icon,
  xml,
  color,
  width = '100%',
  height = '100%',
  style = {},
}) => {
  let xmlData = Round_Btn_Default_Dark
  if (xml != null && xml != undefined) {
    xmlData = xml
  }
  if (icon && svgMap[icon]) {
    xmlData = svgMap[icon]
  }
  return (<Fragment>
        <SvgXml
          style={style}
          xml={xmlData}
          width={width}
          height={height}
        />
  </Fragment>)
  
}