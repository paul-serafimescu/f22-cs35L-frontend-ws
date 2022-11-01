import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import Orders from './components/Orders';

import apiWrapper from './server';

function App() {
  const [orders, setOrders] = useState([]);

  // the empty dependency list is important!
  // if we don 't include it, we enter an infinite loop,
  //since useEffect callback is called every time the component reloads (i.e. state changes)
  useEffect(() => {
    async function getOrders() {
      const originalOrders = await apiWrapper.get("/pizza");
      setOrders(originalOrders);
    }

    getOrders();
  }, []);


  return (
    <div className="App">
      <Header />
      <Form offerPremium setOrders={setOrders} />
      <Orders orders={orders} />
    </div>
  );
}

export default App;
