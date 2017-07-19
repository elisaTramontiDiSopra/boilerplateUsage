# Angular 4 boilerplate
This boilerplate includes webpack as module bundler, angular 4 with AOT and bootstrap 4.

## Development setup

 - install `node` 7+
 - install all dependencies with `npm install`
 - install **ALL** these plugins in your editor:
   - `eslint`: provides javascript coding rules linting
   - `editorconfig`: provides spacing rules
 - if using atom, some files that could have tabs makes the editor switches to hard tabs automatically. Set `editor.tabType` setting to `soft` to have it working correctly with spaces

### Start

Run `npm start` to start the development server with auto reload and all the bells and whistles

### Build

Run `npm run build`

### Coding

**Follow linters rules!**

### Add new libraries

Only `npm` is allowed no `bower`, [here](https://github.com/bower/bower/pull/1748#issuecomment-150104311) is one of the reasons.
Use `--save-dev` when installing a library for development
Use `--save` when installing a library that goes in the bundled version
