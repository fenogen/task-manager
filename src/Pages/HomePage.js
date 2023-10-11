import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ListGroup from 'react-bootstrap/ListGroup';

import MyModal from './MyModal';
import TaskItem from './TaskItem'

import style from './HomePage.module.css'



export default function HomePage() {

let tasks = useSelector(state => state.tasks.tasks);

// #1) Button group:
const [checked, setChecked] = useState(false);
const [radioValue, setRadioValue] = useState('1');
const radios = [
  { name: 'All', value: '1' },
  { name: 'Done', value: '2' },
  { name: 'Not Done', value: '3' },
];

// #2) Modal window:
const [show, setShow] = useState(false);
const [idEdit, setIdEdit] = useState('');
const [value, setValue] = useState('');

const defValue = () => setValue('');
const handleClose = () => setShow(false);
const handleShow = (id) => {
    setShow(true)
    if (typeof(id) === 'number') {
        setIdEdit(id)
    }
    if (typeof(id) === 'object') {
        setIdEdit('')
    }
};

// #2) Filter:
const [filter, setFilter] = useState('all');

const changeFilter = newFilter => {
    setFilter(newFilter);
  };

  const filteredTasks = () => {
    switch (filter) {
      case 'done':
        return tasks.filter(task => task.completed === true);
      case 'not done':
        return tasks.filter(task => task.completed === false);
      default:
        return tasks;
    }
  };

  return (
    <div className={style.container}>
        <div>
            <div className={style.list}>
            <h1 className={style.list__title}>Task Manager</h1>
            <div className={style.box}>
                <h3>Filter:</h3>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx === 0 && 'outline-warning' || idx === 1 && 'outline-success' || idx === 2 && 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        onClick={idx === 0 && (() => changeFilter('all')) || idx === 1 && (() => changeFilter('done')) || idx === 2 && (() => changeFilter('not done'))}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            </div>
            <div className={style.list}>
                <Button variant="outline-primary" onClick={handleShow}>Add Task</Button>
            </div>
            <MyModal isOpen={show} isClose={handleClose} idEdit={idEdit}/>
            <ListGroup as="ol" numbered>
                {filteredTasks().map(task => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
                        handleShow={handleShow}
                    ></TaskItem>
                ))}
            </ListGroup>
        </div>
    </div>
  );
}