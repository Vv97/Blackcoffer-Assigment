import { useContext, useEffect, useState } from "react";
import { dashBoardContext } from "../../context/DashboardContext";
import axios, { AxiosResponse } from "axios";
import {
  DashboardResponseInterface,
  IAggData,
} from "../../types/dashboard.types";
import BarChart from "../../components/charts/BarChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import { aggregateData } from "../../components/charts/api";
import PolarAreaChart from "../../components/charts/PolarAreaChart";
import styles from "./Home.module.css";

export const Home = () => {
  const { data, setData } = useContext(dashBoardContext);
  const [polar, setPolar] = useState<Array<IAggData>>([]);

  const getDashboard = async () => {
    try {
      const res: AxiosResponse<DashboardResponseInterface> = await axios.get(
        "http://localhost:8080/api/dashboard?sector=Energy"
      );

      const data: AxiosResponse<DashboardResponseInterface> = await res;

      setData(data.data.dashboard);
    } catch (error) {
      console.log("Error while fetcing Dashboard data from api", error);
      throw error;
    }
  };

  useEffect(() => {
    getDashboard();

    const obj = JSON.stringify({ region: "$region", sector: "$sector" });
    aggregateData(obj, "$addToSet", setPolar);
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div className={styles.Home}>
      <main className={styles.upperSection}>
        <div>
          <BarChart
            data={data}
            labels="sector"
            dataTitle="intensity"
            barLabelx="sector"
            barLabely="intensity"
          />
        </div>
        <div>
          <BarChart
            data={data}
            labels="intensity"
            dataTitle="likelihood"
            barLabelx="intensity"
            barLabely="likelihood"
          />
        </div>
      </main>

      <main className={styles.upperSection}>
        <div>
          <PolarAreaChart
            data={polar}
            plabel={"total number of sector exist in this region is"}
          />
        </div>
        <div>
          <DoughnutChart />
        </div>
      </main>
    </div>
  );
};
