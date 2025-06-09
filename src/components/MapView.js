import React, { useEffect, useState } from "react";

function loadKakaoScript(appKey) {
  return new Promise((resolve) => {
    if (window.kakao) {
      resolve(window.kakao);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services,clusterer`;
    script.async = true;
    script.onload = () => {
      resolve(window.kakao);
    };
    document.head.appendChild(script);
  });
}

const MapView = () => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  const stores = [
    {
        name: "9000냥프로헤어",
        industry: "미용업",
        address: "충청남도 천안시 동남구 충무로 412-27 2층(영성동)",
        priceInfo: "커트: 9,000원",
        phone: ""
      },
      {
        name: "가마솥 선지국밥",
        industry: "한식",
        address: "충청남도 천안시 동남구 사직로 2-2 1층(사직동)",
        priceInfo: "선지국밥: 5,000원",
        phone: "041-574-5665"
      },
      {
        name: "가화손만두 옛날통닭",
        industry: "한식",
        address: "충청남도 천안시 동남구 큰재빼기길 28 (오룡동)",
        priceInfo: "옛날통닭: 8,000원",
        phone: "041-558-0863"
      },
      {
        name: "강짬뽕",
        industry: "중식",
        address: "충청남도 천안시 동남구 신부12길 12 (신부동) 1층",
        priceInfo: "자장면: 5,000원",
        phone: "0507-1357-6142"
      },
      {
        name: "겨자씨까페",
        industry: "기타요식업",
        address: "충청남도 천안시 동남구 사직로 10-6 (사직동)",
        priceInfo: "아메리카노: 2,000원",
        phone: "041-555-0738"
      },
      {
        name: "경북당",
        industry: "한식",
        address: "충청남도 천안시 동남구 병천면 아우내장터2길 46",
        priceInfo: "칼국수: 7,000원",
        phone: "041-561-4133"
      },
      {
        name: "경자네칼국수",
        industry: "한식",
        address: "충청남도 천안시 서북구 월봉5길 7 (쌍용동) 102호",
        priceInfo: "칼국수: 7,000원",
        phone: "041-578-7676"
      },
      {
        name: "고운육회방앗간",
        industry: "한식",
        address: "충청남도 천안시 서북구 백석3로 25 (백석동) 1층",
        priceInfo: "한우육회비빔밥: 10,000원",
        phone: "041-551-8890"
      },
      {
        name: "고쿠락",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 삼은3길 6-23",
        priceInfo: "닭갈비(250g): 12,000원",
        phone: "041-583-1254"
      },
      {
        name: "공감정육식당",
        industry: "한식",
        address: "충청남도 천안시 동남구 구성1길 10 (구성동)",
        priceInfo: "삼겹살(200g): 14,000원",
        phone: ""
      },
      {
        name: "과수원길",
        industry: "한식",
        address: "충청남도 천안시 서북구 업성1길 7 (성성동)",
        priceInfo: "삼겹살(500g): 35,000원",
        phone: "041-567-8992"
      },
      {
        name: "구좌리얼크니손칼국수",
        industry: "한식",
        address: "충청남도 천안시 동남구 용곡6길 7-24 (용곡동) 1층",
        priceInfo: "샤브칼국수: 11,000원",
        phone: "041-578-3999"
      },
      {
        name: "국빈4000냥미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 대흥로 132-2 (사직동)",
        priceInfo: "커트: 6,000원",
        phone: ""
      },
      {
        name: "굿모닝호텔",
        industry: "숙박업",
        address: "충청남도 천안시 서북구 차돌들길 11-5 (쌍용동)",
        priceInfo: "숙박료: 40,000원",
        phone: "041-578-6363"
      },
      {
        name: "김밥군쫄면양",
        industry: "한식",
        address: "충청남도 천안시 동남구 충절로 311 (구성동) 109호",
        priceInfo: "김밥: 3,000원",
        phone: ""
      },
      {
        name: "김밥하나",
        industry: "한식",
        address: "충청남도 천안시 동남구 대흥로 340 (신부동)",
        priceInfo: "김밥: 3,000원",
        phone: "041-556-6247"
      },
      {
        name: "꽃샘미용실",
        industry: "미용업",
        address: "충청남도 천안시 서북구 입장면 성진로 593 나동 1층",
        priceInfo: "커트: 14,000원",
        phone: "041-622-2937"
      },
      {
        name: "낙지도사",
        industry: "한식",
        address: "충청남도 천안시 동남구 백석로 184 (봉명동)",
        priceInfo: "낙지덮밥: 12,900원",
        phone: "041-577-4562"
      },
      {
        name: "낙지도사 직산4공단점",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 4산단7로 28 3동 101호",
        priceInfo: "낙지덮밥: 11,900원",
        phone: "041-588-4562"
      },
      {
        name: "남성커트오천",
        industry: "이용업",
        address: "충청남도 천안시 서북구 월봉로 66 (쌍용동)",
        priceInfo: "커트: 7,000원",
        phone: ""
      },
      {
        name: "남성컷트오천냥클럽",
        industry: "이용업",
        address: "충청남도 천안시 동남구 서부대로 257-3 105호(신방동)",
        priceInfo: "커트: 7,000원",
        phone: "041-572-5283"
      },
      {
        name: "넘버원 남성컷트",
        industry: "미용업",
        address: "충청남도 천안시 서북구 두정로 263 (두정동)",
        priceInfo: "커트: 6,700원",
        phone: "041-904-1020"
      },
      {
        name: "늑대골",
        industry: "한식",
        address: "충청남도 천안시 동남구 풍세로 696 (구룡동)",
        priceInfo: "백반: 8,000원",
        phone: "041-573-5122"
      },
      {
        name: "대왕매실갈비",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 아랫말1길 8",
        priceInfo: "꽃등심(200g): 30,000원",
        phone: "041-585-3392"
      },
      {
        name: "대호갈비",
        industry: "한식",
        address: "충청남도 천안시 동남구 공설시장2길 9-2 (대흥동)",
        priceInfo: "돼지갈비(250g): 15,000원",
        phone: "041-564-0790"
      },
      {
        name: "더드림빵",
        industry: "베이커리",
        address: "충청남도 천안시 동남구 차돌고개5길 15 (다가동) 1동 102호",
        priceInfo: "단팥빵/소보로빵/슈크림빵/생크림빵: 1,500원",
        phone: "041-577-4473"
      },
      {
        name: "동은헤어",
        industry: "미용업",
        address: "충청남도 천안시 동남구 새말3길 38-4 지하1층(신방동)",
        priceInfo: "커트: 10,000원",
        phone: "070-4036-7721"
      },
      {
        name: "동화당만두찐빵",
        industry: "베이커리",
        address: "충청남도 천안시 서북구 미라8길 15 (쌍용동) 101호",
        priceInfo: "고기/김치만두(10개): 5,500원",
        phone: "041-577-7238"
      },
      {
        name: "두정숯불갈비",
        industry: "한식",
        address: "충청남도 천안시 서북구 부성1길 19 (두정동)",
        priceInfo: "돼지갈비(250g): 14,000원",
        phone: "041-621-1110"
      },
      {
        name: "듀팡과자점",
        industry: "베이커리",
        address: "충청남도 천안시 서북구 늘푸른5길 22 (두정동) 102호",
        priceInfo: "슈크림빵: 1,600원",
        phone: "041-556-0456"
      },
      {
        name: "디저트카페 아마이",
        industry: "기타요식업",
        address: "충청남도 천안시 동남구 신촌4로 34 (신방동)",
        priceInfo: "아메리카노: 3,500원",
        phone: "0507-1324-8466"
      },
      {
        name: "로스팅포인트 오렌지",
        industry: "기타요식업",
        address: "충청남도 천안시 서북구 불당25로 154 (불당동) 118호",
        priceInfo: "핸드드립: 3,000원",
        phone: ""
      },
      {
        name: "루미너스헤어",
        industry: "미용업",
        address: "충청남도 천안시 서북구 서부12길 12 (성정동)",
        priceInfo: "커트: 10,000원",
        phone: "041-575-0727"
      },
      {
        name: "맛짱김밥",
        industry: "한식",
        address: "충청남도 천안시 동남구 원거리11길 42 (원성동)",
        priceInfo: "김치찌개: 6,000원",
        phone: "041-568-7775"
      },
      {
        name: "머리못하는집",
        industry: "미용업",
        address: "충청남도 천안시 서북구 불당17길 14 (불당동)",
        priceInfo: "커트: 10,000원",
        phone: "041-551-9111"
      },
      {
        name: "명윤",
        industry: "중식",
        address: "충청남도 천안시 서북구 직산읍 4산단로 241 1동",
        priceInfo: "자장면: 6,000원",
        phone: "0507-1426-9775"
      },
      {
        name: "모모아지트",
        industry: "기타요식업",
        address: "충청남도 천안시 서북구 봉정로 140 (성정동) 3층",
        priceInfo: "아메리카노: 3,000원",
        phone: "0507-1337-4919"
      },
      {
        name: "무창포칼국수",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 상덕로 205",
        priceInfo: "간장게장백반: 12,000원",
        phone: "041-584-8909"
      },
      {
        name: "문헤어갤러리",
        industry: "미용업",
        address: "충청남도 천안시 서북구 미라14길 20 (쌍용동)",
        priceInfo: "커트: 8,000원",
        phone: "041-577-4466"
      },
      {
        name: "물들임천연염색",
        industry: "미용업",
        address: "충청남도 천안시 서북구 미라7길 13 (쌍용동)",
        priceInfo: "염색(장발): 30,000원",
        phone: "041-575-8910"
      },
      {
        name: "미헤어샵",
        industry: "미용업",
        address: "충청남도 천안시 서북구 쌍용16길 24 (쌍용동)",
        priceInfo: "커트: 7,000원",
        phone: "041-575-1196"
      },
      {
        name: "박정미5000냥헤어",
        industry: "미용업",
        address: "충청남도 천안시 동남구 대흥로 127 (사직동)",
        priceInfo: "커트: 6,000원",
        phone: "041-561-3344"
      },
      {
        name: "박정미5000냥헤어2호점",
        industry: "미용업",
        address: "충청남도 천안시 동남구 영성로 36 (중앙동)",
        priceInfo: "커트: 6,000원",
        phone: ""
      },
      {
        name: "백미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 우영1길 10 106호(봉명동)",
        priceInfo: "커트: 7,000원",
        phone: "041-572-5953"
      },
      {
        name: "별난생태나라",
        industry: "한식",
        address: "충청남도 천안시 서북구 봉서5길 10 104호(쌍용동)",
        priceInfo: "동태탕: 9,000원",
        phone: "041-575-3675"
      },
      {
        name: "복돼지",
        industry: "한식",
        address: "충청남도 천안시 동남구 충절로 262 (구성동)",
        priceInfo: "삼겹살(200g): 14,000원",
        phone: "041-558-2292"
      },
      {
        name: "복우촌고기세상",
        industry: "한식",
        address: "충청남도 천안시 서북구 쌍용16길 40 (쌍용동)",
        priceInfo: "삼겹살(180g): 12,000원",
        phone: "041-564-3335"
      },
      {
        name: "북경중화요리",
        industry: "중식",
        address: "충청남도 천안시 동남구 신부1길 6 (신부동)",
        priceInfo: "짜장면: 5,000원",
        phone: "041-554-1585"
      },
      {
        name: "비비헤어샵",
        industry: "미용업",
        address: "충청남도 천안시 서북구 미라2길 26-1 (쌍용동)",
        priceInfo: "커트: 5,000원",
        phone: "041-571-1666"
      },
      {
        name: "빵미당",
        industry: "기타요식업",
        address: "충청남도 천안시 동남구 충절로 407 (삼룡동) 1층",
        priceInfo: "단팥빵: 1,700원",
        phone: "0507-1387-9046"
      },
      {
        name: "뽀도기",
        industry: "기타비요식업",
        address: "충청남도 천안시 동남구 서부대로 247-26 (신방동) 103호",
        priceInfo: "전체미용(소형견 / 4kg 미만): 35,000원",
        phone: ""
      },
      {
        name: "사라헤어라인",
        industry: "미용업",
        address: "충청남도 천안시 서북구 양지21길 25 (성정동)",
        priceInfo: "커트: 10,000원",
        phone: "041-575-5093"
      },
      {
        name: "사천냥클럽",
        industry: "미용업",
        address: "충청남도 천안시 서북구 두정로 271 (두정동)",
        priceInfo: "커트: 5,000원",
        phone: "041-564-5283"
      },
      {
        name: "삼양순대",
        industry: "한식",
        address: "충청남도 천안시 동남구 공설시장1길 9 (대흥동)",
        priceInfo: "순대국밥: 7,000원",
        phone: "041-562-3980"
      },
      {
        name: "서산순대집",
        industry: "한식",
        address: "충청남도 천안시 동남구 큰시장길 17 (사직동)",
        priceInfo: "순대국밥: 8,000원",
        phone: "041-555-3723"
      },
      {
        name: "서산집",
        industry: "한식",
        address: "충청남도 천안시 동남구 사직로 18 (사직동)",
        priceInfo: "순대국밥: 8,000원",
        phone: "041-552-6650"
      },
      {
        name: "서정헤어코디",
        industry: "미용업",
        address: "충청남도 천안시 동남구 일봉로 20 상가동 203호(신방동)",
        priceInfo: "염색: 20,000원",
        phone: "041-573-8663"
      },
      {
        name: "석곡리식당",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 부송로 87-7",
        priceInfo: "민물새우탕(2인): 20,000원",
        phone: "041-582-3803"
      },
      {
        name: "선경세탁소",
        industry: "세탁업",
        address: "충청남도 천안시 동남구 양지4길 15 (봉명동)",
        priceInfo: "신사복드라이: 7,000원",
        phone: "041-574-7001"
      },
      {
        name: "선비숯불갈비",
        industry: "한식",
        address: "충청남도 천안시 동남구 터미널3길 21 (신부동)",
        priceInfo: "돼지갈비(300g): 14,000원",
        phone: "041-551-7175"
      },
      {
        name: "세븐데이남성커트",
        industry: "이용업",
        address: "충청남도 천안시 서북구 두정로 212 107호 (두정동)",
        priceInfo: "커트: 9,000원",
        phone: "041-568-6808"
      },
      {
        name: "셀프밥집",
        industry: "한식",
        address: "충청남도 천안시 서북구 나사렛대길 22-4 (쌍용동)",
        priceInfo: "고추장불고기: 7,000원",
        phone: "041-575-1213"
      },
      {
        name: "소망미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 구성5길 31 (구성동)",
        priceInfo: "커트: 6,000원",
        phone: "041-556-8816"
      },
      {
        name: "송영장어구이",
        industry: "한식",
        address: "충청남도 천안시 동남구 목천읍 충절로 876 (목천읍)",
        priceInfo: "장어소금구이: 40,000원",
        phone: "041-562-6432"
      },
      {
        name: "송원떡집",
        industry: "한식",
        address: "충청남도 천안시 서북구 봉서5길 10 (쌍용동)",
        priceInfo: "인절미 1팩: 2,500원",
        phone: "041-578-6753"
      },
      {
        name: "스타미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 대흥로 271 (대흥동)",
        priceInfo: "커트(어르신): 5,000원",
        phone: "041-562-0155"
      },
      {
        name: "스탠바이커피",
        industry: "기타요식업",
        address: "충청남도 천안시 서북구 불당21로 67-18 (불당동) 114호",
        priceInfo: "아메리카노: 2,000원",
        phone: "0507-1384-6480"
      },
      {
        name: "시온사진관",
        industry: "기타비요식업",
        address: "충청남도 천안시 동남구 고재1길 56 (원성동) 1층",
        priceInfo: "여권사진: 15,000원",
        phone: "041-565-4600"
      },
      {
        name: "신부동가정식백반",
        industry: "한식",
        address: "충청남도 천안시 동남구 터미널3길 23 (신부동)",
        priceInfo: "삼겹살(180g): 13,000원",
        phone: "041-565-6909"
      },
      {
        name: "쌍용동사진관",
        industry: "기타비요식업",
        address: "충청남도 천안시 서북구 미라3길 27 (쌍용동)",
        priceInfo: "반명함: 10,000원",
        phone: "041-571-9182"
      },
      {
        name: "안골식당",
        industry: "한식",
        address: "충청남도 천안시 동남구 먹거리2길 6-1 (신부동) 2층",
        priceInfo: "만두전골: 10,000원",
        phone: "0507-1348-2664"
      },
      {
        name: "엄마밥상 한식뷔페",
        industry: "한식",
        address: "충청남도 천안시 서북구 오성9길 5 (두정동) 1층",
        priceInfo: "한식뷔페: 8,000원",
        phone: "041-554-8335"
      },
      {
        name: "에이원호텔",
        industry: "숙박업",
        address: "충청남도 천안시 동남구 신부2길 27 (신부동)",
        priceInfo: "도보(일반): 50,000원",
        phone: "041-566-0677"
      },
      {
        name: "예쁜여우",
        industry: "미용업",
        address: "충청남도 천안시 서북구 충무로 208 (쌍용동, 쌍용현대3차아파트) 상가동 204호",
        priceInfo: "피부관리(기본): 45,000원",
        phone: "0507-1326-4930"
      },
      {
        name: "옛김포식당",
        industry: "한식",
        address: "충청남도 천안시 동남구 영성로 25-19 (사직동)",
        priceInfo: "칼국수: 6,000원",
        phone: "041-554-3029"
      },
      {
        name: "오천헤어",
        industry: "미용업",
        address: "충청남도 천안시 서북구 월봉4로 32 (쌍용동)",
        priceInfo: "커트: 8,000원",
        phone: ""
      },
      {
        name: "올멋",
        industry: "미용업",
        address: "충청남도 천안시 동남구 충절로 263 (구성동)",
        priceInfo: "염색: 17,000원",
        phone: ""
      },
      {
        name: "우리집한식뷔페",
        industry: "한식",
        address: "충청남도 천안시 서북구 입장면 연곡길 166",
        priceInfo: "한식뷔페: 7,500원",
        phone: ""
      },
      {
        name: "운영식당",
        industry: "한식",
        address: "충청남도 천안시 동남구 단대로 119-11 (신부동)",
        priceInfo: "김치찌개: 7,000원",
        phone: "041-551-1920"
      },
      {
        name: "원두집천안점",
        industry: "기타요식업",
        address: "충청남도 천안시 서북구 불당13길 6-1 (불당동) 101호",
        priceInfo: "아메리카노: 3,800원",
        phone: "0507-1312-4248"
      },
      {
        name: "윤경이네분식",
        industry: "한식",
        address: "충청남도 천안시 동남구 버들1길 29 (원성동)",
        priceInfo: "김밥: 3,000원",
        phone: "041-555-8898"
      },
      {
        name: "은혜네손칼국수",
        industry: "한식",
        address: "충청남도 천안시 동남구 공설시장3길 10 (대흥동)",
        priceInfo: "바지락칼국수: 5,000원",
        phone: "041-568-5528"
      },
      {
        name: "이승철헤어",
        industry: "미용업",
        address: "충청남도 천안시 동남구 천안천공원4길 4 (영성동)",
        priceInfo: "커트: 11,000원",
        phone: "041-567-1922"
      },
      {
        name: "이화미용실",
        industry: "미용업",
        address: "충청남도 천안시 서북구 충무로 158-10 2층(쌍용2동)",
        priceInfo: "커트: 12,000원",
        phone: "041-574-2317"
      },
      {
        name: "일광밥집",
        industry: "한식",
        address: "충청남도 천안시 동남구 원성16길 8 (원성동)",
        priceInfo: "청국장: 7,000원",
        phone: "041-522-2282"
      },
      {
        name: "자매식당",
        industry: "한식",
        address: "충청남도 천안시 서북구 월봉1길 46-1 (쌍용동)",
        priceInfo: "고등어조림 (묵은지/시래기): 9,000원",
        phone: ""
      },
      {
        name: "장원식당",
        industry: "한식",
        address: "충청남도 천안시 서북구 공대길 10 (신당동)",
        priceInfo: "부대찌개: 7,000원",
        phone: "041-569-8883"
      },
      {
        name: "전설렁탕",
        industry: "한식",
        address: "충청남도 천안시 동남구 통정5로 89 (신방동) 1층",
        priceInfo: "설렁탕: 10,000원",
        phone: "0507-1415-0463"
      },
      {
        name: "전주칼국수",
        industry: "한식",
        address: "충청남도 천안시 서북구 성정중5길 7-1 (성정동)",
        priceInfo: "멸치칼국수: 7,000원",
        phone: "041-551-0345"
      },
      {
        name: "정가네닭갈비",
        industry: "한식",
        address: "충청남도 천안시 동남구 안서1길 5-13 (안서동)",
        priceInfo: "닭갈비(200g): 9,900원",
        phone: "041-555-1614"
      },
      {
        name: "정장군숯불구이전문점",
        industry: "한식",
        address: "충청남도 천안시 서북구 성환중앙로 70",
        priceInfo: "삼겹살(180g): 13,000원",
        phone: "041-582-7778"
      },
      {
        name: "제이남성컷트전문점",
        industry: "이용업",
        address: "충청남도 천안시 서북구 월봉7길 77 11동 103호(쌍용2동)",
        priceInfo: "커트: 9,000원",
        phone: "041-573-4080"
      },
      {
        name: "제주포크똥돼지",
        industry: "한식",
        address: "충청남도 천안시 동남구 터미널8길 12 (신부동)",
        priceInfo: "백반: 8,000원",
        phone: "041-565-0464"
      },
      {
        name: "젠틀맨헤어남성커트",
        industry: "미용업",
        address: "충청남도 천안시 서북구 백석4길 23 (백석동)",
        priceInfo: "커트: 10,000원",
        phone: "041-566-2050"
      },
      {
        name: "종로왕족발",
        industry: "한식",
        address: "충청남도 천안시 동남구 충절로 135 (원성동) 1층",
        priceInfo: "족발(대): 33,000원",
        phone: "041-562-3255"
      },
      {
        name: "준헤어미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 병천면 충절로 1745",
        priceInfo: "커트: 12,000원",
        phone: "041-555-3317"
      },
      {
        name: "중앙식당",
        industry: "한식",
        address: "충청남도 천안시 동남구 천안천5길 6 (성황동)",
        priceInfo: "콩비지찌개: 8,000원",
        phone: ""
      },
      {
        name: "지니헤어",
        industry: "미용업",
        address: "충청남도 천안시 서북구 개목8길 31 1층(성정1동)",
        priceInfo: "커트: 15,000원",
        phone: "041-909-2589"
      },
      {
        name: "짜글짜글",
        industry: "한식",
        address: "충청남도 천안시 서북구 불당23로 70 (불당동) 102호",
        priceInfo: "촌돼지짜글이: 9,000원",
        phone: "041-907-3366"
      },
      {
        name: "쭈니창고",
        industry: "양식",
        address: "충청남도 천안시 동남구 터미널7길 32 (신부동) 1층",
        priceInfo: "돈치스정식(돈가스1/치즈스틱2): 7,000원",
        phone: "0507-1356-7363"
      },
      {
        name: "참새방앗간",
        industry: "한식",
        address: "충청남도 천안시 서북구 봉정로 137 (성정동) 1층",
        priceInfo: "국수: 5,000원",
        phone: "041-573-4724"
      },
      {
        name: "채육시간",
        industry: "한식",
        address: "충청남도 천안시 동남구 풍세면 풍세로 502",
        priceInfo: "쭈꾸미피자세트: 14,000원",
        phone: "041-576-8588"
      },
      {
        name: "챠밍헤어클럽미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 고재4길 55 (원성동)",
        priceInfo: "커트: 10,000원",
        phone: "041-569-6005"
      },
      {
        name: "천안시청사진관",
        industry: "기타비요식업",
        address: "충청남도 천안시 서북구 불당25로 176 (불당동) 119호",
        priceInfo: "여권사진: 20,000원",
        phone: "0507-1473-9056"
      },
      {
        name: "청룡각",
        industry: "중식",
        address: "충청남도 천안시 서북구 충무로 143-8 (쌍용동)",
        priceInfo: "짜장면: 3,500원",
        phone: "041-574-8181"
      },
      {
        name: "커트클럽",
        industry: "미용업",
        address: "충청남도 천안시 서북구 검은들3길 38 102호(불당동)",
        priceInfo: "커트: 8,000원",
        phone: ""
      },
      {
        name: "컷팅클럽",
        industry: "미용업",
        address: "충청남도 천안시 서북구 쌍용16길 38-1 (쌍용동)",
        priceInfo: "커트(남성): 7,000원",
        phone: "041-577-6804"
      },
      {
        name: "코리아세탁소",
        industry: "세탁업",
        address: "충청남도 천안시 서북구 서부1길 58 (성정동)",
        priceInfo: "드라이: 7,000원",
        phone: "041-577-3482"
      },
      {
        name: "코코스낵",
        industry: "한식",
        address: "충청남도 천안시 동남구 중암2길 23 (안서동)",
        priceInfo: "주먹밥: 2,000원",
        phone: "041-522-9886"
      },
      {
        name: "타코찡",
        industry: "기타요식업",
        address: "충청남도 천안시 동남구 개목4길 9 101호(봉명동)",
        priceInfo: "오리지널타코야키(7알): 4,500원",
        phone: "041-414-2292"
      },
      {
        name: "텐시헤어",
        industry: "미용업",
        address: "충청남도 천안시 동남구 원성2교길 29 (원성동)",
        priceInfo: "커트: 10,000원",
        phone: ""
      },
      {
        name: "팀레드비 우리주짓수",
        industry: "기타비요식업",
        address: "충청남도 천안시 서북구 늘푸른1길 18-5 (두정동) 201호",
        priceInfo: "주짓수(1개월): 130,000원",
        phone: "0507-1489-7933"
      },
      {
        name: "포인트미용실",
        industry: "미용업",
        address: "충청남도 천안시 동남구 공설시장2길 3 3층(대흥동)",
        priceInfo: "커트: 3,000원",
        phone: "041-567-8301"
      },
      {
        name: "플름(PLMM)",
        industry: "기타요식업",
        address: "충청남도 천안시 서북구 불당23로 73-30 (불당동) 1층",
        priceInfo: "아메리카노(포장): 2,000원",
        phone: "0507-1364-8750"
      },
      {
        name: "하나미장원",
        industry: "미용업",
        address: "충청남도 천안시 서북구 쌍용15길 3 (쌍용동)",
        priceInfo: "커트: 10,000원",
        phone: "041-579-1233"
      },
      {
        name: "헤어뉴스",
        industry: "미용업",
        address: "충청남도 천안시 서북구 불당25로 8 (불당동, 불당호반써밋플레이스 센터시티) 가동 지1층 106호",
        priceInfo: "커트: 10,000원",
        phone: "041-565-7488"
      },
      {
        name: "헤어스타",
        industry: "미용업",
        address: "충청남도 천안시 서북구 미라2길 18-4 (쌍용동)",
        priceInfo: "커트(일반): 8,000원",
        phone: "041-579-4233"
      },
      {
        name: "흑미김밥세상",
        industry: "한식",
        address: "충청남도 천안시 서북구 직산읍 봉주로 27",
        priceInfo: "김밥: 3,000원",
        phone: "041-583-2185"
      }
  ];

  useEffect(() => {
    loadKakaoScript("본인앱키").then((kakao) => {
      if (!kakao) {
        console.error("카카오 SDK 로드 실패");
        return;
      }
      setKakaoLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!kakaoLoaded) return;

    const kakao = window.kakao;
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.834016484, 127.173031419),
      level: 4,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    if (stores.length > 0) {
      geocoder.addressSearch(stores[0].address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const centerCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(centerCoords);
        }
      });
    }

    let currentInfoWindow = null; // 현재 열린 InfoWindow 저장

    stores.forEach((store) => {
      geocoder.addressSearch(store.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });

          const infoWindow = new kakao.maps.InfoWindow({
            content: `
              <div style="padding:5px;font-size:14px;">
                <strong>${store.name}</strong><br/>
                ${store.industry}<br/>
                ${store.priceInfo}<br/>
                ${store.phone ? "☎ " + store.phone : ""}
              </div>
            `,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            if (currentInfoWindow === infoWindow) {
              // 이미 열린 말풍선이면 닫기
              currentInfoWindow.close();
              currentInfoWindow = null;
            } else {
              // 이전 말풍선 닫고 새로 열기
              if (currentInfoWindow) currentInfoWindow.close();
              infoWindow.open(map, marker);
              currentInfoWindow = infoWindow;
            }
          });
        } else {
          console.warn("주소 변환 실패:", store.address, status);
        }
      });
    });
  }, [kakaoLoaded]);

  return <div id="map" style={{ width: "100%", height: "1000px" }} />;
};

export default MapView;