let cursors;
let bob;
let molly
var text = 'Hello my name is whatever and I want to tell you a nice beautiful story. I love you forever! <3';
var textspeed = 50;
var cancelled = false;
    
    export let baseScene = {

    preload: function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("walls", "./src/assets/images/Room_Builder_32x32.png");
    this.load.image("items", "./src/assets/images/Interiors_free_32x32.png");
    this.load.image("bathroom", "./src/assets/images/3_Bathroom_32x32.png");

    this.load.tilemapTiledJSON("bedroom", "./src/assets/maps/bedroom.json");

    this.load.spritesheet('bob', './src/assets/sprites/Bob_32x32.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('molly', './src/assets/sprites/Molly_32x32.png', { frameWidth: 32, frameHeight: 64 });

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
    
    molly = this.physics.add.sprite(550, 170, 'molly');
    bob = this.physics.add.sprite(150, 150, 'bob');
    


    const testLayer = map.createLayer("Tile Layer 3", [tileset3, tileset2, tileset], 0, 0);


    this.anims.create({
      key: 'bob-walk-right',
      frames: this.anims.generateFrameNumbers('bob', { frames: [96, 97, 98, 99, 100, 101 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-walk-up',
      frames: this.anims.generateFrameNumbers('bob', { frames: [102, 103, 104, 105, 106, 107 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-walk-left',
      frames: this.anims.generateFrameNumbers('bob', { frames: [108, 109, 110, 111, 112, 113 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-walk-down',
      frames: this.anims.generateFrameNumbers('bob', { frames: [114, 115, 116, 117, 118, 119 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-idle-right',
      frames: this.anims.generateFrameNumbers('bob', { frames: [48, 49, 50, 51, 52, 53 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-idle-up',
      frames: this.anims.generateFrameNumbers('bob', { frames: [54, 55, 56, 57, 58, 59 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-idle-left',
      frames: this.anims.generateFrameNumbers('bob', { frames: [60, 61, 62, 63, 64, 65 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'bob-idle-down',
      frames: this.anims.generateFrameNumbers('bob', { frames: [66, 67, 68, 69, 70, 71 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-walk-right',
      frames: this.anims.generateFrameNumbers('molly', { frames: [96, 97, 98, 99, 100, 101 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-walk-up',
      frames: this.anims.generateFrameNumbers('molly', { frames: [102, 103, 104, 105, 106, 107 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-walk-left',
      frames: this.anims.generateFrameNumbers('molly', { frames: [108, 109, 110, 111, 112, 113 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-walk-down',
      frames: this.anims.generateFrameNumbers('molly', { frames: [114, 115, 116, 117, 118, 119 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-idle-right',
      frames: this.anims.generateFrameNumbers('molly', { frames: [48, 49, 50, 51, 52, 53 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-idle-up',
      frames: this.anims.generateFrameNumbers('molly', { frames: [54, 55, 56, 57, 58, 59 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-idle-left',
      frames: this.anims.generateFrameNumbers('molly', { frames: [60, 61, 62, 63, 64, 65 ] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'molly-idle-down',
      frames: this.anims.generateFrameNumbers('molly', { frames: [66, 67, 68, 69, 70, 71 ] }),
      frameRate: 6,
      repeat: -1
    });
    
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    bob.body.setSize(28, 16, true);
    bob.body.offset.y = 48;
    bob.body.collideWorldBounds = true;
    bob.play('bob-idle-down');

    molly.body.setSize(24, 42);
    molly.body.setOffset(5,20);
    molly.body.collideWorldBounds = true;
    molly.body.immovable = true
    molly.play('molly-idle-down');

    collisionLayer.setCollision(13)

    this.physics.add.collider(bob, collisionLayer);
    this.physics.add.collider(molly, collisionLayer);
    this.physics.add.collider(molly, bob);


    const camera = this.cameras.main;
    camera.startFollow(bob);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.createCombo('PHASER');
    this.input.keyboard.on('keycombomatch', function (event) {
    console.log('Konami Code entered!');
});

    function moveNPC() {
      // this.spawns.getChildren().forEach((enemy) => {
        const randNumber = Math.floor((Math.random() * 4) + 1);
     
        switch(randNumber) {
          case 1:
            molly.body.setVelocityX(50);
            break;
          case 2:
            molly.body.setVelocityX(-50);
            break;
          case 3:
            molly.body.setVelocityY(50);
            break;
          case 4:
            molly.body.setVelocityY(-50);
            break;
          default:
            molly.body.setVelocityX(50);
        }
      // });
     
      setTimeout(() => {
        if (molly.body.velocity.x < 0) molly.anims.play("molly-idle-left", true);
        else if (molly.body.velocity.x > 0) molly.play("molly-idle-right", true);
        else if (molly.body.velocity.y < 0) molly.anims.play("molly-idle-up", true);
        else if (molly.body.velocity.y > 0) molly.anims.play("molly-idle-down", true);
        
        molly.body.setVelocityX(0);
        molly.body.setVelocityY(0);

      }, Math.floor(Math.random() * 1000)+1000);

      if (molly.body.velocity.x < 0 ) {
        molly.anims.play("molly-walk-left", true);
      } else if (molly.body.velocity.x > 0) {
        molly.anims.play("molly-walk-right", true);
      } else if (molly.body.velocity.y < 0) {
        molly.anims.play("molly-walk-up", true);
      } else if (molly.body.velocity.y > 0) {
        molly.anims.play("molly-walk-down", true);
      } 
      
    }

    this.timedEvent = this.time.addEvent({
      delay: 5000,
      callback: moveNPC,
      callbackScope: this,
      loop: true
    })
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
    bob.anims.play("bob-walk-left", true);
  } else if (cursors.right.isDown) {
    bob.anims.play("bob-walk-right", true);
  } else if (cursors.up.isDown) {
    bob.anims.play("bob-walk-up", true);
  } else if (cursors.down.isDown) {
    bob.anims.play("bob-walk-down", true);
  } 
    else {
    // // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) bob.anims.play("bob-idle-left", true);
    else if (prevVelocity.x > 0) bob.play("bob-idle-right", true);
    else if (prevVelocity.y < 0) bob.anims.play("bob-idle-up", true);
    else if (prevVelocity.y > 0) bob.anims.play("bob-idle-down", true);
  }
  
  if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
    let box = document.getElementsByClassName("overlay")[0]
    let i = 0;

    function typeWriter(txt) {
      if (cancelled) {
        box.innerHTML = "";
        return
      }

      if (i < txt.length) {
        box.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, textspeed, txt);
      }
    }

    if (box.style.visibility === "hidden") {
      box.style.visibility = "visible";
      cancelled = false
      typeWriter(text)
    } else {
      cancelled = true
      box.style.visibility = "hidden";
      box.innerHTML = "";
    }
  }

  }
}

