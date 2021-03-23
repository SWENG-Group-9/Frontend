import { Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import HeadBar from './HeadBar'


export default function AppStatistics(){
    return (
        <Container style={{padding:0}}>
            <HeadBar/>
            <Typography variant="h1" color="initial">Stats Here</Typography>
        </Container>
    )
};
