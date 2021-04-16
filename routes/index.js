let express = require('express');
let router = express.Router();

let file_helper = require('../helpers/file_helper');
let index_helper = require('../helpers/index_helper');


router.get('/',
  index_helper.getAllCakes);

router.post('/createCake',
  file_helper.upload.single('file'),
  index_helper.validate,
  index_helper.createCake);

router.delete('/deleteCake',
  index_helper.deleteCake);

module.exports = router;
