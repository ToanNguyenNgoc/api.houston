import { District, Province, Ward } from './entities';
import { Repository } from 'typeorm';
import { QueryMapDTO } from './dto';
export declare class ProvinceService {
    private readonly provinceRe;
    private readonly districtRe;
    private readonly wardRe;
    constructor(provinceRe: Repository<Province>, districtRe: Repository<District>, wardRe: Repository<Ward>);
    findAll(): Promise<{
        data: any;
    }>;
    findDistrictsByProvince(id: string): Promise<{
        data: any;
    }>;
    findWards(district_code: any): Promise<{
        data: any;
    }>;
    getPlaces(query: QueryMapDTO): Promise<{
        data: {
            center: number[];
            geometry: {
                type: string;
                coordinates: number[];
            };
            id: string;
            type: string;
            place_type: string[];
            relevance: number;
            properties: {
                wikidata: string;
                mapbox_id: string;
            };
            text_vi: string;
            language_vi: string;
            place_name_vi: string;
            text: string;
            language: string;
            place_name: string;
            bbox: number[];
            context: [{
                id: string;
                short_code: string;
                wikidata: string;
                mapbox_id: string;
                text_vi: string;
                language_vi: string;
                text: string;
                language: string;
            }];
        }[];
    }>;
}
