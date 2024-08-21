// Modal.js
import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, onConfirm, value, onChange }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Descreva sua tarefa</h2>
                <input 
                    type="text" 
                    value={value} 
                    onChange={onChange} 
                    placeholder="Digite sua tarefa" 
                    className="modal-input"
                />
                <div className="modal-actions">
                    <button onClick={onConfirm} className="modal-confirm-button">Confirmar tarefa</button>
                    <button onClick={onClose} className="modal-cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
