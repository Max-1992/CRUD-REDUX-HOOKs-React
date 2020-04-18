// Native React
import React from 'react';

// React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';

// App Store
import store from './store';

// Components
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import NewProduct from './components/NewProduct/NewProduct';
import EditProduct from './components/EditProduct/EditProduct';


function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <Header />

            <div className="container">
              <Switch>
                  <Route exact path="/" component={Products} />
                  <Route exact path="/productos/nuevo" component={NewProduct} />
                  <Route exact path="/productos/editar/:id" component={EditProduct} />
              </Switch>
            </div>
        </Provider>
    </BrowserRouter>

  );
}

export default App;
