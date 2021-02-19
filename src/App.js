import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DevicesTable from './DevicesTable';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        IoT-Powered Pandemic Safety Suite
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          IoT-Powered Pandemic Safety Suite
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          People: 20
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          Max: 20
        </Typography>
        <DevicesTable />
        <Copyright />
      </Box>
    </Container>
  );
}
