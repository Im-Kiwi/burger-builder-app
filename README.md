## INTRODUCTION

- The burger builder app will let you build burger by adding your favourite ingredients in it.
- You can go through a buy phase or can add multiple built burgers to cart and place order from there.

## ABOUT THIS APP

- This app consist of a tool which will help you to build a burger by having a burger controller where you can add or remove slices/ingredients inside a burger
- Each slices has a fixed price thus price of the burger will change depending upon how many slices an authenticated user has added.
- Extra items are also included like a softdrink and french fries just to make a complete snack
- Authentication feature also added, thus let a user to create an account.
- User can also allowed to do profile configuration, like managing delivery addresses, change email, change password, change username etc.
- An empty cart is also provide for the user which will help to save the burgers user built.

## TOOLS USED TO MAKE THIS PROJECT

- This app is made with the help of react library
- For the backend, firebase backend server is used and firebase functions been used to manage its firestore database
- Material-ui, React-bootstrap, Bootstrap, framer motion libraries are used for styling and transitioning

## HOW TO RUN THIS PROJECT

- If you want to run this project in your system then you need to download by clicking on the green "code" button or create a clone using `git clone` command from your terminal.
- Once you cloned or downloaded successfully, extract the zip file (if u chose the download option) and then go to the terminal reach to your project directory and type `npm install`, this will install all the resources or helping libraries which will help to run this project.
- If your cloned the project then type `npm install` directly.
- After that type `npm start` in your terminal to run this project.

## IMPORTANT NOTE

- Well as firebase backend server is used, so you need to create an account in the [**firebase**](https://firebase.google.com/).
- Then you generate an api key which then can we used in the app.
- Also you need to create a firestore database in firebase and use documentation and learn to use firebase function to manage and to connect the database with app.
- To use the key and ids of firebase all you have to do is to create a `.env` file and inside that you have to mention the below:
  - you will get all the values for the below environmental variables by connecting this application to the firebase, follow the instructions given in the firebase official site.

```javascript
REACT_APP_FIREBASE_API_KEY = "your api key";
REACT_APP_AUTH_DOMAIN = "<here>";
REACT_APP_PROJECT_ID = "<here>";
REACT_APP_STORAGE_BUCKET = "<here>";
REACT_APP_MESSAGING_SENDER_ID = "<here>";
REACT_APP_APP_ID = "<here>";
REACT_APP_MEASUREMENT_ID = "<here>";
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
