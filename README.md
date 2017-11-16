# Angular 5 boilerplate
This boilerplate includes:  

* [Webpack](https://webpack.github.io/) as module bundler with [HMR](https://webpack.js.org/concepts/hot-module-replacement/)
* Angular 5 with AOT
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/getting-started/introduction/) as responsive framework
* [ngx-bootstrap](https://valor-software.com/ngx-bootstrap) for bootstrap components
* [angular2-ladda](https://github.com/moff/angular2-ladda) for loading indicators 
* [angular2-moment](https://github.com/urish/angular2-moment) for dates parsing and manipulation
* [ngx-toastr](https://github.com/scttcper/ngx-toastr) for bootstrap-like toasts
* loading spinner service
Typescript is used instead of plain javascript for a bunch of reasons including:

* Angular2+ is meant to be used with typescript. AOT won't even work without it.
* As a replacement for [babel](https://babeljs.io/) to transpile ES6 features.
* Autocomplete
* Optional typing

## Development setup

 - install `node` 7+
 - install `yarn` package manager https://yarnpkg.com/lang/en/
 - install all dependencies with `yarn install`
 - install **ALL** these plugins in your editor:
   - `eslint`: provides javascript coding rules linting
   - `tslint`: typescript linter (if NOT using visual studio code as editor)
   - `editorconfig`: provides spacing rules
 - if using atom, some files that could have tabs makes the editor switches to hard tabs automatically. Set `editor.tabType` setting to `soft` to have it working correctly with spaces

### Start

Run `yarn start` to start the development server with auto reload
Run `yarn start:hmr` to start the development server with **hot module replacement (HMR)**

### Build

Run `yarn run build`
Angular AOT compiler is used to have a smaller and faster build. Otherwise with standard JIT angular compiler is included in the build resulting in a bigger build, and templates are compiled at runtime causing longer rendering times. 

Plus with AOT a lot of errors are discovered during the build process instead of runtime.

### Test the build
`yarn run preview`

### Coding
Use a typescript aware editor like [visual studio code](https://code.visualstudio.com/)(best) or install a typescript plugin and linter extensions to [atom](https://atom.io/), webstorm or sublime.

**Follow linters rules!**

### Add new libraries

`npm` and `yarn` are allowed but prefer yarn because it generates a lockfile, caches packages installed, it's faster and more secure
Use `yarn add` to add a new dependency
Use `yarn add --dev` when installing a library for development
