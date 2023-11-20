import Phaser from 'phaser';

class Escena0Dude extends Phaser.Scene{

    constructor(){
        super("Escena0");
        this.platforms = null;
        this.score=0;
        
    }
    
    preload(){
        this.load.image('sky','/img/sky.png');
        this.load.image('rojo','/img/rojo.jpg');
        this.load.image('ground', '/img/platform.png');
        this.load.image('Suelo', '/img/SueloMR.png');
        this.load.image('star','/img/star.png');
        this.load.image('bomb', '/img/bomb.png');
        this.load.image('bombax', '/img/BombaX.png');
        this.load.spritesheet('dude', '/img/dude.png', { frameWidth: 32, frameHeight: 48 });
         

        }
    create(){
            this.add.image(400, 300, 'sky').setScale(2);
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 280, 'ground');
            this.player = this.physics.add.sprite(100,30,'dude');

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
                frames: [ { key: 'dude', frame: 4 } ],
                frameRate: 20
                });
                this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
                });

                // jugador y plataforma colisionan
                this.physics.add.collider(this.player, this.platforms); 

                // se crea para usar las teclas para mover al personaje
                this.cursors = this.input.keyboard.createCursorKeys();

                // Se agregan las estrellas
               this.stars = this.physics.add.group({
               key: 'star',
               repeat: 20, // cantidad de estrellas
               setXY: { x: 10, y: 0, stepX: 35 } // empieza en la posición x e y, se repite cada 70 en x
                });
                //Se agrega el rebote entre el grupo de estrelas
               this.stars.children.iterate(function (child) {
               child.setBounceY(Phaser.Math.FloatBetween(0.3, 1.0));
               child.setBounceX(Phaser.Math.FloatBetween(1.0, 1.5));
                });
                //Habilita las colisiones de las entrellas con la plataforma
                this.physics.add.collider(this.stars, this.platforms);

                //Choque entre las estrellas y el jugador
                this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

                //Para controlar el puntaje
                this.scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#FFFFFF' });

                //Para agregar las bombas
                this.bombs = this.physics.add.group();
                this.physics.add.collider(this.bombs, this.platforms);
                this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    
            }
        
    update() {
       if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
            }
        else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
        }
        }

        //Colisión entre el jugador y las estrellas
    collectStar(player, star) {
         star.disableBody(true, true);
         this.score += 10;
         this.scoreText.setText('Puntaje: ' + this.score);
         
         //para pasar al otro nivel
         if (this.score == 420) {
            
            this.scene.start('Escena1' );
            this.score =0; 
           
            
         }

         //Para las bombas
         if (this.stars.countActive(true) === 0) {
         this.stars.children.iterate(function (child) {
         child.enableBody(true, child.x, 0, true, true);
         });
         let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : 
         Phaser.Math.Between(0, 400);
         let bomb = this.bombs.create(x, 16, 'bomb');
         //.setScale(0.2).refreshBody()
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-300, 300), 10);
         }
        }

    hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            //GameOver = true;
            this.scene.start('GameOver');
           this.score =0;
            }
                

    

            
    


}

export default Escena0Dude;