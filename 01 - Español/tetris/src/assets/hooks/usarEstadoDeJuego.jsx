
import { useCallback, useEffect, useState } from "react";

export const useGameStatus = filasDespejadas => {
    const [puntaje, setPuntaje] = useState(0);
    const [filas, setFilas] = useState(0);
    const [nivel, setNivel] = useState(0);

    const lineasDePuntos = [40, 100, 300, 1200];

    const calcularPuntaje = useCallback(() => {
        // Tenemos el Puntaje - We Have Score
        if (filasDespejadas > 0) {
            // Asi se Calcula La Puntación del Tetris - This Is How Original Tetris Score Is Calculated
            setPuntaje(anterior => anterior + lineasDePuntos[filasDespejadas - 1] * (nivel + 1));
            setFilas(anterior => anterior + filasDespejadas);
        }
    }, [nivel, lineasDePuntos, filasDespejadas]);

    useEffect(() => {
        calcularPuntaje();
    }, [calcularPuntaje, filasDespejadas, puntaje]);

    return [puntaje, setPuntaje, filas, setFilas, nivel, setNivel];
};
