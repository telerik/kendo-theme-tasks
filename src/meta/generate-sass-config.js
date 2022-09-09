function generateSassConfig(themeMeta, npmSwatches) {
    const sassConfig = {
        extends: [
            'sass-build:recommended'
        ],
        build: []
    };

    themeMeta.forEach(metaTheme => {
        const metaThemeName = metaTheme.name;
        const metaThemeSwatches = metaTheme.swatches;
        const metaThemeCompiler = metaTheme.compiler;
        const metaThemeApi = metaTheme.api;
        const npmTheme = npmSwatches[metaThemeName];

        if (npmTheme === undefined) {
            return;
        }

        metaThemeSwatches.forEach(metaSwatch => {
            const metaSwatchName = metaSwatch.name;

            const scEntry = {
                file: `node_modules/@progress/kendo-theme-${metaThemeName}/dist/${metaSwatchName}.scss`,
                outFile: `dist/${metaSwatchName}.css`,
                compiler: metaThemeCompiler,
                api: metaThemeApi
            };

            sassConfig.build.push(scEntry);
        });

    });

    return sassConfig;

}

module.exports = {
    generateSassConfig
};
