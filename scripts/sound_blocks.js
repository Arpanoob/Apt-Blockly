// Define Blockly blocks with JSON array
Blockly.defineBlocksWithJsonArray([
  // Block for play_sound
  {
    // Block type
    type: 'play_sound',
    // Block display text
    message0: 'Play %1',
    // Block arguments
    args0: [
      {
        // Field dropdown for selecting sound
        type: 'field_dropdown',
        // Field name
        name: 'VALUE',
        // Dropdown options
        options: [
          ['C4', 'sounds/c4.m4a'],
          ['D4', 'sounds/d4.m4a'],
          ['E4', 'sounds/e4.m4a'],
          ['F4', 'sounds/f4.m4a'],
          ['G4', 'sounds/g4.m4a'],
        ],
      },
    ],
    // Connectors
    previousStatement: null,
    nextStatement: null,
    // Block color
    colour: 355,
  },
]);

// Define JavaScript code generation for play_sound block
javascript.javascriptGenerator.forBlock['play_sound'] = function (block) {
  // Get the selected sound value from the block
  const value = "'" + block.getFieldValue('VALUE') + "'";
  // Generate JavaScript code to queue the selected sound
  return 'MusicMaker.queueSound(' + value + ');\n';
};
