# Kendo UI Theme Tasks

The Kendo UI `theme-tasks` package is a utility library for developing and building `@progress/kendo-theme-*` packages.

## Installation

1. Install the package as a dev dependency:

```sh
    npm install @progress/kendo-theme-tasks --save-dev
```

2. Install the preferred sass compiler(`node-sass` or `sass`):

```sh
    npm install sass
    npm install node-sass
```

3. If using npm version < 7 make sure that peer dependencies are installed:

```sh
    npm install postcss postcss-calc autoprefixer
```

## Usage

The package allows you to compile Kendo themes from SCSS or JSON through the `kendoSassBuild` and `kendoJsonBuild` functions.

### Building from SCSS

A Kendo theme can be compiled to CSS from SCSS source with predefined configuration options (package importer, postcss, postcss-calc and autoprefixer) through the `kendoSassBuild()` method:

1. Import the theme:

```scss
    @import "~@progress/kendo-theme-default/dist/all.scss";
```

2. Compile to CSS:

```js
    const { kendoSassBuild } = require('@progress/kendo-theme-tasks/src/build/kendo-build');
    const nodeSass = require('node-sass');

    function buildStyles(cb) {
        kendoSassBuild({
            file: './sass/styles.scss',
            output: {
                path: './wwwroot/css'
            },
            sassOptions: {
                implementation: nodeSass,
                outputStyle: 'compressed'
            }
        });

        cb();
    }

    exports.buildStyles = buildStyles;
```

### Building from JSON

A Kendo theme or a custom theme swatch can be compiled to CSS from JSON schema with predefined configuration options (package importer, postcss, postcss-calc and autoprefixer) through the `kendoJsonBuild()` method:

1. Utilize [one of the existing theme swatches](https://github.com/telerik/kendo-themes/blob/develop/packages/default/lib/swatches/default-main.json) or create a new one by following [the schema](https://github.com/telerik/kendo-theme-tasks/blob/develop/lib/schemas/kendo-swatch.json).

2. Compile the JSON schema to CSS:

```js
    const { kendoJsonBuild } = require('@progress/kendo-theme-tasks/src/build/kendo-build');
    const nodeSass = require('node-sass');

    function buildStyles(cb) {
        kendoJsonBuild({
            file: 'scss/theme.json',
            output: {
                path: 'dist/'
            },
            sassOptions: {
                implementation: nodeSass,
                outputStyle: 'expanded'
            }
        });

        cb();
    }

    exports.build = buildStyles;
```
