
import './App.css'
import React, { useState } from 'react';
import Tarefa from './components/Tarefa';
import Titulo from './components/Titulo';

function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, nome: 'Estudar React' },
    { id: 2, nome: 'Fazer exercícios' },
    { id: 3, nome: 'Ler um livro' },
  ]);

  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    const nova = { id: tarefas.length + 1, nome: novaTarefa };
    setTarefas([...tarefas, nova]);
    alert(`Tarefa "${nova.nome}" adicionada com sucesso!!!`);
    setNovaTarefa('');
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas 📝</h1>
      <Titulo texto="Lista de Tarefas" />
      <ul>
        {tarefas.map((tarefa) => (
          <Tarefa key={tarefa.id} nome={tarefa.nome} />
        ))}
      </ul>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
    </div>
  );
}

export default App;


