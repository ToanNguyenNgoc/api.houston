"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_company_dto_1 = require("./create-company.dto");
class UpdateCompanyDto extends (0, swagger_1.PartialType)(create_company_dto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;
//# sourceMappingURL=update-company.dto.js.map