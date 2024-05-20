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

### Meta tags
- Suporte nativo para meta tags dentro dos componentes React. Facilitando o gerenciamento de títulos, descrições e outras informações de grande importância para o SEO e para a acessibilidade
**Exemplo:**
```JSX
import MessageOptimistic from "./components/MessageOptimistic";

function App() {
  return (
    <div className="App">

      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />

      <title>React 19</title>
      
     <MessageOptimistic></MessageOptimistic>
        
      
    </div>
  );
}

export default App;
```
### Assets Loading
- Carregamento de assets (estilos, fontes, scripts, etc) em segundo plano, fazendo com que a página seja exibida mais rapidamente.
- Integração do Suspense com o ciclo de vida de carregamento de assets, permitindo determinar quando o conteúdo está pronto para ser exibido, garantindo que não apareça conteúdo incompleto e não formatado.
- Novas APIs de carregamento de recursos, como preload e preinit, que permitem um melhor controle sobre o carregamento e inicialização de recursos

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
  - Como utilizar: 
```JSX
const [state, formAction] = useActionState(fn, initialState, permalink?);
```
  - **Parâmetros:**
  
     - fn: função a ser chamada ao submeter o formulário ou pressionar o botão
     - initialState: valor inicial do estado
     - permalink (opcional): uma string que contém a URL que o formulário modifica
         
 - **Retornos:**
  
   Retorna um 'array' com dois valores:

      - o estado atual (o estado inicial ou o valor retornado pela ação)
      - uma nova ação passada como propriedade `action` para o formulário ou a propriedade `formAction` para um botão
   
**Exemplo:**
```JSX
import { useActionState } from 'react';

const Form = () => {

    const handleAction = async(prevState, formData) => {

        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const name = formData.get("name");
        const email = formData.get("email");

        if(name && email){
            return{
                success: true,
                text: "Usuário criado"
            }
        }else{
            return{
                success: false,
                text: "Erro ao criar usuário"
            }
        }


    }

    const [message, formAction] = useActionState(handleAction, null)


  return (
    <div>
        <form action={formAction}>
            <label htmlFor="name">Nome: </label>
            <input type="text" name='name'/>

            <label htmlFor="email">Email: </label>
            <input type="email" name='email'/>

           <button type='submit'>Enviar</button>

            {message && <h4>{message.text}</h4>}
        </form>

      
    </div>
  )
}

export default Form
```
Nesse exemplo, o useActionState é utilizado para gerenciar o estado da ação de envio de formulário e fornecer um feedback sobre o resultado.
- ### useFormStatus
   - Fornece informações de status da submissão do formulário, podendo melhorar a experiência do usuário, simplificar o código e facilitar a depuração.
   - Como utilizar:
```JSX
const { pending, data, method, action } = useFormStatus();
```
   - **Retorno:**
     
      Retorna um objeto com as seguintes propriedades:
   
        - pending: um boolean, do qual valor como 'true' significa que a submissão do formulário está pendente, e caso 'false' não está pendente
        - data: um objeto que implementa a interface que contém os dados que o formulário está enviando
        - method: um valor string 'get' ou 'post'. Representa o método HTTP que o formulário está enviando
        - action: uma referência à função passada para a propriedade 'action' no formulário
   **Exemplo:**
```JSX
import {useFormStatus} from 'react-dom';

const SubmitButton = () => {

    const {pending} = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
        {pending ? "Enviando..." : "Enviar"}
    </button>
  )
}

export default SubmitButton
```
Nesse exemplo, o useFormStatus está sendo utilizado para desabilitar o botão de envio caso esteja pendente e mostrar a mensagem correspondente no botão, fornecendo, assim, uma melhor experiência ao usuário.


