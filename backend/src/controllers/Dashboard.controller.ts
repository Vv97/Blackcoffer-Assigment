import { Request, Response } from "express";
import { DashboardItem } from "../types/Dashboard.type";
import DashboardModel from "../models/Dashboard.model";

interface PartialDashboardItem extends Partial<DashboardItem> {
  [key: string | number]: any; // Index signature to allow any string key
}

// Define a function to process query parameters
function processQueryParam<T>(
  req: Request,
  param: string,
  defaultValue: T | undefined = undefined
): T | undefined {
  const value = req.query[param] as T | undefined;
  return value !== undefined ? value : defaultValue;
}

export const getDashboardController = async (req: Request, res: Response) => {
  try {
    const filters: PartialDashboardItem = {
      end_year: processQueryParam<string>(req, "end_year"),
      topic: processQueryParam<string>(req, "topic"),
      sector: processQueryParam<string>(req, "sector"),
      region: processQueryParam<string>(req, "region"),
      pestle: processQueryParam<string>(req, "pestle"),
      source: processQueryParam<string>(req, "source"),
      City: processQueryParam<string>(req, "City"),
      country: processQueryParam<string>(req, "country"),
      relevance: processQueryParam<number>(req, "relevance"),
    };

    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * limit;

    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    let dashboard: DashboardItem[] = await DashboardModel.find(filters)
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).send({
      message: "successfully get dashboard",
      success: true,
      dashboard,
    });
  } catch (error: any) {
    console.log("error while fecting Dashboard data from db", error);
    return res.status(400).send({
      success: false,
      message: "error while fecting Dashboard data from db",
      error,
    });
  }
};

export const aggregateDashboardcontroller = async (
  req: Request,
  res: Response
) => {
  try {
    const groupByField = req.query.groupByField as string;
    const aggregationOperator = req.query.aggregationOperator as string;
    let q = req.query.query as string;
    let queryType: undefined | number;

    if (!isNaN(parseInt(q))) {
      queryType = parseInt(q);
    }

    if (!groupByField && !aggregationOperator) {
      return res.status(400).send({
        message:
          "Both groupByField and aggregationOperator query parameters are required",
      });
    }

    const pipeline = [];

    if (queryType === 1) {
      // groupByField is an object
      pipeline.push(
        {
          $group: {
            _id: JSON.parse(groupByField),
          },
        },
        {
          $group: {
            _id: "$_id.region", // Group by region to count unique sectors in each region
            sectors: { [aggregationOperator]: "$_id.sector" }, // Collect unique sectors in an array
          },
        }
      );
    } else {
      pipeline.push({
        $group: {
          _id: `$${groupByField}`, // Group by the field
          count: { [aggregationOperator]: 1 }, // Count the number of documents in each group
        },
      });
    }

    const getData = await DashboardModel.aggregate(pipeline);

    res.send({ data: getData });
  } catch (error) {
    throw error;
  }
};
