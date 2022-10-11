const express= require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()


//serving responses
// app.get('',(req,res)=>{
//     res.send("Hello")
// })
// app.get('/about',(req,res)=>{
//     res.send({name:"rohit",
// "work":"soft"})
// })
// app.get('/add',(req,res)=>{
//     res.send({home:'ballia',
// state:'mp'})
// })

//__dirname: provides path to directory in which current script is running
//__filename: provides path to the current file

//now we want to get a path to the public directory so that we can serve the static asset

console.log(path.join(__dirname,'../public'))
//now we are going to use express.static() which takes a path to the folder where static assets are present

const publicDirectoryPath=path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath))

//we are going tto use dynamic templates to make our server dynamic
//install handlebars and set view engine and create a root folder named view
app.set('view engine','hbs')
//suppose your partials folder has a diff name but by default express will look only for views folder ,in this case you have to customise views settings as below
const viewPath=path.join(__dirname,'../templates/views')
app.set('views', viewPath)



//partials: these are very useful when we want same thing on multiple webpages like header and footers
//setting up path for partials
const partialsPath=path.join(__dirname,'../templates/partials')
//registering partials
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Rohit",
        Job:"SDE"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        Hodophile: "Traveller"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:"I need your help in learning Node.js in fast way"
    })
})

//if you get any other routes other than above mention you have to send error response

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    console.log("Server is fired on 3000")
})