import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types/alert';

// Create Actions
const mostrarAlertaAction = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

const ocultarAlertaAction = () => ({
    type: OCULTAR_ALERTA,
});

// Method Action
export const mostrarAlerta = alerta => {
    return (dispatch) => {
        dispatch( mostrarAlertaAction(alerta) );
    }
};

export const ocultarAlerta = () => {
    return (dispatch) => {
        dispatch( ocultarAlertaAction() );
    }
};