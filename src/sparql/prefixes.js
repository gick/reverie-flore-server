module.exports = {

    getPrefixes: function() {
        var pref = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
        PREFIX owl: <http://www.w3.org/2002/07/owl#> \
        PREFIX rev: <http://reveries-project.fr#>\
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
        return pref
    }

}

