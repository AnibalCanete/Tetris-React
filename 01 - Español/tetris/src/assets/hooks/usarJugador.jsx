
import { useCallback, useState } from "react";
import { aleatorioTetromino, TETROMINOS } from "../../tetrominos";
import { comprobarColision, ESCENARIO_ANCHO } from "../../ayudantesDeJuego";

export const usePlayer = () => {
    const [jugador, setJugador] = useState({ pos: { x: 0, y: 0 }, tetromino: TETROMINOS[0].forma, colision: false, });

    function rotar(matrix, dir) {
        // Transponer las filas para que se conviertan en columnas - Make The Rows To Become Cols (transpose)
        const mtrx = matrix.map((_, indice) => matrix.map(columna => columna[indice]));
        // Invierta cada fila para obtener una matriz rotada - Reverse Each Row To Get a Rotated Matrix
        if (dir > 0) return mtrx.map(fila => fila.reverse());
        return mtrx.reverse();
    };

    function rotarJugador(escenario, dir) {
        const clonarJugador = { ...jugador, tetromino: jugador.tetromino.map(fila => [ ...fila ])};
        clonarJugador.tetromino = rotar(clonarJugador.tetromino, dir);
        
        const pos = clonarJugador.pos.x;
        let compensar = 1;
        while (comprobarColision(clonarJugador, escenario, { x: 0, y: 0 })) {
            clonarJugador.pos.x += compensar;
            compensar = -(compensar + (compensar > 0 ? 1 : -1));
            if (compensar > clonarJugador.tetromino[0].length) {
                rotar(clonarJugador.tetromino, dir);
                clonarJugador.pos.x = pos;
                return;
            };
        };
        setJugador(clonarJugador);
    };

    const actualizarJugadorPos = ({ x, y, colision }) => {
        setJugador(anterior => ({ ...anterior, pos: { x: (anterior.pos.x + x), y: (anterior.pos.y + y) }, colision, }));
    };

    const reiniciarJugador = useCallback(() => {
        setJugador({ pos: { x: ESCENARIO_ANCHO / 2 - 2, y: 0 }, tetromino: aleatorioTetromino().forma, colision: false, });
    }, []);

    return [jugador, actualizarJugadorPos, reiniciarJugador, rotarJugador];
    
};
