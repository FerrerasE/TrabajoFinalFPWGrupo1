class Escena2 extends Phaser.Scene {
    constructor() {
        super("Escena2");
        this.platforms = null;
      // this.scoreText = "";
      // this.score = 840;
        this.tiempoRestante = 60; // Tiempo en segundos
        this.tiempoTexto = null;
        this.timerEvent = null;
     
    }

    preload() {
        this.load.image('sky', '../public/img/sky.png');
        this.load.image('fondo2', '../public/img/fondo2.jpg');
        this.load.image('ground', '../public/img/platform.png');
        this.load.image('Suelo', '../public/img/SueloMR.png');
        this.load.image('star', '../public/img/star.png');
        this.load.image('bomb', '../public/img/bomb.png');
        this.load.image('bombax', '../public/img/BombaX.png');
        this.load.image('cofre', '../public/img/cofre.png');
        this.load.spritesheet('dude', '../public/img/dude.png', { frameWidth: 32, frameHeight: 48 });
        
        // Inicia el temporizador
        this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.actualizarTiempo, callbackScope: this, loop: true });
        this.resetTimer();
    } 
    create() {
        this.add.image(400, 300, 'fondo2').setScale(2);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'Suelo').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'Suelo');
        this.platforms.create(20, 100, 'Suelo');
        this.platforms.create(750, 280, 'Suelo');
        this.platforms.create(800, 100, 'Suelo');
        this.platforms.create(50, 250, 'Suelo');
        this.cofre = this.physics.add.image(50, 190, 'cofre').setScale(0.2);

        this.player = this.physics.add.sprite(100, 30, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.cofre, this.collectCofre, null, this);
        this.physics.add.collider(this.platforms, this.cofre);
        this.physics.add.collider(this.player, this.platforms);
       

        this.cursors = this.input.keyboard.createCursorKeys();

       // this.stars = this.physics.add.group({
         //   key: 'star',
        //    repeat: 20,
        //    setXY: { x: 10, y: 0, stepX: 35 }
       // });

        //  this.stars.children.iterate(function (child) {
        // child.setBounceY(Phaser.Math.FloatBetween(0.3, 1.0));
        //child.setBounceX(Phaser.Math.FloatBetween(1.0, 1.5));
      //  });

       //this.physics.add.collider(this.stars, this.platforms);
       // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
       //  this.cofre.setCollideWorldBounds(true); 
       //  this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000000' });
        this.tiempoTexto = this.add.text(600, 16, 'Tiempo: ' + this.tiempoRestante, { fontSize: '32px', fill: '#000000' });
       
        // Para agregar las bombas
       this.bombs = this.physics.add.group();
      this.physics.add.collider(this.bombs, this.platforms);
     
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

     let bomb = this.bombs.create(200, 200, 'bombax').setScale(0.1).refreshBody();
       let bomb2 = this.bombs.create(250, 250, 'bombax').setScale(0.2).refreshBody();
       bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
       bomb.setVelocity(Phaser.Math.Between(-70, 70), 20);

       bomb2.setBounce(1);
        bomb2.setCollideWorldBounds(true);
       bomb2.setVelocity(Phaser.Math.Between(-100, 100), 10);
    }
    resetTimer() {
        this.tiempoRestante = 60;
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

  // collectStar(player, star) {
 
   //   star.disableBody(true, true);
     //  this.score = this.score + 10;
      //  this.scoreText.setText('Puntaje: ' + this.score);

     //}

     collectCofre(player, cofre) {
        this.timerEvent.remove(false); // Detiene el temporizador al llegar al cofre
        this.resetTimer(); // Restablece el temporizador
        this.scene.start('Win');
    }
    
    actualizarTiempo() {
        this.tiempoRestante--;
    
        if (this.tiempoRestante <= 0) {
            this.resetTimer(); // Restablece el temporizador
            this.scene.start('GameOver');
        } else {
            this.tiempoTexto.setText('Tiempo: ' + this.tiempoRestante);
        }
    }



    hitBomb(player, bomb, bomb2) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        //si la bomba nos golpea, perderemos y pasaremos a la escena de gameover
       this.scene.start('GameOver');
       //this.score =840;
        }
}

export default Escena2;






    