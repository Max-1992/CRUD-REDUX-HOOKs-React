import React, { Fragment, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Import Actions
import * as action from '../../actions';

// Import Components
import Product from '../Product/Product';
import Loading from '../Loading/Loading';


const Products = () => {

    // Declare UseEffect
    useEffect( () => {

        getAllProducts();

    }, [] );

    // Use Dispatch
    const dispatch = useDispatch();

    // Acceder al State del Store
    const loading = useSelector( state => state.products.loading );
    const products = useSelector( state => state.products.products );
    const error = useSelector( state => state.products.error );

    const getAllProducts = () => dispatch( action.getAllProducts() );
    

    return ( 
        <Fragment>
            <h2 className="text-center mb-4"> Listado de Productos </h2>

            { error.err ? <p className="font-weight-bold alert alert-danger text-center mt-4"> Hubo un Error </p> : null }

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                   { products.legnth === 0 ? 'No hay productos' : (

                        products.map( product =>  <Product key={product.id} product={product} /> )

                   )}

                </tbody>
            </table>

            { loading ? <Loading /> : null }

        </Fragment>
     );
}
 
export default Products;