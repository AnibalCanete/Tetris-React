
import { EstilizadoDisplay } from "./styles/EstilizadoDisplay";

const Display = ({ juegoTerminado, texto }) => {
    return (
        <EstilizadoDisplay $juegoTerminado={juegoTerminado}>
            {texto}
        </EstilizadoDisplay>
    );
};

export default Display;
