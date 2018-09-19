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
// importa o service / model
var tarefa_service_1 = require("./shared/tarefa.service");
var TarefasComponent = /** @class */ (function () {
    function TarefasComponent(tarefaService) {
        this.tarefaService = tarefaService;
    }
    // pega a listagem de tarefas ao iniciar
    TarefasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tarefaService.getTarefas()
            .subscribe(function (data) {
            // console.log(data);
            data.forEach(function (element) {
                // console.log(element);
                // cria atributo
                if (element.finalizada) {
                    element.finalizadaFormat = 'Sim';
                }
                else {
                    element.finalizadaFormat = 'Não';
                }
            });
            _this.tarefas = data;
        });
    };
    // apaga a tarefa
    TarefasComponent.prototype.deleteTarefa = function (tarefas) {
        if (confirm(' Você deseja deletar a tarefa: ' + tarefas.desc_tarefa + '?')) {
            var index = this.tarefas.indexOf(tarefas);
            this.tarefas.splice(index, 1);
            this.tarefaService.deleteTarefa(tarefas.id_tarefa)
                .subscribe(null);
        }
        console.log(tarefas);
    };
    TarefasComponent = __decorate([
        core_1.Component({
            selector: 'app-tarefas',
            templateUrl: './tarefas.component.html',
            styleUrls: ['./tarefas.component.css']
        }),
        __metadata("design:paramtypes", [tarefa_service_1.TarefaService])
    ], TarefasComponent);
    return TarefasComponent;
}());
exports.TarefasComponent = TarefasComponent;
//# sourceMappingURL=tarefas.component.js.map