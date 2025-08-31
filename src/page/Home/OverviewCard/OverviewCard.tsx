import Card from "@/components/Card/Card";
import type { IOverviewData } from "@/interface";

interface OverviewCardProps {
  data: IOverviewData[];
}

function OverviewCard({ data }: OverviewCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {data.map((d) => (
        <Card key={d.title} title={d.title} value={d.value} icon={d.icon} />
      ))}
    </div>
  );
}

export default OverviewCard;
