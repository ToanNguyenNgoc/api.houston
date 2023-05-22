"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMailModule = void 0;
const send_mail_controller_1 = require("./send-mail.controller");
const common_1 = require("@nestjs/common");
let SendMailModule = class SendMailModule {
};
SendMailModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            send_mail_controller_1.SendMailController
        ],
        providers: [],
    })
], SendMailModule);
exports.SendMailModule = SendMailModule;
//# sourceMappingURL=send-mail.module.js.map