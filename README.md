# boilerplate-react

Creating a react boiler plate using rollup

## Pre-requesite

node.js
npm

## Setup

```zsh
mkdir src
cd src/
npm init --yes
```

This creates a `package.json` file. 

```zsh
npm install --save-dev rollup
```

We then add the build steps to `package.json`

```json
"scripts": {
    "build": "rollup --config",
},
```

Next we will create the rollup configuration file

```zsh
touch rollup.config.js
```
We then write the configuration for rollup

```js
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  }
};
```

We don't have an `index.js` file yet, so we need to create this file. For that we first need to install `react`.

```zsh
npm install --save react react-dom
```

Let's now create our `index.js` file.

```zsh
touch index.js
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Now let's create our first component, `App.js`

```zsh
touch App.js
```

```js
import React from 'react';

function App() {
  return (
    <div>
      Hello world!
    </div>
  );
}

export default App;
```

At this point running build fails? Why?

TODO: Answer?

Let's try to install Babel to fix that.

```zsh
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
```

Then create the babel configuration file `.babelrc` (the format of .babelrc is json)

```zsh
cd .. # we want to add .babelrc at the root of the project and not in src/
touch .babelrc
```

We then add the following to `.babelrc`

```json
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
}
```

Configuring rollup to use babel.

```zsh
npm install --save-dev rollup-plugin-babel @rollup/plugin-node-resolve
```

Then add this plugin in `rollup.config.js`

Add the following imports

```js
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
```

and then use them

```js
export default {
    ...,
    external: [
        "react",
        "react-dom"
    ]
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
```

Let's try to run `npm run build` again:

```zsh
src/index.js → dist/bundle.js...
created dist/bundle.js in 281ms
```

Our build is now successful. We now want to run the react app to display our hello world locaaly. For that we need to create a server. And, of course, we will also make sure that hot reload is integrated. For that we need to install x plugins:

Rollup watch => rebuilds on changes

add to `package.json`

`npm-run-all`: gives the possibility to run npm-scripts in parallel
`serve`: serve a SPA

```zsh
npm install --save-dev npm-run-all serve
```

```json
"scripts": {
    "build.dev": "rollup --config --watch",
    "start": "serve dist",
    "start.dev": "run-p start build.dev"
}
```

Running `npm start.dev` does not work at the moment, as there is no html page. Next we are going to create that page in `src`

```zsh
cd src
touch index.html
```

Next we install a plugin that will copy the template to the dist folder and import the generated bundle.

```zsh
npm install --save-dev rollup-plugin-generate-html-template
```

We then need to update our rollup.config.js accordingly.

```js
import htmlTemplate from 'rollup-plugin-generate-html-template';

export default {
    ...,
    plugins: [
        ...,
        htmlTemplate({
            template: 'src/index.html',
            target: 'index.html',
        }),
    ]
}
```