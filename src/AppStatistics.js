import { Container , Grid} from '@material-ui/core'
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography'
import ChartControl from './ChartControl'
import StatCharts from './StatCharts'


export default function AppStatistics(){
    const [times, setTimes] = useState(['12am','1am','2am','3am','4am','5am','6am']);  

    function getPeriodDataValues(periodVal){
        switch(periodVal){
            case "One Hour":
                setTimes(['12am','1am','2am','3am','4am','5am','6am']);
                break;
            case "Two Hours":
                setTimes(['12am','2am','4am','6am','8am','10am','12pm']);
                break;
            case "Six Hours":
                setTimes(['12am','6am','12pm','6pm','12am','6am','12pm']);
                break;
            case "One Day":
                setTimes(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']);
                break;
            default:
                setTimes(['12am','1am','2am','3am','4am','5am','6am']);
    
        }
    }


    return (
        <Container style={{padding:0}}>
            <Grid style={{paddingTop:30}} container spacing={1}>
                <Grid item xs={4} sm={3}>
                    <ChartControl setPeriods={getPeriodDataValues}/>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <StatCharts times={times} />
                </Grid>
            </Grid>
        </Container>
    )
};
