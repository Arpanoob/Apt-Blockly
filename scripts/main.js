(function () {
  // Variable to keep track of the currently selected button
  let currentButton

  // Function to handle the play button click event
  function handlePlay(event) {
    // Load the Blockly workspace associated with the clicked button
    loadWorkspace(event.target);
    
    // Generate JavaScript code from the Blockly workspace
    let code = javascript.javascriptGenerator.workspaceToCode(
      Blockly.getMainWorkspace(),
    );
    
    // Append code to play the music using the MusicMaker library
    code += 'MusicMaker.play();';

    try {
      // Execute the generated JavaScript code
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to load the Blockly workspace for a button
  function loadWorkspace(button) {
    const workspace = Blockly.getMainWorkspace();
    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    } else {
      workspace.clear();
    }
  }

  // Function to save the Blockly workspace for a button
  function save(button) {
    button.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace(),
    );
  }

  // Function to handle the save button click event
  function handleSave() {
    // Set the mode to 'edit' when saving
    document.body.setAttribute('mode', 'edit');
    // Save the Blockly workspace for the current button
    save(currentButton);
  }

  // Function to enable edit mode
  function enableEditMode() {
    // Set the mode to 'edit'
    document.body.setAttribute('mode', 'edit');
    // Remove click event listeners for play mode and add for Blockly mode
    document.querySelectorAll('.button').forEach((btn) => {
      btn.removeEventListener('click', handlePlay);
      btn.addEventListener('click', enableBlocklyMode);
    });
  }

  // Function to enable play mode
  function enableMakerMode() {
    // Set the mode to 'maker'
    document.body.setAttribute('mode', 'maker');
    // Add click event listeners for play mode and remove for Blockly mode
    document.querySelectorAll('.button').forEach((btn) => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  // Function to enable Blockly mode for a button
  function enableBlocklyMode(e) {
    // Set the mode to 'blockly'
    document.body.setAttribute('mode', 'blockly');
    // Set the currentButton variable to the clicked button
    currentButton = e.target;
    // Load the Blockly workspace for the current button
    loadWorkspace(currentButton);
  }

  // Add event listeners for buttons to switch between modes
  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  // Enable play mode by default
  enableMakerMode();

  // Define the toolbox configuration for Blockly
  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
      {
        kind: 'block',
        type: 'controls_repeat_ext',
        inputs: {
          TIMES: {
            shadow: {
              type: 'math_number',
              fields: {
                NUM: 5,
              },
            },
          },
        },
      },
      {
        kind: 'block',
        type: 'play_sound',
      },
    ],
  };

  // Inject Blockly into the designated div with the specified toolbox configuration
  Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: false,
    horizontalLayout: true,
    toolboxPosition: 'end',
  });
})();
