import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Usuario from './components/Usuario';
import Saudacao from './components/Saudacao';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null); // novo estado

  const buscarUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const adicionarOuAtualizarUsuario = async () => {
    if (nome.trim() === '' || email.trim() === '') return;

    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/usuarios/${editandoId}`, {
          nome,
          email
        });
      } else {
        await axios.post('http://localhost:5000/usuarios', {
          nome,
          email
        });
      }

      buscarUsuarios();
      setNome('');
      setEmail('');
      setEditandoId(null);

    } catch (error) {
      console.error('Erro ao salvar usuário: ', error);
    }
  };

  const excluirUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      buscarUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const prepararEdicao = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div>
      <Saudacao/> 👥
      <h1>"Lista de Usuários"</h1>
      <ul>
        {usuarios.map((usuario) => (
          <Usuario
            key={usuario.id}
            nome={usuario.nome}
            descricao={usuario.email}
            onEditar={() => prepararEdicao(usuario)}
            onExcluir={() => excluirUsuario(usuario.id)}
          />
        ))}
        
      </ul>

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button onClick={adicionarOuAtualizarUsuario}>
        {editandoId ? 'Atualizar' : 'Adicionar'}
      </button>
    </div>
  );
}

export default App;
