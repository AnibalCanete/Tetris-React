
import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../../tetrominos";

// memo Makes Sure We Only Re-Render The Changed Cells
const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color}>
        {console.log("rerender cell")}
    </StyledCell>
);

export default React.memo(Cell);
