export const navlink = [
  { id: 1, title: "หาน้อง", slug: "/" },
  { id: 2, title: "เจอน้อง", slug: "/founddog" },
];

export const dogSpecies = [
  "เกรทเดน  Great Dane",
  "เกรทเทอร์ สวิสส์ เมาน์เทนด๊อก  Greater Swiss Mountain Dogs",
  "โกลเด้น รีทรีฟเวอร์  Golden Retriever",
  "คอเคเซียน เชพเพิร์ด  Caucasian Shepherd",
  "คอลลี่ Collie",
  "คาวาเลียร์ คิง ชาลส์ สแปเนียล  Cavalier King Charles Spaniel",
  "คีชอน  Keeshounds",
  "เคน คอร์โซ่  Cane Corso",
  "เครนเทอร์เรีย  Cairn Terrier",
  "เคอร์รี บลู เทอร์เรีย  Kerry Blue Terriers",
  "โคมอนดอร์   Komondor",
  "เจแปนนิส ชิน  Japanese Chins",
  "เจแปนนิส สปิตซ์  Japanese Spitz",
  "แจ็ครัสเซลล์เทอร์เรีย  Jack Russell Terrier",
  "ชเนาเซอร์  Schnauzer",
  "ชาเป่ย  Sharpei",
  "ชิบะ อินุ  Shiba Inu",
  "ชิวาวา  Chihuahua",
  "ชิสุ  ShihTzu",
  "เชดแลนด์ชิพด๊อก   Shetland Sheepdog",
  "เชา เชา  Chow Chow",
  "ไชนีส เครสเต็ด   Chinese Crested",
  "ซามอยด์  Samoyed",
  "ซาลูกิ  Saluki",
  "เซนต์เบอร์นาร์ด  St. Bernard",
  "เซาท์ แอฟริกัน มาสทิฟฟ์ (บัวโบว์)  South African Mastiff (Boerboel)",
  "ไซบีเรียน ฮัสกี้  Siberian Husky",
  "ดัชชุน  Dachshund",
  "ดัลเมเชียน  Dalmatian",
  "โดเบอร์แมน  Doberman Pinscher",
  "ทิเบตัน มาสทิฟฟ์  Tibetan Mastiff",
  "ไทยบางแก้ว  Thai Bangkaew",
  "ไทยหลังอาน  Thai Ridgeback",
  "นโปเลียน มาสทิฟฟ์   Neapolitan Mastiff",
  "บริตทานีสแปเนียล  Brittany Spaniel",
  "บลัดฮาวด์  Bloodhound",
  "บ็อกเซอร์  Boxer",
  "บอร์ซอย  Borzoi",
  "บอสตัน เทอร์เรียร์  Boston Terrier",
  "บาเซ็นจิ  Basenji",
  "บาสเซ็ต ฮาวด์  Basset Hound",
  "บิชอง ฟริเซ่  Bichon Frisé",
  "บีเกิล  Beagle",
  "บูลล์เทอร์เรีย  Bull Terrier",
  "เบดลิงตัน เทอร์เรียร์  Bedlington Terrier",
  "เบอร์นีส เมาน์เทนด็อก  Bernese Mountain Dog",
  "โบโลเนส  Bolognese",
  "ปอมเมอเรเนียน  Pomeranian",
  "ปักกิ่ง  Pekingese",
  "ปั๊ก  Pug",
  "ปาปิยอง  Papillon",
  "ปูมิ  Pumi",
  "พ็อมโบรค เวล์ช คอร์กี้  Pembroke Welsh Corgi",
  "พุดเดิ้ล  Poodle",
  "เฟรนช์ บูลด็อก  French Bulldog",
  "มอลทีส  Maltese",
  "มิเนเจอร์พินช์เชอร์  Miniature Pinscher",
  "ยอร์คเชียร์เทอร์เรีย  Yorkshire Terrier",
  "เยอรมัน สปิตซ์   German Spitz",
  "เยอรมันเชฟเฟิร์ด  German Shepherd",
  "ร็อตไวเลอร์  Rottweiler",
  "ลาบราดอร์รีทรีฟเวอร์  Labrador Retriever",
  "วิซสลา  Vizsla",
  "วิปเพ็ท  Whippet",
  "เวสตี้ เทอร์เรียร์  Westie Terrier",
  "ไวมาราเนอร์  Weimaraner",
  "สกาย เทอร์เรีย  Skye Terrier",
  "สมูธ ฟ็อกซ์ เทอร์เรีย  Smooth Fox Terrier",
  "อเมริกัน ค็อกเกอร์  American Cocker Spaniel",
  "อเมริกัน พิทบูลเทอร์เรีย  American Pit Bull Terrier",
  "อเมริกัน เอสกิโม  American Eskimo",
  "อเมริกันบูลล์ด็อก  American Bulldog",
  "อลาสกัน มาลามิวท์  Alaskan Malamute",
  "ออสเตรเลียน เชพเฟิร์ด   Australian Shepherd",
  "อัฟกัน ฮาวนด์  Afghan Hound",
  "อาคิตะ อินุ  Japanese Akita Inu",
  "อิงลิช บูลล์ด็อก  English Bulldogs",
  "อิตาเลียน เกรย์ฮาวด์  Italian Greyhound",
  "โอลด์อิงลิชชีปด็อก  Old English Sheepdog",
  "ไอริช วูล์ฟฮาวน์ด   Irish Wolfhound",
  "พันธุ์ผสม  Mixedbreed dog",
].map((breed) => {
  return { value: breed, label: breed };
});

export const area = {
  คลองสาน: ["สมเด็จเจ้าพระยา", "คลองสาน", "บางลำภูล่าง", "คลองต้นไทร"],
  คลองสามวา: ["สามวาตะวันตก", "สามวาตะวันออก", "บางชัน", "ทรายกองดิน", "ทรายกองดินใต้"],
  คลองเตย: ["คลองเตย", "คลองตัน", "พระโขนง"],
  คันนายาว: ["คันนายาว", "รามอินทรา"],
  จตุจักร: ["ลาดยาว", "เสนานิคม", "จันทรเกษม", "จอมพล", "จตุจักร"],
  จอมทอง: ["บางขุนเทียน", "บางค้อ", "บางมด", "จอมทอง"],
  ดอนเมือง: ["สีกัน", "ดอนเมือง", "สนามบิน"],
  ดินแดง: ["ดินแดง", "รัชดาภิเษก"],
  ดุสิต: ["ดุสิต", "วชิรพยาบาล", "สวนจิตรลดา", "สี่แยกมหานาค", "ถนนนครไชยศรี"],
  ตลิ่งชัน: ["คลองชักพระ", "ตลิ่งชัน", "ฉิมพลี", "บางพรม", "บางระมาด", "บางเชือกหนัง"],
  ทวีวัฒนา: ["ทวีวัฒนา", "ศาลาธรรมสพน์"],
  ทุ่งครุ: ["บางมด", "ทุ่งครุ"],
  ธนบุรี: ["วัดกัลยาณ์", "หิรัญรูจี", "บางยี่เรือ", "บุคคโล", "ตลาดพลู", "ดาวคะนอง", "สำเหร่"],
  บางกอกน้อย: ["ศิริราช", "บ้านช่างหล่อ", "บางขุนนนท์", "บางขุนศรี", "อรุณอมรินทร์"],
  บางกอกใหญ่: ["วัดอรุณ", "วัดท่าพระ"],
  บางกะปิ: ["คลองจั่น", "หัวหมาก"],
  บางขุนเทียน: ["ท่าข้าม", "แสมดำ"],
  บางคอแหลม: ["บางคอแหลม", "วัดพระยาไกร", "บางโคล่"],
  บางซื่อ: ["บางซื่อ", "วงศ์สว่าง"],
  บางนา: ["บางนาเหนือ", "บางนาใต้"],
  บางบอน: ["บางบอนเหนือ", "บางบอนใต้", "คลองบางพราน", "คลองบางบอน"],
  บางพลัด: ["บางพลัด", "บางอ้อ", "บางบำหรุ", "บางยี่ขัน"],
  บางรัก: ["มหาพฤฒาราม", "สีลม", "สุริยวงศ์", "บางรัก", "สี่พระยา"],
  บางเขน: ["อนุสาวรีย์", "ท่าแร้ง"],
  บางแค: ["บางแค", "บางแคเหนือ", "บางไผ่", "หลักสอง"],
  บึงกุ่ม: ["คลองกุ่ม", "นวมินทร์", "นวลจันทร์"],
  ปทุมวัน: ["รองเมือง", "วังใหม่", "ปทุมวัน", "ลุมพินี"],
  ประเวศ: ["ประเวศ", "หนองบอน", "ดอกไม้"],
  ป้อมปราบศัตรูพ่าย: ["ป้อมปราบ", "วัดเทพศิรินทร์", "คลองมหานาค", "บ้านบาตร", "วัดโสมนัส"],
  พญาไท: ["สามเสนใน", "พญาไท"],
  พระนคร: [
    "พระบรมมหาราชวัง",
    "วังบูรพาภิรมย์",
    "วัดราชบพิธ",
    "สำราญราษฎร์",
    "ศาลเจ้าพ่อเสือ",
    "เสาชิงช้า",
    "บวรนิเวศ",
    "ตลาดยอด",
    "ชนะสงคราม",
    "บ้านพานถม",
    "บางขุนพรหม",
    "วัดสามพระยา",
  ],
  พระโขนง: ["บางจาก", "พระโขนงใต้"],
  ภาษีเจริญ: [
    "บางหว้า",
    "บางด้วน",
    "บางจาก",
    "บางแวก",
    "คลองขวาง",
    "ปากคลองภาษีเจริญ",
    "คูหาสวรรค์",
  ],
  มีนบุรี: ["มีนบุรี", "แสนแสบ"],
  ยานนาวา: ["ช่องนนทรี", "บางโพงพาง"],
  ราชเทวี: ["ทุ่งพญาไท", "ถนนพญาไท", "ถนนเพชรบุรี", "มักกะสัน"],
  ราษฎร์บูรณะ: ["ราษฎร์บูรณะ", "บางปะกอก"],
  ลาดกระบัง: ["ลาดกระบัง", "คลองสองต้นนุ่น", "คลองสามประเวศ", "ลำปลาทิว", "ทับยาว", "ขุมทอง"],
  ลาดพร้าว: ["ลาดพร้าว", "จรเข้บัว"],
  วังทองหลาง: ["วังทองหลาง", "สะพานสอง", "คลองเจ้าคุณสิงห์", "พลับพลา"],
  วัฒนา: ["คลองเตยเหนือ", "คลองตันเหนือ", "พระโขนงเหนือ"],
  สวนหลวง: ["สวนหลวง", "อ่อนนุช", "พัฒนาการ"],
  สะพานสูง: ["สะพานสูง", "ราษฎร์พัฒนา", "ทับช้าง"],
  สัมพันธวงศ์: ["จักรวรรดิ", "สัมพันธวงศ์", "ตลาดน้อย"],
  สาทร: ["ทุ่งวัดดอน", "ยานนาวา", "ทุ่งมหาเมฆ"],
  สายไหม: ["สายไหม", "ออเงิน", "คลองถนน"],
  หนองจอก: [
    "กระทุ่มราย",
    "หนองจอก",
    "คลองสิบ",
    "คลองสิบสอง",
    "โคกแฝด",
    "คู้ฝั่งเหนือ",
    "ลำผักชี",
    "ลำต้อยติ่ง",
  ],
  หนองแขม: ["หนองแขม", "หนองค้างพลู"],
  หลักสี่: ["ทุ่งสองห้อง", "ตลาดบางเขน"],
  ห้วยขวาง: ["ห้วยขวาง", "บางกะปิ", "สามเสนนอก"],
};
