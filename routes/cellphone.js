var express = require('express');
var router = express.Router();
var path = __dirname + '/';

var iphone = {brand:"Apple", model:"Iphone8", price:"12000", release:"2004"}
var sonny = {brand:"Sonny", model:"S2", price:"10000", release:"2014"}
var lg = {brand:"LG", model:"X20", price:"6000", release:"2009"}
var iphone2 = {brand:"Apple", model:"Iphon4", price:"14500", release:"2006"}
var sonny2 = {brand:"Sonny", model:"S4", price:"18000", release:"2009"}
var lg2 = {brand:"LG", model:"X2", price:"16000", release:"2012"}

var cellphones = new Array();
cellphones.push(iphone);
cellphones.push(sonny);
cellphones.push(lg);
cellphones.push(iphone2);
cellphones.push(sonny2);
cellphones.push(lg2);


// ----------------------------------------------------------------------------
// TESTING METHODS
// ----------------------------------------------------------------------------
/* GET users listing. */
router.get('/test', function(req, res, next) {
  //res.send('respond with a resource');

  // DELETE
  var where
  for(var i = 0; i < cellphones.length; i++) {
    if (cellphones[i].model == 'Iphone8') {
        console.log("Found IT");
        where = i;
        break;
    }
  }
  cellphones.splice(where,1);
  res.send(cellphones);
});


router.get('/item', function(req, res, next) {
  //res.send('respond with a resource');

  res.sendFile(path + "item.html");
});
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('GET TO THE ROOT ENDPOINT');
  console.log(req.header('Accept'));
  // If the accept header is application / json then...
  if (req.header('Accept') == 'application/json') {
    console.log('Returning the Array as a JSON');
    // Return the array as a json
    var json_string = JSON.stringify(cellphones)
    res.send(JSON.parse(json_string));
  // Else if accept header is application / xml then...
  } else  if (req.header('Accept') == 'application/xml'){
    console.log('Returning the Array as a XML');
    // Create a string with xml tags
    var xml_string = "<cellphones>";
    // Concat each element of the array into the xml response
    for(var i = 0; i < cellphones.length; i++) {
      xml_string = xml_string + "<cellphone><brand>"+ cellphones[i].brand +
      "</brand><model>" + cellphones[i].model + "</model><price>" + cellphones[i].price +
      "</price><release>" + cellphones[i].release + "</release></cellphone>";
    }
    xml_string = xml_string + "</cellphones>";
    // Reponse with the xml string
    res.send(xml_string);
  }

});

router.get('/:model', function(req, res, next) {
  console.log("GETING: " + req.params.model);
  // Where is the position on the array of the object
  var where = -1;
  for(var i = 0; i < cellphones.length; i++) {
    // If the model of the cellphone on i is == to the model solicitated then...
    if (cellphones[i].model == req.params.model) {
        console.log("Found IT");
        where = i;
        break;
    }
  }
  // If the cellphone is not found...
  if (where == -1) {
    // Response with a 404
    res.status(404);
    res.send();
  } else {
    // Else response with the 200
    res.status(200);
    // If the accept header is a json, return the array as a json
    if (req.header('Accept') == 'application/json') {
      res.send(cellphones[where]);
      // Else return it as a xml
    } else if (req.header('Accept') == 'application/xml'){
      console.log('Returning the Array as a XML');
      var xml_string = "<cellphones><cellphone><brand>"+ cellphones[where].brand +
      "</brand><model>" + cellphones[where].model + "</model><price>" + cellphones[where].price +
      "</price><release>" + cellphones[where].release + "</release></cellphone></cellphones>";
      res.send(xml_string);
    }

  }

});

router.head('/:model', function(req, res, next) {
  console.log("HEADING: " + req.params.model);
  // Where is the position on the array of the object
  var where = -1;
  for(var i = 0; i < cellphones.length; i++) {
    // If the cellphone exist then...
    if (cellphones[i].model == req.params.model) {
        console.log("Found IT");
        where = i;
        break;
    }
  }
  if (where == -1) {
    // Response with 404 if is not found
    res.status(404);
  } else {
    // Else with a 200
    res.status(200);
  }
  res.send();
});

/* GET users listing. */
router.put('/:model', function(req, res, next) {
  console.log("PUTING: " + req.params.model);
  // Where is the position on the array of the object
  var where = -1;
  for(var i = 0; i < cellphones.length; i++) {
    // If the cellphone exist then...
    if (cellphones[i].model == req.params.model) {
        console.log("Found IT");
        where = i;
        break;
    }
  }
  if (where == -1) {
    // If dont find the cellphone, return 404
    res.status(404);
  } else {
    // Updating the cellphone with the new values and return 200 ok
    cellphones[where].model = req.params.model;
    cellphones[where].brand = req.body.brand;
    cellphones[where].price = req.body.price;
    cellphones[where].release = req.body.release;
    res.status(200);
  }
  res.send();
});


router.post('/:model', function(req, res, next) {
  console.log("POSTING: " + req.params.model + " " + req.body.brand + " " + req.body.price);
  // Creating the new cellphone to add it to the array
  params = {brand:req.body.brand, model:req.params.model, price:req.body.price, release:req.body.release}
  //params = {brand:"Test", model:req.params.model, price:"1200", release:"2000"}

  // Pushing new cellphone to the array
  console.log("PUSHING ELEMENT INTO THE ARRAY");
  cellphones.push(params);
  console.log("ELEMENT PUSHIT");
  // Returning a 200 ok
  res.status(200);
  res.send();
});

router.delete('/:model', function(req, res, next) {
  console.log("DELETING: " + req.params.model);
  // Where is the position on the array of the object
  var where = -1;
  for(var i = 0; i < cellphones.length; i++) {
    // If the element on that position is the one that i look then...
    if (cellphones[i].model == req.params.model) {
        console.log("Found IT");
        where = i;
        break;
    }
  }
  if (where != -1) {
      cellphones.splice(where,1);
      res.status(200);
  } else {
      res.status(404);
  }
  res.send();
});

module.exports = router;
