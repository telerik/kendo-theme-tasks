const camelCase = require('lodash.camelcase');


function generateThemeChooserConfig(themeMeta, npmSwatches) {
    const tcConfig = [];

    themeMeta.forEach(metaTheme => {
        const metaThemeName = metaTheme.name;
        const metaThemeSwatches = metaTheme.swatches;
        const npmTheme = npmSwatches[metaThemeName];

        if (npmTheme === undefined) {
            return;
        }

        const tcTheme = {
            name: metaThemeName,
            title: metaTheme.title,
            primary: metaTheme.primary,
            swatches: []
        };

        metaThemeSwatches.forEach(metaSwatch => {
            const metaSwatchName = metaSwatch.name;
            const metaSwatchIcon = metaSwatch.icon;

            const npmSwatch = npmSwatches[metaThemeName][camelCase(metaSwatchName.replace(`${metaThemeName}-`, ''))];
            const tcSwatch = {
                name: metaSwatchName,
                title: npmSwatch.name.replace(`${tcTheme.title} `, ''),
                icon: metaSwatchIcon,
                palette: npmSwatch.previewColors
            };

            tcTheme.swatches.push(tcSwatch);
        });

        tcConfig.push(tcTheme);
    });

    return tcConfig;
}

module.exports = {
    generateThemeChooserConfig
};
