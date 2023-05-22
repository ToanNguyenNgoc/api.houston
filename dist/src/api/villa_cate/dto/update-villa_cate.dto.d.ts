import { CreateVillaCateDto } from './create-villa_cate.dto';
declare const UpdateVillaCateDto_base: import("@nestjs/common").Type<Partial<CreateVillaCateDto>>;
export declare class UpdateVillaCateDto extends UpdateVillaCateDto_base {
    villa_cate_name?: string;
    description?: string;
    media_id?: number;
    branch_id?: number;
    status: boolean;
}
export {};
