
const connectToMongo=require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
var cors = require('cors')

 
app.use(cors())
// this is used for req.body
app.use(express.json())


//Available routes for convience so that there will be no mixup
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`inotebook app backend listening on port ${port}`)
})
