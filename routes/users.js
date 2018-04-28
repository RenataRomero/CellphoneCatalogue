var express = require('express');
var router = express.Router();
var path = __dirname + '/';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(500);
  res.sendFile("/Users/AdolfoCastellanos/Downloads/examples/generator/Cellphone/routes/index.html");
});

router.get(':model', function(req, res) {
    var model = req.params.model;

    var repo = myRepository.findByModel(model);
    if(repo) {
      //res.send(repo);
      //res.status(200);
      //res.redirect("./views/catalogo.html")
      
      res.sendFile(path + "index.html");
    } else {
      res.status(404);
    }
});



module.exports = router;
