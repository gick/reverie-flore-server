

module.exports ={ 

	getQueryResult : function(query,res) {

var endpoint=require('../config/configEndpoint.js') 	

    var SparqlClient = require('sparql-client');
    var util = require('util');
    var client = new SparqlClient('http://localhost:3030/flore/query');
    client.query(query)
        .execute(function(error, results) {
        	res.send(results.results.bindings)
        });
}
}