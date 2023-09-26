import { Request, Response, Router } from "express";
import fs from "fs";
import { DashboardData, DashboardItem } from "../types/Dashboard.type";
import DashboardModel from "../models/Dashboard.model";
import {
  aggregateDashboardcontroller,
  getDashboardController,
} from "../controllers/Dashboard.controller";

const dashboardRouter = Router();

type GroupByField = string | object | undefined;

// GET : /api/dashboard
dashboardRouter.get("/", getDashboardController);

dashboardRouter.get("/aggregate", aggregateDashboardcontroller);
export default dashboardRouter;
