import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableOfTasks() {

    const classes = useStyles();
    const [tasksList, setTasksList] = React.useState()
    const [newPerson, setNewPerson] = React.useState({ name: '', email: '', discription: '', date: '' })

    const [isAdd, setAdd] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const [indexForEdit, setIndexForEdit] = React.useState(null)
    const [isSuccess, setIsSuccess] = React.useState(0)

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then(response => response.json())
            .then(data => setTasksList(data));
    }, [isSuccess])

    const onDelete = (row) => {
        fetch('http://localhost:3000/tasks/' + row._id, {
            method: 'DELETE',
        }).then(setIsSuccess(isSuccess + 1))
    }

    const onEdit = (event) => {
        setIndexForEdit(event._id)
        setNewPerson(event)
        setIsEdit(true)
    }

    const onSave = () => {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson)
        }).then(res => {
            setIsSuccess(isSuccess + 1)
            setAdd(false)
            setNewPerson({ name: '', email: '', discription: '', date: '' })
        })
    }

    const onUpdate = () => {
        fetch('http://localhost:3000/tasks/' + indexForEdit, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson)
        }).then(res => {
            setIsEdit(false)
            setIsSuccess(isSuccess + 1)
            setNewPerson({ name: '', email: '', discription: '', date: '' })
        })
    }

    const onAdd = () => {
        setAdd(true)
    }
    const onCancel = () => {
        setAdd(false)
        setIsEdit(false)
        setNewPerson({ name: '', email: '', discription: '', date: '' })
    }

    const myName = (event) => {
        var data = newPerson
        data.name = event.target.value;
        setNewPerson(data)
    }
    const myEmail = (event) => {
        var data = newPerson;
        data.email = event.target.value;
        setNewPerson(data)
    }
    const myTask = (event) => {
        var data = newPerson;
        data.discription = event.target.value;
        setNewPerson(data)
    }
    const myDate = (event) => {
        var data = newPerson;
        data.date = event.target.value;
        setNewPerson(data)
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Box m={3}>
                <Button variant="contained" color="secondary" onClick={onAdd}>add a new task</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">E-mail</StyledTableCell>
                            <StyledTableCell align="right">discription&nbsp;of&nbsp;task</StyledTableCell>
                            <StyledTableCell align="right">start&nbsp;date</StyledTableCell>
                            <StyledTableCell align="right">actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksList ? tasksList.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.discription}</StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton aria-label="delete" onClick={(e) => onDelete(row, e)}>
                                        <DeleteIcon  />
                                    </IconButton>
                                    <IconButton aria-label="edit" onClick={(e) => onEdit(row, e)}>
                                        <EditIcon  />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : <p>NO TASKS</p>}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={tasksList ? tasksList.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
            {isAdd || isEdit
                ? <form>
                    {isAdd ? <Button color="secondary" onClick={onSave}>save</Button>
                        : <Button color="secondary" onClick={onUpdate}>Update</Button>}
                    <Button color="primary" onClick={onCancel}>cancel</Button>
                    <TextField
                        defaultValue={newPerson.name}
                        helperText="Enter your name" onBlur={myName} style={{ margin: 8 }}
                    />
                    <TextField style={{ margin: 8 }}
                        defaultValue={newPerson.email}
                        helperText="Enter your E-mail" onBlur={myEmail}
                    />
                    <TextField style={{ margin: 8 }}
                        defaultValue={newPerson.discription}
                        helperText="Enter your task" onBlur={myTask}
                    />
                    <TextField style={{ margin: 8 }}
                        defaultValue={newPerson.date}
                        helperText="Enter your start date" onBlur={myDate} format="MM/dd/yyyy"
                    />
                </form>
                : null
            }    </div>
    );
}
