export interface BlogMetadata {
    name: string;
    attributes: BlogAttributes;
}

export interface BlogAttributes {
    title: string;
    summary: string;
    date: string;
    tags: string[];
    keys: string[];
}
