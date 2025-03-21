import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contato: ''
  });

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/fornecedores', formData);
      fetchFornecedores();
      setFormData({ nome: '', cnpj: '', endereco: '', telefone: '', email: '', contato: '' });
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gerenciar Fornecedores</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da Empresa"
          />
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="CNPJ (00.000.000/0000-00)"
          />
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço"
          />
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone ((00) 0000-0000)"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <input
            type="text"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            placeholder="Contato Principal"
          />
          <button type="submit">Cadastrar Fornecedor</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Fornecedores Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Contato</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.id}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.contato}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fornecedores;