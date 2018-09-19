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
var auth_service_1 = require("./../auth.service");
var UsuarioComponent = /** @class */ (function () {
    function UsuarioComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    UsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUsers()
            .subscribe(function (data) {
            _this.users = data;
        });
    };
    // adiciona novo usuario
    UsuarioComponent.prototype.addUser = function () {
        this.authService.addUser();
    };
    ;
    // edita usuario
    UsuarioComponent.prototype.editUser = function (user) {
        localStorage.removeItem("editUserId");
        localStorage.setItem("editUserId", user.id.toString());
        this.router.navigate(['edit-user']);
    };
    ;
    UsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario',
            templateUrl: './usuario.component.html',
            styleUrls: ['./usuario.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], UsuarioComponent);
    return UsuarioComponent;
}());
exports.UsuarioComponent = UsuarioComponent;
//# sourceMappingURL=usuario.component.js.map