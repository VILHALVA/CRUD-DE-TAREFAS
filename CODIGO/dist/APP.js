"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let listaDeTarefas = [];
function carregarTarefas() {
    try {
        const data = fs.readFileSync('TAREFAS.json', 'utf8');
        listaDeTarefas = JSON.parse(data);
        console.log('Tarefas carregadas com sucesso!');
    }
    catch (err) {
        console.error('Erro ao carregar as tarefas:', err);
    }
}
function salvarTarefas() {
    try {
        const data = JSON.stringify(listaDeTarefas, null, 2);
        fs.writeFileSync('TAREFAS.json', data);
        console.log('Tarefas salvas com sucesso!');
    }
    catch (err) {
        console.error('Erro ao salvar as tarefas:', err);
    }
}
function exibirMenu() {
    console.log('\n=== MENU ===');
    console.log('1. Exibir lista de tarefas');
    console.log('2. Adicionar nova tarefa');
    console.log('3. Marcar tarefa como concluída');
    console.log('4. Remover tarefa');
    console.log('5. Sair');
}
function exibirListaDeTarefas() {
    console.log('\n=== LISTA DE TAREFAS ===');
    listaDeTarefas.forEach((tarefa, index) => {
        console.log(`${index + 1}. [${tarefa.concluida ? 'X' : ' '}] ${tarefa.descricao}`);
    });
}
function adicionarTarefa(descricao) {
    listaDeTarefas.push({ descricao, concluida: false });
    console.log('Tarefa adicionada com sucesso!');
}
function marcarTarefaComoConcluida(indice) {
    if (indice >= 0 && indice < listaDeTarefas.length) {
        listaDeTarefas[indice].concluida = true;
        console.log('Tarefa marcada como concluída!');
    }
    else {
        console.log('Índice de tarefa inválido!');
    }
}
function removerTarefa(indice) {
    if (indice >= 0 && indice < listaDeTarefas.length) {
        listaDeTarefas.splice(indice, 1);
        console.log('Tarefa removida com sucesso!');
    }
    else {
        console.log('Índice de tarefa inválido!');
    }
}
function main() {
    carregarTarefas();
    exibirMenu();
    rl.question('Escolha uma opção: \n>>>', (opcao) => {
        switch (parseInt(opcao)) {
            case 1:
                exibirListaDeTarefas();
                break;
            case 2:
                rl.question('Digite a descrição da nova tarefa:\n>>>', (descricao) => {
                    adicionarTarefa(descricao);
                    salvarTarefas();
                    main();
                });
                break;
            case 3:
                rl.question('Digite o índice da tarefa a ser concluída:\n>>>', (indiceConcluir) => {
                    marcarTarefaComoConcluida(parseInt(indiceConcluir) - 1);
                    salvarTarefas();
                    main();
                });
                break;
            case 4:
                rl.question('Digite o índice da tarefa a ser removida:\n>>>', (indiceRemover) => {
                    removerTarefa(parseInt(indiceRemover) - 1);
                    salvarTarefas();
                    main();
                });
                break;
            case 5:
                console.log('Saindo do aplicativo...');
                rl.close();
                break;
            default:
                console.log('Opção inválida!');
                main();
        }
    });
}
main();
