import { useState } from "react";
import PropTypes from "prop-types";

ToDoItem.propTypes = {
    addTask: PropTypes.func.isRequired,
  };


function ToDoItem({addTask}){
    const [inputText,setInputText] = useState("")

    function handleInput(e){
        setInputText(e.target.value)    
    }

    function handleSubmit(e){
        e.preventDefault();
    }


    return (

        <div className="flex justify-center"> 
        
            <form onSubmit={handleSubmit} className=" p-10">

                <input onChange={handleInput} className=" w-96 h-10 p-4 text-black rounded-md" placeholder="Enter Task" value={inputText}></input>

                <button className=" ml-7 border-black border-2 w-16 h-10 rounded-md bg-blue-800 hover:bg-blue-600" onClick={()=>{           
                    addTask(inputText)
                    setInputText("")
                }}>Add</button>

            </form>


        </div> 


    )
}

export default ToDoItem;