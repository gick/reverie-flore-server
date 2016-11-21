var queries = require('../sparql/queries.js')

module.exports = function(app, sparqlClient) {
    // Route for serving dynamic content (documents stored in mongodb)

    app.get('/listOrgansDescriptors', function(req, res) {
            var query = queries.listOrgansDescriptors();
            sparqlClient.getQueryResult(query, res);

        }),

        app.get('/listDescriptorsValue/:classvalue', function(req, res) {
            var par = req.params.classvalue
            var query = queries.listDescriptorsValueByClass(par);
            sparqlClient.getQueryResult(query, res);

        }),


        app.get('/listPlantsByProp', function(req, res) {
            var par = req.query;
            console.log(par)
            var query = queries.listPlantsByProp(par);
            sparqlClient.getQueryResult(query, res);

        })

}
