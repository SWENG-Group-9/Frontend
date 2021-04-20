import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Grid } from "@material-ui/core";

import ChartControl from "../components/ChartControl";
import StatCharts from "../components/StatCharts";
import StatsTable from "../components/StatsTable";

function createData(name, data) {
  return { name, data };
}

export default function AppStatistics() {
  const [times, setTimes] = useState([]);
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateL, setDateL] = useState("");
  const [doorStatistics, setDoorStatistics] = useState([]);
  const [summaryStats, setSummaryStats] = useState([]);

  useEffect(() => {
    getDoorStatistics();
    getSummaryStatistics();
    getPeriodDataValues();
  }, [loading]);

  const getDoorStatistics = async () => {
    try {
      const getDevices = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/devices"
      );
      let lockedDoors = 0;
      getDevices.data.forEach((device) => {
        if (device[3]) {
          lockedDoors = lockedDoors + 1;
        }
      });

      const tempDoorStatistics = [
        createData("Doors in use", getDevices.data.length),
        createData("Locked Doors", lockedDoors),
        createData(
          "Unlocked Doors in use",
          getDevices.data.length - lockedDoors
        ),
        // createData("Automatic Queing System in Use", "Yes"),
      ];
      setDoorStatistics(tempDoorStatistics);
    } catch (e) {
      console.log(e);
    }
  };

  function highestOccurence(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const getSummaryStatistics = async () => {
    try {
      const getStats = await axios.get(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/api/stats"
      );

      let mostCustomersOneDay = 0;
      let averageCustomers = 0;
      let busiestDays = [];
      let quietestDays = [];
      Object.entries(getStats.data).forEach(([date, times]) => {
        let totalCustomers = 0;
        let busiest = {
          time: "00:00",
          value: 0,
        };
        let quietest = {
          time: "00:00",
          value: Number.MAX_VALUE,
        };

        times.forEach((time) => {
          totalCustomers = totalCustomers + time.value;
          if (time.value >= busiest.value) {
            busiest = time;
          }
          if (time.value <= quietest.value) {
            quietest = time;
          }
        });
        averageCustomers = averageCustomers + totalCustomers;
        busiestDays.push(busiest.time);
        quietestDays.push(quietest.time);

        if (mostCustomersOneDay < totalCustomers) {
          mostCustomersOneDay = totalCustomers;
        }
      });
      averageCustomers =
        averageCustomers / Object.entries(getStats.data).length;

      const tempSummaryTable = [
        createData("Most Customers in 1 Day", mostCustomersOneDay),
        createData("Busiest Time of Day", highestOccurence(busiestDays)),
        createData("Quietest Time of day", highestOccurence(quietestDays)),
        createData(
          "Average Number of Customers per Day",
          Math.round(averageCustomers)
        ),
      ];
      setSummaryStats(tempSummaryTable);
    } catch (e) {
      console.log(e);
    }
  };

  function fetchData(mode, date, start, end) {
    setLoading(true);
    setDateL(date);
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "/api/stats/" + date)
      .then((resp) => {
        // console.log(resp);
        if (!resp.ok) {
          setFound(false);
          throw Error("Could not find data for this period");
        }
        return resp.json();
      })
      .then((rawData) => {
        rawData = rawData[date];
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

        // console.log(timesar);

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
          <StatsTable title="Summary Statistics" data={summaryStats} />
        </Grid>
        <Grid item xs={6} sm={6} container spacing={40}>
          <StatsTable title="Door Summary Statistics" data={doorStatistics} />
        </Grid>
      </Grid>
    </Container>
  );
}
