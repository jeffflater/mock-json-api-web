/**
 * Created by jeff.flater on 7/25/2014.
 */
var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    mockJSONApi = require('mock-json-api'),
    mockapi = require('./lib/mockapi.js'),
    request = require('request');

app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.logger());

app.set('port', (process.env.PORT || 5002));
app.use(express.static(__dirname + '/public'));

//mock routes
var promise = mockapi.mockRoutes();
promise(function(routes){
    var mockapi = mockJSONApi({
        jsonStore: __dirname + '/lib/data/store.json',
        mockRoutes: routes
    });
    app.use(mockapi.registerRoutes);
}, function (err) {
    console.log(err);
    mockRoutes = [];
});

//api routes
app.get('/', routes.index);
app.get('/api/routes', routes.getRoutes);
app.get('/api/route', routes.getRoute);
app.post('/api/route/add', routes.saveRoute);
app.post('/api/route/update', routes.saveRoute);
app.get('/api/route/remove', routes.removeRoute);
app.post('/api/route/template/add', routes.saveTemplate);
app.post('/api/route/template/update', routes.saveTemplate);
app.post('/api/route/template/remove', routes.removeTemplate);

app.listen(app.get('port'), function() {
    console.log("Node server is running at localhost:" + app.get('port'));
});