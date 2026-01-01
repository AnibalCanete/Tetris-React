
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array.from(Array(STAGE_WIDTH), () => [0, "clear"]));

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    // Using For Loops To Be Able To Return (and Break). Not Possible with forEach
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1.Check That We're On An Actual Tetromino Cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    // 2.Check That Our Move Is Inside The Game Areas Height (y)
                    // That We're Not Go Through Bottom of The Play Area
                    !stage[y + player.pos.y + moveY] ||
                    // 3.Check That Our Move Is Inside The Game Areas Width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4.Check That The Cell We're Moving To isn't Set To Clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
                ) { return true; };
            };
        };
    };
    // 5.If Everything Above is False
    return false;
};
