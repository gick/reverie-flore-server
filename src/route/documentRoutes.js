var queries = require('../sparql/queries.js')

module.exports = function(app, sparqlClient) {
    // Route for serving dynamic content (documents stored in mongodb)


    app.get('/listSpecies', function(req, res) {
            var query = queries.listSpecies();
            sparqlClient.getQueryResult(query, res);

        })

    app.get('/listProp', function(req, res) {
            var query = queries.listProp();
            sparqlClient.getQueryResult(query, res);

        })

    app.get('/listPropValue/:propId', function(req, res) {
            var query = queries.listPropValue(req.params.propId);
            console.log(query)
            sparqlClient.getQueryResult(query, res);

        })


    app.get('/listPropConstraintValue', function(req, res) {
            console.log(req.query)
            var query = queries.listPropValueConstraint(req.query.propName,req.query.value);
            //res.send('ok')
            sparqlClient.getQueryResult(query, res);

        })

    app.get('/listSpeciePropValues', function(req, res) {
            var query = queries.listSpeciesPropValues();
            //res.send('ok')
            sparqlClient.getQueryResult(query, res);

        })

}
