"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentMethodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_payment_method_dto_1 = require("./create-payment_method.dto");
class UpdatePaymentMethodDto extends (0, swagger_1.PartialType)(create_payment_method_dto_1.CreatePaymentMethodDto) {
}
exports.UpdatePaymentMethodDto = UpdatePaymentMethodDto;
//# sourceMappingURL=update-payment_method.dto.js.map