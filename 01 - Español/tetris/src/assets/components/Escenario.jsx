
import { EstilizadoEscenario } from "./styles/EstilizadoEscenario";
import Celda from "./Celda";

const Escenario = ({ escenario }) => {
    return (
        <EstilizadoEscenario width={escenario[0].length} height={escenario.length}>
            {escenario.map(fila => fila.map((celda, x) => <Celda key={x} type={celda[0]} />))}
        </EstilizadoEscenario>
    );
};

export default Escenario;
