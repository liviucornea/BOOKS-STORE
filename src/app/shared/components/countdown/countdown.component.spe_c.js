"use strict";
var testing_1 = require("@angular/core/testing");
var countdown_component_1 = require("./countdown.component");
var expect = require('chai').expect;
describe('CountdownComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [countdown_component_1.CountdownComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(countdown_component_1.CountdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).to.exist;
    });
});
