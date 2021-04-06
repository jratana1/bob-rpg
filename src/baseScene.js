let cursors;
let bob;
    
    export let baseScene = {

    preload: function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("walls", "./src/assets/images/Room_Builder_32x32.png");
    this.load.image("items", "./src/assets/images/Interiors_free_32x32.png");
    this.load.image("bathroom", "./src/assets/images/3_Bathroom_32x32.png");

    this.load.tilemapTiledJSON("bedroom", "./src/assets/maps/bedroom.json");

    this.load.spritesheet('bob', './src/assets/sprites/Bob_32x32.png', { frameWidth: 32, frameHeight: 64 });
    },
  
    create: function create() {
    // Runs once, after all assets in preload are loaded

    const map = this.make.tilemap({ key: "bedroom" });

    const tileset = map.addTilesetImage("walls", "walls");

    const tileset2 = map.addTilesetImage("interiors", "items");
    const tileset3 = map.addTilesetImage("bathroom", "bathroom");
    
    const collisionLayer = map.createLayer("collision", tileset, 0, 0);

    const wallLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const itemLayer = map.createLayer("Tile Layer 2", [tileset3, tileset2, tileset], 0, 0);
    bob = this.physics.add.sprite(150, 150, 'bob');

    const testLayer = map.createLayer("Tile Layer 3", [tileset3, tileset2, tileset], 0, 0);


    this.anims.create({
      key: 'walk right',
      frames: this.anims.generateFrameNumbers('bob', { frames: [96, 97, 98, 99, 100, 101 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk up',
      frames: this.anims.generateFrameNumbers('bob', { frames: [102, 103, 104, 105, 106, 107 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk left',
      frames: this.anims.generateFrameNumbers('bob', { frames: [108, 109, 110, 111, 112, 113 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'walk down',
      frames: this.anims.generateFrameNumbers('bob', { frames: [114, 115, 116, 117, 118, 119 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'idle right',
      frames: this.anims.generateFrameNumbers('bob', { frames: [48, 49, 50, 51, 52, 53 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'idle up',
      frames: this.anims.generateFrameNumbers('bob', { frames: [54, 55, 56, 57, 58, 59 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'idle left',
      frames: this.anims.generateFrameNumbers('bob', { frames: [60, 61, 62, 63, 64, 65 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'idle down',
      frames: this.anims.generateFrameNumbers('bob', { frames: [66, 67, 68, 69, 70, 71 ] }),
      frameRate: 6,
      repeat: -1
    });
    
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // bob = this.physics.add.sprite(150, 150, 'bob');
    bob.body.setSize(28, 16, true);
    bob.body.offset.y = 48;
    bob.body.collideWorldBounds = true;
    bob.play('idle down');

    collisionLayer.setCollision(13)
    this.physics.add.collider(bob, collisionLayer);

    const camera = this.cameras.main;
    camera.startFollow(bob);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
  },
  
  update: function update(time, delta) {
    // Runs once per frame for the duration of the scene
    const speed = 150;
  const prevVelocity = bob.body.velocity.clone();

  // Stop any previous movement from the last frame
  bob.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    bob.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    bob.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    bob.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    bob.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  bob.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    bob.anims.play("walk left", true);
  } else if (cursors.right.isDown) {
    bob.anims.play("walk right", true);
  } else if (cursors.up.isDown) {
    bob.anims.play("walk up", true);
  } else if (cursors.down.isDown) {
    bob.anims.play("walk down", true);
  } 
    else {
    // // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) bob.anims.play("idle left", true);
    else if (prevVelocity.x > 0) bob.play("idle right", true);
    else if (prevVelocity.y < 0) bob.anims.play("idle up", true);
    else if (prevVelocity.y > 0) bob.anims.play("idle down", true);
  }
    }
}