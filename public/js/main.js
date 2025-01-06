class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(x, y) {
        this.x += x;
        this.y += y;
    }

    clone() {
        return new Pos(this.x, this.y);
    }
}

class Object {
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    collidesWith(object) {
        return !(this.maxX() < object.minX() || this.minX() > object.maxX() || this.maxY() < object.minY() || this.minY() > object.maxY());
    }

    minX() {
        return this.pos.x;
    }

    maxX() {
        return this.pos.x + this.width;
    }

    minY() {
        return this.pos.y;
    }

    maxY() {
        return this.pos.y + this.height;
    }
}

const canvas = document.querySelector('canvas');
canvas.width = 1400;
canvas.height = 700;

const inputs = {
    z: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowDown: {
        pressed: false
    }
},
PLAYER = {
    WIDTH: 20,
    HEIGHT: 200,
    SPEED: 20
},
BALL = {
    SIZE: 20,
    SPEED: 10,
    MAX_SPEED: 15
},
players = {
    player1: {
        username: 'Player1',
        score: 0,
        AI: false,
        object: new Object(new Pos(0, canvas.height / 2 - PLAYER.HEIGHT / 2), PLAYER.WIDTH, PLAYER.HEIGHT)
    },
    player2: {
        username: 'Player2',
        score: 0,
        AI: false,
        object: new Object(new Pos(canvas.width - PLAYER.WIDTH, canvas.height / 2 - PLAYER.HEIGHT / 2), PLAYER.WIDTH, PLAYER.HEIGHT)
    }
},
ball = {
    object: new Object(new Pos(canvas.width / 2 - BALL.SIZE / 2, canvas.height / 2 - BALL.SIZE / 2), BALL.SIZE, BALL.SIZE),
    speed: BALL.SPEED,
    velocity: {
        x: 1,
        y: 1
    }
}

function loop() {
    if (!players.player1.AI) {
        if (inputs.z.pressed) players.player1.object.pos.y = Math.max(0, players.player1.object.pos.y - PLAYER.SPEED);
        if (inputs.s.pressed) players.player1.object.pos.y = Math.min(canvas.height - PLAYER.HEIGHT, players.player1.object.pos.y + PLAYER.SPEED);
    } else {
        players.player1.object.pos.y = Math.max(0, Math.min(canvas.height - PLAYER.HEIGHT, ball.object.pos.y - PLAYER.HEIGHT / 2 + BALL.SIZE / 2));
    }
    if (!players.player2.AI) {
        if (inputs.ArrowUp.pressed) players.player2.object.pos.y = Math.max(0, players.player2.object.pos.y - PLAYER.SPEED);
        if (inputs.ArrowDown.pressed) players.player2.object.pos.y = Math.min(canvas.height - PLAYER.HEIGHT, players.player2.object.pos.y + PLAYER.SPEED);
    } else {
        players.player2.object.pos.y = Math.max(0, Math.min(canvas.height - PLAYER.HEIGHT, ball.object.pos.y - PLAYER.HEIGHT / 2 + BALL.SIZE / 2));
    }
    
    ball.object.pos.x = Math.max(0, Math.min(canvas.width - BALL.SIZE, ball.object.pos.x + ball.velocity.x * ball.speed));
    ball.object.pos.y = Math.max(0, Math.min(canvas.height - BALL.SIZE, ball.object.pos.y + ball.velocity.y * ball.speed));

    if (ball.object.minX() <= 0 || ball.object.maxX() >= canvas.width) {
        if (ball.object.minX() <= 0) {
            players.player2.score += 1;
        } else {
            players.player1.score += 1;
        }
        ball.speed = BALL.SPEED;
        ball.object.pos = new Pos(canvas.width / 2 - BALL.SIZE / 2, canvas.height / 2 - BALL.SIZE / 2);
    } else if (players.player1.object.collidesWith(ball.object) || players.player2.object.collidesWith(ball.object)) {
        ball.speed = Math.min(BALL.MAX_SPEED, Math.round((ball.speed + 0.2) * 10) / 10);
        ball.velocity.x *= -1;
    }
    if (ball.object.minY() <= 0 || ball.object.maxY() >= canvas.height) {
        ball.velocity.y *= -1;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = players.player1.AI ? '#c3ff00' : '#3333ff';
    ctx.fillRect(players.player1.object.pos.x, players.player1.object.pos.y, players.player1.object.width, players.player1.object.height);
    ctx.fillStyle = players.player2.AI ? '#c3ff00' :'#ff3333';
    ctx.fillRect(players.player2.object.pos.x, players.player2.object.pos.y, players.player2.object.width, players.player2.object.height);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.object.pos.x + BALL.SIZE / 2, ball.object.pos.y + BALL.SIZE / 2, BALL.SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    hud();

    requestAnimationFrame(loop);
}

function hud() {
    for (const player of ['player1', 'player2']) {
        if (document.getElementById(`${player}-username`).children.length === 0)
            document.getElementById(`${player}-username`).innerHTML = players[player].AI ? 'AI' : players[player].username;
        document.getElementById(`${player}-score`).innerHTML = players[player].score;
        document.getElementById(`${player}-score`).classList.toggle('ai-color', players[player].AI);
    }
}

this.addEventListener('keydown', e => {
    switch (e.key) {
        case 'z':
        case 's':
        case 'ArrowUp':
        case 'ArrowDown':
            inputs[e.key].pressed = true;
            break;
        case '&':
        case '1':
            players[e.key === '&' ? 'player1' : 'player2'].AI = !players[e.key === '&' ? 'player1' : 'player2'].AI;
            break;
    }
});

this.addEventListener('keyup', e => {
    switch (e.key) {
        case 'z':
        case 's':
        case 'ArrowUp':
        case 'ArrowDown':
            inputs[e.key].pressed = false;
    }
});

document.getElementById('player1-username').addEventListener('click', e => rename(e, 'player1'));
document.getElementById('player2-username').addEventListener('click', e => rename(e, 'player2'));

function rename(e, player) {
    if (e.target.innerHTML === 'AI') return;
    e.target.innerHTML = '';
    const input = document.createElement('input');
    e.target.appendChild(input);
    input.focus();
    input.addEventListener('blur', e => {
        players[player].username = e.target.value === '' ? 'none' : e.target.value;
    });
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') players[player].username = e.target.value === '' ? 'none' : e.target.value;
    });
}

loop();