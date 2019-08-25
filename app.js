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
      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamage(5, 12);
      this.checkWin();
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
    checkWin: function() {
      if (this.demonHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else {
        if (this.playerHealth <= 0) {
          if (confirm('You lost. New game?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
        }
      }
    }
  }
});