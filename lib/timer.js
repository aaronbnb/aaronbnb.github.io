class Timer {
  constructor(total) {
    console.log("new timer");
    this.seconds = 60;
    this.roundInterval;

    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.reset = this.reset.bind(this);
  }

  start (allWordsGuessed, endRound) {
    this.roundInterval = setInterval( ()=> {
      if (this.seconds && allWordsGuessed) {
        this.decrementSeconds();
        $('#timer').text(`0:${this.seconds}`);
      } else {
        this.reset();
        endRound();
      }
    }, 1000);
  }

  decrementSeconds() {
    this.seconds-- ;
  }

  pause(){
    if (this.seconds) {
      clearInterval(this.roundInterval);
    }
  }

  reset(){
    clearInterval(this.roundInterval);
    this.seconds = 60;
  }
}

module.exports = Timer;
