import Layout from "@/layout";
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import type { IEVData, IOverviewData } from "@/interface";
import { BEVType, headerMap } from "@/utils/headerMap";
import { FaCar, FaBolt, FaIndustry } from "react-icons/fa";
import { GiBattery100 } from "react-icons/gi";
import OverviewCard from "./OverviewCard/OverviewCard";
import ChartsSection from "./ChartSection/ChartSection";
import EVTable from "./EVTablle/EVTable";
import Loader from "@/components/Loader/Loader";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IEVData[]>([]);

  const overviewData: IOverviewData[] = useMemo(() => {
    const totalVehicle = data.length;
    let totalElectricRangeAvg = 0;
    let totalBEV = 0;
    const makerOcc: Record<string, number> = {};

    data.forEach((row) => {
      totalElectricRangeAvg += Number(row.electricrange) || 0;
      totalBEV += row.vehicletype === BEVType ? 1 : 0;
      makerOcc[row.make] = (makerOcc[row.make] || 0) + 1;
    });

    totalElectricRangeAvg = totalElectricRangeAvg / data.length;

    const topMaker = Object.entries(makerOcc)?.sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    return [
      {
        value: totalVehicle,
        title: "Total EVs",
        icon: <FaCar className="text-blue-600 text-3xl" />,
      },
      {
        value: `${totalElectricRangeAvg.toFixed(1)} mi`,
        title: "Avg Range",
        icon: <GiBattery100 className="text-green-600 text-3xl" />,
      },
      {
        value: `${
          totalVehicle > 0 ? ((totalBEV / totalVehicle) * 100).toFixed(2) : 0
        }%`,
        title: "% BEV",
        icon: <FaBolt className="text-yellow-500 text-3xl" />,
      },
      {
        value: topMaker,
        title: "Top Make",
        icon: <FaIndustry className="text-indigo-500 text-3xl" />,
      },
    ];
  }, [data]);

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        return headerMap[header] || header.replace(/\s+/g, "").toLowerCase();
      },
      complete: (result) => {
        const parsed: IEVData[] = result.data as IEVData[];
        setData(parsed);
        setIsLoading(false);
      },
    });
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="animate-fade">
          <OverviewCard data={overviewData} />
          <ChartsSection data={data} />
          <EVTable data={data} />
        </div>
      )}
    </Layout>
  );
}

export default Home;
