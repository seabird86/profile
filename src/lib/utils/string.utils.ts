export class StringUtils {

    static indexOf(str: string, subStr: string, i: number): number {
        return str.split(subStr, i).join(subStr).length;
    }

    static escapeHtml(str: string): string {
        return str.replace(/[&<>'"]/g, x => '&#' + x.charCodeAt(0) + ';')
    }

}