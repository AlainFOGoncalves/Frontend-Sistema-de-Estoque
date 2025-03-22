import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [formData, setFormData] = useState({
    produto_id: '',
    fornecedor_id: ''
  });

  // Carregar produtos e fornecedores ao iniciar
  useEffect(() => {
    fetchProdutos();
    fetchFornecedores();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const fetchAssociacoes = async (produtoId) => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${produtoId}/fornecedores`);
      setAssociacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar associações:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'produto_id' && e.target.value) {
      fetchAssociacoes(e.target.value); // Atualizar associações ao selecionar produto
    }
  };

  const handleAssociar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/associacao', {
        produto_id: parseInt(formData.produto_id),
        fornecedor_id: parseInt(formData.fornecedor_id)
      });
      fetchAssociacoes(formData.produto_id); // Atualizar lista
    } catch (error) {
      console.error('Erro ao associar:', error);
    }
  };

  const handleDesassociar = async (fornecedorId) => {
    try {
      await axios.delete('http://localhost:3000/associacao', {
        data: {
          produto_id: parseInt(formData.produto_id),
          fornecedor_id: fornecedorId
        }
      });
      fetchAssociacoes(formData.produto_id); // Atualizar lista
    } catch (error) {
      console.error('Erro ao desassociar:', error);
    }
  };

  return (
    <div className="container">
      <h1>Associação Produto-Fornecedor</h1>

      <div className="form-container">
        <form onSubmit={handleAssociar}>
          <select
            name="produto_id"
            value={formData.produto_id}
            onChange={handleChange}
          >
            <option value="">Selecione um Produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          <select
            name="fornecedor_id"
            value={formData.fornecedor_id}
            onChange={handleChange}
          >
            <option value="">Selecione um Fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
          <button type="submit">Associar</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Fornecedores Associados</h2>
        {formData.produto_id ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {associacoes.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.id}</td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>
                    <button
                      onClick={() => handleDesassociar(fornecedor.id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Desassociar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Selecione um produto para ver os fornecedores associados.</p>
        )}
      </div>
    </div>
  );
}

export default Associacao;