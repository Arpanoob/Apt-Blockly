const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/styles/index.css', (req, res) => {
   // res.sendFile(path.join(__dirname, 'index.css'));
   res.send("hi");
  });
  app.get('/scripts/music_maker.js', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('scripts','music_maker.js')));
  });
  app.get('/scripts/sound_blocks.js', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('scripts','sound_blocks.js')));
  });
  app.get('/scripts/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('scripts','main.js')));
  });
  app.get('/sounds/:name', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('sounds',`${req.params.name}`)));
    //res.sendFile(path.join(__dirname, path.join('sounds','')));
  });
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
