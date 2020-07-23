import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Form Examples</Typography>
            </Toolbar>
        </AppBar>
    );
}
