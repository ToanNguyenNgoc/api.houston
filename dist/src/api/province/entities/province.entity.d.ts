import { Branch } from "../../branches/entities";
export declare class Province {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    phone_code: number;
    branches: Branch[];
}
export declare class District {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    province_code: number;
    branches: Branch[];
}
export declare class Ward {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    district_code: number;
    branches: Branch[];
}
