import { useRouter } from "next/router";

export const Description = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="flex flex-col lg:flex-row mb-10 text-neutrals-300 gap-5">
      <div className="bg-detail-card py-8 lg:py-16 rounded-lg grid content-center text-center w-full">
        <h1 className="text-3xl lg:text-7xl font-bold">
          {path == "/" ? "ประกาศตามหาสัตว์เลี้ยง" : "ประกาศตามหาเจ้าของ"}
        </h1>
      </div>
      <div className="bg-secondary/70 text-md lg:text-lg p-4 md:p-8 rounded-lg grid content-center w-full md:w-[55%]">
        <ul className="list-disc mx-3">
          <li>สร้างประกาศไ่ด้ที่ปุ่ม สร้างประกาศ</li>
          <li>คัดกรองประกาศได้ที่ ตัวเลือกค้นหาน้อง</li>
          <li>
            ไปหน้าประกาศตามหา
            {path == "/" ? "เจ้าของเลือก เจอน้อง ตรงเมนู" : "สัตว์เลี้ยง หาน้อง ตรงเมนู"}
          </li>
        </ul>
      </div>
    </div>
  );
};
