    var queries = require('../sparql/queries.js')
    var Element = require('../model/element.js');
    var Observation = require('../model/observation.js');
    var mongoose = require('mongoose');
    var fs = require('fs');
    var csv = require('fast-csv');
    var stream = fs.createReadStream('../rawData/export-tela-botanica.csv');


    //read in CSV as stream row by row
    /*
    Query examples : 
    db.obs.find({location:{$geoWithin:{$box:[[-1.094486,47.953357],[-0.747043,48.151639]]}}}).size()

    */
    module.exports = function(app, sparqlClient, gfs) {
        // Route for serving dynamic content (documents stored in mongodb)
        app.get('/populate', function(req, res) {
            csv.fromStream(stream, { headers: true })
                .on('data', function(data) {
                    // console.log(data);
                    // masterList.push(data);
                    console.log(data);
                })
                .on('end', function() {
                    // console.log('done');
                    console.log('done');
                });

            function addObservation(data) {
                //create model and save to database
                var observation = new Observation({Specie:data.Specie,AltName:data.AltName,Family:data.Family,lat:data.lat,lng:data.lng,location:{type:'Point',coordinates:[data.lat,data.lng]}});
                observation.save(function(err) {
                    if (err) // ...
                        console.log(err);
                });
            }



        })


        app.get('/listAllFiles', function(req, res) {
            gfs.files.find({}).toArray(function(err, files) {
                res.send(files);
            })
        });

        app.get('/file/:id', function(req, res) {
            if (req.headers.range) {
                gfs.findOne({
                    _id: req.params.id
                }, function(err, file) {
                    if (!file) {
                        res.send({
                            success: false
                        });
                        return;
                    }
                    var parts = req.headers['range'].replace(/bytes=/, '').split('-');
                    var partialstart = parts[0];
                    var partialend = parts[1];

                    var start = parseInt(partialstart, 10);
                    var end = partialend ? parseInt(partialend, 10) : file.length - 1;
                    var chunksize = (end - start) + 1;
                    res.status(206)
                    res.set({
                        'Content-Range': 'bytes ' + start + '-' + end + '/' + file.length,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': file.contentType,
                    });

                    var readstream = gfs.createReadStream({
                        _id: req.params.id,
                        range: {
                            startPos: start,
                            endPos: end
                        }
                    });

                    req.on('error', function(err) {
                        res.send(500, err);
                    });
                    readstream.on('error', function(err) {
                        res.send(500, err);
                    });
                    readstream.pipe(res);
                });

            } else {


                gfs.findOne({
                    _id: req.params.id
                }, function(err, file) {
                    if (!file) {
                        res.send({
                            success: false
                        });
                        return;
                    }

                    var readstream = gfs.createReadStream({
                        _id: req.params.id
                    });
                    res.set('Content-Type', file.contentType);
                    res.set('Content-Length', file.length);

                    req.on('error', function(err) {
                        res.send(500, err);
                    });
                    readstream.on('error', function(err) {
                        res.send(500, err);
                    });
                    readstream.pipe(res);
                });



            }
        });

        app.get('/registerItem', function(req, res) {
            Element.find({}, function(err, elements) {
                res.send(elements)
            })

        })


        app.post('/registerItem', function(req, res) {
            if (!req.isAuthenticated()) {
                res.send({
                    success: false,
                    message: "Please authenticate"
                });
                return;
            }
            var element = new Element();
            element.specie = req.body.specie
            element.confidence = req.body.confidence
            element.constraint = req.body.constraint
            element.latitude = req.body.latitude
            element.longitude = req.body.longitude
            element.owner = req.user._id
            if (req.files.image) {
                lo
                var part = req.files.image;
                var writestream = gfs.createWriteStream({
                    filename: part.name,
                    mode: 'w',
                    content_type: part.mimetype,
                    metadata: {
                        status: 'Private',
                        title: part.name

                    }
                });
                writestream.write(part.data);

                writestream.on('close', function(elem) {
                    element.image = elem._id
                    element.save(function(err) {
                        if (err) {
                            console.log(err)
                            res.send({ success: false })
                        } else res.send({ success: true })
                    })


                })
                writestream.end();
            } else {
                element.save(function(err) {
                    if (err) {
                        console.log(err)
                        res.send({ success: false })
                    } else res.send({ success: true })
                })

            }


        });

        app.get('/listFamily', function(req, res) {
            Observation.distinct("Family", function(err, families) {
                console.log(err)
                console.log(families)
                res.send(families)
            })
        })


        app.get('/listObsWithinArea', function(req, res) {
            console.log(req.param)
            var bottomLat = req.param('bottomLat')
            var bottomLng = req.param('bottomLng')

            var topLat = req.param('topLat')
            var topLng = req.param('topLng')

            Observation.find({
                "location": {
                    "$geoWithin": {
                        "$box":

                            [
                                [bottomLng, bottomLat],
                                [topLng, topLat]
                            ]

                    }
                }
            }, function(err, obs) {
                console.log(err)
                res.send(obs)
            });

            //db.obs.find({location: { $geoWithin:{$box:[[4.564826,49.64612],[4.694259,49.738955]]}}}).pretty()

        })

        app.get('/listFloreData', function(req, res) {
            Observation.find({}).limit(10000).exec(function(err, flore) {
                console.log(err)
                res.send(flore)
            })

        })


        app.get('/listSpecies', function(req, res) {
            var query = queries.listSpecies();
            sparqlClient.getQueryResult(query, res);

        })

        app.get('/releve', function(req, res) {
            Releve.find({}, function(err, game) {
                console.log(err)
                res.send(game)
            })

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
            var query = queries.listPropValueConstraint(req.query.propName, req.query.value);
            //res.send('ok')
            sparqlClient.getQueryResult(query, res);

        })

        app.get('/listSpeciePropValues', function(req, res) {
            var query = queries.listSpeciesPropValues();
            //res.send('ok')
            sparqlClient.getQueryResult(query, res);

        })


        app.get('/listSpeciesConstraint', function(req, res) {
            var query = queries.listSpeciesConstraint(req.query.value);
            //res.send('ok')

            sparqlClient.getQueryResult(query, res);

        })


    }