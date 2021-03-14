import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DevicesTable from './DevicesTable';
import { withStyles} from '@material-ui/core/styles';

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

const TitleTypography = withStyles({
  root: {
    color: "#1a535c"
  }
})(Typography);

const RedTypography = withStyles({
  root: {
    color: "#ff6b6b"
  }
})(Typography);



export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          IoT-Powered Pandemic Safety Suite
        </Typography>
        <TitleTypography variant="h3" component="h1" gutterBottom>
          Building occupants: 50
        </TitleTypography>
        <RedTypography variant="h5" component="h1" gutterBottom>
          Maximum capacity: 20
        </RedTypography>
        <DevicesTable />
        <Copyright />
      </Box>
    </Container>
  );
}
