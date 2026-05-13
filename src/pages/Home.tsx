import MetricItem from "../components/dashboard/MetricItem";
import UserTable from "../components/dashboard/UserTable";
import PageMeta from "../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Event Registration"
        description="This is Dashboard page"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MetricItem />
        </div>

        <div className="col-span-12">
          <UserTable />
        </div>
      </div>
    </>
  );
}
