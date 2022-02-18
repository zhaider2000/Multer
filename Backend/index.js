
const express = require('express')
const nodemailer = require('nodemailer')
require('./DB/database')
const cors = require("cors")
const path = require('path');
const register = require('./Models/Users')
const sold = require("./Models/sold")
const product = require("./Models/products")
var multer = require('multer');
var image = require('./Models/gallery');


const app = express()


app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use('/images', express.static(path.join('images')));

require('./DB/database')


const port = 3000




const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + '.' + fileType;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
  'image'
);



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/Photos',async (req, res) => {
  const profiles = await image.find();
  res.status(200).json({ profiles });
})


app.post(
  '/photos',
  storage,
  async (req, res) => {
    const { name } = req.body;
    const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    const profile = new image({
      name,
      imagePath,
    });
    const createdProfile = await profile.save();
    res.status(201).json({
      profile: {
        ...createdProfile._doc,
      },
    });
  }
)



app.post('/register', async (req, res) => {
  try {
    const { email } = req.body
    console.log(req.body)
    uniqueString = 4312
    isvalid = false

    const newRegister = new register({ email, uniqueString, isvalid })
    await newRegister.save()
    sendEmail(email, uniqueString)
    res.json({ message: "verify your account" })

  } catch (error) {
    console.log(error)
  }
})

app.post('/verify/:uniqueString', async (req, res) => {
  try {
    console.log("here")
    const { uniqueString } = req.params
    const user = await register.findOne({ uniqueString: uniqueString })
    if (user) {
      user.isvalid = true
      await user.save()
      res.json({ message: "verified" })
    }
    else {
      res.json({ message: "not found" })
    }


  } catch (error) {
    console.log(error)
  }
})


app.post('/product', async (req, res) => {
  try {

    const { name } = req.body
    const newProduct = await new product({ name })
    await newProduct.save()
    res.json({ message: "product saved" })

  } catch (error) {
    console.log(error)
  }
})


app.get('/sold', async (req, res) => {
  try {

    const soldProducts = await sold.find().populate("products")
    res.json(soldProducts)

  } catch (error) {
    console.log(error)
  }
})


const sendEmail = async (email, uniqueString) => {
  try {
    // create reusable transporter object using the default SMTP transport
    console.log('send email')
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "k181052@nu.edu.pk",
        pass: "hello", // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const options = () => {
      return {
        from: "xyz",
        to: email,
        subject: "Email Confirmation",
        html: `press <a href=http://localhost:3000/verify/${uniqueString}> here </a> to verify your email thanks.`,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        console.log('success')
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})