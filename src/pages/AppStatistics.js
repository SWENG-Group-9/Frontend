import { Container, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import ChartControl from "../components/ChartControl";
import StatCharts from "../components/StatCharts";
import SummaryStatsTable from "../components/SummaryStatsTable";
import DoorStatisticsTable from "../components/DoorStatisticsTable";

export default function AppStatistics() {
  const [times, setTimes] = useState([]);
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateL, setDateL] = useState("");

  useEffect(() => {
    getPeriodDataValues();
  }, [loading]);

  function fetchData(mode, date, start, end) {
    setLoading(true);
    setDateL(date);
    fetch("http://localhost:8000/" + date)
      .then((resp) => {
        console.log(resp);
        if (!resp.ok) {
          setFound(false);
          throw Error("Could not find data for this period");
        }
        return resp.json();
      })
      .then((rawData) => {
        let dateS = date.split("-");
        let startS = start.split(":");
        let endS = end.split(":");
        for (let i = 0; i < 2; i++) {
          dateS[i] = parseInt(dateS[i]);
          startS[i] = parseInt(startS[i]);
          endS[i] = parseInt(endS[i]);
        }

        startS[1] = Math.ceil(startS[1] / 30) * 30;

        let timesar = [];
        let time = new Date(dateS[0], dateS[1], dateS[2], startS[0], startS[1]);
        let endT = new Date(dateS[0], dateS[1], dateS[2], endS[0], endS[1], 1);

        while (time < endT) {
          timesar.push(
            ("0" + time.getHours()).slice(-2) +
              ":" +
              ("0" + time.getMinutes()).slice(-2)
          );
          time.setMinutes(time.getMinutes() + mode);
        }

        console.log(timesar);

        let dataobj = [];
        timesar.forEach((item) => {
          let val = rawData.find((ob) => item == ob.time);
          if (val != undefined) {
            dataobj.push(val);
          }
        });
        setData(dataobj);
        setFound(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }

  function getPeriodDataValues(periodVal, date, start, end) {
    switch (periodVal) {
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
    setValues(data.map((obj) => obj.value));
    setTimes(data.map((obj) => obj.time));
  }

  return (
    <Container style={{ padding: 0 }} spacing={20}>
      <Grid style={{ paddingTop: 30 }} container spacing={10}>
        <Grid item xs={4} md={3}>
          <ChartControl setPeriods={getPeriodDataValues} />
        </Grid>
        <Grid item xs={8} sm={8} spacing={1}>
          <StatCharts
            loading={loading}
            date={dateL}
            found={found}
            values={values}
            times={times}
          />
        </Grid>
        <Grid item xs={5} sm={5} container spacing={40}>
          <SummaryStatsTable />
        </Grid>
        <Grid item xs={6} sm={6} container spacing={40}>
          <DoorStatisticsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
