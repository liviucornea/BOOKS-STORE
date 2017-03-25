"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var CountdownComponent = (function () {
    function CountdownComponent(cd, translateService) {
        this.cd = cd;
        this.translateService = translateService;
        this.timeEndsAt = '9999-12-31';
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    CountdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._timeEndsAt = new Date(this.timeEndsAt);
        this.countDown();
        //this.translateService.get('pageCheckout.minutes');
        // check if a valid time
        if (!isNaN(this._timeEndsAt)) {
            this.countSubscritpion = Rx_1.Observable.interval(1000).subscribe(function (x) {
                _this.countDown();
                _this.cd.markForCheck();
            });
        }
    };
    CountdownComponent.prototype.countDown = function () {
        this._timeNow = (new Date()).getTime();
        this._diff = this._timeEndsAt - this._timeNow;
        this.days = this.getDays(this._diff);
        this.hours = this.getHours(this._diff);
        this.minutes = this.getMinutes(this._diff);
        this.seconds = this.getSeconds(this._diff);
    };
    CountdownComponent.prototype.getDays = function (t) {
        return Math.floor((t / (1000 * 60 * 60 * 24)));
    };
    CountdownComponent.prototype.getHours = function (t) {
        return Math.floor((t / (1000 * 60 * 60) % 24));
    };
    CountdownComponent.prototype.getMinutes = function (t) {
        return Math.floor((t / 1000 / 60) % 60);
    };
    CountdownComponent.prototype.getSeconds = function (t) {
        return Math.floor((t / 1000) % 60);
    };
    CountdownComponent.prototype.ngOnDestroy = function () {
        this.countSubscritpion.unsubscribe();
    };
    return CountdownComponent;
}());
__decorate([
    core_1.Input()
], CountdownComponent.prototype, "timeEndsAt", void 0);
CountdownComponent = __decorate([
    core_1.Component({
        selector: 'app-countdown',
        templateUrl: './countdown.component.html',
        styleUrls: ['./countdown.component.css']
    })
], CountdownComponent);
exports.CountdownComponent = CountdownComponent;
