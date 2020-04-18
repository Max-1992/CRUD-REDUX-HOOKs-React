import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux Actions
import * as action from '../../actions';

// Import Axios
import clientAxios from '../../config/axios';

const EditProduct = (props) => {

    // Create State
    const initialState = {
        name: '',
        price: ''
    };
    const [ product, setProduct ] = useState(initialState);

    // Acces State Value
    const { name, price } = product;

    // useEffect
    useEffect(() => {

        const { id } = props.match.params;
        console.log(id);

        getProduct(id);

      
    }, []);

    // UseHistori
    const history = useHistory();

    // Create Dispatch
    const dispatch = useDispatch();

    // Create MethodAction
    const updateProduct = product => dispatch( action.updateProduct(product) );


    // Get data Product
    const getProduct = async id => {
        try {
            const products = await clientAxios.get(`/productos`);
            const product = products.data.filter( product => product.id == id );

            setProduct({
                ...product[0]
            });

        } catch (error) {
            console.error(error);
        }
     
    }

    // HandleChange
    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    // HandleSubmite
    const handleSubmite = e => { 
        e.preventDefault();

        // Validar formulario
        if( name.trim() === '' || price <= 0 ) {
            return;
        }

        // Update Product
        updateProduct(product);

        // Redirect to HOME
        history.push('/');


    }

    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Editar Producto
                    </h2>

                    <form
                        onSubmit={handleSubmite}
                    >
                        <div className="form-group">
                            <label>Nombre Producto</label>
                            <input 
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Nombre del Producto"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Precio Producto</label>
                            <input 
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="Precio del Producto"
                                value={price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btn btn-primary font-weight-bold btn-block text-uppercase"
                                value="Actualizar"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default EditProduct;