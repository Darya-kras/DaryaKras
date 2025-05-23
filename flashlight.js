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