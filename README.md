# React19 - Novidades e atualizações!
- O React 19, ainda em versão beta e lançado em 25 de abril de 2024, traz diversas novidades e melhorias que visam aprimorar a experiência de desenvolvimento e o desempenho das aplicações.

## Atualizações
### React Compiler
 - Automatiza o processo de renderização, atualizando apenas as partes necessárias da interface. Além de eliminar a necessidade de memorização manual usando useCallback e useMemo.
 - Atualmente, o Compiler já está sendo utilizado pelo Instagram.
 - Não é necessária nenhuma alteração no código para utilizá-lo, pois ele já é integrado ao React 19.
### Server Components
 - Permite renderizar componentes no lado do servidor, ao invés de no lado do cliente como é tradicionalmente.
 - Isso traz muitas vantagens, como:
   - melhor SEO com conteúdo indexável por mecanismo de busca
   - desempenho aprimorado com tempo inicial de carregamento reduzido
   - menor consumo de recursos do navegador
   - reutilazação de lógica de renderização, tornando o código mais limpo e organizado.
- Como utilizar:
Criar um componente que retorne JSX e o marcar como assíncrono. Por exemplo:
``` JSX
import db from './db';

export default async function Note({ id }) {
  const note = await db.notes.get(id);
  return <div>{note.text}</div>;
}
```
Para usar um Server Component em outro componente, pode-se importá-lo diretamente. Por exemplo:
   
``` JSX
import Note from './Note';

function NotePage({ id }) {
  return <Note id={id} />;
}
```
### Server Actions
- Permitem componentes do lado Cliente chamar funções assíncronas executadas no servidor
- Ao definir uma ação do servidor com a diretiva "use server", é automaticamente criada uma referência para o Client Component
- Ao chamar a função no lado do cliente, é enviada uma requisição para o servidor para executar a função e retornar o resultado.

### Form Actions
- Com o React 19, a submissão de formulários não dependerá mais do evento onSubmit. É possível passar funções para lidar com a submissão do formulário utilizando a propriedade `action`.
- Essa função pode ser assíncrona e pode ser executada no servidor, tornando a criação de formulários mais eficientes e organizados.

```jsx
<form action={actionFunction}>
```
### Novos hooks 
- ### useActionState
  - Permite atualizar o estado baseado no resultado de uma ação de formulário
  - Fornece acesso ao estado pendente da ação, permitindo que o componente renderize conteúdo de carregamento enquanto a ação está em execução.
```JSX
const [state, formAction] = useActionState(fn, initialState, permalink?);
```
**Parâmetros:**
  - fn: função a ser chamada ao submeter o formulário ou pressionar o botão
  - initialState: valor inicial do estado
  - permalink (opcional): uma string que contém a URL que o formulário modifica
**Retornos:**
Retorna um 'array' com dois valores:
  - o estado atual (o estado inicial ou o valor retornado pela ação)
  - uma nova ação passada como propriedade `action` para o formulário ou a propriedade `formAction` para um botão
**Exemplo:**
