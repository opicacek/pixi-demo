// create a renderer instance
var renderer = PIXI.autoDetectRenderer(800, 600, {view: document.getElementById('game-canvas'), backgroundColor: 0xfffff0});

// create the root of the scene graph
var stage = new PIXI.Container();


// -----


// create guys
var guys = [];

for (var i = 0; i < 10; i++) {
  let guy = new Person('images/person.png', 0, Math.random() * 600, Math.random() * 5);
  guy.addToStage(stage);

  guys.push(guy);
}


// start animating
animate();

function animate() {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  // game logic
  for (let guy of guys) {
    guy.move();
    guy.draw();
  }

  // render the container
  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}
