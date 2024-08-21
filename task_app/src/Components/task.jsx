import React from 'react';
import './Task.css';

function Task({ task, onToggle, onEdit, onDelete }) {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={onToggle} 
            />
            <span>{task.text}</span>
            <div className="task-actions">
                <button onClick={onEdit}>Editar</button>
                <button onClick={onDelete}>Excluir</button>
            </div>
        </div>
    );
}

export default Task;
