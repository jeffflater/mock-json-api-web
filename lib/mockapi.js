var deferred = require('deferred');
var mockdb = require(__dirname + '/mockdb.js');

function buildTemplate (template) {
    return function () {
        return template;
    }
};

function buildTemplates(templates){
    var jsonTemplates = [];
    for (var template in templates) {
        var mock = templates[template];
        jsonTemplates.push(new buildTemplate(mock));
    }
    return jsonTemplates;
};

exports.mockRoutes = function(){
    var def = deferred();
    var promise = mockdb.getRoutes();
    promise(function(routes){
        for (var route in routes) {
            var mock = routes[route];
            var templates = buildTemplates(mock.jsonTemplate);
            mock.jsonTemplate = templates;
        }
        def.resolve(routes);
    }, function (err) {
        console.log(err);
    });
    return def.promise;
};