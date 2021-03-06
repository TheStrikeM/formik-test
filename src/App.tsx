import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {FormikHelpers, useFormik} from "formik";
import * as yup from 'yup'
import './App.css'


interface Values {
    email: string,
    password: string
}

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password uncorrect')
        .required('Password is required')
})

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        margin: '50px 0',
        padding: '0 30px'
    },
    page: {
        margin: '50px 150px'
    },
    menuButton: {
        marginRight: '10px'
    },
    title: {
        flexGrow: 1,
    },
})

function App() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: Values) => {
            setTimeout(() => {
                setDialog(true)
            }, 500);
        },
    });
    const classes = useStyles()
    const [dialog, setDialog] = useState<boolean>(false)

    const handleClose = () => {
        setDialog(false)
    }

    return (
        <div className="App">
            <AppBar color={"secondary"} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        MegaShop
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={"sm"}>
                <Box className={classes.page} flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <h1>Log in</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Box maxWidth={"xs-1"}>
                            <Button className={classes.root} color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                            <Dialog
                                open={dialog}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Information"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <p><b>Email: </b> {formik.values.email}</p>
                                        <p><b>Password: </b> {formik.values.password}</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Disagree
                                    </Button>
                                    <Button onClick={handleClose} color="primary" autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default App;
