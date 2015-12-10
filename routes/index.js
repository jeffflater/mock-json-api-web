var mockdb = require('../lib/mockdb.js');
var mockObjects = require('../lib/mockObjects.js');

exports.index = function(req, res){
    res.sendfile('./public/index.html');
};

exports.getRoutes = function(req, res){
    var promise = mockdb.getRoutes();
    promise(function(routes){
        res.send(routes);
        res.end();
    }, function (err) {
        res.send(err);
        res.end();
    });
};

exports.getRoute = function(req, res){
    if (req.query.id) {
        var config = {
            _id: req.query.id
        };
        var route = new mockObjects.MockRoute(config);
        var promise = mockdb.getRoute(route);
        promise(function(route){
            res.send(route);
            res.end();
        }, function (err) {
            res.send(err);
            res.end();
        });
    } else {
        res.send('unable to find id');
        res.end();
    }
};

//supports both add and update
exports.saveRoute = function(req, res){
    if (req.body) {

        var config = {
            _id: req.body.id,
            name: req.body.name,
            mockRoute: req.body.mockRoute,
            testScope: req.body.testScope,
            errorBody: req.body.errorBody,
            testScenario: req.body.testScenario,
            latency: req.body.latency,
            jsonTemplate: req.body.jsonTemplate,
            data: req.body.data,
            helpers: req.body.helpers
        };

        var route = new mockObjects.MockRoute(config);
        var promise = mockdb.saveRoute(route);
        promise(function(response){
            res.send(response);
            res.end();
        }, function (err) {
            res.send(err);
            res.end();
        });

    } else {
        res.send('unable to find post data');
        res.end();
    }
};

exports.removeRoute = function(req, res){
    if (req.query.id) {
        var config = {
            _id: req.query.id
        };
        var route = new mockObjects.MockRoute(config);
        var promise = mockdb.removeRoute(route);
        promise(function(response){
            res.send(response);
            res.end();
        }, function (err) {
            res.send(err);
            res.end();
        });
    } else {
        res.send('unable to find id');
        res.end();
    }
};

//supports both add and update
exports.saveTemplate = function(req, res){
    if (req.body) {
        var config = {
            _id: req.body.id
        };
        var route = new mockObjects.MockRoute(config);
        var scenario = req.body.scenario;
        var index = req.body.index ? req.body.index : -1;
        var promise = mockdb.saveTemplate(route, scenario, index);
        promise(function(response){
            res.send(response);
            res.end();
        }, function (err) {
            res.send(err);
            res.end();
        });
    } else {
        res.send('unable to find post data');
        res.end();
    }
};

exports.removeTemplate = function(req, res){
    if (req.body) {
        var config = {
            _id: req.body.id
        };
        var route = new mockObjects.MockRoute(config);
        var index = req.body.index;
        var promise = mockdb.removeTemplate(route, index);
        promise(function(response){
            res.send(response);
            res.end();
        }, function (err) {
            res.send(err);
            res.end();
        });
    } else {
        res.send('unable to find post data');
        res.end();
    }
};







