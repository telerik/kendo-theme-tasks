function kendoTransformer(json) {
    const sassContent = [];
    let { groups, components, base } = json;

    groups.forEach( (group) => {
        for ( const [ name, meta ] of Object.entries(group.variables) ) {
            sassContent.push(`$${name}: ${meta.value};`);
        }
    });

    sassContent.push('');

    if ( components.length === 0 ) {
        sassContent.push(`@import "~${base}/dist/all.scss";`);
    } else {
        components.forEach( (component) => {
            sassContent.push(`@import "~${base}/scss/typography/_index.scss";`);
            sassContent.push(`@import "~${base}/scss/utils/_index.scss";`);

            sassContent.push(`@import "~${base}/scss/${component}/_index.scss";`);
        });
    }

    return sassContent.join( '\n' );
}

module.exports.kendoTransformer = kendoTransformer;
