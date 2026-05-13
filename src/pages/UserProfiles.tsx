import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import { CouponCard } from "../components/UserProfile/CouponCard";
import PageMeta from "../components/common/PageMeta";

export default function UserProfiles() {
  // สมมติข้อมูล (ในอนาคตต้องดึงจาก Supabase Table: users และ coupons)
  const mockData = {
    userName: "Jhon Doe",
    couponId: "CPN-8899-001",
    couponTitle: "FREE LUNCH",
  };

  return (
    <>
      <PageMeta
        title="Profile | Event Registration"
        description="This is Profile page"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          My Profile & Coupon
        </h3>

        <div className="space-y-6">
          <UserMetaCard />

          <div className="pt-4">
            <h4 className="text-center font-medium text-gray-700 dark:text-gray-300">
              Your Event Coupon
            </h4>
            <CouponCard
              couponTitle={mockData.couponTitle}
              couponId={mockData.couponId}
              userName={mockData.userName}
            />
          </div>
        </div>
      </div>
    </>
  );
}
