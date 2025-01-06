export class StringUtils {

    static indexOf(str: string, subStr: string, i: number): number {
        return str.split(subStr, i).join(subStr).length;
    }

}
