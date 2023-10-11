import React from 'react';
import { useDispatch } from 'react-redux';

import {completeTask, removeTask} from '../redux/reducerMain';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

function TaskItem({ title, description, completed, id, handleShow}) {

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(completeTask(id));
  };

  const fnDeleteTask = () => {
    dispatch(removeTask(id));
  };

  return (
      <div>
      <ListGroup.Item as="li" style={{width: '600px'}} className="d-flex justify-content-between align-items-center">
        <Form.Check 
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <div className="ms-2 me-auto" style={{width: '400px'}}>
        <div className="fw-bold">{title}</div>
        {description}
        </div>
      <div>
        <Button className="mb-2" variant="info" size="sm" onClick={() => handleShow(id)}>
          Edit
        </Button>{' '}
        <Button className="mb-2" variant="danger" size="sm" onClick={() => fnDeleteTask(id)}>
          Dellete
        </Button>
      </div>
    </ListGroup.Item>
    </div>
  );
}

export default TaskItem;