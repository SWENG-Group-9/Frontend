import { Container, Grid, Button, ButtonGroup, Typography, TextField} from "@material-ui/core";
import {useState, Effect, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
    gridStyle:{
        margin:3,
        [theme.breakpoints.up('lg')]: {
            margin:0,
            paddingLeft:10
        },
    },
    buttonStyle:{
        width:55,
        [theme.breakpoints.up('md')]: {
            width:90,
        },
    },
    periodText:{
        fontSize:18,
        paddingTop:15,
        fontStyle:"oblique"
    }
}))



export default function ChartControl({setPeriods}){
    const classes = useStyles();
    const periodChoices = ["30 Minutes", "1 Hour", "2 Hours", "3 Hours"];
    const [periodValue, setPeriodValue] = useState([0,"30 Minutes"]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:30");
    const [dataDate, setDataDate] = useState("2021-01-01");

    useEffect(()=>{
        setPeriods(periodValue[1],dataDate, startTime,endTime)
    },[periodValue, dataDate, startTime, endTime])

    const setPeriod = () => {
        let index = periodValue[0];
        if (index-(periodChoices.length-1)===0){
            index = 0;
        }
        else{
            index++;
        }
        setPeriodValue([index,periodChoices[index]]);
    }

    

    return(
        <Container>
            <Grid direction="column" alignItems="center" container spacing={4} 
                className={classes.gridStyle}>
                <Grid item>
                    <Button color="secondary" onClick={setPeriod} variant="contained">Period</Button>
                    <Typography className={classes.periodText} variant="h6" color="secondary" align="center">
                            {periodValue[1]}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        label="Start"
                        type="time"
                        InputLabelProps={{
                        shrink: true,
                    }}/>
                </Grid>
                <Grid item xs>
                    <TextField
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        label="End"
                        type="time"
                        InputLabelProps={{
                        shrink: true,
                    }}/>
                </Grid>
                <Grid item xs>
                    {(startTime>endTime)&&
                        <Typography variant="h5" color="initial">
                            This date selection is invalid
                        </Typography>
                    }
                </Grid>
                <Grid item xs>
                    <TextField
                        style={{width:140}}
                        value={dataDate}
                        id="date"
                        label="Select Date"
                        type="date"
                        onChange={(e)=>setDataDate(e.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                    }}/>   
                </Grid>
            </Grid>
        </Container>
    )
}