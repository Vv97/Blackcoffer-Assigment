import axios, { AxiosResponse } from "axios";
import {
  IAggData,
  IAggFetchData,
  IFetchData,
  getData,
} from "../../types/dashboard.types";

export async function fetchData(
  groupByField: string | number | object,
  aggregationOperator: string,
  setterFuntion: (res: Array<getData>) => void = () => {}
) {
  const url = `http://localhost:8080/api/dashboard/aggregate?groupByField=${groupByField}&aggregationOperator=${aggregationOperator}`;
  try {
    const data: AxiosResponse<IFetchData> = await axios.get(url);

    const res: AxiosResponse<IFetchData> = await data;

    if (res.data.data) {
      setterFuntion(res.data.data);
    }
  } catch (error) {
    console.log("Error while fetcing data from db", error);
    throw error;
  }
}

export async function aggregateData(
  groupByField: string | number | object,
  aggregationOperator: string,
  setterFuntion: (res: Array<IAggData>) => void = () => {}
) {
  const url = `http://localhost:8080/api/dashboard/aggregate?groupByField=${groupByField}&aggregationOperator=${aggregationOperator}&query=1`;
  try {
    const data: AxiosResponse<IAggFetchData> = await axios.get(url);

    const res: AxiosResponse<IAggFetchData> = await data;

    if (res.data.data) {
      setterFuntion(res.data.data);
    }
  } catch (error) {
    console.log("Error while fetcing data from db", error);
    throw error;
  }
}
