import { Component } from "react";
import Home from "./Home";

// Style, description, image and button links for each Component required
// Note: addition components can be added here by creating new object and using them in Home.js

export const homeObjOne = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Never Forget a password',
    headline: 'Save all of your passwords with a peace of mind',
    description:
      "Say goodbye to unbearable password resets",
    buttonLabel: 'Get Started',
    imgStart: '',
    img: 'images/svg-1.svg',
    alt: 'Credit Card',
    linkTo: '/login'
  };
  
  export const homeObjTwo = {
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Tools to help you',
    headline: 'Use our tools to generate or check you passwords',
    description:
      'Always be informed',
    buttonLabel: 'Try Now',
    imgStart: '',
    img: 'images/svg-5.svg',
    alt: 'Vault',
    linkTo: '/password-generator'
  };
  
  export const homeObjThree = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Easy to use',
    headline: 'Super fast and simple process',
    description:
      "Get everything set up and ready in under 5 minutes. All you need to do is add your information and you're ready to go.",
    buttonLabel: 'Start Now',
    imgStart: 'start',
    img: 'images/svg-7.svg',
    alt: 'Vault',
    linkTo:'/login'
  };
  
  export const homeObjFour = {
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'STORAGE',
    headline: 'Every password is stored on our secure cloud database',
    description:
      'Never ever have to worry again about saved password. We store your data, so you can access it anytime.',
    buttonLabel: 'Sign Up Now',
    imgStart: 'start',
    img: 'images/svg-8.svg',
    alt: 'Vault',
    linkTo:'/signup'
  };