import todo from "../images/todo.jpg";
import React, { useState, useEffect } from 'react';

// To set data from LS
const getLocalItems = () => {
    const list = localStorage.getItem("list")
    return (!list) ? [] : JSON.parse(localStorage.getItem("list"));
}

const Todo = () => {
    const [inputData, setInputData] = useState();
    const [items, setItems] = useState(getLocalItems());
    const [ToggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setisEditItem] = useState(null);

    //Adding items
    const addItem = () => {
        if (!inputData) {
            setItems([...items])
        }
        else if (!ToggleSubmit && inputData) {
            setItems(items.map((elem) => {
                if (elem.id === isEditItem) {
                    return { ...elem, name: inputData }
                }
                return elem;
            }))
            setToggleSubmit(true)
            setInputData("");
            setisEditItem(null);
        }
        else {
            const newItem = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, newItem])
            setInputData("")
        }
    }

    //Deleting items
    const deleteItem = (id) => {
        const updatedData = items.filter((item) => {
            return item.id !== id;
        })
        setItems(updatedData);
    }

    // Edit Items
    const editItem = (id) => {
        const newEditItems =
            items.find((elem) => {
                return elem.id === id;
            })

        setToggleSubmit(false)
        setInputData(newEditItems.name);
        setisEditItem(id);
    }

    // Adding Data to Local Storage
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todo-logo" />
                        <figcaption>Add Your List Here 📑</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            onChange={(event) => {
                                setInputData(event.target.value);
                            }}
                            value={inputData}
                            placeholder="✍️ Add Items..."
                            type="text"
                        />
                        {
                            (!ToggleSubmit) ?
                                <i
                                    onClick={addItem}
                                    className="far fa-edit add-btn"
                                    title="Add Items"

                                /> :
                                <i
                                    className="fa fa-plus add-btn"
                                    title="Update Items"
                                    onClick={addItem}
                                />
                        }
                    </div>
                    <div className="showItems">
                        {items.map((item) => {
                            return (
                                <div className="eachItem" key={item.id}>
                                    <h3>{item.name}</h3>
                                    <div className="todo-btn">
                                        <i
                                            onClick={() => editItem(item.id)}
                                            className="far fa-edit add-btn"
                                            title="Edit Items" />
                                        <i
                                            onClick={() => deleteItem(item.id)}
                                            className="far fa-trash-alt add-btn"
                                            title="Delete Items" ></i>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={() => {
                                setItems([]);
                            }}
                        > <span>Check List</span> </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;