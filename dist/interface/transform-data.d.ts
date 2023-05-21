export interface TransformData<Data> {
    data: Data[] | Data;
    total?: number;
    total_page?: number;
    current_page?: number;
    next_page?: number;
    prev_page?: number;
}
export interface TransformMessage {
    message: string;
}
