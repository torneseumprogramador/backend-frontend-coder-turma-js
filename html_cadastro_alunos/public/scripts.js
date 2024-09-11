window.onload = function() {
    carregarAlunos();

    document.getElementById('alunoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        salvarAluno();
    });
};

const URL_API = "http://localhost:3000";

const excluirAluno = async (id) => {
    if(confirm("Confirma?")){
        try {
            const response = await fetch(`http://localhost:3000/alunos/${id}`, {
                method: 'DELETE', // Método HTTP DELETE para exclusão
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao excluir aluno: ${response.statusText}`);
            }
    
            console.log(`Aluno com ID ${id} excluído com sucesso!`);
    
            // Recarregar a lista de alunos após a exclusão
            await carregarAlunos(); // Chama a função que carrega a lista de alunos
    
        } catch (error) {
            console.error(`Erro ao excluir aluno: ${error}`);
        }
    }
};


const carregarAlunos = async () => {
    try {
        const response = await fetch(`${URL_API}/alunos`, {
            method: 'GET', // O método HTTP a ser usado
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
        }

        const alunos = await response.json(); // Converte a resposta para JSON
        const tbody = document.getElementById("conteudoTabela");
        tbody.innerHTML = ''; // Limpa o conteúdo anterior, se houver

        // Itera sobre os dados da API e cria as linhas da tabela
        alunos.forEach(aluno => {
            tbody.innerHTML += `
                <tr>
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.telefone}</td>
                    <td>
                        <button onclick="editarAluno(${aluno.id})" class="btn btn-warning btn-sm">Alterar</button>
                        <button onclick="excluirAluno(${aluno.id})" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                </tr>
            `;
        });
       
        return alunos; // Retorna a lista de alunos
    } catch (error) {
        console.error(error); // Exibe o erro no console
    }
};


const editarAluno = async (id) => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    try {
        const response = await fetch(`${URL_API}/alunos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar aluno: ${response.statusText}`);
        }

        const aluno = await response.json();
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('alunoNome').value = aluno.nome;
        document.getElementById('alunoTelefone').value = aluno.telefone;

    } catch (error) {
        console.error(`Erro ao buscar aluno: ${error}`);
    }
};

const salvarAluno = async (aluno) => {
    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('alunoNome').value;
    const telefone = document.getElementById('alunoTelefone').value;

    const method = id ? 'PUT' : 'POST'; // PUT se for alteração, POST se for inclusão
    const endpoint = id ? `${URL_API}/alunos/${id}` : `${URL_API}/alunos`;

    const alunoData = {
        nome,
        telefone
    };

    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoData)
        });

        if (!response.ok) {
            throw new Error(`Erro ao salvar aluno: ${response.statusText}`);
        }

        console.log('Aluno salvo com sucesso!');
        document.getElementById('tabelaAlunos').scrollIntoView({
            behavior: 'smooth' // Faz o scroll ser suave
        });
        resetForm(); // Limpar o formulário
        await carregarAlunos(); // Recarregar a lista

    } catch (error) {
        console.error(`Erro ao salvar aluno: ${error}`);
    }
};



const resetForm = () => {
    document.getElementById('alunoId').value = '';
    document.getElementById('alunoNome').value = '';
    document.getElementById('alunoTelefone').value = '';
};