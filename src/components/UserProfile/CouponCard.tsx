import { QRCodeSVG } from "qrcode.react";

interface CouponProps {
  couponTitle: string;
  couponId: string;
  userName: string;
  eventDate?: string;
}

export const CouponCard = ({
  couponTitle,
  couponId,
  userName,
  eventDate = "28.08.2025",
}: CouponProps) => {
  return (
    // ปรับความสูงลงเหลือ md:h-48 (ประมาณ 192px) เพื่อให้ดูเพรียวขึ้น
    <div className="relative w-full max-w-md md:max-w-2xl mx-auto my-6 flex flex-col md:flex-row filter drop-shadow-lg overflow-hidden rounded-3xl transition-all hover:shadow-2xl">
      
      {/* ส่วนที่ 1: ฝั่งซ้าย (Main Body) */}
      <div className="relative flex-[2] bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 p-6 flex flex-col justify-between overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-dashed border-white/20">
        
        {/* กราฟิก 2026 ปรับให้เล็กลงไปอีกเพื่อไม่ให้เกะกะ */}
        <div className="absolute -left-2 -bottom-4 text-6xl font-black text-white opacity-10 pointer-events-none">
          2026
        </div>

        <div className="relative z-10">
          <p className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-bold mb-1">
            Exclusive Invitation
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight italic uppercase drop-shadow-sm truncate">
            {couponTitle}
          </h2>
        </div>

        <div className="relative z-10 mt-4 md:mt-0 flex gap-6 text-[11px] text-white uppercase font-bold">
          <div className="bg-black/10 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-white/60 mr-2">Guest:</span>{userName}
          </div>
          <div className="bg-black/10 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-white/60 mr-2">Location:</span>Main Hall
          </div>
        </div>
      </div>

      {/* ส่วนที่ 2: ฝั่งขวา (The Stub) - ปรับให้กะทัดรัดขึ้น */}
      <div className="relative flex-1 bg-white flex flex-col items-center justify-center p-6 md:p-4">
        
        <div className="bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
          <QRCodeSVG value={couponId} size={100} level="H" className="w-24 h-24 md:w-28 md:h-28" />
        </div>

        {/* ข้อมูล ID และวันที่ แบบบรรทัดเดียวสะอาดๆ */}
        <div className="mt-4 flex md:flex-col items-center gap-3 md:gap-1">
          <p className="text-[10px] font-bold text-orange-600 tracking-tighter">
            {eventDate}
          </p>
          <p className="text-[10px] font-medium text-gray-400 uppercase">
            #{couponId.split("-").pop()}
          </p>
        </div>
      </div>
    </div>
  );
};