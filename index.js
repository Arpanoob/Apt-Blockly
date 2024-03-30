const express = require('express');
const path = require('path');
let acorn = require("acorn");
const escodegen =require('escodegen')
const app = express();
const port = 3000;
app.use(express.json());

app.post('/generate-code', (req, res) => {
  try {
    // Extract AST from request body

    const astNodes = acorn.parse(req.body.code,{ecmaVersion:2020});
    console.log("Received AST:", astNodes);

    // Generate JavaScript code from AST
    const generatedCode = escodegen.generate(astNodes);
    console.log("Generated code:", generatedCode);

    // Send the generated code back as a response
    res.send(generatedCode);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error generating code: " + error.message);
  }
});

// Function to generate JavaScript code from AST
function generateJavaScriptCode(astNodes) {
  return 
}
// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/styles/index.css/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.css'));
   
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
