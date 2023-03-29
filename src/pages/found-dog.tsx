import { PageLayout } from "@/component";
import { Carousel } from "react-responsive-carousel";
import dog from "../../public/dog.png";
import Image from "next/image";

const FoundDog = () => {
  return (
    <PageLayout>
      <div>
        <Carousel>
          <div
            className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative object-contain ${"rounded-b-xl"}`}
          >
            <Image src={dog} alt="dog" fill />
          </div>
          <div
            className={`w-[300px] h-[400px] rounded-t-xl overflow-hidden relative object-contain ${"rounded-b-xl"}`}
          >
            <Image src={dog} alt="dog" fill />
          </div>
        </Carousel>
      </div>
    </PageLayout>
  );
};

export default FoundDog;
