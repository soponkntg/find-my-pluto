import { ColorTag, PageLayout } from "@/component";
import { FemaleIcon } from "@/component/FemaleIcon";
import { MaleIcon } from "@/component/MaleIcon";
import Image from "next/image";
import bountyicon from "../../public/bounty.png";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import { GetStaticPaths, GetStaticProps } from "next";
import PlutoAxios from "../axios.config";
import { PetCardInfoI } from "@/constant/interface";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";

const DogId = ({
  animalId,
  userId,
  animal,
  postType,
  animalName,
  age,
  species,
  gender,
  colors,
  braceletColor,
  size,
  lastFoundPlace,
  lastSeenAt,
  bounty,
  userName,
  contact,
  images,
  description,
  stage,
  createdAt,
  expiredAt,
}: PetCardInfoI) => {
  const defaultProps = {
    center: {
      lat: lastFoundPlace.lat,
      lng: lastFoundPlace.lng,
    },
    zoom: 14,
  };
  console.log(lastFoundPlace);

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: { lat: lastFoundPlace.lat, lng: lastFoundPlace.lng },
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
            <Carousel showThumbs={false} autoPlay>
              {images.map((url, index) => (
                <div key={index} className="w-[300px] h-[300px] xs:w-[474px] xs:h-[474px]">
                  <Image src={url} alt={url} fill className="object-cover" loading="lazy" />
                </div>
              ))}
            </Carousel>
            {/* <Image src={dog} alt="dog" fill className="object-cover" /> */}
            <div className="absolute top-2 left-2">
              {gender == "เพศผู้" ? <MaleIcon /> : <FemaleIcon />}
            </div>
            {bounty && (
              <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl w-[120px] h-12 bg-secondary flex-center space-x-2">
                <Image src={bountyicon} alt={"" + bounty} width={16} height={22} />
                <p className="text-white text-xl">฿{bounty}</p>
              </div>
            )}
          </div>
          <div className="w-[300px] xs:w-[474px] flex justify-between items-center">
            <Link href={`http://line.me/ti/p/~${contact}`}>
              <button className="contact-button">ติดต่อคุณ{userName}</button>
            </Link>
            {/* <button className="contact-button">Facebook</button>
            <button className="contact-button">Instagram</button> */}
          </div>
        </div>
        <div className="flex-1 h-fit bg-detail-card px-8 py-6 rounded-3xl space-y-5 text-white">
          <h2 className="font-bold text-4xl">ข้อมูลน้อง</h2>
          <div className="text-xl space-y-2">
            <div className="flex items-start justify-between flex-wrap">
              {animalName && (
                <p className="grow">
                  <span className="font-semibold">น้อง :</span> {animalName}
                </p>
              )}
              {age && (
                <p className="grow">
                  <span className="font-semibold">อายุ :</span> {age} ปี
                </p>
              )}
            </div>
            <div className="flex items-start justify-between flex-wrap">
              <p className="grow">
                <span className="font-semibold">เพศ :</span> {gender}
              </p>
              <p className="grow">
                <span className="font-semibold">ขนาด :</span> {size}
              </p>
            </div>
            <p>
              <span className="font-semibold">สายพันธ์ :</span>
              {species}
            </p>

            <div className="flex items-center space-x-2 flex-wrap">
              <p className="font-semibold">สี :</p>
              {colors.map((color: string, index) => (
                <ColorTag color={color} key={index} />
              ))}
            </div>
            {braceletColor && (
              <div className="flex items-center space-x-2 flex-wra">
                <p className="font-semibold">สีปลอกคอ :</p>
                <ColorTag color={braceletColor} />
              </div>
            )}
            <p className="grow-[3]">
              <span className="font-semibold">
                วันเวลาที่{postType == "lost" ? "หาย" : "เจอ"} :
              </span>{" "}
              {moment(new Date(lastSeenAt)).format("MM/DD/YYYY h:mm")}
            </p>
            <p className="grow-[3]">
              <span className="font-semibold">สถานที่{postType == "lost" ? "หาย" : "เจอ"} :</span>{" "}
              {lastFoundPlace.subdistrict +
                ", " +
                lastFoundPlace.district +
                ", " +
                lastFoundPlace.province}
            </p>
          </div>
          {description && (
            <div className="space-y-2">
              <h2 className="font-bold text-2xl">รายละเอียดเพิ่มเติม</h2>
              <p className="text-xl">
                {description}
                {/* พลูโตเป็นหมาเฟรนลี่ ชอบเล่นกับคน พื้นฐานถูกเลี้ยงมาอย่างดี สามารถขอมือได้
              และฟังคำสั่งนั่งลงได้ ชอบกินอาหารเม็ด แพ้อาหารคน
              ไม่ควรให้ชอกโกแลตและผลไม้ตระกูลเบอร์รี่ หากพบเห็นอาการซึม ไม่ร่าเริงสดใส
              โปรดนำส่งโรงพยาบาลสัตว์ หรือติดต่อผู้เกี่ยวข้องโดยเร็วที่สุด */}
              </p>
            </div>
          )}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await PlutoAxios.post(`/dev/cards`);
  const cards = res.data.message;
  const paths = cards.map((card: { animalId: string }) => ({
    params: {
      dogId: card.animalId,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params;
  const dogId = params?.dogId;
  const res = await PlutoAxios.get(`/dev/card/${dogId}`);
  const dogInfo = res.data.message;
  return {
    props: { ...dogInfo },
    revalidate: 60,
  };
};

export default DogId;
