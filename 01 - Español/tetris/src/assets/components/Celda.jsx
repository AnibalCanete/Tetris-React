
import React from "react";
import { EstilizadoCelda } from "./styles/EstilizadoCelda";
import { TETROMINOS } from "../../tetrominos";

// (memo) garantiza que solo volvamos a renderizar las celdas modificadas - (memo) makes sure we only re-render the changed cells
const Celda = ({ type }) => {
    return (
        <EstilizadoCelda type={type} color={TETROMINOS[type].color}>
            {console.log("rerender cell")}
        </EstilizadoCelda>
    );
};

export default React.memo(Celda);
