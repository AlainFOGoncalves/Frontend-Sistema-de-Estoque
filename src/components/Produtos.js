import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    codigo_barras: '',
    descricao: '',
    quantidade: '',
    categoria: ''
  });
  const [isEditing, setIsEditing] = useState(false);

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
      const data = { ...formData, quantidade: parseInt(formData.quantidade) };
      if (isEditing) {
        await axios.put(`http://localhost:3000/produtos/${formData.id}`, data);
        setIsEditing(false);
      } else {
        await axios.post('http://localhost:3000/produtos', data);
      }
      fetchProdutos();
      setFormData({ id: null, nome: '', codigo_barras: '', descricao: '', quantidade: '', categoria: '' });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setFormData(produto);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await axios.delete(`http://localhost:3000/produtos/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, nome: '', codigo_barras: '', descricao: '', quantidade: '', categoria: '' });
    setIsEditing(false);
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
          <button type="submit">
            {isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                backgroundColor: '#6c757d',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '4px',
                marginLeft: '10px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          )}
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
              <th>Ações</th>
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
                <td>
                  <button
                    onClick={() => handleEdit(produto)}
                    style={{
                      backgroundColor: '#ffc107',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      marginRight: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Produtos;