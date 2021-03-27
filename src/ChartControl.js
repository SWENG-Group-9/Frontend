import { Container, Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import {useState, Effect, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
    gridStyle:{
        margin:3,
        [theme.breakpoints.up('md')]: {
            margin:0,
            paddingLeft:15
        },
    },
    buttonStyle:{
        width:55,
        [theme.breakpoints.up('md')]: {
            width:90,
        },
    },
    periodText:{
        fontSize:20,
        paddingTop:15,
        fontStyle:"oblique"
    }
}))



export default function ChartControl({setPeriods}){
    const classes = useStyles();
    const periodChoices = ["30 Minutes", "1 Hour", "2 Hours", "3 Hours"];
    const [periodValue, setPeriodValue] = useState([0,"30 Minutes"]);

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

    useEffect(()=>{
        console.log(periodValue);
        setPeriods(periodValue[1])
    },[periodValue])


    return(
        <Container>
            <Grid direction="column" alignItems="center" container spacing={5} 
                    className={classes.gridStyle}>
                    <Grid item>
                        <Button color="secondary" onClick={setPeriod} variant="contained">Period</Button>
                        <Typography className={classes.periodText} variant="h6" color="secondary" align="center">
                            {periodValue[1]}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup variant="outlined" color="secondary" aria-label="scope-chioce">
                          <Button className={classes.buttonStyle}>Start</Button>
                          <Button className={classes.buttonStyle}>End</Button>
                        </ButtonGroup>
                    </Grid>
            </Grid>
        </Container>
    )
}