const express = require('express');
const router = express.Router();

//fs module for file operations
const fs = require('fs')
//csv-parser helps in parsing & reading csv files
const csvParser = require('csv-parser')
//csv-writer helps in writing csv file effeciently
const csvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')


router.get('/books',(req,res)=>{
    let books = []
    //reading the file by stream
    fs.createReadStream(path.join(__dirname,'files','books.csv'))
    .pipe(csvParser({separator:';'}))
    .on('data',(data)=>{
      books.push(data)
    })
    .on('end',()=>{
      console.log('books read completed')
      res.status(200).send(books)
    })
    
    })
    
    router.get('/magazines',(req,res)=>{
      let magazines = []
      fs.createReadStream(path.join(__dirname,'files','magazines.csv'))
      .pipe(csvParser({separator:';'}))
      .on('data',(data)=>{
        magazines.push(data)
      })
      .on('end',()=>{
        console.log('magazines read completed')
        res.status(200).send(magazines)
      })
      })

      router.get('/authors',(req,res)=>{
        let authors = []
        fs.createReadStream(path.join(__dirname,'files','authors.csv'))
        .pipe(csvParser({separator:';'}))
        .on('data',(data)=>{
          authors.push(data)
        })
        .on('end',()=>{
          console.log('authors read completed')
          res.status(200).send(authors)
        })
        })

      
    
      router.post('/createCsv',(req,res)=>{
        //checking if the name contains the .csv extension
         let filename = path.extname(req.body.fileName) === ".csv" ? req.body.fileName :
        `${req.body.fileName}.csv`
         
        const headers = req.body.headers;
        const data = req.body.data;
       
        //structuring the path and desingn of the csv file to be created
       const createCsvWriter =  csvWriter({
        
          path : path.join(__dirname,'downloads',filename),
          header: headers,
          fieldDelimiter: ';'
        })
       
        //creating csv file
      createCsvWriter.writeRecords(data)
      .then(()=>{

       //sending the created file to frontend to download
       res.download(path.join(__dirname,'downloads',filename),filename,(err)=>{
        if(err) console.log(err);
        else console.log('CSV file sent');
       })
      })
    
      })






module.exports = router;