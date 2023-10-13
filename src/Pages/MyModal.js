import React, { useState, useCallback, useMemo, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../redux/reducerMain';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const MyModal = ({ isOpen, isClose, idEdit}) => {
    const dispatch = useDispatch();
    
    // useRef - допоміг щоб інпути очищались після відправки форми
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const checkBoxRef = useRef();

    const tasksArr = useSelector(state => state.tasks.tasks);
    let task = []
    let titleName = ''

    if (idEdit) {
        task = tasksArr.find(task => task.id === idEdit);
        titleName = task.title
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
          const task = {
              'id': (idEdit ? idEdit : uuidv4()),
              'title': event.target[0].value,
              'description': event.target[1].value,
              'completed': event.target[2].checked,
          }

          if (idEdit) {
              dispatch(editTask(task));
              isClose();
              return
          } else {
              dispatch(addTask(task));
              firstNameRef.current.value = '';
              lastNameRef.current.value = '';
              checkBoxRef.current.checked = false;
          }
      }
    

    return (
        <>
          <Modal show={isOpen} onHide={isClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {idEdit ? 'Edit Task' : 'Add my Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="targetTitle"
                    placeholder="My task #1"
                    autoFocus
                    minLength={6}
                    defaultValue={idEdit ? titleName : null}
                    ref={firstNameRef}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description of Task</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="targetDescription"
                    rows={3}
                    defaultValue={idEdit && task.description}
                    ref={lastNameRef}
                  />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Form.Group className="mb-0" controlId="completed">
                    <Form.Check
                    type="checkbox"
                    name="targetCompleted"
                    label="Task is already completed"
                    defaultChecked={idEdit && task.completed}
                    ref={checkBoxRef}
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> Save Task</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      );
};

export default MyModal;