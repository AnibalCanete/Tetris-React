
import { useEffect, useRef } from "react";

export function useInterval(llamado, demora) {
    const guardarLlamado = useRef();
    // Recordamos la Ultima llamada - Remember The Latest Callback
    useEffect(() =>{
        guardarLlamado.current = llamado;
    }, [llamado]);

    // Configurar el Intervalo - Set Up The Interval
    useEffect(() => {
        function tick() {
            guardarLlamado.current();
        }

        if (demora !== null) {
            const id = setInterval(tick, demora);
            return () => clearInterval(id);
        }
    }, [demora]);
};
