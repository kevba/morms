
import React, {useState} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {Form} from "./form/Form"
import {TextInput} from "./form/TextInput"
import {IPInput} from "./form/IPInput"

import { required } from './form/validators';

export function DemoForm() {
    const [username, setUsername] = useState("")
    const [ip, setIP] = useState("")

    return (
        <Paper style={{margin: "3em", padding: "2em"}}>
            <Typography variant="h4">
                Example of a form
            </Typography>
            <Form>
                <TextInput
                    value={username}
                    label={"Username"}
                    onChange={(event) => {setUsername(event.target.value)}}
                    validators={[required()]} />
                <IPInput
                    value={ip}
                    label={"IP address"}
                    onChange={(event) => {setIP(event.target.value)}}/>
            </Form>
        </Paper>
    );
}
