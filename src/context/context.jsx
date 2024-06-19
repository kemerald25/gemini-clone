import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function for typing effect
    const typingEffect = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        // Used to remove the previous response from the state variable


        // The await keyword ensures that the code waits for the promise to resolve before continuing to the next line.
        try {
            setResultData("") // Clear previous result data
            setLoading(true) // Set loading state to true
            setShowResult(true)  // Show the result container
            let response;  // Declare the response variable
            if (prompt !== undefined) {
                response = await run(prompt) // Run with prompt if defined
                setRecentPrompt(prompt)
            } else {
                setPrevPrompts(prev => [...prev, input])
                setRecentPrompt(input)
                response = await run(input)
            }
            let responseArray = response.split("**");
            let newResponse = ""; // Initialize new response string
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                    // Append normally for even indices or the first element
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>"; // Bold odd indexed elements
                }
            }

            // Code Summary
            // This code takes an asynchronous response, splits it into an array based on a delimiter, and then processes the array to wrap every second element (starting from the second) in <b> tags to make it bold. This formatted string is then built up and stored in newArray.


            let newResponse2 = newResponse.split("*").join("</br>");
            // The purpose of this transformation is to replace all occurrences of a specific character (*) in a string with HTML line break tags (</br>)

            let newResponseArray = newResponse2.split(" ")
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                typingEffect(i, nextWord + " ")
            }

            setLoading(false)
            setInput("")
        } catch (error) {
            console.error("Error running the prompt:", error);
        }
    }




    // This context value lets use access the state and onSent functions that we can access in main and sidebar component 
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider