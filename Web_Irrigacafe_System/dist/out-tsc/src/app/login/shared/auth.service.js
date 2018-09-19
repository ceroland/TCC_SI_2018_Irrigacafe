"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AuthService = /** @class */ (function () {
    // mostrarMenuEmitter = new EventEmitter<boolean>(); /**nao esconder o menu da tela de login */;;
    function AuthService(router) {
        this.router = router;
        this.usuarioAutenticado = false;
    }
    AuthService.prototype.addUser = function (usuario) {
        if (usuario.nome === 'evelyn' && usuario.senha === '1234') {
            this.usuarioAutenticado = true;
            // this.mostrarMenuEmitter.emit(true);
            this.router.navigate(['/']); /**direciona o usuario para a tela principal */
        }
        else {
            this.usuarioAutenticado = false;
            //this.mostrarMenuEmitter.emit(false);
        }
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map