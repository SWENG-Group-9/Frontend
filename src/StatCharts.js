import { Container, Grid, Button } from '@material-ui/core'
import React from 'react';
import {Bar, Line} from 'react-chartjs-2'



export default function StatCharts({values, times}){
     
    return (
        <Container style={{paddingLeft:0}}>   
            <Container >
                <Bar 
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
                />
            </Container>
        </Container>
    )
};