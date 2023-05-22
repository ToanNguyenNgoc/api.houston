import { ProvinceService } from './province.service';
import { QueryMapDTO } from './dto';
export declare class ProvinceController {
    private readonly provinceService;
    constructor(provinceService: ProvinceService);
    findAll(): Promise<{
        data: any;
    }>;
    findDistricts(province_code: string): Promise<{
        data: any;
    }>;
}
export declare class DistrictController {
    private readonly provinceService;
    constructor(provinceService: ProvinceService);
    findWards(district_code: string): Promise<{
        data: any;
    }>;
}
export declare class MapAddressController {
    private readonly provinceService;
    constructor(provinceService: ProvinceService);
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
