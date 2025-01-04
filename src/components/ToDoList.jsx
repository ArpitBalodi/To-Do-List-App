import ToDoItem from "./ToDoItem";
import { useState } from "react";

function ToDoList() {
    const [task, setTask] = useState([]);
    const [checked, setChecked] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null); // Track the task being edited
    const [editedText, setEditedText] = useState(""); // Store the edited text

    function handleChecked(index) {
        setChecked(function (prevChecked) {
            const newChecked = [...prevChecked];
            newChecked[index] = !newChecked[index];
            return newChecked;
        });
    }

    function handleAddTask(inputText) {
        if (!inputText || task.includes(inputText)) {
            return;
        }
        setTask((prevTask) => [...prevTask, inputText]);
        setChecked((prevChecked) => [...prevChecked, false]);
    }

    function handleDeleteTask(key) {
        setTask((prevTask) => prevTask.filter((_, index) => index !== key));
        setChecked((prevChecked) => prevChecked.filter((_, index) => index !== key));
    }

    function handleStartEditing(index) {
        setEditingIndex(index); // Set the index of the task to be edited
        setEditedText(task[index]); // Pre-fill the input field with the current task text
    }

    function handleSaveEditedTask() {
        if (!editedText.trim()) {
            // Do not save if the edited text is empty or only contains whitespace
            return;
        }
    
        setTask(function (prevTask) {
            return prevTask.map(function (item, index) {
                return index === editingIndex ? editedText : item; // Replace the task at editingIndex with the new text
            });
        });
        setEditingIndex(null); // Reset editing state
        setEditedText(""); // Clear the input field
    }
    


    return (
        <div className="flex flex-col justify-center items-center bg-purple-950 max-w-[700px] ml-[28%] rounded-lg">

            <ToDoItem addTask={handleAddTask} />

            {task.map(function (item, index) {
                return (
                    <div key={index} className="w-[490px]">
                        <li className="list-none flex items-center justify-between px-4 h-10 w-full bg-purple-950 ">
                            {/* If the task is being edited, show the input field */}
                            {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={function (e) {
                                            setEditedText(e.target.value);
                                        }}
                                        className="bg-white text-black"
                                        autoFocus
                                    />
                                ) 
                                : 
                                (
                                <span className={checked[index] ? "line-through" : "no-underline"}>{item}</span>
                            )}

                            <div className="flex gap-6 h-8 items-center align-middle">
                                {/* Conditionally show Save button or the other buttons */}
                                {editingIndex === index ? (
                                    <button
                                        onClick={handleSaveEditedTask}
                                        className="bg-green-700 text-white px-4 py-1 rounded"
                                    >
                                        Save
                                    </button>
                                ) 
                                : 
                                (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="white"
                                            className="bi bi-check bg-green-700"
                                            onClick={function () {
                                                handleChecked(index);
                                            }}
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                        </svg>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                            onClick={function () {
                                                handleDeleteTask(index);
                                            }}
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                            onClick={function () {
                                                handleStartEditing(index);
                                            }}
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </li>
                        <hr className="w-full max-w-lg mb-8" />
                    </div>
                );
            })}
        </div>
    );
}

export default ToDoList;
