const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const app = express()
const port = 4000

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
const uri = "mongodb+srv://mehulparihar:BqZswzFbFQjGmmR6@anony.gy6uxvy.mongodb.net/?retryWrites=true&w=majority&appName=Anony";


mongoose.connect(uri);

const Users = mongoose.model('Users', {
  username: String,
  password: String,
  mobile: String,
  email: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

});

let schema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  pimage: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
})

schema.index({ pLoc: '2dsphere' });
const Product = mongoose.model('Product', schema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', (req, res) => {
  const dis = req.query.loc;
  let latitude = dis?.split(',')[0];
  let longitude = dis?.split(',')[1];
  let search = req.query.search;
  Product.find({
    $or: [
      { pname: { $regex: search } },
      { pdesc: { $regex: search } },
      { price: { $regex: search } },
    ],
    pLoc: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(latitude), parseFloat(longitude)]
        },
        $maxDistance: 500 * 1000,
      }
    }
  })
    .then((results) => {
      res.send({ message: 'success', products: results })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
})

app.post('/like-product', (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;

  // console.log(req.body);
  Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
    .then(() => {
      res.send({ message: 'liked success' })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/dislike-product', (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;

  // console.log(req.body);
  Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
    .then(() => {
      res.send({ message: 'disliked success' })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/add-product', upload.single('pimage'), (req, res) => {
  // console.log(req.files);
  // console.log(req.body);

  const plat = req.body.plat;
  const plong = req.body.plong;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.file.path;
  const addedBy = req.body.userId;

  const product = new Product({
    pname, pdesc, price, category, pimage, addedBy,
    pLoc: {
      type: 'Point', coordinates: [plat, plong]
    }
  });
  product.save()
    .then(() => {
      res.send({ message: 'saved success' })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/edit-product', upload.single('pimage'), (req, res) => {
  const pid = req.body.pid;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.file?.path;
  // const addedBy = req.body.userId;

  let editObj = {};
  if(pname) {
    editObj.pname = pname;
  }
  if(pdesc) {
    editObj.pdesc = pdesc;
  }
  if(price) {
    editObj.price = price;
  }
  if(category) {
    editObj.category = category;
  }
  if(pimage) {
    editObj.pimage = pimage;
  }
  
  Product.updateOne({ _id : pid}, editObj, {new : true})
    .then((result) => {
      res.send({ message: 'saved success' , product : result })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const user = new Users({ username: username, password: password, email, mobile });
  user.save()
    .then(() => {
      res.send({ message: 'saved success' })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/liked-products', (req, res) => {
  Users.findOne({ _id: req.body.userId }).populate('likedProducts')
    .then((result) => {

      res.send({ message: 'success', products: result.likedProducts })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
})

app.post('/my-products', (req, res) => {
  const userId = req.body.userId;

  Product.find({ addedBy: userId })
    .then((result) => {

      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
})

app.get('/get-products', (req, res) => {

  const catName = req.query.catName;
  let _f = {}
  if (catName) {
    _f = { category: catName }
  }
  Product.find(_f)
    .then((result) => {
      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
})

app.post('/delete-product', (req, res) => {

  Product.findOne({ _id: req.body.pid })
    .then((result) => {
      if (result.addedBy == req.body.userId) {
        Product.deleteOne({ _id: req.body.pid })
          .then((delres) => {
            if(delres.acknowledged)
            {
              res.send({message : 'success'})
            }
          })
          .catch((err) => {
            alert("error");
          })
      }
    })
    .catch((err) => {
      alert("error");
    })
})

app.get('/get-user/:uid', (req, res) => {
  const _userId = req.params.uid;
  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({
        message: 'success', user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username
        }
      })
    }).catch(() => {
      res.send({ message: 'server error' })
    })
})

app.get('/get-product/:pId', (req, res) => {
  // console.log(req.params);
  Product.findOne({ _id: req.params.pId })
    .then((result) => {

      res.send({ message: 'success', product: result })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const user  = new Users({ username : username, password : password});
  Users.findOne({ username: username })
    .then((result) => {
      if (!result) {
        res.send({ message: 'user not found' })
      }
      else {
        if (result.password == password) {
          const token = jwt.sign({
            data: 'foobar'
          }, 'MYKEY', { expiresIn: 60 * 60 });

          res.send({ message: 'find success', token: token, userId: result._id })
        }
        if (result.password != password) {
          res.send({ message: 'password wrond' })
        }
      }
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
})

app.get('/my-profile/:userId', (req, res) => {
  let userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then((result) => {
      res.send({
        message: 'success', user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username
        }
      })
    }).catch(() => {
      res.send({ message: 'server error' })
    })


})

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
})

