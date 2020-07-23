import React from "react";

import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import {Header} from "./Header";
import {Content} from "./Content";

const theme = createMuiTheme({});

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Header />
                <Content />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
