const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs')

// reading directory and it's inside content as well, it will list all files, sub files and directories.
app.get('/', (req, res)=>{
    fs.readdir('./files', function(err, items){
        res.render("index", {files: items});
    });
});

// writing data
app.post('/create', (req, res)=>{
fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.about , function(err){
        res.redirect('/')
    });
});

//reading & showing data
app.get('/file/:name', (req, res)=>{
    fs.readFile(`./files/${req.params.name}`, "utf-8", function(err, filedata){
        res.render('show', {name: req.params.name, details: filedata})
    });
});

app.get('/edit/:name', (req, res)=>{
    res.render('edit', {filename: req.params.name})
});

// renaming the files
app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}`, function(err){
        res.redirect('/')
    })
});


app.listen(3000, () => {
    console.log("working");
});