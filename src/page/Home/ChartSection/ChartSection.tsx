import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import type { IEVData } from "@/interface";
import React, { useMemo } from "react";

const COLORS = {
  primary: "#2563eb",
  secondary: "#16a34a",
  accent: "#f59e0b",
};

interface ChartWrapperProps {
  title: string;
  chart: React.ReactNode;
}

interface Props {
  data: IEVData[];
}

const FormattedToolTip = () => (
  <Tooltip formatter={(value: number) => value.toLocaleString()} />
);

const ChartWrapper = ({ title, chart }: ChartWrapperProps) => (
  <div
    className="bg-white p-4 rounded-xl shadow border
      border-gray-100
      hover:shadow-lg 
      hover:border-blue-300
      transition-all 
      duration-300 
      cursor-pointer
      flex flex-col"
  >
    <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
    <div className="flex-1">{chart}</div>
  </div>
);

export default function ChartsSection({ data }: Props) {
  const chartData = useMemo(() => {
    const years: Record<string, number> = {};
    let bev = 0,
      phev = 0;
    const makers: Record<string, number> = {};
    const cities: Record<string, number> = {};

    data.forEach((d) => {
      years[d.modelyear] = (years[d.modelyear] || 0) + 1;

      if (d.vehicletype.toLowerCase().includes("bev")) bev++;
      else if (d.vehicletype.toLowerCase().includes("phev")) phev++;

      makers[d.make] = (makers[d.make] || 0) + 1;

      const cityKey = d.city?.toUpperCase().trim() || "Unknown";
      cities[cityKey] = (cities[cityKey] || 0) + 1;
    });

    const byYear = Object.entries(years)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year);

    const topCities = Object.entries(cities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city, count]) => ({ city, count }));

    const topMakers = Object.entries(makers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([make, count]) => ({ make, count }));

    return {
      byYear,
      bevVsPhev: [
        { name: "BEV", value: bev },
        { name: "PHEV", value: phev },
      ],
      topCities,
      topMakers,
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      {/* Line Chart */}
      <ChartWrapper
        title="EV Growth by Year"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.byYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <FormattedToolTip />
              <Line
                type="monotone"
                dataKey="count"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        }
      />

      {/* Pie Chart */}
      <ChartWrapper
        title="BEV vs PHEV"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.bevVsPhev}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ percent }) =>
                  `${(Number(percent) * 100).toFixed(1)}%`
                }
              >
                <Cell fill={COLORS.primary} /> {/* BEV */}
                <Cell fill={COLORS.secondary} /> {/* PHEV */}
              </Pie>
              <Legend align="center" />
              <FormattedToolTip />
            </PieChart>
          </ResponsiveContainer>
        }
      />

      {/* Bar Chart Top Makers */}
      <ChartWrapper
        title="Top 5 Manufacturers"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.topMakers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="make" />
              <YAxis />
              <FormattedToolTip />
              <Bar dataKey="count" fill={COLORS.primary}>
                {chartData.topMakers.map((_, i) => (
                  <Cell key={i} fill={`hsl(217, 90%, ${50 + i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        }
      />

      {/* Bar Chart Top Cities */}
      <ChartWrapper
        title="Top 5 Cities"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.topCities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <FormattedToolTip />
              <Bar dataKey="count" fill={COLORS.accent}>
                {chartData.topCities.map((_, i) => (
                  <Cell key={i} fill={`hsl(37.7, 92.1%, ${50 + i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        }
      />
    </div>
  );
}
