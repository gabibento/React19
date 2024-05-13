import React, { useState, useOptimistic, use } from 'react'
import SubmitButton from './SubmitButton';
import { useActionState } from 'react';
import { ThemeContext } from './ThemeContext'

const Form = ({messages, sendMessage}) => {

    const [users, setUsers] = useState([]);
    const {theme, toggleTheme} = use(ThemeContext);
    const [optimisticMessages, addOptimisticMessages] = useOptimistic(messages, 
        (state, newMessage) => [...state, {text: newMessage, sending: true}])

    const handleAction = async(prevState, formData) => {

        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const name = formData.get("name");
        const email = formData.get("email");

        setUsers((prev) => [...prev, {name, email}]);

         addOptimisticMessages(formData.get("name"))

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



    const [message, formAction] = useActionState(handleAction, null)

   


  return (
    <div className={theme}>
        <form action={formAction}>
            <label htmlFor="name">Nome: </label>
            <input type="text" name='name'/>

            <label htmlFor="email">Email: </label>
            <input type="email" name='email'/>

            <SubmitButton></SubmitButton>

            {message && <h4>{message.text}</h4>}
        </form>

        {optimisticMessages && optimisticMessages.map((message, index) => (
            <div key={index}>
                {message.text} {message.sending && <small>Enviando...</small>}
            </div>
        ))}

        <h3>Usuários</h3>
        <ul>
          {users.map((user, index) => (

          (message && message.success === true) && <li key={index}>{user.name} - {user.email}</li>
       
           
          ))}
        </ul>

        <button onClick={toggleTheme} className={theme || "light"}>
        Alterar tema para {theme === "light" ? "dark" : "light"}
       </button>
        

      
    </div>
  )
}

export default Form