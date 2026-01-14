import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Box } from '@mui/material';

const API_BASE_URL = 'http://130.131.50.136:8000';

const backgroundImage = process.env.PUBLIC_URL + '/background.jpg';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const createTask = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/tasks`, newTask);
            fetchTasks();
            setNewTask({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h3"
                    gutterBottom
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        margin: '8px',
                    }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '40px' }}>DEVOPS PIONEER</span>
                    <br />
                    ToDo App
                </Typography>

                <div>
                    <TextField
                        label="Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        value={newTask.title}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        InputProps={{
                            style: { color: 'white' }
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                    />

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={newTask.description}
                        margin="normal"
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        InputProps={{
                            style: { color: 'white' }
                        }}
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                    />

                    <Button variant="contained" color="primary" onClick={createTask} style={{ margin: '8px' }}>
                        Add Task
                    </Button>
                </div>

                <div>
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{
                            textAlign: 'center',
                            color: 'white',
                            margin: '15px',
                        }}
                    >
                        Existing Tasks
                    </Typography>

                    {tasks.map((task) => (
                        <Box key={task.ID} mb={2}>
                            <Card variant="elevation">
                                <CardContent>
                                    <Typography variant="h6">{task.Title}</Typography>
                                    <Typography variant="body2">{task.Description}</Typography>
                                    <IconButton onClick={() => deleteTask(task.ID)} color="secondary">
                                        <Delete />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </div>
            </Container>
        </Box>
    );
}

export default TodoApp;
