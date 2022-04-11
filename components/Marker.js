import React, { Fragment } from 'react';
import { SvgXml } from 'react-native-svg';

const Purple_X = `
  <svg id="Purple_X" data-name="Purple X" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="86" viewBox="0 0 86 86">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2610" data-name="Rectangle 2610" width="86" height="86" fill="none"/>
      </clipPath>
    </defs>
    <g id="Group_4569" data-name="Group 4569" clip-path="url(#clip-path)">
      <path id="Path_4355" data-name="Path 4355" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#8850bf"/>
      <path id="Path_4356" data-name="Path 4356" d="M60.519,26.994l-1-1a1.284,1.284,0,0,0-1.818,0l-9.363,9.362a1.284,1.284,0,0,1-1.818,0l-9.363-9.362a1.284,1.284,0,0,0-1.818,0l-1,1a1.284,1.284,0,0,0,0,1.818L43.7,38.175a1.286,1.286,0,0,1,0,1.818l-9.363,9.362a1.284,1.284,0,0,0,0,1.818l1,1a1.286,1.286,0,0,0,1.818,0l9.363-9.363a1.286,1.286,0,0,1,1.818,0L57.7,52.175a1.286,1.286,0,0,0,1.818,0l1-1a1.286,1.286,0,0,0,0-1.818l-9.363-9.362a1.286,1.286,0,0,1,0-1.818l9.363-9.363a1.286,1.286,0,0,0,0-1.818" transform="translate(-4.594 -3.466)" fill="#fff"/>
    </g>
  </svg>
`;

const Red_X = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="86" viewBox="0 0 86 86">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2611" data-name="Rectangle 2611" width="86" height="86" transform="translate(0.292)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Red_X" data-name="Red X" transform="translate(-0.292)">
      <g id="Group_4572" data-name="Group 4572" clip-path="url(#clip-path)">
        <path id="Path_4357" data-name="Path 4357" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#dc143c"/>
        <path id="Path_4358" data-name="Path 4358" d="M60.519,26.994l-1-1a1.284,1.284,0,0,0-1.818,0l-9.363,9.362a1.284,1.284,0,0,1-1.818,0l-9.363-9.362a1.284,1.284,0,0,0-1.818,0l-1,1a1.284,1.284,0,0,0,0,1.818L43.7,38.175a1.286,1.286,0,0,1,0,1.818l-9.363,9.362a1.284,1.284,0,0,0,0,1.818l1,1a1.286,1.286,0,0,0,1.818,0l9.363-9.363a1.286,1.286,0,0,1,1.818,0L57.7,52.175a1.286,1.286,0,0,0,1.818,0l1-1a1.286,1.286,0,0,0,0-1.818l-9.363-9.362a1.286,1.286,0,0,1,0-1.818l9.363-9.363a1.286,1.286,0,0,0,0-1.818" transform="translate(-4.594 -3.466)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Red_Star = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="87" viewBox="0 0 86 87">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2620" data-name="Rectangle 2620" width="86" height="87" transform="translate(0.135 -0.377)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Red_Star" data-name="Red Star" transform="translate(-0.135 0.377)">
      <g id="Group_4613" data-name="Group 4613" clip-path="url(#clip-path)">
        <path id="Path_4373" data-name="Path 4373" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#dc143c"/>
        <path id="Path_4374" data-name="Path 4374" d="M46.631,28.274l2,4.724.969,2.29,2.476.207,5.1.433L53.294,39.29l-1.877,1.63.557,2.434,1.155,4.972-4.374-2.641-2.125-1.32-2.125,1.279-4.373,2.641,1.155-4.971.557-2.435-1.877-1.629-3.878-3.363,5.095-.433,2.476-.207.97-2.29,2-4.682M45.312,20.8,41.17,30.573a1.431,1.431,0,0,1-1.2.868l-10.591.9a1.431,1.431,0,0,0-.816,2.509l8.045,6.97a1.429,1.429,0,0,1,.457,1.407L34.652,53.583a1.432,1.432,0,0,0,2.135,1.551l9.1-5.5a1.434,1.434,0,0,1,1.48,0l9.1,5.5a1.432,1.432,0,0,0,2.134-1.551L56.193,43.226a1.431,1.431,0,0,1,.457-1.407l8.046-6.97a1.432,1.432,0,0,0-.817-2.509l-10.59-.9a1.434,1.434,0,0,1-1.2-.868L47.949,20.8a1.432,1.432,0,0,0-2.636,0" transform="translate(-3.798 -2.696)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Red_Triangle = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="87" viewBox="0 0 86 87">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2612" data-name="Rectangle 2612" width="86" height="87" transform="translate(0.292 -0.377)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Red_Triangle" data-name="Red Triangle" transform="translate(-0.292 0.377)">
      <g id="Group_4575" data-name="Group 4575" clip-path="url(#clip-path)">
        <path id="Path_4359" data-name="Path 4359" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#dc143c"/>
        <path id="Path_4360" data-name="Path 4360" d="M46.755,28.576,59.1,48.335H34.412ZM45.123,23.9,29.279,49.254A1.925,1.925,0,0,0,30.91,52.2H62.6a1.924,1.924,0,0,0,1.632-2.944L48.386,23.9a1.924,1.924,0,0,0-3.263,0" transform="translate(-3.921 -3.112)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Grey_Triangle = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="86" viewBox="0 0 86 86">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2613" data-name="Rectangle 2613" width="86" height="86" transform="translate(0 0.246)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Grey_Triangle" data-name="Grey Triangle" transform="translate(0 -0.246)">
      <g id="Group_4578" data-name="Group 4578" clip-path="url(#clip-path)">
        <path id="Path_4361" data-name="Path 4361" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#a6a6a6"/>
        <path id="Path_4362" data-name="Path 4362" d="M46.755,28.576,59.1,48.335H34.412ZM45.123,23.9,29.279,49.254A1.925,1.925,0,0,0,30.91,52.2H62.6a1.924,1.924,0,0,0,1.632-2.944L48.386,23.9a1.924,1.924,0,0,0-3.263,0" transform="translate(-3.921 -3.112)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Gold_Star = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="86" viewBox="0 0 86 86">
    <defs>
      <linearGradient id="linear-gradient" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#d9ae30"/>
      <stop offset="0.54" stop-color="#a67721"/>
      <stop offset="1" stop-color="#8c661f"/>
      </linearGradient>
    </defs>
    <g id="Gold_Star" data-name="Gold Star" transform="translate(-0.292 -0.246)">
      <path id="Path_4365" data-name="Path 4365" d="M74.159,36.921A28.924,28.924,0,1,0,23.193,55.634h0l.112.13c.069.078.13.156.2.225L45.26,80.779l21.8-24.86.138-.156.121-.138h0A28.769,28.769,0,0,0,74.159,36.921Z" transform="translate(-2.207 -1.079)" fill="url(#linear-gradient)"/>
      <rect id="Rectangle_2616" data-name="Rectangle 2616" width="86" height="86" transform="translate(0.292 0.246)" fill="none" opacity="0"/>
      <path id="Path_4366" data-name="Path 4366" d="M46.635,28.274l2,4.687.994,2.326,2.473.208,5.1.432L53.319,39.29l-1.9,1.626.553,2.421,1.159,4.972-4.367-2.62-2.119-1.323-2.127,1.28L40.141,48.24l1.15-4.9.553-2.456-1.876-1.634-3.883-3.364,5.1-.432,2.473-.208.968-2.283,2.006-4.687M45.3,20.8l-4.142,9.771a1.427,1.427,0,0,1-1.193.865L29.375,32.3a1.435,1.435,0,0,0-.821,2.508l8.1,7a1.444,1.444,0,0,1,.458,1.409L34.693,53.6a1.435,1.435,0,0,0,2.136,1.548l9.105-5.491a1.418,1.418,0,0,1,1.479,0l9.105,5.491A1.435,1.435,0,0,0,58.654,53.6L56.233,43.225a1.444,1.444,0,0,1,.458-1.409l8.05-6.97a1.435,1.435,0,0,0-.865-2.508l-10.593-.865a1.427,1.427,0,0,1-1.193-.865l-4.142-9.771A1.427,1.427,0,0,0,45.3,20.8Z" transform="translate(-3.797 -2.696)" fill="#fff"/>
    </g>
  </svg>
`

const Yellow_Pin = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="87" viewBox="0 0 86 87">
    <defs>
      <clipPath id="clip-path">
      <rect id="Rectangle_2617" data-name="Rectangle 2617" width="86" height="87" transform="translate(0.135 -0.131)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Green_Star" data-name="Green Star" transform="translate(-0.135 0.131)">
      <g id="Group_4581" data-name="Group 4581" clip-path="url(#clip-path)">
        <path id="Path_4367" data-name="Path 4367" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#e3e924"/>
        <path id="Path_4368" data-name="Path 4368" d="M46.631,28.274l2,4.724.969,2.29,2.476.207,5.1.433L53.294,39.29l-1.877,1.63.557,2.434,1.155,4.972-4.374-2.641-2.125-1.32-2.125,1.279-4.373,2.641,1.155-4.971.557-2.435-1.877-1.629-3.878-3.363,5.095-.433,2.476-.207.97-2.29,2-4.682M45.312,20.8,41.17,30.573a1.431,1.431,0,0,1-1.2.868l-10.591.9a1.431,1.431,0,0,0-.816,2.509l8.045,6.97a1.429,1.429,0,0,1,.457,1.407L34.652,53.583a1.432,1.432,0,0,0,2.135,1.551l9.1-5.5a1.434,1.434,0,0,1,1.48,0l9.1,5.5a1.432,1.432,0,0,0,2.134-1.551L56.193,43.226a1.431,1.431,0,0,1,.457-1.407l8.046-6.97a1.432,1.432,0,0,0-.817-2.509l-10.59-.9a1.434,1.434,0,0,1-1.2-.868L47.949,20.8a1.432,1.432,0,0,0-2.636,0" transform="translate(-3.798 -2.696)" fill="#fff"/>
      </g>
    </g>
  </svg>
  `

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
`
const Orange_Star = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="87" viewBox="0 0 86 87">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2618" data-name="Rectangle 2618" width="86" height="87" transform="translate(0.292 -0.131)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Orange_Star" data-name="Orange Star" transform="translate(-0.292 0.131)">
      <g id="Group_4584" data-name="Group 4584" clip-path="url(#clip-path)">
        <path id="Path_4369" data-name="Path 4369" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#f29f05"/>
        <path id="Path_4370" data-name="Path 4370" d="M46.631,28.274l2,4.724.969,2.29,2.476.207,5.1.433L53.294,39.29l-1.877,1.63.557,2.434,1.155,4.972-4.374-2.641-2.125-1.32-2.125,1.279-4.373,2.641,1.155-4.971.557-2.435-1.877-1.629-3.878-3.363,5.095-.433,2.476-.207.97-2.29,2-4.682M45.312,20.8,41.17,30.573a1.431,1.431,0,0,1-1.2.868l-10.591.9a1.431,1.431,0,0,0-.816,2.509l8.045,6.97a1.429,1.429,0,0,1,.457,1.407L34.652,53.583a1.432,1.432,0,0,0,2.135,1.551l9.1-5.5a1.434,1.434,0,0,1,1.48,0l9.1,5.5a1.432,1.432,0,0,0,2.134-1.551L56.193,43.226a1.431,1.431,0,0,1,.457-1.407l8.046-6.97a1.432,1.432,0,0,0-.817-2.509l-10.59-.9a1.434,1.434,0,0,1-1.2-.868L47.949,20.8a1.432,1.432,0,0,0-2.636,0" transform="translate(-3.798 -2.696)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Turquoise = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="86" viewBox="0 0 86 86">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_2619" data-name="Rectangle 2619" width="86" height="86" transform="translate(0 0.492)" fill="none"/>
      </clipPath>
    </defs>
    <g id="Turquoise" transform="translate(0 -0.492)">
      <g id="Group_4587" data-name="Group 4587" clip-path="url(#clip-path)">
        <path id="Path_4371" data-name="Path 4371" d="M74.159,36.926A28.926,28.926,0,1,0,23.194,55.635l-.009,0,.112.128c.066.076.133.151.2.227l21.762,24.8,21.767-24.86.135-.156.12-.136-.011,0a28.79,28.79,0,0,0,6.889-18.709" transform="translate(-2.206 -1.082)" fill="#12e1fc"/>
        <path id="Path_4372" data-name="Path 4372" d="M46.631,28.274l2,4.724.969,2.29,2.476.207,5.1.433L53.294,39.29l-1.877,1.63.557,2.434,1.155,4.972-4.374-2.641-2.125-1.32-2.125,1.279-4.373,2.641,1.155-4.971.557-2.435-1.877-1.629-3.878-3.363,5.095-.433,2.476-.207.97-2.29,2-4.682M45.312,20.8,41.17,30.573a1.431,1.431,0,0,1-1.2.868l-10.591.9a1.431,1.431,0,0,0-.816,2.509l8.045,6.97a1.429,1.429,0,0,1,.457,1.407L34.652,53.583a1.432,1.432,0,0,0,2.135,1.551l9.1-5.5a1.434,1.434,0,0,1,1.48,0l9.1,5.5a1.432,1.432,0,0,0,2.134-1.551L56.193,43.226a1.431,1.431,0,0,1,.457-1.407l8.046-6.97a1.432,1.432,0,0,0-.817-2.509l-10.59-.9a1.434,1.434,0,0,1-1.2-.868L47.949,20.8a1.432,1.432,0,0,0-2.636,0" transform="translate(-3.798 -2.696)" fill="#fff"/>
      </g>
    </g>
  </svg>
`
const Selected_Marker = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100" viewBox="0 0 100 100">
<defs>
  <clipPath id="clip-path">
    <rect id="Rectangle_2619" data-name="Rectangle 2619" width="100" height="100" fill="#133c8b"/>
  </clipPath>
</defs>
<g id="Group_5027" data-name="Group 5027" transform="translate(-180 -1067)">
  <g id="Group_5023" data-name="Group 5023" transform="translate(180 1067)">
    <g id="Group_4587" data-name="Group 4587" clip-path="url(#clip-path)">
      <path id="Path_4371" data-name="Path 4371" d="M83.211,41.452A33.452,33.452,0,1,0,24.272,63.088l-.01,0,.129.148c.076.088.154.175.231.262L49.789,92.171l25.173-28.75c.051-.06.1-.12.156-.18l.139-.157-.013,0a33.294,33.294,0,0,0,7.967-21.636" fill="#133c8b"/>
    </g>
  </g>
  <g id="check_circle_black_24dp_5_" data-name="check_circle_black_24dp (5)" transform="translate(203.068 1081.068)">
    <path id="Path_5370" data-name="Path 5370" d="M0,0H53.863V53.863H0Z" fill="none"/>
    <path id="Path_5371" data-name="Path 5371" d="M24.443,2A22.443,22.443,0,1,0,46.886,24.443,22.451,22.451,0,0,0,24.443,2Zm0,40.4A17.954,17.954,0,1,1,42.4,24.443,17.978,17.978,0,0,1,24.443,42.4Zm10.3-27.874-14.79,14.79-5.813-5.79-3.164,3.164,8.977,8.977L37.909,17.71Z" transform="translate(2.489 2.489)" fill="#f9f9f9"/>
  </g>
</g>
</svg>
`;

export default ({icon, width = "100%", height = "100%", style={} , xml }) => (
    <Fragment>       
        {icon == "Purple_X.png" && <SvgXml style={style} xml={Purple_X} width={width} height={height} />}
        {icon == "Red_X.png" && <SvgXml style={style} xml={Red_X} width={width} height={height} />}
        {icon == "Red_Star.png" && <SvgXml style={style} xml={Red_Star} width={width} height={height} />}
        {icon == "Red_Triangle.png" && <SvgXml style={style} xml={Red_Triangle} width={width} height={height} />}
        {icon == "Grey_Triangle.png" && <SvgXml style={style} xml={Grey_Triangle} width={width} height={height} />}
        {icon == "Gold_Star.png" && <SvgXml style={style} xml={Gold_Star} width={width} height={height} />}
        {icon == "Yellow_Pin.png" && <SvgXml style={style} xml={Yellow_Pin} width={width} height={height} />}
        {icon == "Green_Star.png" && <SvgXml style={style} xml={Green_Star} width={width} height={height} />}
        {icon == "Orange-Star.png" && <SvgXml style={style} xml={Orange_Star} width={width} height={height} />}
        {icon == "Turquoise.png" && <SvgXml style={style} xml={Turquoise} width={width} height={height} />}
        {icon == "purple_X_20211215.png" && <SvgXml style={style} xml={Purple_X} width={width} height={height} />}
        {icon == "red_X_20211215.png" && <SvgXml style={style} xml={Red_X} width={width} height={height} />}
        {icon == "red_star_20211215.png" && <SvgXml style={style} xml={Red_Star} width={width} height={height} />}
        {icon == "red_triangle_20211215.png" && <SvgXml style={style} xml={Red_Triangle} width={width} height={height} />}
        {icon == "grey_triangle_20211215.png" && <SvgXml style={style} xml={Grey_Triangle} width={width} height={height} />}
        {icon == "gold_star_20211215.png" && <SvgXml style={style} xml={Gold_Star} width={width} height={height} />}
        {icon == "green_star_20211215.png" && <SvgXml style={style} xml={Green_Star} width={width} height={height} />}
        {icon == "orange_star_20211215.png" && <SvgXml style={style} xml={Orange_Star} width={width} height={height} />}
        {icon == "blue_star_20211215.png" && <SvgXml style={style} xml={Turquoise} width={width} height={height} />}
        {icon == "Selected_Marker" && <SvgXml style={style} xml={Selected_Marker} width={width} height={height} />}
    </Fragment>
);