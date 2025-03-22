import React, { useState } from 'react';
import Fornecedores from './components/Fornecedores';
import Produtos from './components/Produtos';

function App() {
  const [pagina, setPagina] = useState('fornecedores');

  return (
    <div>
      <nav style={{ backgroundColor: '#007bff', padding: '10px', textAlign: 'center' }}>
        <button
          onClick={() => setPagina('fornecedores')}
          style={{
            margin: '0 10px',
            padding: '8px 16px',
            backgroundColor: pagina === 'fornecedores' ? '#0056b3' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Fornecedores
        </button>
        <button
          onClick={() => setPagina('produtos')}
          style={{
            margin: '0 10px',
            padding: '8px 16px',
            backgroundColor: pagina === 'produtos' ? '#0056b3' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Produtos
        </button>
      </nav>
      {pagina === 'fornecedores' ? <Fornecedores /> : <Produtos />}
    </div>
  );
}

export default App;