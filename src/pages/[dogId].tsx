import { ColorTag, PageLayout } from "@/component";
import { FemaleIcon } from "@/component/FemaleIcon";
import { MaleIcon } from "@/component/MaleIcon";
import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import dog from "../../public/dog.png";
import GoogleMapReact from "google-map-react";

const DogId = () => {
  const gender = "male";
  const bounty = 2000;

  const defaultProps = {
    center: {
      lat: 13.72433,
      lng: 100.50917,
    },
    zoom: 14,
  };

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: 13.72433, lng: 100.50917 },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  return (
    <PageLayout>
      <div className="flex flex-col space-y-16 md:space-y-0 md:flex-row md:space-x-24 md:items-start">
        <div className="flex-center flex-col space-y-10">
          <div className="w-[300px] h-[300px] xs:w-[474px] xs:h-[474px] rounded-t-xl overflow-hidden relative rounded-b-xl">
            <Image src={dog} alt="dog" fill className="object-cover" />
            <div className="absolute top-2 left-2">
              {gender == "male" ? <MaleIcon /> : <FemaleIcon />}
            </div>
            <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl w-[120px] h-12 bg-secondary flex-center space-x-2">
              <Image src={bountyicon} alt={"" + bounty} width={16} height={22} />
              {bounty && <p className="text-white text-xl">฿{bounty}</p>}
            </div>
          </div>
          <div className="w-[300px] xs:w-[474px] flex justify-between items-center">
            <button className="contact-button">ติดต่อ</button>
            <button className="contact-button">Facebook</button>
            <button className="contact-button">Instagram</button>
          </div>
        </div>
        <div className="flex-1 h-fit bg-detail-card px-8 py-6 rounded-3xl space-y-5 text-white">
          <h1 className="font-bold text-4xl">ข้อมูลน้อง</h1>
          <div className="text-xl space-y-2">
            <div className="">
              <p className="grow">
                <span className="font-semibold">น้อง :</span> พลูโต
              </p>
              <p className="grow">
                <span className="font-semibold">อายุ :</span> 8 ปี
              </p>
              <p className="grow-[3]">
                <span className="font-semibold">วันเวลาที่หาย :</span> 16/02/2565 12:00
              </p>
            </div>
            <div className="flex items-start justify-between flex-wrap">
              <p className="grow">
                <span className="font-semibold">เพศ :</span> ชาย
              </p>
              <p className="grow">
                <span className="font-semibold">ขนาด :</span> กลาง
              </p>
              <p className="grow-[3]">
                <span className="font-semibold">สถานที่หาย :</span> บางโพงพาง, ยานนาวา
              </p>
            </div>
            <p>
              <span className="font-semibold">สายพันธ์ :</span> พูลเดิ้ล
            </p>
            <div className="flex items-center space-x-2 flex-wrap">
              <p className="font-semibold">สี :</p>
              <ColorTag color="goldenBrown" />
            </div>
            <div className="flex items-center space-x-2 flex-wra">
              <p className="font-semibold">สีปลอกคอ :</p>
              <ColorTag color="goldenBrown" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-2xl">รายละเอียดเพิ่มเติม</h2>
            <p className="text-xl">
              พลูโตเป็นหมาเฟรนลี่ ชอบเล่นกับคน พื้นฐานถูกเลี้ยงมาอย่างดี สามารถขอมือได้
              และฟังคำสั่งนั่งลงได้ ชอบกินอาหารเม็ด แพ้อาหารคน
              ไม่ควรให้ชอกโกแลตและผลไม้ตระกูลเบอร์รี่ หากพบเห็นอาการซึม ไม่ร่าเริงสดใส
              โปรดนำส่งโรงพยาบาลสัตว์ หรือติดต่อผู้เกี่ยวข้องโดยเร็วที่สุด
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[200px] md:h-[400px] mt-10 rounded-xl overflow-hidden">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.google || "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        />
      </div>
    </PageLayout>
  );
};

export default DogId;
