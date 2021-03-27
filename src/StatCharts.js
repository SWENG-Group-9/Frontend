import { Container, Grid, Button, Typography } from '@material-ui/core'
import React from 'react';
import {Bar, Line} from 'react-chartjs-2'



export default function StatCharts({values, times}){
     
    return (
        <Container style={{paddingLeft:0}}>   
            <Container >
                {(values.length!=0)&&<Bar 
                    height={450}
                    data={{
                        labels:times,
                        datasets:[{
                            label: 'Number of People',
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
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />}
                {(values.length==0) && <Typography variant="h3" color="secondary" align="center">
                                            There is no Data for This Period       
                                         </Typography>}
            </Container>
        </Container>
    )
};