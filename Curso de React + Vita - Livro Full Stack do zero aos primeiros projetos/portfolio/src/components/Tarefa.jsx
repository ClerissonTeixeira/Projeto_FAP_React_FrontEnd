function Tarefa({nome, onConcluir}) {
    return(
        <li>
            {nome}
            <button onClick={onConcluir}>Concluir</button>
        </li>
    );
    
}

export default Tarefa;