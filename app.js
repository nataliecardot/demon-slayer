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
    }
  }
});