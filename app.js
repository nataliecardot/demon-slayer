new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    demonHealth: 100,
    gameIsRunning: false
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100,
      this.demonHealth = 100
    },
    attack: function() {
      this.demonHealth -= this.calculateDamage(3, 10);
      this.playerHealth -= this.calculateDamage(5, 12);

      this.checkScore();
    },
    specialAttack: function() {

    },
    heal: function() {

    },
    giveUp: function() {

    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkScore: function() {
      // Note: Expected behavior in Firefox but not Chrome: if user clicks 'cancel' when asked "New game?", the updated value for demon or player is shown after clicking cancel in Chrome but before popup in Firefox. Also, loser's health changes to zero before popup in Firefox but not Chrome. TODO: Find solution that also works in Chrome
      if (this.demonHealth <= 0) {
        this.$nextTick().then(() => {
          if (confirm('You won! New game?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
        });
      } else {
        if (this.playerHealth <= 0) {
          this.$nextTick().then(() => {
            if (confirm('You lost. New game?')) {
              this.startGame();
            } else {
              this.gameIsRunning = false;
            }
          });
        }
      }
    }
  }
});