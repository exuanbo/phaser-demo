import "phaser";
import { CursorKey } from "./types";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
};

class mainScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite = undefined as any;
  coin: Phaser.Physics.Arcade.Sprite = undefined as any;

  score: number = undefined as any;
  scoreText: Phaser.GameObjects.Text = undefined as any;

  arrow: CursorKey = undefined as any;

  constructor() {
    super(sceneConfig);
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("coin", "assets/coin.png");
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, "player");
    this.coin = this.physics.add.sprite(300, 200, "coin");

    this.score = 0;
    const style = { font: "20px sans-serif", fill: "#fff" };
    this.scoreText = this.add.text(20, 20, `score: ${this.score}`, style);

    this.arrow = this.input.keyboard.createCursorKeys() as CursorKey;
  }

  update() {
    if (this.physics.overlap(this.player, this.coin)) {
      this.hit();
    }

    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    }

    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    }
  }

  hit() {
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 200);

    this.score += 10;
    this.scoreText.setText("score: " + this.score);

    this.tweens.add({
      targets: this.player,
      duration: 200,
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  width: 700,
  height: 300,
  backgroundColor: "#3498db",
  scene: mainScene,
  physics: { default: "arcade" },
  parent: "game",
};

new Phaser.Game(config);
