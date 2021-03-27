import { Container , Grid} from '@material-ui/core'
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography'
import ChartControl from './ChartControl'
import StatCharts from './StatCharts'


export default function AppStatistics(){
    const [times, setTimes] = useState([]); 
    const [values, setValues] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPeriodDataValues();
    },[data])

    function fetchData(mode){
    
        fetch("http://localhost:8000/data").then(
            (resp) => {
                return resp.json();
            }
        ).then(
            (rawData) => {
                switch(mode){
                    case 1:
                        setData(rawData);
                        break;
                    case 2:
                        setData(rawData.filter(obj => obj.time.substring(3, 5) == "00"));
                        break;
                    case 3:
                        setData(rawData.filter(obj => obj.time.substring(3, 5) == "00" 
                                && obj.time.substring(0,2) % 2 == 0));
                        break;
                    case 4:
                        setData(rawData.filter(obj => obj.time.substring(3, 5) == "00" 
                                && obj.time.substring(0,2) % 3 == 0));
                        break;
                    default:
                        setData(rawData);
                }
            }
        )
    }

    function getPeriodDataValues(periodVal){
        switch(periodVal){
            case "30 Minutes":
                fetchData(1);
                break;
            case "1 Hour":
                fetchData(2);
                break;
            case "2 Hours":
                fetchData(3);
                break;
            case "3 Hours":
                fetchData(4);
                break;
        }
        setValues(data.map(obj => obj.value))
        setTimes(data.map(obj => obj.time));
    }


    return (
        <Container style={{padding:0}}>
            <Grid style={{paddingTop:30}} container spacing={1}>
                <Grid item xs={4} sm={3}>
                    <ChartControl setPeriods={getPeriodDataValues}/>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <StatCharts values={values} times={times} />
                </Grid>
            </Grid>
        </Container>
    )
};
