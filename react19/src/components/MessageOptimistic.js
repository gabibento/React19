import { useState } from "react";
import Form from "./Form";
import {ThemeProvider} from "./ThemeContext"

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
    <ThemeProvider>
      <Form messages={messages} sendMessage={sendMessage}></Form>
    </ThemeProvider>
    
  )
}

export default MessageOptimistic