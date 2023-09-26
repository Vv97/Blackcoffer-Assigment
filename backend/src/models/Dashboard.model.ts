import mongoose, { Schema } from "mongoose";
import { DashboardItem } from "../types/Dashboard.type";

const DashboardSchema: Schema<DashboardItem> = new mongoose.Schema(
  {
    end_year: { type: String, require },
    intensity: { type: Number, require },
    sector: { type: String, require },
    topic: { type: String, require },
    insight: { type: String, require },
    url: { type: String, require },
    region: { type: String, require },
    start_year: { type: String, require },
    impact: { type: String, require },
    added: { type: String, require },
    published: { type: String, require },
    country: { type: String, require },
    relevance: { type: Number, require },
    pestle: { type: String, require },
    source: { type: String, require },
    title: { type: String, require },
    likelihood: { type: Number, require },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<DashboardItem>("dashboard", DashboardSchema);
