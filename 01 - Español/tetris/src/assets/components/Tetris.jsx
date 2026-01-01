
import { useState } from "react";
import { comprobarColision, crearEscenario } from "../../ayudantesDeJuego";
import { EstilizadoTetris, EstilizadoTetrisEnvoltura } from "./styles/EstilizadoTetris";

// Ganchos Personalizados - Custom Hooks
import { useInterval } from "../hooks/usarIntervalo";
import { usePlayer } from "../hooks/usarJugador";
import { useStage } from "../hooks/usarEscenario";
import { useGameStatus } from "../hooks/usarEstadoDeJuego";

// Componentes - Components
import Escenario from "./Escenario";
import Display from "./Display";
import BotonInicio from "./BotonInicio";

const Tetris = () => {
    const [tiempoDeCaida, setTiempoDeCaida] = useState(null);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [jugador, actualizarJugadorPos, reiniciarJugador, rotarJugador] = usePlayer();
    const [escenario, setEscenario, filasDespejadas] = useStage(jugador, reiniciarJugador, juegoTerminado);
    const [puntaje, setPuntaje, filas, setFilas, nivel, setNivel] = useGameStatus(filasDespejadas);

    console.log("Re-render");

    const moverJugador = dir => {
        if (!comprobarColision(jugador, escenario, { x: dir, y: 0 })) {
            actualizarJugadorPos({ x: dir, y: 0 });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!juegoTerminado) {
            // Activar el Intervalo Nuevamente Cuando el Usuario Suelte la Flecha hacia abajo - Activate The Interval Again When User Releases Down Arrow
            if (keyCode === 40) {
                setTiempoDeCaida(1000 / (nivel + 1));
            }
        }
    };

    const iniciarJuego = () => {
        // Reiniciar Todo - Reset Everything
        setEscenario(crearEscenario());
        setTiempoDeCaida(1000);
        reiniciarJugador();
        setPuntaje(0);
        setNivel(0);
        setFilas(0);
        setJuegoTerminado(false);
    };

    const caida = () => {
        if (juegoTerminado) return;

        // Aumenta El Nivel Cuando El Jugador Ha Despejado 10 Filas - Increase Level When Player Has Cleared 10 rows
        if (filas > (nivel + 1) * 10) {
            setNivel(anterior => anterior + 1);
            // También Aumenta la Velocidad - Also Increase Speed
            setTiempoDeCaida(1000 / (nivel + 1) + 200);
        }

        if (!comprobarColision(jugador, escenario, { x: 0, y: 1 })) {
            actualizarJugadorPos({ x: 0, y: 1, colision: false });
        } else {
            // Fin del Juego - Game Over
            if (jugador.pos.y < 1) {
                console.log("¡Juego Terminado!");
                setJuegoTerminado(true);
                setTiempoDeCaida(null);
            }
            actualizarJugadorPos({ x: 0, y: 0, colision: true });
        }
    };

    const caidaJugador = () => {
        /**  
         * No Necesitamos ejecutar el Intervalo al usar la flecha hacia abajo para mover el tetromino hacia abajo. Asi que desactivalo por ahora. 
         * We Don't Need To Run The Interval When We Use The Arrow Down To Move The Tetromino Downwards. So deactivate it For Now.
        */ 
        if (!comprobarColision(jugador, escenario, { x: 0, y: 1 })) {
            actualizarJugadorPos({ x: 0, y: 1, colision: false });
        }
    };

    // Este Empieza El Juego - This One Starts The Game
    useInterval(() => {
        caida();
    }, [tiempoDeCaida]);

    const mover = ({ keyCode }) => {
        if (!juegoTerminado) {
            if (keyCode === 37) {
                moverJugador(-1);
            } else if (keyCode === 39) {
                moverJugador(1);
            } else if (keyCode === 40) {
                caidaJugador();
            } else if (keyCode === 38) {
                rotarJugador(escenario, 1);
            }
        }
    };

    return (
        <EstilizadoTetrisEnvoltura role="button" tabIndex="0" onKeyDown={e => mover(e)} onKeyUp={keyUp}>
            <EstilizadoTetris>
                <Escenario escenario={escenario} />
                <aside>
                    {juegoTerminado ? (<Display juegoTerminado={juegoTerminado} texto="Juego Terminado" />) : (
                        <div>
                            <Display texto={`Puntaje: ${puntaje}`} />
                            <Display texto={`Filas: ${filas}`} />
                            <Display texto={`Nivel: ${nivel}`} />
                        </div>
                    )}
                    <BotonInicio llamada={iniciarJuego} />
                </aside>
            </EstilizadoTetris>
        </EstilizadoTetrisEnvoltura>
    );
};

export default Tetris;
