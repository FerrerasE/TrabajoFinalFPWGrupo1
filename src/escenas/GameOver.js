class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver"); // El nombre de la escena
        this.score=0;
    }

    preload() {
        // Carga la imagen de fondo
        this.load.image('menuBackground', '../public/img/gameOver.jpeg'); // Reemplaza '....' con la ruta correcta

    }

    create() {
        
        this.add.image(400, 300, 'menuBackground'); // Ajusta las coordenadas y el nombre de la imagen

        // Para gregar texto
        
        // this.add.text(200, 500, 'Game Over', { fontSize: '48px', fill: '#fff' });

        // temporizador para regresar al juego 
        /*this.time.addEvent({
            delay: 3000, // Tiempo en milisegundos
            callback: this.returnToGame,
            callbackScope: this
        });*/

        //  botón para regresar al menu
        const startButton = this.add.text(400, 420, 'Pulse para volver al Menu', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#bdecb6', // Color de fondo del botón
            padding: { x: 20, y: 10 }, // Espaciado interno del botón
        });
        
        startButton.setOrigin(0.5); // Centra el botón en su posición
        startButton.setInteractive(); // Hace que el botón sea interactivo

        // un evento de clic para el botón
        startButton.on('pointerdown', () => {
            this.scene.start('Menu');  // regresa al menu
        });


    }

    /*returnToGame() {
        
        this.scene.start('Escena1'); 
    }*/
}

export default GameOver;