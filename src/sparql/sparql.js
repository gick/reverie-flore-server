

module.exports ={ 

	getQueryResult : function(query,res) {

var endpoint=require('../config/configEndpoint.js') 	

    var SparqlClient = require('sparql-client');
    var util = require('util');
    var client = new SparqlClient(endpoint);
    client.query(query)
        .execute(function(error, results) {
        	res.send(results.results.bindings)
        });
}
}