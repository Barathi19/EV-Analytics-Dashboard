import Table, { type Column } from "@/components/Table/Table";
import type { IEVData } from "@/interface";

const columns: Column<IEVData>[] = [
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "modelyear", label: "Year" },
  { key: "vehicletype", label: "Type" },
  { key: "city", label: "City" },
];

interface EVTableProps {
  data: IEVData[];
}

export default function EVTable({ data }: EVTableProps) {
  return <Table data={data} columns={columns} title="Electric Vehicle Data" />;
}
