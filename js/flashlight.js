document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', mousemove);
});

function mousemove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const fl = document.getElementById('flashlight'); 
    if(fl){
        fl.style.transform = 'translate(calc(' + mouseX + 'px - 50vw), ' + 'calc(' + mouseY + 'px - 50vh))';
    }
}

//скролблок с начала блока
window.addEventListener('load', () => {
  const block = document.getElementById('block2');
  if (block) {
    block.scrollTop = 0;
  }
});