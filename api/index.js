const express = require ('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/booking.js');

const jwtSecret = 'jdsajdoasdhhuhaiudsaie6';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({

credentials: true,
origin: 'http://localhost:5173',

}));


mongoose.connect('mongodb+srv://booking:4FNbzvLwX3k8Ht1m@cluster0.rwvq1t3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

function getTokenData(req) {
    return new Promise((resolve,reject) => {

        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {    
            if (err) throw err;
            resolve(userData);
         });
    });
}

app.get('/test' , (req,res) => {
    res.json('test ok');
});

const salt = bcrypt.genSaltSync(10);

app.post('/register' , async (req, res) => {

   const {name, email, password} = req.body;

   try{
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
   }

   catch (e){
    res.status(422).json(e);
   }

});

app.post('/login' , async (req,res) => {

    const {email,password} = req.body;
    const userDoc = await User.findOne({email});

    if (userDoc)
    {
        const passCheck = bcrypt.compareSync(password, userDoc.password);

        if (passCheck)
        {
            jwt.sign(
                {
                    email:userDoc.email, 
                    id:userDoc._id, 
                    name:userDoc.name,
                }, jwtSecret, {}, (err,token) => {
            
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
        })
        }
        else
        {
            res.status(422).json('pass not ok');
        }
    }
    else 
    {
        res.json('not found')
    }

});

app.get('/profile', (req,res) => {

    const {token} = req.cookies;

    if (token)
    {
        jwt.verify(token, jwtSecret, {}, async (err, user) =>
            {
                if (err) throw err;
                res.json(user);
            }
        );
    }
    else
    {
        res.json(null);
    }

    res.json({token});

});

app.post('/logout' , (req,res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req,res) => {

    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({

        url: link,
        dest: __dirname + '/uploads/' + newName,
    });

    res.json(newName);

});

const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload' ,photosMiddleware.array('photos' , 100) , (req,res) =>{

    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++)
        {
            const {path, originalname} = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads\\', ''));
        }
    res.json(uploadedFiles);

});

app.post('/places' , (req,res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, info,
        checkIn, checkOut, maxGuests, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, user) =>
        {
            if (err) throw err;
            
            const placeDoc = await Place.create({

                owner:user.id,
                title, address, photos:addedPhotos, 
                description, perks, extraInfo:info,
                checkIn, checkOut, maxGuests, price
            });
            res.json(placeDoc);
        });

});

app.get('/user-places' , (req,res) => {

    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) =>
        {
          
        const {id} = user ;
        
        res.json( await Place.find({owner:id} ) );
     });

});

app.get('/places/:id' , async (req,res) =>{

    const {id} = req.params;

    res.json(await Place.findById(id));
});

app.put('/places' , async (req,res) => {
    const {token} = req.cookies;

    const {
        id,
        title, address, addedPhotos, 
        description, perks, info,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) =>{
        const placeDoc = await Place.findById(id);
        if (user.id === placeDoc.owner.toString()) {

            placeDoc.set({
                title, address, photos:addedPhotos, 
                description, perks, extraInfo:info,
                checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places' , async (req,res) => {

    res.json(await Place.find() );
});

app.post('/booking', async (req,res) => {

    const userData = await getTokenData(req);
    const{
        place, checkIn, checkOut, 
        numberOfGuests, name, phone, price
    } = req.body;

    const doc = await Booking.create(
        {place, checkIn, checkOut, 
        numberOfGuests, name, phone, price,
        user:userData.id,
    });
        res.json(doc);
});

app.get('/getBookings' , async (req,res) => {

    const userData = await getTokenData(req);

    res.json(await Booking.find({user:userData.id}).populate('place') );
});

app.listen(4321);

//4FNbzvLwX3k8Ht1m

