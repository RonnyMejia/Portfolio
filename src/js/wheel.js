const track = document.querySelector('.skills-track');


const clone = track.innerHTML;
track.innerHTML += clone;


const trackWidth = track.offsetWidth;
track.style.width = `${trackWidth * 0.4}px`; 