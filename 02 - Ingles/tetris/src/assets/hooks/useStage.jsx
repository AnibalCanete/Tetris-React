
import { useEffect, useState } from "react";
import { createStage } from "../../gameHelpers";

export const useStage = (player, resetPlayer, gameOver) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        if (gameOver) return;
        
        setRowsCleared(0);
        const sweepRows = newStage => newStage.reduce((ack, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                setRowsCleared(prev => prev + 1);
                ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);

        const updateStage = prevStage => {
            // First Flush The Stage
            const newStage = prevStage.map(row => row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell )));

            // Then Draw The Tetromino
            player.tetromino.forEach((row, y) => { row.forEach((value, x) => {
                if (value !== 0) {
                    const posY = y + player.pos.y;
                    const posX = x + player.pos.x;
                    if (posY >= 0 && posY < newStage.length && posX >= 0 && posX < newStage[0].length) {
                        newStage[posY][posX] = [value, player.collided ? "merged" : "clear",];
                    }
                }
            })});

            // Then Check If We Got Some Score If Collided
            if (player.collided) {
                if (!gameOver) {
                    resetPlayer();
                }
                return sweepRows(newStage);
            }
            return newStage;
        };

        // Here Are The Updates
        setStage(prev => updateStage(prev));

    }, [player, resetPlayer, gameOver]);

    return [stage, setStage, rowsCleared];
};
