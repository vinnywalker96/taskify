import React, { useState } from 'react'
import TaskComponent from './TaskComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Button, Form, Card, Container } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
interface BoardSectionProps {
    title: string;
    tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
    return (
        <>
            <Col md={3} className='d-flex flex-column p-2' >
                <div className='board-section-header d-flex flex-row align-items-center'>
                    <h3 className='me-auto'>{title}</h3>
                    <FontAwesomeIcon icon={faPlus} style={{ 'color': '#6f7782'}}/>
                </div>
                <Container className='p-0 d-flex flex-column h-100'>
                  {
                    tasks &&
                    tasks.map((task: Task, index: number ) => {
                        return (
                            <TaskComponent
                            title={task.title}
                            description={task.description}
                            id={task.id}
                            key={task.id}
                            status={task.status}
                            />
                        )
                    })
                  }
                  {
                    tasks.length > 0 &&
                    <Button className='add-wrapper'>
                    <FontAwesomeIcon icon={faPlus} style={{ 'color': '#6f7782'}}/>
                    Add Task
                    </Button>
                  }
                  {
                    tasks.length === 0 &&
                    <div className='is-empty d-flex flex-column'>
                        <Button className='add-wrapper'>
                        <FontAwesomeIcon icon={faPlus} style={{ 'color': '#6f7782'}}/>
                        Add Task
                        </Button>

                   </div>

                  }
                </Container>

            </Col>
        </>
    )
}

export default BoardSection;