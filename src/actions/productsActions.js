// Import Axios
import clientAxios from '../config/axios';

// Import SweetAlert
import Swal from 'sweetalert2';


// Import Types
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


// DECLARE ACTIONS

// Declaracion de acciones para AGREGAR UN PRODUCTO.
const agregarProductoAction = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExitoAction = product => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: product
});

const agregarProductoErrorAction = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

// Declaracion de acciones para SOLICITAR UN PRODUCTO
const descargarProductoAction = () => ({
    type: DESCARGA_PRODUCTO,
    payload: true
});

const descargarProductoExitoAction = products => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: products
});

const descargarProductoErrorAction = error => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: error
});

// Declaracion de acciones para SOLICITAR UN PRODUCTO
const editarProductoAction = id => ({
    type: EDITAR_PRODUCTO,
    payload: id
});

const editarProductoExitoAction = product => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: product
});

const editarProductoErrorAction = error => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: error
});

// Declaracion de acciones para ELIMINAR UN PRODUCTO
const eliminarProductoAction = id => ({
    type: ELIMINAR_PRODUCTO,
    payload: id
});

const eliminarProductoExitoAction = () => ({
    type: ELIMINAR_PRODUCTO_EXITO,
});

const eliminarnProductoErrorAction = error => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: error
});

// DECLARE METHODS ACTIONS

// Method para Crear Nuevos Productos (Action Method)
export const createNewProduct = product => {

    return async (dispatch) => {
        // Ejecuatamos agrear producto para modificar el state del loading.
        dispatch( agregarProductoAction() );

        try {
            // Insertar en la Api
            await clientAxios.post('/productos', product);

            // Si todo sale bien actualizaremos es State.
            dispatch( agregarProductoExitoAction( product ) );

            // Mostrando Alert Succes
            Swal.fire(
                `${product.name}`,
                `El producto se agregó correctamente`,
                'success'
            )
        } catch (error) {
            console.error(error);
            // Si existe un error actualizaremos el State.
            dispatch( agregarProductoErrorAction( error ) );

            // Mostrando Alert Error
            Swal.fire({
                icon: 'Error',
                title: 'Error',
                text: `No se ha podido agregar el producto ${product.name}, por favor intentelo nuevamente.`
            })
        }

    }

};

// Methodo para Descargar/Solicitar Productos (Action Method)
export const getAllProducts = () => {

    return async (dispatch) => {
        dispatch(descargarProductoAction());

        try {
            const res = await clientAxios.get('/productos');
            const products = res.data;

            dispatch( descargarProductoExitoAction(products) );
            
        } catch (error) {
            console.error(error);
            dispatch( descargarProductoErrorAction(error) );
        }

    }

};

// Method para Crear Nuevos Productos (Action Method)
export const deleteProduct = id => {

    return async (dispatch) => {
        dispatch( eliminarProductoAction(id) );

        try {

            await clientAxios.delete(`/productos/${id}`);
            
            dispatch( eliminarProductoExitoAction() );

            // Si se elimna mostrar alerta.
            Swal.fire(
                `¡Producto Eliminado!`,
                `El producto ha sido eliminado.`,
                'success'
            );

        } catch (error) {
            console.error(error);
            dispatch( eliminarnProductoErrorAction() )
        }
    }

}

// Method para Editar Productos (Action Method)
export const updateProduct = product => {

    return async (dispatch) => {
        dispatch(editarProductoAction(product.id));

        try {
            const res = await clientAxios.put( `/productos/${product.id}`, product );
            const newProduct = res.data;
            console.log(newProduct)

            dispatch(editarProductoExitoAction(newProduct));    
        } catch (error) {
            console.log(error)
            dispatch( editarProductoErrorAction(error) ); 
        }
    }
}

