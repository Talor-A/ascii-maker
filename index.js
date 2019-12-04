const express = require('express')
const cors = require('cors')
const figlet = require('figlet');
const path = require('path')
// Create the server
const app = express()
// Serve our api route /fig that returns a custom ascii text
app.get('/api/fig/:text', cors(), async (req, res, next) => {
  try {


    figlet(req.params.text, function(err, fig) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          throw err
      }
      res.json({ fig })
    });

    
  } catch (err) {
    next(err)
  }
})
// Serve our base route that returns a Hello World figure
app.get('/api/fig/', cors(), async (req, res, next) => {
  try {
    figlet('Hello World!', function(err, fig) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          throw err
      }
      res.json({ fig })
    });
  } catch (err) {
    next(err)
  }
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
