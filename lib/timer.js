class Timer {
  constructor(total) {

  }

  startTimer() {
// Set the date we're counting down to
    const startDate = Date.now();

    // Update the count down every 1 second
    const x = setInterval(function() {

    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now an the count down date
    let distance = now - startDate;

    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML =
    + minutes + "m " + seconds + "s ";
  }
//     console.log("new timer");
//     this.seconds = 60;
//     this.roundInterval;
//
//     this.decrementSeconds = this.decrementSeconds.bind(this);
//     this.reset = this.reset.bind(this);
//   }
//
//   start (allWordsGuessed, endRound) {
//     this.roundInterval = setInterval( ()=> {
//       if (this.seconds && allWordsGuessed) {
//         this.decrementSeconds();
//         $('#timer').text(`0:${this.seconds}`);
//       } else {
//         this.reset();
//         endRound();
//       }
//     }, 1000);
//   }
//
//   decrementSeconds() {
//     this.seconds-- ;
//   }
//
//   pause(){
//     if (this.seconds) {
//       clearInterval(this.roundInterval);
//     }
//   }
//
//   reset(){
//     clearInterval(this.roundInterval);
//     this.seconds = 60;
//   }
// }

module.exports = Timer;
