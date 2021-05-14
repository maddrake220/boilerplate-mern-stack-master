
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product} = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single("file")


router.post('/image', (req, res) => {

    // 가져온 이미지를 저장해 주면된다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true,
             filePath:res.req.file.path,
             fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {
    // 받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body)

    product.save((err) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({ success: true})
    })
})

router.post('/products', (req, res) => {
  
  // products collection에 들어 있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.SearchTerm;
  let findArgs = {};
  

  for(let key in req.body.filters) {

    console.log(key)
    if(req.body.filters[key].length > 0 ) {
          
          if(key==="price") {
            findArgs[key] = {
              $gte: req.body.filters[key][0], // mongodb=> greater than equal
              $lte: req.body.filters[key][1] // less than equal
            }
          } else {
            findArgs[key] = req.body.filters[key];
          }
    }

  }

  if(term) {

    Product.find(findArgs)
    .find({ $text: { $search : term}}) // mongodb : searchTerm
    .populate("writer")
    .skip(skip) // 시작
    .limit(limit) // 끝
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err})
      return res.status(200).json({
                            success: true, productInfo,
                            PostSize: productInfo.length})
    })
  } else {

    Product.find(findArgs)
    .populate("writer")
    .skip(skip) // 시작
    .limit(limit) // 끝
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err})
      return res.status(200).json({
                            success: true, productInfo,
                            PostSize: productInfo.length})
    })
  }
  /* product안에 있는 모든 정보를 찾는다. populate: writer가 현재 알수없는 값으로 들어있는데
  그 정보를 모두 가져온다. */
})

router.get('/products_by_id', (req, res) => {

  let type = req.query.type
  let productId = req.query.id


  // productId를 이용하여 DB에서 productId와 같은 상품의 정보를 가져온다.
  // 쿼리를 이용해서 가져올땐 req.body 하는것이 아니라  req.query

  Product.find({ _id: productId})
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err)
      return res.status(200).send({success: true , product})
    })

})


module.exports = router;
