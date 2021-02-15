export type ParsedFileData = {
    file: string,
    path: string,
    base: string,
    name: string,
    ext: string,
    mime: string,
    /** The size of the file in bytes. */
    size: number,
    base64: string,
    /** The timestamp indicating the creation time of this file. */
    created: Date,
    /** The timestamp indicating the last time this file was accessed. */
    accessed: Date,
    /** The timestamp indicating the last time the file status was changed. */
    changed: Date,
    /** The timestamp indicating the last time this file was modified. */
    modified: Date
}

export type OutputOptions = {
    filename: string,
    path: string
}

export type EmbedFileOptions = {
    cwd: string,
    file: string,
    output: OutputOptions,
    template: string,
    dryRun: boolean
}
