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

    useEffect(() => {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
        setCurrentDate(date.toLocaleDateString('pt-BR', options));
    }, []);

    const toggleTaskCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleNewTaskChange = (event) => {
        setNewTaskText(event.target.value);
    };

    const handleAddTask = () => {
        setIsModalOpen(true);
    };

    const handleConfirmTask = () => {
        if (newTaskText.trim() !== '') {
            setTasks([...tasks, { text: newTaskText, completed: false }]);
            setNewTaskText(''); 
        }
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
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
                            onChange={() => toggleTaskCompletion(index)} 
                        />
                        <span>{task.text}</span>
                        <div className="task-actions">
                            <button onClick={() => removeTask(index)}>🗑️</button>
                            <button>✏️</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="new-task">
                <button className="new-task-button" onClick={handleAddTask}>Adicionar tarefa</button>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmTask} 
                value={newTaskText} 
                onChange={handleNewTaskChange}
            />
        </div>
    );
}

export default TaskList;
