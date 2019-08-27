new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    demonHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.demonHealth = 100;
      this.turns = [];
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.demonHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits demon for ${damage} health points`
      });
      this.checkScore();
      this.demonAttack();
    },
    specialAttack: function() {
      let damage = this.calculateDamage(10, 20)
      this.demonHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits demon hard for ${damage} health points`
      });
      this.demonAttack();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals by 10 health points`
      });
      this.demonAttack();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    demonAttack: function() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Demon hits player for ${damage} health points`
      });
      this.checkScore();
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