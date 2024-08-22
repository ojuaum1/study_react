import React, { useState, useEffect } from 'react';
import Modal from './modal.jsx';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([
        { text: 'Participar da reunião de equipe', completed: true }
    ]);
    const [newTaskText, setNewTaskText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);

    useEffect(() => {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
        setCurrentDate(date.toLocaleDateString('pt-BR', options));
    }, []);

    const toggleCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleTaskInputChange = (event) => {
        setNewTaskText(event.target.value);
    };

    const initiateTaskAddition = () => {
        setEditingTaskIndex(null);
        setNewTaskText('');
        setIsModalOpen(true);
    };

    const initiateTaskEdit = (index) => {
        setEditingTaskIndex(index);
        setNewTaskText(tasks[index].text);
        setIsModalOpen(true);
    };

    const confirmTask = () => {
        if (newTaskText.trim() !== '') {
            if (editingTaskIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingTaskIndex].text = newTaskText;
                setTasks(updatedTasks);
            } else {
                setTasks([...tasks, { text: newTaskText, completed: false }]);
            }
            setNewTaskText('');
        }
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="task-container">
            <h1>{currentDate}</h1>
            <div className="search-bar">
                <input type="text" placeholder="Procurar tarefa" />
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompletion(index)}
                        />
                        <span>{task.text}</span>
                        <div className="task-actions">
                            <button onClick={() => deleteTask(index)}>🗑️</button>
                            <button onClick={() => initiateTaskEdit(index)}>✏️</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="new-task">
                <button className="new-task-button" onClick={initiateTaskAddition}>Adicionar tarefa</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmTask}
                value={newTaskText}
                onChange={handleTaskInputChange}
            />
        </div>
    );
}

export default TaskList;
