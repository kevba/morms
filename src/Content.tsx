import React from 'react';

import Grid from '@material-ui/core/Grid';

import {DemoForm} from "./DemoForm"

export function Content() {
  return (
      <Grid container direction="row" justify="center">
        <Grid item xs={8}>
          <DemoForm />
        </Grid>
      </Grid>
  );
}
