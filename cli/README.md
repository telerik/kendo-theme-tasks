# Kendo-theme CLI

The `kendo-theme` CLI is a utility for running the Kendo UI `theme-tasks` from a command prompt.

## List of Available Commands

### init

Creates a Kendo Theme configuration file.

#### Parameters

1. TBA

### build

Builds a `kendoTheme.config.js`, `*.scss`, or `*.less` file.

#### Parameters

1. `cwd` - current working directory.
1. `file` - file to build.
1. `output-filename` - name of the output file.
1. `output-path` - path to the output file.
1. `dryRun` - flag to generate output files.
1. `compiler` - the `Sass` compiler. For example - `sass` or `node-sass`.
1. `sassOptions` - the `Sass` options passed to the compiler.
1. `postcssPlugins` - the `PostCSS` options.

### flatten

Creates a flat `scss` file.

#### Parameters

1. `file` - file to flatten.
1. `output-filename` - name of the output file.
1. `output-path` - path to the output file.
1. `opts` - TBA.

### docs

Generates documentation for the [`kendo-themes` repository](https://github.com/telerik/kendo-themes).

#### Parameters

1. TBA

### new-component

Generates the needed files for a new component in the [`kendo-themes` repository](https://github.com/telerik/kendo-themes).

#### Parameters

1. `name` - name of the new component.
