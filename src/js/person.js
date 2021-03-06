class Person {
  constructor(image, x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    //----

    // create a texture from an image path
    const texture = PIXI.Texture.fromImage(image);

    // create a new Sprite using the texture
    this.sprite = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    // move the sprite to the center of the screen
    this.sprite.position.x = x;
    this.sprite.position.y = y;

    // make person clickable
    this.sprite.interactive = true;

    this.sprite
      .on('mousedown', this::this.onHit)
      .on('touchstart', this::this.onHit);
  }

  addToStage(stage) {
    stage.addChild(this.sprite);
  }

  //TODO
  onHit() {
    console.log('hit!');
    this.speed = 0;
  }

  //TODO
  move() {
    this.x += this.speed;

    //TODO const
    if (this.x > 800) {
      this.x = 0;
    }
    if (this.y > 600) {
      this.y = 0;
    }
  }

  //TODO
  draw() {
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
  }
}
