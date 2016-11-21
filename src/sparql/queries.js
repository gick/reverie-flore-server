var pref = require('./prefixes.js')

module.exports = {
    listOrgansDescriptors: function() {
        var query = pref.getPrefixes() + '\n' +
            "SELECT DISTINCT ?organ ?lorgan  ?descriptorLabel ?descriptorDef  WHERE {\
  ?trait rdf:type rev:MorphologicalTrait .\
  ?trait rev:hasRelatedOrgan ?blankorgan.\
  ?blankorgan rdf:type ?organ.\
  ?organ skos:prefLabel ?lorgan.\
  ?organ rdfs:subClassOf rev:Organ.\
  ?trait rev:hasDescriptor ?desc.\
  ?descriptorDef skos:prefLabel ?descriptorLabel.\
 ?desc skos:prefLabel ?lab.\
?desc rdf:type ?descriptorDef.}"
        return query;
    },

    listDescriptorsValueByClass: function(descClass) {
        var query = pref.getPrefixes() + '\n' +
            "SELECT DISTINCT ?descriptorLabel ?descriptorValue  WHERE {\
  ?descriptorValue rdf:type rev:" + descClass + " .\
  ?descriptorValue skos:prefLabel ?descriptorLabel.\
}"
        return query;

    },

    listPlantsByProp: function(prop) {
    		var descriptorArray=[]
    		for(var x in prop){
    			descriptorArray.push(prop[x])
    		}
            console.log(descriptorArray)
            var descriptionString = ""
            for (var i = 0; i < descriptorArray.length	; i++) {
                var desc = descriptorArray[i].split('#')[1];
                descriptionString = descriptionString + "?b rev:hasDescriptor <http://reveries-project.fr#" + desc + ">.";
            }

            var query = pref.getPrefixes() + '\n' +
                "SELECT DISTINCT ?plant ?label  WHERE {\
  ?plant rdf:type rev:Family .\
  ?plant skos:prefLabel ?label.\
  ?plant rev:hasMorphologicalTrait ?b. " + descriptionString + "}"
  			console.log(query)
            return query;

        }
        /**
        Liste des organes et de leurs types de descripteurs (sans les valeurs)
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX rev: <http://reveries-project.fr#>
        SELECT DISTINCT ?organ ?lorgan  ?descriptorLabel ?descriptorDef  WHERE {
          ?trait rdf:type rev:MorphologicalTrait .
          ?trait rev:hasRelatedOrgan ?blankorgan.
          ?blankorgan rdf:type ?organ.
          ?organ skos:prefLabel ?lorgan.
          ?organ rdfs:subClassOf rev:Organ.
          ?trait rev:hasDescriptor ?desc.
          ?descriptorDef skos:prefLabel ?descriptorLabel.
         ?desc skos:prefLabel ?lab.
        ?desc rdf:type ?descriptorDef.} 
        LIMIT 100


        **/

}
