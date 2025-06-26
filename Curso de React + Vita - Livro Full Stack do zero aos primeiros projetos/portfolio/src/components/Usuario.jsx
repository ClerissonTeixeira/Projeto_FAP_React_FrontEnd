function Usuario({ nome, descricao, onEditar, onExcluir }) {
  return (
    <li>
      <span><strong>{nome}</strong> - {descricao}</span>
      <button onClick={onEditar}>Editar</button>
      <button onClick={onExcluir}>Excluir</button>
    </li>
  );
}

export default Usuario;

