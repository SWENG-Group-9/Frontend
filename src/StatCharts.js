import { Container, Typography, Paper, CircularProgress, Grid } from '@material-ui/core'
import React from 'react';
import {Bar, Line} from 'react-chartjs-2'



export default function StatCharts({values, times, found, loading, date}){
     
    return (
        <Container style={{paddingLeft:0}}>   
            <Container >
                {(found)&&(!loading)&&<Bar 
                    height={470}
                    max
                    data={{
                        labels:times,
                        datasets:[{
                            label: 'Number of People on '+ date,
                            data: values,
                            backgroundColor:'#4ecdc4',
                            borderColor:'crimson'

                        }],
                    }}
                    options={{
                        maintainAspectRatio:false,
                        layout:{
                            padding:0
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    max:100
                                }
                            }]
                        }
                    }}
                />}
                {(!found) && (!loading) &&
                <Paper variant="outlined" style={{backgroundColor:"#f7fff7", padding:80, borderWidth:3, 
                 borderColor:"#4ecdc4", marginTop:100}}>
                    <Typography variant="h4" color="primary" align="center">
                        There is no Data for This Period       
                    </Typography>
                </Paper>
                }
                {(loading)&&<Grid container style={{padding:200}} spacing={0}>
                    <Grid item xs={5}>
                        <Typography  variant="h4" color="primary" align="center">
                            Loading...   
                        </Typography>
                    </Grid> 
                    <Grid item xs={2}>
                        <CircularProgress style={{margin:0}}/>
                    </Grid>
                </Grid>}
            </Container>
        </Container>
    )
};