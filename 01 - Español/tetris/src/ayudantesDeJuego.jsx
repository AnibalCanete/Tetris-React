
export const ESCENARIO_ANCHO = 12;
export const ESCENARIO_ALTURA = 20;

export const crearEscenario = () => Array.from(Array(ESCENARIO_ALTURA), () => Array.from(Array(ESCENARIO_ANCHO), () => [0, "limpiar"]));

export const comprobarColision = (jugador, escenario, { x: moverX, y: moverY }) => {
    // Uso de bucles (for) para poder retornar (y romper). No es posible con (forEach) - Using For Loops To Be Able To Return (and Break). Not Possible with forEach
    for (let y = 0; y < jugador.tetromino.length; y += 1) {
        for (let x = 0; x < jugador.tetromino[y].length; x += 1) {
            // 1.Compruebe que estamos en una celda Tetromino real - 1.Check That We're On An Actual Tetromino Cell
            if (jugador.tetromino[y][x] !== 0) {
                if (
                    // 2.Comprobar que nuestro movimiento esté dentro de las áreas de juego altura (y) - 2.Check That Our Move Is Inside The Game Areas Height (y)
                    // Que no pasemos por el fondo del área de juegos - That We're Not Go Through Bottom of The Play Area
                    !escenario[y + jugador.pos.y + moverY] ||
                    // 3.Comprobar que nuestro movimiento esté dentro del ancho del área de juego (x) - 3.Check That Our Move Is Inside The Game Areas Width (x)
                    !escenario[y + jugador.pos.y + moverY][x + jugador.pos.x + moverX] ||
                    // 4.Verifique que la celda a la que nos movemos no esté configurada para borrarse - 4.Check That The Cell We're Moving To isn't Set To Clear
                    escenario[y + jugador.pos.y + moverY][x + jugador.pos.x + moverX][1] !== "limpiar"
                ) { return true; }
            };
        };
    };
    // 5.Si todo lo anterior es falso - 5.If Everything Above is False
    return false;
};
