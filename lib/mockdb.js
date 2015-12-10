var deferred = require('deferred');
var mockObjects = require(__dirname + '/mockObjects.js');
var Datastore = require('nedb'),
    db = new Datastore({ filename: __dirname + '/data/mocks.db', autoload: true });

exports.getRoutes = function(){
    var def = deferred();
    var routes = [];
    db.find({}, function (err, docs) {
        if (err) {
            def.reject(err);
        }
        for (var doc in docs) {
            var route = new mockObjects.MockRoute(docs[doc]);
            routes.push(route);
        }
        def.resolve(routes);
    });
    return def.promise;
};

exports.getRoute = function(route){
    var def = deferred();

    db.findOne({ _id: route.id }, function (err, doc) {
        if (err) {
            def.reject(err);
        }
        var response = new mockObjects.MockRoute(doc);
        def.resolve(response);
    });

    return def.promise;
};

exports.saveRoute = function(route){
    var def = deferred();

    if (!route.id) {

        db.insert(route, function (err, doc) {
            if (err) {
                def.reject(err);
            }
            var response = new mockObjects.MockRoute(doc);
            def.resolve(response);
        });

    } else {
        db.update({ _id: route.id }, {
            name: route.name,
            mockRoute: route.mockRoute,
            testScope: route.testScope,
            errorBody: route.errorBody,
            testScenario: route.testScenario,
            latency: route.latency,
            jsonTemplate: route.jsonTemplate,
            data: route.data,
            helpers: route.helpers
        }, { }, function (err) {
            if (err) {
                def.reject(err);
            }
            var response = new mockObjects.MockRoute(doc);
            def.resolve(response);
        });
    }

    return def.promise;
};

exports.removeRoute = function(route){
    var def = deferred();
    if (route.id === undefined) {
        def.reject('route id not found');
    }
    db.remove({ _id: route.id }, {}, function (err) {
        if (err) {
            def.resolve('error attempting to remove');
        }
        def.resolve(true);
    });
    return def.promise;
};

exports.saveTemplate = function(route, scenario, index){
    var def = deferred();
    if (route.id === undefined) {
        def.reject('route id not found');
    }
    //update existing
    if (index > -1) {

        db.findOne({ _id: route.id }, function (err, doc) {
            if (err) {
                def.reject(err);
            }
            var response = new mockObjects.MockRoute(doc);
            response.jsonTemplate[index] = scenario;
            db.update({ _id: route.id }, { $set: {
                jsonTemplate: response.jsonTemplate
            } }, {}, function (err) {
                if (err) {
                    def.reject(err);
                }
                def.resolve(response);
            });
        });
    //add new
    } else {
        db.update({ _id: route.id }, { $push: {
            jsonTemplate: scenario
        } }, {}, function (err) {
            if (err) {
                def.reject(err);
            }
            db.findOne({ _id: route.id }, function (err, doc) {
                if (err) {
                    def.reject(err);
                }
                var response = new mockObjects.MockRoute(doc);
                def.resolve(response);
            });
        });
    }
    return def.promise;
};

exports.removeTemplate = function(route, index){
    var def = deferred();
    if (route.id === undefined) {
        def.reject('route id not found');
    }
    db.findOne({ _id: route.id }, function (err, doc) {
        if (err) {
            def.reject(err);
        }
        var scenarios = doc.jsonTemplate.splice(index, 1);
        db.update({ _id: route.id }, { $set: {
            jsonTemplate: scenarios
        } }, {}, function (err) {
            if (err) {
                def.reject(err);
            }
            def.resolve(doc);
        });
    });
    return def.promise;
};