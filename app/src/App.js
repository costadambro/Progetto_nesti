import Login from '../../app/src/pages/Login.js';
import Signin from '../../app/src/pages/Signin.js';
import { useState } from 'react';

function App() {
  
  const [pagina, setPagina] = useState(true);

  return (
    <div className="App">
    {
      pagina ?
      <Login setPagina={setPagina}></Login>
      :
      <Signin setPagina={setPagina}></Signin>
    }
    </div>
  );
}

export default App;