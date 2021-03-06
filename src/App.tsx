import React from 'react';
import {Box, Button, Container, TextField} from "@material-ui/core";
import {FormikHelpers, useFormik} from "formik";


interface Values {
    email: string,
    password: string
}

function App() {

    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        onSubmit: (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 500);
        },
    });

    return (
        <div className="App">
            <Container maxWidth={"sm"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
                        <Button color="primary" variant="contained" disabled={isSubmitting} fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default App;
