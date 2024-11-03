# alexleung.ca-v2

This is a second version of <a href='https://alexleung.ca'>alexleung.ca</a> made with Create React App.

![Homepage screenshot](./public/assets/screenshot.png)

## :construction: Installation & Setup

1. Clone this repo

2. Install dependencies

    `yarn install`

3. Start the development server

    `yarn start`

## :ship: Deployment

1. Ensure the `CNAME` is correct, then deploy

    `yarn deploy`

## :clipboard: Project src Folder Structure
```bash
src
├── components
│   ├── color-theme
│   │   ├── globalStyles.js
│   │   ├── Themes.js  
│   │   ├── Toggler.jsx
│   │   └── useDarkMode.js
│   │
│   ├── About.jsx
│   ├── Contact.jsx  
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── Skills.jsx 
│   ├── SocialLinks.jsx
│   └── Title.jsx
│
├── constants   
│   ├── skills.js
│   └── socialLinks.js
│
├── App.js
├── index.css
└── index.js
```