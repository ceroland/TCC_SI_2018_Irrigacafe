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
// importa o service para comunicar com a API
var tarefa_service_1 = require("./../shared/tarefa.service");
// importa o model
var tarefa_1 = require("./../shared/tarefa");
// importa o Router para pegar o parametro id
var router_1 = require("@angular/router");
var TarefaFormComponent = /** @class */ (function () {
    function TarefaFormComponent(
    // declara as dependencias
    tarefaService, router, route) {
        this.tarefaService = tarefaService;
        this.router = router;
        this.route = route;
        // pega o model e coloca na varivel tarefa
        this.tarefa = new tarefa_1.Tarefa();
    }
    // Esse metodo rola enquanto a pagina é carregada para preencher
    // a tarefa caso seja uma edicao
    TarefaFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.title = id ? 'Editar Tarefa' : 'Criar Tarefa';
            if (!id)
                return;
            _this.tarefaService.getTarefa(id)
                .subscribe(function (tarefa) { return _this.tarefa = tarefa; }, function (response) { });
        });
    };
    // chama esta metodo no form quando estiver pronto para criar
    // uma tarefa ou editar
    TarefaFormComponent.prototype.save = function () {
        var _this = this;
        var result;
        if (this.tarefa.id) {
            result = this.tarefaService.updateTarefa(this.tarefa);
            console.log(this.tarefa);
        }
        else {
            result = this.tarefaService.addTarefa(this.tarefa);
            console.log(this.tarefa);
        }
        result.subscribe(function (data) { return _this.router.navigate(['/']); });
    };
    TarefaFormComponent = __decorate([
        core_1.Component({
            selector: 'app-tarefa-form',
            templateUrl: './tarefa-form.component.html',
            styleUrls: ['./tarefa-form.component.css']
        }),
        __metadata("design:paramtypes", [tarefa_service_1.TarefaService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], TarefaFormComponent);
    return TarefaFormComponent;
}());
exports.TarefaFormComponent = TarefaFormComponent;
//# sourceMappingURL=tarefa-form.component.js.map