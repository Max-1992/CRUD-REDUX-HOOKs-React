// Types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR
} from '../types/product';


// Cada Reducer posee su propieo State
const initialState = {
    products: [],
    error: {
        err: false,
        message: ''
    },
    loading: false,
    productDelete: null,
    productEdit: null
}

// Reducer
const productsReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case AGREGAR_PRODUCTO:       
            return {
                ...state,
                loading: action.payload
            }

        case AGREGAR_PRODUCTO_EXITO:       
            return {
                ...state,
                loading: false,
                products: [
                    ...state.products, action.payload
                ],
                error: {
                    err: false,
                    message: ''
                }
            }

        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    err: true,
                    message: action.payload.message
                }
            }

        case DESCARGA_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }

        case DESCARGA_PRODUCTO_EXITO:       
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: {
                    err: false,
                    message: ''
                }
            }

        case DESCARGA_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    err: true,
                    message: action.payload.message
                }
            }

        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                productDelete: action.payload
            }

        case ELIMINAR_PRODUCTO_EXITO:
                return {
                    ...state,
                    products: state.products.filter( product => product.id !== state.productDelete ),
                    productDelete: null,
                    error: {
                        err: false,
                        message: ''
                    }
                }

        case ELIMINAR_PRODUCTO_ERROR:
                return {
                    ...state,
                    error: {
                        err: true,
                        message: action.payload.message
                    }
                }

        case EDITAR_PRODUCTO:
                return {
                   ...state,
                   productEdit: action.payload
                }

        case EDITAR_PRODUCTO_EXITO:
                return {
                    ...state,
                    products: state.products.map( product => {

                        if( product.id == state.productEdit ) {
                            return product = action.payload;
                        } else {
                            return product;
                        }
                       
                    }),
                    error: {
                        err: false,
                        message: ''
                    },
                    productEdit: null
                }

        case EDITAR_PRODUCTO_ERROR:
                return {
                    ...state,
                    error: {
                        err: true,
                        message: action.payload.message
                    }
                }

        default:
            return state;
    }

}

export default productsReducer;