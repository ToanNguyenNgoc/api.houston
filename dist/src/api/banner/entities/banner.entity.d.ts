import { Media } from '../../media/entities';
export declare class Banner {
    id: number;
    name: string;
    media: Media;
    type: string;
    content: string;
    url: string;
    original_id: string;
    status: boolean;
    deleted: boolean;
    updated_at: Date;
    created_at: Date;
}
