# Social Media Dsahboard
## About
This project is social media dashboard using react and API https://jsonplaceholder.typicode.com/ that use following tchenology

* [JSON Server](https://github.com/typicode/json-server) to allow run https://jsonplaceholder.typicode.com API in local environment
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/reactjs/react-router) to allow you manage application routing
* [Babel](http://babeljs.io) for ES6 and ES7
* [Webpack](https://webpack.js.org/) for bundling
* [Redux](https://github.com/reactjs/redux) to manage state in application
* [Redux Dev Tools](https://github.com/reactjs/redux-devtools) to allow you monitor state in redux, by adding some redux-tools extension in browser
* [Redux Thunk](https://github.com/gaearon/redux-thunk) to allows write action creators that return a function instead of an action
* [Redux Saga](https://github.com/redux-saga/redux-saga) to make application side effects easier to manage

* [ESLint](http://eslint.org) to maintain a consistent code style
* [style-loader](https://github.com/webpack/style-loader) to allow import of stylesheets in plain css
* [Material UI](https://github.com/mui-org/material-ui) to allow import material ui component
* [React Bootstrap](https://github.com/mui-org/material-ui) to allow import bootstrap component


## Setup
Follow this step to run this application in your environment
```sh
npm install

npm start
```
## How to login
Because of the password is still use hardcode password, you can login by using this configuration

```sh
username: Bret
password:admin
```

You can see another username in server/db.json

## Next Improvements
* Improve authentication, authentication in this project use data  of user in db.json and hardcode password. So the next improvement, authentication must look in backend server that manage real authentication and use token in post, put, delete transaction
* Enhance performance by adding lazy load and pagination to access data


