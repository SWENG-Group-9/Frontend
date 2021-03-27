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

    function fetchData(mode, date="01/01/2021", start="00:00", end="07:00"){
    
        fetch("http://localhost:8000/data").then(
            (resp) => {
                return resp.json();
            }
        ).then(
            (rawData) => {
                let dateS = date.split("/")
                let startS = start.split(":")
                let endS = end.split(":")
                for (let i = 0;i<2;i++){
                    dateS[i]= parseInt(dateS[i])
                    startS[i]= parseInt(startS[i])
                    endS[i]= parseInt(endS[i])
                }

                startS[1] = Math.ceil(startS[1] / 30) * 30;
                console.log(startS[1])

                let times=[];
                let time = new Date(dateS[2], dateS[1], dateS[0], startS[0], startS[1]);
                let endT = new Date(dateS[2], dateS[1], dateS[0], endS[0], endS[1], 1);

                while(time < endT){
                    times.push(("0"+time.getHours()).slice(-2)+":"+("0"+time.getMinutes()).slice(-2)); 
                    time.setMinutes(time.getMinutes()+mode)   
                }

                let dataobj = []
                times.forEach((item)=>{
                    let val = rawData.find((ob) => item ==ob.time)
                    if(val!=undefined){
                        dataobj.push(val)
                    }
                });
                setData(dataobj)
            }
        )
    }


    function getPeriodDataValues(periodVal, date, start, end){
        switch(periodVal){
            case "30 Minutes":
                fetchData(30, date, start, end);
                break;
            case "1 Hour":
                fetchData(60, date, start, end);
                break;
            case "2 Hours":
                fetchData(120, date, start, end);
                break;
            case "3 Hours":
                fetchData(180, date, start, end);
                break;
        }
        setValues(data.map(obj => obj.value))
        setTimes(data.map(obj => obj.time));
    }

    return (
        <Container style={{padding:0}}>
            <Grid style={{paddingTop:30}} container spacing={1}>
                <Grid item xs={4} sm={3}>
                    <ChartControl  setPeriods={getPeriodDataValues}/>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <StatCharts values={values} times={times} />
                </Grid>
            </Grid>
        </Container>
    )
};
