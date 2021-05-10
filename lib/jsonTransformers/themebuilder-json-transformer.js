function themebuilderJsonTransformer(json) {
    const sassContent = [];
    let { themeBuilder, components, base } = json;

    themeBuilder.forEach( (group) => {
        for ( const [ name, meta ] of Object.entries(group.variables) ) {
            sassContent.push(`$${name}: ${meta.value};`);
        }
    });

    sassContent.push('');

    if ( components.length === 0 ) {
        sassContent.push(`@import "~${base}/dist/all.scss";`);
    } else {
        components.forEach( (component) => {
            sassContent.push(`@import "~${base}/scss/${component}/_index.scss";`);
        });
    }

    return sassContent.join( '\n' );
}

module.exports.themebuilderJsonTransformer = themebuilderJsonTransformer;
