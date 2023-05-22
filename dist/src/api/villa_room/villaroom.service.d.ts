import { Repository } from 'typeorm';
import { VillaRoom } from './entities';
import { Media } from '../media/entities';
import { Villa } from '../villa/entities';
import { CreateRoomDTO, QueryRoomDTO, UpdateRoomDTO } from './dto';
import { TransformData } from '../../interface';
export declare class VillaRoomService {
    private readonly roomRe;
    private readonly mediaRe;
    private readonly villaRe;
    constructor(roomRe: Repository<VillaRoom>, mediaRe: Repository<Media>, villaRe: Repository<Villa>);
    create(body: CreateRoomDTO): Promise<{
        data: VillaRoom;
    }>;
    findAll(qr: QueryRoomDTO): Promise<TransformData<VillaRoom[]>>;
    findOne(id: string): Promise<TransformData<VillaRoom>>;
    update(id: string, body: UpdateRoomDTO): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
