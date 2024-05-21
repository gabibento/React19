# React19 - Novidades e atualizações!
- O React 19, ainda em versão beta e lançado em 25 de abril de 2024, traz diversas novidades e melhorias que visam aprimorar a experiência de desenvolvimento e o desempenho das aplicações.

- ## Índice
1. [Instalação](#instalação-da-versão-beta-do-react-19)
2. [React Compiler](#react-compiler)
3. [Server Components](#server-components)
4. [Server Actions](#server-actions)
5. [Meta Tags](#meta-tags)
6. [Assets Loading](#assets-loading)
7. [use API](#use-api)
8. [Form Actions](#form-actions)
9. [Novos Hooks](#novos-hooks)
   - [useActionState](#useactionstate)
   - [useFormStatus](#useformstatus)
   - [useOptimistic](#useoptimistic)
10. [Recursos Adicionais](#recursos-adicionais)


## Instalação da Versão Beta do React 19
Para começar a experimentar as novas funcionalidades do React 19, pode-se instalar a versão beta diretamente:

```sh
npm install react@beta react-dom@beta
```
Nota: O React 19 ainda está em versão beta. Portanto, é recomendado usá-lo apenas para fins de experimentação e desenvolvimento, não em ambientes de produção.

### Preparação para o React 19 com o React 18.3
A versão `@react18.3` foi publicada para facilitar a transição para o React 19. Essa versão inclui avisos sobre APIs deprecadas e outras mudanças necessárias para a atualização futura. É recomendável utilizar essa versão para preparar seu código para o React 19.

## Principais atualizações
### React Compiler
 - Automatiza o processo de renderização, atualizando apenas as partes necessárias da interface.
 - Elimina a necessidade de memorização manual usando `useCallback` e `useMemo`.
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
        
Crie um componente que retorne JSX e o marque como assíncrono. 
``` JSX
import db from './db';

export default async function Note({ id }) {
  const note = await db.notes.get(id);
  return <div>{note.text}</div>;
}
```
Para usar um Server Component em outro componente, pode-se importá-lo diretamente.
   
``` JSX
import Note from './Note';

function NotePage({ id }) {
  return <Note id={id} />;
}
```
### Server Actions
- Permitem componentes do lado cliente chamar funções assíncronas executadas no servidor.
- Ao definir uma ação do servidor com a diretiva "use server", é automaticamente criada uma referência para o Client Component.
- Ao chamar a função no lado do cliente, é enviada uma requisição para o servidor para executar a função e retornar o resultado.

### Meta tags
- Suporte nativo para meta tags dentro dos componentes React. Facilitando o gerenciamento de títulos, descrições e outras informações de grande importância para o SEO e para a acessibilidade.
    
**Exemplo:**
```JSX

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
      
    </div>
  );
}

export default App;
```
### Assets Loading
- Carregamento de assets (estilos, fontes, scripts, etc.) em segundo plano, fazendo com que a página seja exibida mais rapidamente.
- Integração do Suspense com o ciclo de vida de carregamento de assets, permitindo determinar quando o conteúdo está pronto para ser exibido, garantindo que não apareça conteúdo incompleto e não formatado.
- Novas APIs de carregamento de recursos, como preload e preinit, que permitem um melhor controle sobre o carregamento e inicialização de recursos.

### use
- API que permite ler o valor de um recurso, como uma promessa ou contexto.
- Pode ser chamado dentro de loops e estruturas condicionais.
- Possui melhor concisão e desempenho.
     
**Exemplo:**
```JSX
import React, { use } from 'react';
import { ThemeContext } from './ThemeContext';

function Theme() {
  
  const {theme, toggleTheme} = use(ThemeContext);

  return (
    <div className={theme}>

      <button onClick={toggleTheme} className={theme || "light"}>
        Alterar tema para {theme === "light" ? "dark" : "light"}
      </button>
      
    </div>
  );
}

export default Theme;
```

### Form Actions
- Com o React 19, a submissão de formulários não dependerá mais do evento onSubmit. É possível passar funções para lidar com a submissão do formulário utilizando a propriedade `action`.
Essa função pode ser assíncrona e executada no servidor, tornando a criação de formulários mais eficiente e organizada.

```jsx
<form action={actionFunction}>
```
### Novos hooks 
  #### useActionState
 - Permite atualizar o estado baseado no resultado de uma ação de formulário.
 - Fornece acesso ao estado pendente da ação, permitindo que o componente renderize conteúdo de carregamento enquanto a ação está em execução.
     
 **Como utilizar:** 
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
  **Como utilizar:**
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

- ### useOptimistic
  - Permite gerenciar atualizações otimistas, mostrando um estado diferente enquanto uma ação assíncrona está em andamento
  - Proporciona melhor experiência ao usuário com atualização imediata da interface
  **Como utilizar:**
   ```JSX
   const [optimisticState, addOptimistic] = useOptimistic(state,
    //updateFn
    (currentState, optimisticValue) => {

    }
   );
   ```
    - **Parâmetros:**
       - state: valor a ser retornado inicialmente e quando não há ação pendente.
       - updateFn: função assíncrona que executa a atualização e recebe dois argumentos:
          - currentState: estado atual do componente no momento em que a função de atualização é chamada.
          - optimisticValue: valor otimista, resultado esperado da ação.
     - **Retornos:**
        - optimisticState: estado atual do componente, do qual equivale ao valor do parâmetro 'state', caso não haja ação assíncrona em andamento, caso contrário equivale ao valor retornado pela função 'updateFn'
        - addOptimistic: função que dispara atualizações otimistas, da qual recebe um argumento que representa o valor desejado após a conclusão da ação assíncrona.
             
    **Exemplo:**
```JSX
import React, { useOptimistic } from 'react'
import SubmitButton from './SubmitButton';
import { useState } from "react";
import Form from "./Form";

const Form = ({messages, sendMessage}) => {

    const [optimisticMessages, addOptimisticMessages] = useOptimistic(messages, 
        (state, newMessage) => [...state, {text: newMessage, sending: true}])

    const handleAction = async(formData) => {

        const name = formData.get("name");
        const email = formData.get("email");

      
         addOptimisticMessages(name)

        await sendMessage(formData)

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

  return (
    <div>
        <form action={handleAction}>
            <label htmlFor="name">Nome: </label>
            <input type="text" name='name'/>

            <label htmlFor="email">Email: </label>
            <input type="email" name='email'/>

            <SubmitButton></SubmitButton>

        </form>

        {optimisticMessages && optimisticMessages.map((message, index) => (
            <div key={index}>
                {message.text} {message.sending && <small>Enviando...</small>}
            </div>
        ))}

      
    </div>
  )
}

export default Form

const MessageOptimistic = () => {
    const [messages, setMessages] = useState([
        {text: "", sending: false, key: 1}
    ]);

    async function deliverMessage(message){
        await new Promise((resolve) => setTimeout(resolve, 2000))

        return message
    }

    async function sendMessage(formData){
        const sentMessage = await deliverMessage(formData.get("message"))
        setMessages((messages) => [...messages, {text: sentMessage, sending: false}])
    }
  return (
      <Form messages={messages} sendMessage={sendMessage}></Form>
    
  )
}

export default MessageOptimistic
```
Nesse exemplo, é utilizado o hook useOptimistic para gerenciar mensagens, adicionando uma mensagem temporária ao enviar o formulário.

## Recursos Adicionais
- [Documentação Oficial do React](https://react.dev/)
- [Blog do React](https://react.dev/blog)
- [Repositório no GitHub](https://github.com/facebook/react)
- [Video Matheus Battisti](https://www.youtube.com/watch?v=Y8tiDuvmKUg&list=WL&index=7&t=704s)
