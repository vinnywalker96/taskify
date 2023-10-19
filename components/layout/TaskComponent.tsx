import React , { useState } from 'react';
import { Card, Form, Button, Modal, Fade } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { Draggable } from 'react-beautiful-dnd';


const UpdateTaskMutation  = gql`
    mutation UpdateTaskMutation($id: String!, $title: String!, $description: String!, $status: String!, $userId: String) {
        updateTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
            id
            title 
            description
            status
        }
    }
`
const DeleteTaskMutation = gql`
    mutation DeleteTaskMutation($id: String!) {
        deleteTask(id: $id){
            id
        }
    }
`

const TaskComponent: React.FC<Task> = ({ title, description, id, boardCategory, index }) => {
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [assignTo, setAssignTo] = useState('');

    const [updateTask, { data, loading, error }] = useMutation(UpdateTaskMutation);
    const [deleteTask] = useMutation(DeleteTaskMutation);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = () => setShowModal(true);

    const handleTaskUpdate = (e) => {
        e.preventDefault();
        updateTask({
            variables: {
                title: taskTitle,
                description: taskDescription,
                id: id,
                status: boardCategory
            }
        });
        handleClose();

    }
    const handleTaskDelete = () => {
        deleteTask({
            variables: {
                id: id,
            }
        })
        handleClose();
    }
return (
        <>
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                <Card className='task-container' onClick={() => handleShow()} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card.Body>{title}</Card.Body>
                </Card>)}
            </Draggable>

            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update a Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleTaskUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={taskTitle} onChange={(e) => {setTaskTitle(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={taskDescription} onChange={(e) => {setTaskDescription(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Assign To</Form.Label>
                        <Form.Select value={assignTo} onChange={(e) => { setAssignTo(e.target.value)}}></Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-between'>
                        <Button variant="primary" type="submit">Update</Button>
                        <FontAwesomeIcon icon={faTrashAlt} style={{ 'padding': '2px'}} size='lg' onClick={handleTaskDelete}/>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default TaskComponent;