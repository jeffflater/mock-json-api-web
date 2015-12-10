function MockRoute(config) {
    this.id = config._id ? config._id : config._id ? config._id : null;
    this.name = config.name;
    this.mockRoute = config.mockRoute;
    this.testScope = config.testScope ? config.testScope : 'success';
    this.errorBody = config.errorBody;
    this.testScenario = config.testScenario ? config.testScenario : 0;
    this.latency = config.latency ? config.latency : null;
    this.jsonTemplate = config.jsonTemplate ? config.jsonTemplate : [];
    this.data = config.data ? config.data : null;
    this.helpers = config.helpers ? config.helpers : null
};

exports.MockRoute = MockRoute;