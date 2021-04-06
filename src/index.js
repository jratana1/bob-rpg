import Phaser from 'phaser';
import { baseScene } from './baseScene';

const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 600, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    // scene: {
    //   preload: preload,
    //   create: create,
    //   update: update
    // }
    scene:[baseScene]
  };
  
  const game = new Phaser.Game(config);
  