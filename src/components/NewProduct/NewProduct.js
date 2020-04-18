import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions Redux
import * as action from '../../actions';


// Components
import Loading from '../Loading/Loading';

const NewProduct = ({history}) => {

   // Local State
   const initialState = {
       name: '',
       price: Number(0)
   };
   const [ product, setProduct ] = useState(initialState);

   // Destructurin Local State
   const { name, price } = product;

   // Use Dispatch
   const dispatch = useDispatch();

   // Acceder al State del Store
   const loading = useSelector( state => state.products.loading );
   const error = useSelector( state => state.products.error );
   const alert = useSelector( state => state.alert.alerta );

   // Create method for new Product
   const addProduct = product => dispatch( action.createNewProduct(product) );
   const showAlert = alert => dispatch( action.mostrarAlerta(alert) );
   const hiddeAlert = () => dispatch( action.ocultarAlerta() );

   // HandleChange
   const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
   }

   // HndleSubmite
   const handleSubmit = e => {
        e.preventDefault();

        // Validar formulario
        if( name.trim() === '' || price <= 0 ) {

            const alert = {
                message: 'Todos los campos son obligatorios',
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            showAlert(alert);

            return;
        }

        // Si no hay Errores
        hiddeAlert();

        // Crear el nuevo producto
        addProduct(product);

        // Redireccionar al componente principal
        history.push('/');
        
   }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Nombre del Producto"
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
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                
                                { loading ? <Loading /> : null }
                                { alert ? <p className={alert.class}> { alert.message } </p> : null }
                                
                                <input 
                                    type="submit"
                                    className="btn btn-primary font-weight-bold btn-block text-uppercase"
                                    value="Agregar"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;