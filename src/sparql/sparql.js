

module.exports ={ 
	getQueryResult : function(query,res) {
    var SparqlClient = require('sparql-client');
    var util = require('util');
    var endpoint = 'http://ontologies.reveries-project.fr:3030/ds/query'
 	
    var client = new SparqlClient(endpoint);
    client.query(query)
        .execute(function(error, results) {
        	res.send(results.results.bindings)
        });
}
}