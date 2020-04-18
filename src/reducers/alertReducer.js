import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types/alert';

// Declare State
const initialState = {
    alerta: null
};


// Reducer
const alertReducer = ( state = initialState, action ) => { 

    switch (action.type) {
        case MOSTRAR_ALERTA:
            
            return {
                ...state,
                alerta: action.payload
            };

        case OCULTAR_ALERTA:
            
            return {
                ...state,
                alerta: null
            };
    
        default:
            return state;
    }

}

export default alertReducer;