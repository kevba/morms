import React, {useState} from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import {Form} from "morms/Form";
import {TextInput} from "morms/TextInput";
import {IPInput} from "morms/IPInput";
import {SubmitButton} from "morms/SubmitButton";

import {required, minLength, maxLength} from "morms/validators";
import {PasswordInput} from "morms/PasswordInput";

export function DemoForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ip, setIP] = useState("");
    const [showResult, setShowResult] = useState(false);

    const renderResults = (): React.ReactElement => {
        if (!showResult) {
            return <React.Fragment />;
        }

        return (
            <Paper style={{margin: "3em", padding: "2em"}}>
                <Typography variant="h5">Results</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>username</TableCell>
                            <TableCell>{username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>password</TableCell>
                            <TableCell>{password}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ip</TableCell>
                            <TableCell>{ip}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    };

    const renderForm = (): React.ReactElement => {
        return (
            <Paper style={{margin: "3em", padding: "2em"}}>
                <Typography variant="h4">Example of a form</Typography>
                <Form>
                    <TextInput
                        value={username}
                        label={"Username"}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        validators={[required()]}
                    />
                    <PasswordInput
                        value={password}
                        label={"Password"}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        validators={[required(), minLength(6), maxLength(30)]}
                    />
                    <IPInput
                        value={ip}
                        label={"IP address"}
                        onChange={(event) => {
                            setIP(event.target.value);
                        }}
                    />
                    <SubmitButton
                        variant="contained"
                        color="primary"
                        onSubmit={() => {
                            setShowResult(true);
                        }}
                    >
                        {"Submit"}
                    </SubmitButton>
                </Form>
            </Paper>
        );
    };
    return (
        <React.Fragment>
            {renderForm()}
            {renderResults()}
        </React.Fragment>
    );
}
