import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Import Actions
import * as action from '../../actions';

// SweetAlert
import Swal from 'sweetalert2';


const Product = ({ product }) => {

    // Destructuring
    const { name, price, id } = product;

    // Habilitar History para redireccion
    const history = useHistory();

    // Use Dispatch
    const dispatch = useDispatch();

    // Action Method.
    const deleteProduct = id => dispatch( action.deleteProduct(id) );

    // Handle Event
    const handleDeleteButton = id => {

        // Pedir configuramación al usuario
        Swal.fire({
            title: `Deseas eliminar el producto ${name}`,
            text: "Una vez eliminado no podras volver atras!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Elimnar Producto!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // Ejectuar el action
                deleteProduct(id);
            }
          })

        
    }

    // Funcion para redicreccionar a la pagina de edit
    const redirectEdit = id => {
        history.push(`/productos/editar/${product.id}`)
    }

    return ( 
        <tr>
            <td >{ name } </td>
            <td>$ { price } </td>
            <td className="acciones">
                <button 
                    className="btn btn-primary mr-2" 
                    onClick={() => redirectEdit(product)}
                >
                    Editar
                </button>
                <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteButton(id) }
                >
                    Borrar
                </button>
            </td>
        </tr>
     );
}
 
export default Product;