
import { useEffect, useState } from "react";
import { crearEscenario } from "../../ayudantesDeJuego";

export const useStage = (jugador, reiniciarJugador, juegoTerminado) => {
    const [escenario, setEscenario] = useState(crearEscenario());
    const [filasDespejadas, setFilasDespejadas] = useState(0);

    useEffect(() => {
        if (juegoTerminado) return;
        setFilasDespejadas(0);
        const barrerFilas = nuevoEscenario => nuevoEscenario.reduce((ack, fila) => {
            if (fila.findIndex(celda => celda[0] === 0) === -1) {
                setFilasDespejadas(anterior => anterior + 1);
                ack.unshift(new Array(nuevoEscenario[0].length).fill([0, "limpiar"]));
                return ack;
            }
            ack.push(fila);
            return ack;
        }, []);

        const actualizarEscenario = anteriorEscenario => {
            // Primer Lavado del Escenario - First Flush The Stage
            const nuevoEscenario = anteriorEscenario.map(fila => fila.map(celda => (celda[1] === "limpiar" ? [0, "limpiar"] : celda )));

            // Dibujar El Tetromino - Then Draw The Tetromino
            jugador.tetromino.forEach((fila, y) => { fila.forEach((valor, x) => {
                if (valor !== 0) {
                    const posY = y + jugador.pos.y;
                    const posX = x + jugador.pos.x;
                    if (posY >= 0 && posY < nuevoEscenario.length && posX >= 0 && posX < nuevoEscenario[0].length) {
                        nuevoEscenario[posY][posX] = [valor, jugador.colision ? "fusionado" : "limpiar", ];
                    }
                }
            })});

            // Entonces Comprobamos si Obtuvimos Alguna Puntuación si Chocamos - Then Check If We Got Some Score If Collided
            if (jugador.colision) {
                if (!juegoTerminado) {
                    reiniciarJugador();
                }
                return barrerFilas(nuevoEscenario);
            }
            return nuevoEscenario;
        };

        // Aque están las Actualizaciones - Here Are The Updates
        setEscenario(anterior => actualizarEscenario(anterior));

    }, [jugador, reiniciarJugador, juegoTerminado]);

    return [escenario, setEscenario, filasDespejadas];
    
};
