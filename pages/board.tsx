import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Row } from 'react-bootstrap';
import BoardSection from '@/app/components/layout/BoardSection';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSession } from 'next-auth/react';


const AllTasksQuery = gql`
    query { 
        tasks {
            id
            title
            description
            status
            userId
        }
    }
`

const GetUserQuery = gql`
    query($email: String!){
        user(email: $email){
            id
            name
            tasks {
                id
                title
                description
                status
            }
        }
    }
`

const UpdateTaskMutation  = gql`
    mutation UpdateTaskMutation($id: String!, $title: String, $description: String, $status: String, $userId: String) {
        updateTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
            id
            title 
            description
            status
        }
    }
`

const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery,{
        onCompleted: (data) => {
            console.log(data);
            setTasks(data);
        }
    });
    const [updateTask] = useMutation(UpdateTaskMutation);
    const { data: session, status } = useSession();
    const [getTasks, { data: tasksData, loading: tasksLoading, error: tasksError }] = useLazyQuery(GetUserQuery);
    const [tasks, setTasks] = useState([]);
    const sections: Array<string> = ['Backlog', 'In Progress', 'Review', 'Done']

    useEffect(() => {
        if (session){
            getTasks({ variables: { email: session?.user?.email }})
        }
    }, [getTasks, session])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId ) {
            return;
        }

        const updatedTasksList = tasks && tasks.map((t: any) => {
            if (t.id === draggableId) {
                return {
                    ...t,
                    status: destination.droppableId
                }
            } else {
                return t;
            }
        })

        setTasks(updatedTasksList);

        updateTask({
            variables: {
                id: draggableId,
                status: destination.droppableId
            },
            update: (cache, { data }) => {
                const existingTasks: any = cache.readQuery({
                    query: AllTasksQuery
                });
                const updatedTasks = existingTasks!.tasks.map((t: any) => {
                    if (t.id === draggableId) {
                        return {
                            ...t,
                            ...data!.updateTask
                        }
                    } else {
                        return t;
                    }
                })
                cache.writeQuery({
                    query: AllTasksQuery,
                    data: { tasks: updatedTasks }
                
                });
                const dataInCache = cache.readQuery({ query: AllTasksQuery });
                console.log(dataInCache);
            },
            onCompleted: data => {

            }
        })
    }

    const reFetchTasks = () => {
        if (session){
            getTasks({ variables: { email: session.user.email }})
        }
    }


   return (
    <div className='pt-3 h-100 d-flex flex-column'>
        <Row>
            <h1>Project Title</h1>
        </Row>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='board-container d-flex flex-row flex-grow-1'>
                {sections.map((section, index) => {
                    let filteredTasks: Array<Task> = data ? data.tasks.filter((task: Task) => {return task.status === section}) : [];
                    return(
                        <BoardSection
                        title={section}
                        key={index}
                        tasks={filteredTasks}
                        reFetchTasks={reFetchTasks}
                        />
                    )
                })}
            </div>
        </DragDropContext>
    </div>
    
   )
}

export default Board;