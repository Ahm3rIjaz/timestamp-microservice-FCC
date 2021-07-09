const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('public'))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (request, response) => {
  response.json({greeting: 'hello API'});
});

app.get("/api/:date", (request, response) => {
  let date = request.params.date;
  (/\D/g).test(date)
    ? date = new Date(date)
    : date = new Date(Number(date))
  date != 'Invalid Date'
    ? response.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
    : response.json({error: "Invalid Date"})
});

app.get("/api", (request, response) => {
  const date = new Date()
  response.json({
    unix: date.valueOf(),
    utc: date.toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(3005, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});