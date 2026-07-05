
export interface Page<T> {
    totalElements?: number;
    number: number;
    size: number;
    content?: T[];
}