// MusicMaker object definition
const MusicMaker = {
  // Array to store the queue of sound URLs
  queue_: [],
  // Audio player object
  player_: new Audio(),

  // Function to queue a sound
  queueSound: function (soundUrl) {
    // Add the sound URL to the queue array
    this.queue_.push(soundUrl);
  },

  // Function to play the next sound in the queue
  play: function () {
    // Retrieve the next sound URL from the queue
    const next = this.queue_.shift();
    // If there is a sound URL in the queue
    if (next) {
      // Set the player source to the next sound URL
      this.player_.src = next;
      // Play the sound
      this.player_.play();
    }
  },
};

// Event listener to automatically play the next sound when the current one ends
MusicMaker.player_.addEventListener('ended', MusicMaker.play.bind(MusicMaker));
