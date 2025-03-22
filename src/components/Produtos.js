import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    codigo_barras: '',
    descricao: '',
    quantidade: '',
    categoria: ''
  });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', {
        ...formData,
        quantidade: parseInt(formData.quantidade) // Converter para número
      });
      fetchProdutos();
      setFormData({ nome: '', codigo_barras: '', descricao: '', quantidade: '', categoria: '' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gerenciar Produtos</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome do Produto"
          />
          <input
            type="text"
            name="codigo_barras"
            value={formData.codigo_barras}
            onChange={handleChange}
            placeholder="Código de Barras"
          />
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição"
          />
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            placeholder="Quantidade"
          />
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Categoria"
          />
          <button type="submit">Cadastrar Produto</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Produtos Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Código de Barras</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.codigo_barras}</td>
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Produtos;
