"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PageComponent = (function () {
    function PageComponent() {
        this.routeAnimation = true;
    }
    PageComponent.prototype.ngOnInit = function () {
    };
    return PageComponent;
}());
__decorate([
    core_1.HostBinding('@routeAnimation')
], PageComponent.prototype, "routeAnimation", void 0);
PageComponent = __decorate([
    core_1.Component({
        selector: 'app-page',
        templateUrl: 'page.component.html',
        styleUrls: ['page.component.css'],
        host: {
            '[style.display]': '"block"'
        },
        animations: [
            core_1.trigger('routeAnimation', [
                core_1.state('*', core_1.style({ opacity: 1 })),
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0 }),
                    core_1.animate(400)
                ]),
                core_1.transition('* => void', core_1.animate(300, core_1.style({ transform: 'translateX(-100%)', opacity: 0 })))
            ])
        ]
    })
], PageComponent);
exports.PageComponent = PageComponent;
