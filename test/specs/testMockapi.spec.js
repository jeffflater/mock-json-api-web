var mockapi = require('../../lib/mockapi.js');

describe("Test Mockapi Scenarios", function() {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("should return all mock routes formatted properly to support the mock-json-api npm", function(done){

        var promise = mockapi.mockRoutes();
        promise(function(routes){
            expect(routes.length).toBeGreaterThan(0);
            for (var route in routes) {
                expect(routes[route].id).toBeDefined();
                console.log(routes[route]);
                for (var template in routes[route].jsonTemplate) {
                    var mock = routes[route].jsonTemplate[template];
                    expect(typeof mock).toBe('function');
                }
            }
            done();
        }, function (err) {
            expect(err).toBeDefined();
            done();
        });

    });

});