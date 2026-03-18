(function() {
    var backgroundContainer = document.createElement('div');
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.zIndex = '-1';
    document.body.appendChild(backgroundContainer);

    var canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    backgroundContainer.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    var w = window.innerWidth;
    var h = window.innerHeight;

    function resizeCanvas() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }

    resizeCanvas();

    window.addEventListener('resize', function() {
        resizeCanvas();
    });

    var particles = [];
    var cursorX = w/2; 
    var cursorY = h/2; 
    var radius = 200; 

    var properties = {
        bgColor: '#171718',
        particleColor: 'rgba(35, 166, 213)',
        particleRadius: 1,
        particleMaxVelocity: 0.2,
        lineLength: 150,
        particleLife: 6,
    };

function setParticleProperties() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        properties.particleCount = 20;
    } else if (window.matchMedia("(max-width: 1200px)").matches) {
        properties.particleCount = 60;
    } else {
        properties.particleCount = 100;
    }
}
setParticleProperties();
window.addEventListener('resize', setParticleProperties);


    window.onresize = function() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }


    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() {
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife() {
            if (this.life < 1) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
        for (var i in particles) {
            for (var j in particles) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx*dx + dy*dy);

                
                if (dist < properties.lineLength) {
                    var dxCursor = particles[i].x - cursorX;
                    var dyCursor = particles[i].y - cursorY;
                    var distToCursor = Math.sqrt(dxCursor*dxCursor + dyCursor*dyCursor);

                    if (distToCursor < radius) {
                        var opacity = 1 - dist / properties.lineLength;
                        ctx.lineWidth = '0.5';
                        ctx.strokeStyle = 'rgba(35, 166, 213,' + opacity + ')';
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    function reDrawParticles() {
        for (var i in particles) {
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        /*drawLines();*/
        requestAnimationFrame(loop);
    }

    function init() {
        for (var i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    init();

})();