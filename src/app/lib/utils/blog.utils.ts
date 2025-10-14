import fm from 'front-matter';
import * as fs from 'fs';

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


export class BlogUtils {
    getMetadata(directoryPath: string): BlogMetadata[] {
        try {
            const files = fs.readdirSync(directoryPath);
            const metadatas: BlogMetadata[] = [];
            for (const item of files) {
                const itemPath = `${directoryPath}/${item}`;
                const stats = fs.statSync(itemPath);
                if (stats.isDirectory()) {
                    metadatas.push(...this.getMetadata(itemPath));
                    continue;
                }
                if (stats.isFile() && item.endsWith('.md')) {
                    const content: string = fs.readFileSync(itemPath, 'utf-8');
                    const { attributes, body } = fm(content);
                    metadatas.push({
                        name: itemPath.replace('public/md/', ''),
                        attributes: attributes as BlogAttributes
                    });
                }
            }
            return metadatas;
        } catch (error) {
            console.error(`Error reading directory: ${error}`);
            return [];
        }
    }

    writeMetadata(metadatas: BlogMetadata[]) {
        const filePath = 'public/api/blogs.json';
        const content = JSON.stringify(metadatas, null, 2);
        try {
            fs.writeFileSync(filePath, content, { encoding: 'utf8' });
            console.log('File written successfully (sync)!');
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }

    extract() {
        const metadatas: BlogMetadata[] = this.getMetadata('public/blog');
        console.log("metadatas", metadatas);
        this.writeMetadata(metadatas);
    };
}

new BlogUtils().extract();