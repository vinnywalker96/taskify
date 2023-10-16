import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Row } from 'react-bootstrap';
import BoardSection from '@/components/layout/BoardSection';

const AllTasksQuery = gql`
    query { 
        tasks {
            id
            title
            description
            status
        }
    }
`;

const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery,{
        onCompleted: (data) => {
            console.log(data);
        }
    });
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {JSON.stringify(error)}</p>;
const sections: Array<string> = ['Backlog', 'In Progress', 'Review', 'Done']
   return (
    <div className='pt-3 h-100 d-flex flex-column'>
        <Row>
            <h1>Project Title</h1>
        </Row>
        <div className='board-container d-flex flex-row flex-grow-1'>
            {sections.map((section: string, index: number) => {
                let filteredTasks: Array<Task> = data ? data.tasks.filter((task: Task) => {return task.status === section}) : [];
                return(
                    <BoardSection
                    key={index}
                    title={section}
                    tasks={filteredTasks}
                    />
                )
            })}
        </div>
    </div>
   )
}

export default Board;