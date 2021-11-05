class DrumKit {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.highatAudio = document.querySelector(".highat-sound");
    this.index = 0;
    this.bpm = 150; //beats per minute
    this.isPlaying = null;
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHighat = "./sounds/hihat-acoustic01.wav";
    this.selectTrack = document.querySelectorAll("select");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if the pads are active
      if (bar.classList.contains("active")) {
        //check the type of the pad
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("highat-pad")) {
          this.highatAudio.currentTime = 0;
          this.highatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      this.playButton.innerText = "STOP";
      this.playButton.classList.add("active");
    } else {
      //remove the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playButton.innerText = "PLAY";
      this.playButton.classList.remove("active");
    }
  }

  changeTrack(e) {
    const track = e.target.name;
    const trackValue = e.target.value;
    switch (track) {
      case "kick-select":
        this.kickAudio.src = trackValue;
        break;
      case "snare-select":
        this.snareAudio.src = trackValue;
        break;
      case "highat-select":
        this.highatAudio.src = trackValue;
        break;
    }
  }

  muteTrack(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.highatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.highatAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-num");
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }

  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playbtn = document.querySelector(".play");
    if (playbtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//event listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.start();
});

drumKit.selectTrack.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumKit.changeTrack(e);
  });
});

drumKit.muteButtons.forEach((mute) => {
  mute.addEventListener("click", (e) => {
    drumKit.muteTrack(e);
  });
});

drumKit.tempoSlider.addEventListener("input", (e) => {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.updateTempo(e);
});

//toast
document.addEventListener("DOMContentLoaded", toast);

function toast() {
  document.getElementById("toast").className = "show";
}
