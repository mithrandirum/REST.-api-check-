const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const bodyParser = require('body-parser')


require('dotenv').config()
const app = express()



app.use(express.json())

const host = process.env.host
const port = process.env.PORT
const DB_CONNECTION = process.env.DB_CONNECTION

mongoose.connect(DB_CONNECTION,{ useNewUrlParser: true } ,
()=>{ console.log('connected the db')})

const gangMumber = [ { name : 'sdsdsd' , age : 551 , masochiste : true , sadiste : false} ,
  { name : 'emm' , age : 55 },
  { name : 'eeee' , age : 4 , },
  { name : 'vvvv' , age : 30 }
]

User.create({name : "all" , age : 22}, (err , data)=> {
    !err? console.log(data) : console.log(err)
})

app.post('/' , (req , res ) => {
    const user =  new User ( {
      name : req.body.name ,
      age : req .body.age
    })


     user.save()
     .then(data => {
         res.json(data)
     })
     .catch(err => {
         res.json({message : err})
     })
      
    
    
 })


 app.delete( '/:UserId', (req , res ) => {
    var fuck =  User.remove({ _id : req.params.UserId})
    res.json(fuck)
 })

 app.patch('./:UserId' , (req , res) =>{
     var changed = User.updateOne({ _id : req.params.UserId} , { $set : { name : req.body.name} })
     res.json(changed)
 })

 app.get('/' , (req , res) => {

    const found = User.find()
    res.json(found)
     
 })






app.get('/' , (req , res) =>{
    res.send('we are on home')
})

app.listen(port)
