import { CreateRoomDTO, QueryRoomDTO, UpdateRoomDTO } from './dto';
import { VillaRoomService } from './villaroom.service';
export declare class VillaRoomController {
    private readonly villaRoomService;
    constructor(villaRoomService: VillaRoomService);
    create(body: CreateRoomDTO): Promise<{
        data: import("./entities").VillaRoom;
    }>;
    findAll(qr: QueryRoomDTO): Promise<import("../../interface").TransformData<import("./entities").VillaRoom[]>>;
    findOne(id: string): Promise<import("../../interface").TransformData<import("./entities").VillaRoom>>;
    update(id: string, body: UpdateRoomDTO): Promise<{
        message: string;
    }>;
    deleted(id: string): Promise<{
        message: string;
    }>;
}
