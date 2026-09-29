"use strict";

document.documentElement.classList.add("js");

const PROJECT_BLUEPRINTS = [
  ['BURGER KING', '버거킹-1.jpg', 'landscape'],
  ['PULP!', '과일 화장품-1 수정.jpg', 'landscape'],
  ['NESTO — PLAYFUL LIVING', '가구 수뎡.jpg', 'portrait'],
  ['EDRA — GETSUEN', '꽃 가구3.jpg', 'portrait'],
  ['NOTHING — PLAY YOUR WAY', '헤드폰4.jpg', 'portrait'],
  ['KIELLIA PARFUM', '물꼬기-2jpg.jpg', 'portrait'],
  ['MORRO — POMME LOUNGE', '사과수정-2.jpg', 'portrait'],
  ['ASICS — GEL-KAYANO 14', '운동화.jpg', 'portrait'],
  ['TWOSOME — 코코파인', '투썸1 수정.jpg', 'portrait'],
  ['TWOSOME — 살구', '투썸2.jpg', 'portrait'],
  ['MINIONS — SUMMER', '미니엉즈1.png', 'portrait'],
  ['NIKE — SUMMER SALE', '신발-1 수정.jpg', 'portrait'],
  ['OLIVE YOUNG — SUMMER', '올영 시도-2-6-Recovered.jpg', 'portrait'],
  ['BLOOM TALE', 'bloom-tale.png', 'landscape'],
  ['NOTHING — Headphone (a)', 'nothing-detail.png', 'detail'],
  ['ongredients — 속광 로션 EX', 'ongredients-detail.png', 'detail'],
];

// Presentation palettes selected to complement the original artwork.
const PROJECT_STORIES = [
  { theme: 'grill', accent: '#174C2D', background: '#F5EDDB', ink: '#233527', palette: ['#174C2D', '#D9482B', '#F5C65D'], headline: 'FLAME.<br>FLAVOR.<br>KING.', summary: '한눈에 “불맛이 강한 버거”로 기억되도록 설계한 프로모션 배너.', brief: '짧게 노출되는 배너에서는 메뉴명보다 제품의 맛과 볼륨이 먼저 전달되어야 한다고 판단했습니다. 그래서 버거를 가장 큰 시각 요소로 두고 재료의 층이 정면에서 선명하게 보이도록 했습니다.', concept: '딥그린은 따뜻한 음식 색을 더 돋보이게 하고, 레드 체크와 왕관은 버거킹 특유의 친근하고 경쾌한 인상을 보완합니다. 굵은 압축 서체는 화면을 많이 차지하지 않으면서도 제품의 묵직함을 이어 주기 위해 선택했습니다.', system: '메인 배경은 제품과 높은 대비를 만드는 딥그린으로 제한하고, 토마토 레드와 머스터드 옐로는 맛을 연상시키는 지점에만 사용했습니다. 색의 역할을 나눠 제품·브랜드·정보의 우선순위가 섞이지 않게 했습니다.' },
  { theme: 'pop', accent: '#D83829', background: '#FFF4DE', ink: '#43251E', palette: ['#D83829', '#2758CB', '#FFCF3D'], headline: 'FRESH.<br>FRUITY.<br>POP!', summary: '서로 다른 향을 하나의 시리즈로 인식시키기 위한 코스메틱 배너.', brief: '제품마다 색과 향이 달라 한 화면에 놓으면 산만해질 수 있었습니다. 다양성은 살리되 한 컬렉션으로 읽히게 하는 것을 핵심 과제로 잡았습니다.', concept: '각 제품은 같은 크기와 간격으로 정렬해 공통 규칙을 만들고, 배경색만 달리해 향의 차이를 보여 줬습니다. 반복 문구와 도트는 시선이 좌우로 이동하도록 만들어 여러 제품을 자연스럽게 비교하게 합니다.', system: '팝 레드를 중심축으로 두고 코발트 블루와 옐로를 보조색으로 정했습니다. 크림 배경을 사이에 두어 원색끼리 충돌하지 않게 하고, 패키지의 장난스러운 성격은 작은 패턴으로만 이어 갔습니다.' },
  { theme: 'studio', accent: '#F4F4F0', background: '#FFFFFF', ink: '#20251F', palette: ['#198D43', '#F33096', '#FFCF28'], headline: 'ROOM<br>TO PLAY.', summary: '가구의 개성을 가리지 않고 컬렉션의 즐거움까지 보여 주는 포스터.', brief: '형태와 색이 모두 강한 가구를 함께 보여 줄 때 장식까지 더하면 제품의 차이가 흐려질 수 있었습니다. 배경은 덜어내고 각 가구의 실루엣이 곧 그래픽이 되게 했습니다.', concept: '화이트 여백은 제품끼리 숨 쉴 간격을 만들고, 서로 다른 높이와 방향은 실제로 가구를 고르며 둘러보는 듯한 리듬을 만듭니다. 타이포그래피는 정돈해 자유로운 배치와 균형을 맞췄습니다.', system: '제품에 이미 많은 색이 있어 그린·핑크·옐로만 포인트로 추렸습니다. 설명 영역은 뉴트럴 톤에 두어 색보다 정보가 앞서야 하는 순간에는 시선이 차분해지도록 했습니다.' },
  { theme: 'bloom', accent: '#E5D2DB', background: '#F7F0F3', ink: '#4C253B', palette: ['#9B2D64', '#CE9CAF', '#55436D'], headline: 'A SEAT<br>IN BLOOM.', summary: '의자의 조형적 가치를 꽃이 피는 장면처럼 전달한 가구 포스터.', brief: '기능 설명보다 Getsuen 의자의 꽃잎 같은 형태를 먼저 기억시키는 것이 중요했습니다. 제품을 단독으로 설명하기보다 하나의 부케처럼 묶어 조형미를 강조했습니다.', concept: '높이와 방향을 조금씩 달리한 이유는 같은 형태의 반복이 정적인 진열로 보이지 않게 하기 위해서입니다. 섬세한 세리프 제목과 넓은 곡선은 의자의 우아한 인상을 언어와 형태로 함께 전달합니다.', system: '플럼·더스티 로즈·라벤더처럼 명도 차이가 크지 않은 색을 골라 부드러운 곡선이 끊기지 않게 했습니다. 은은한 원형 그라데이션은 제품 뒤에 깊이를 만들되 시선을 빼앗지 않도록 사용했습니다.' },
  { theme: 'tech', accent: '#E9EAEC', background: '#F8F8F6', ink: '#202124', palette: ['#252629', '#F5D326', '#E9EAEC'], headline: 'SOUND.<br>YOUR WAY.', summary: '투명 디자인의 차별점을 구조 자체로 이해시키는 헤드폰 포스터.', brief: '투명 소재의 매력은 외형 사진만으로 충분히 드러나지 않는다고 보았습니다. 사용자가 제품 안쪽의 구조까지 발견하도록 분해된 듯한 시점으로 배치했습니다.', concept: '곡선형 제품과 직선적인 정보 구획을 대비시켜 감성적인 외형과 정밀한 기술을 함께 보여 줬습니다. 작은 격자와 점 타이포는 시선을 디테일로 유도하면서 기술 제품의 언어를 만듭니다.', system: '차콜과 실버로 투명 소재의 차가운 질감을 유지하고, 시그널 옐로는 조작부처럼 확인이 필요한 지점에만 사용했습니다. 강조색을 제한해 구조가 복잡해 보이지 않도록 했습니다.' },
  { theme: 'water', accent: '#D4EBEF', background: '#F1F8F7', ink: '#24464C', palette: ['#92C9D4', '#35494B', '#F1F0E8'], headline: 'SCENT<br>IN WATER.', summary: '보이지 않는 향을 물속의 감각으로 번역한 향수 포스터.', brief: '향수는 향을 직접 보여 줄 수 없기 때문에 제품 사진만으로는 인상이 오래 남기 어렵다고 판단했습니다. 향의 맑고 차가운 분위기를 물의 질감과 움직임으로 대신 전달했습니다.', concept: '보틀 주변의 물고기와 오브제는 현실과 환상의 경계를 흐려 향을 맡았을 때의 낯선 장면을 상상하게 합니다. 장식적인 로고는 정교한 오브제와 균형을 이루며 브랜드의 신비로운 성격을 강화합니다.', system: '워터 블루를 넓게 사용하고 차콜로 제품의 윤곽을 잡았습니다. 아이보리는 차가운 색만 이어질 때 생길 수 있는 거리감을 줄이고, 겹치는 원형 패턴은 잔잔한 파동을 연상시키도록 선택했습니다.' },
  { theme: 'orchard', accent: '#DDE0C3', background: '#F4F1E4', ink: '#353B27', palette: ['#9C2627', '#858C4E', '#F0EBD9'], headline: 'AN APPLE.<br>A CHAIR.', summary: '제품명과 형태를 사과라는 익숙한 이미지로 기억시키는 포스터.', brief: '독특한 라운지 체어를 처음 보는 사람도 제품의 이름과 특징을 쉽게 연결하도록 만들고 싶었습니다. 그래서 의자를 포장된 과일처럼 연출해 한 번에 이해되는 비유를 만들었습니다.', concept: '사과의 유기적인 형태와 포장 트레이의 규칙적인 프레임을 대비시켜 의자의 둥근 실루엣을 강조했습니다. 주변 사과는 장식이 아니라 제품의 색과 이름을 반복해 기억을 돕는 장치입니다.', system: '애플 레드는 제품과 핵심 연상을 묶는 주조색으로, 올리브는 과수원의 자연스러운 분위기를 만드는 보조색으로 사용했습니다. 크림 바탕은 두 색 사이의 대비를 부드럽게 조절합니다.' },
  { theme: 'sport', accent: '#164BC5', background: '#EDF1F7', ink: '#172B47', palette: ['#164BC5', '#D8F52D', '#C7CDD1'], headline: 'BUILT<br>TO MOVE.', summary: '착화 장면의 속도감과 제품 기술을 동시에 읽히게 한 스포츠 포스터.', brief: '러닝 이미지만 강조하면 운동화의 디테일이 묻히고, 제품만 확대하면 움직임이 사라지는 문제가 있었습니다. 두 정보를 한 시선 안에서 연결하는 것을 목표로 했습니다.', concept: '러너와 크게 확대한 운동화를 겹쳐 사용 장면에서 제품 구조로 시선이 이어지게 했습니다. 좌표선과 정보 박스는 장식보다 기능 설명의 시작점으로 작동하며, 사선은 달리는 방향을 강화합니다.', system: '일렉트릭 블루는 신뢰감과 속도를 만들고, 라임은 기술 정보와 핵심 디테일을 빠르게 찾게 합니다. 실버는 소재의 기능적인 인상을 보완하되 전체 대비가 과해지지 않게 받쳐 줍니다.' },
  { theme: 'tropical', accent: '#A6E4E5', background: '#FFF9E6', ink: '#245254', palette: ['#17A6B6', '#FFD633', '#FFF4D4'], headline: 'A SLICE<br>OF SUMMER.', summary: '재료의 신선함을 먼저 느끼게 해 구매 욕구로 연결한 디저트 포스터.', brief: '시즌 디저트는 짧은 시간 안에 맛을 상상하게 해야 한다고 보았습니다. 케이크 단면과 토핑을 크게 보여 주어 코코넛의 부드러움과 파인애플의 상큼함이 설명 없이도 전달되게 했습니다.', concept: '위에서 내려다본 구도는 토핑과 재료를 한눈에 비교하게 하고, 주변 파인애플 조각은 주재료를 즉시 알려 줍니다. 둥근 제목은 케이크의 부드러운 형태와 연결해 제품과 문구가 따로 보이지 않게 했습니다.', system: '아쿠아는 여름의 청량함을, 옐로는 파인애플의 산뜻함을 담당합니다. 코코넛 크림색을 넓은 바탕으로 두어 음식 사진이 인공적으로 보이지 않고 따뜻하게 느껴지도록 조절했습니다.' },
  { theme: 'apricot', accent: '#F2BE93', background: '#FFF2E4', ink: '#663922', palette: ['#E99758', '#B65437', '#FFF0D6'], headline: 'SOFT.<br>SWEET.<br>APRICOT.', summary: '살구의 촉촉함과 디저트의 온도를 색과 시점으로 전달한 포스터.', briefTitle: '재료가 가장 잘 보이는 구도', brief: '비슷한 오렌지 계열 재료가 많은 디저트에서 살구의 존재가 묻히지 않게 하는 것이 중요했습니다.<br class="detail-copy-break" /><strong>과육과 토핑</strong>이 가장 잘 보이는 <strong>탑뷰</strong>를 선택해 맛의 근거를 먼저 보여 줬습니다.', conceptTitle: '색감과 타이포의 연결', concept: '접시와 배경을 비슷한 <strong>오렌지 계열</strong>로 연결해 하나의 따뜻한 장면을 만들고, <strong>크림색 타이포</strong>로 정보가 음식 위에서 튀지 않게 했습니다.<br class="detail-copy-break" /><strong>부드러운 빛</strong>은 갓 완성된 디저트의 촉촉한 인상을 강조합니다.', system: '살구 오렌지를 주조색으로 두고 테라코타는 깊이와 구운 질감을 표현하는 데 사용했습니다. 크림색은 두 색 사이에 여백을 만들어 전체가 지나치게 무겁거나 달게 보이지 않도록 합니다.' },
  { theme: 'sunshine', accent: '#F5D637', background: '#FFF8DA', ink: '#263C4B', palette: ['#F5D637', '#158BA9', '#285346'], headline: 'HELLO,<br>SUMMER!', summary: '행사의 즐거움과 참여 정보를 한 흐름으로 연결한 여름 팝업.', brief: '캐릭터의 인지도만 강조하면 행사 정보가 묻힐 수 있어, 시선을 끄는 장면과 실제 참여에 필요한 내용을 분리해 설계했습니다.', concept: '큰 제목과 캐릭터 표정으로 먼저 감정을 만들고, 해변 소품이 시선을 아래의 일정과 버튼으로 이어 주게 했습니다. 정보는 장면 안에 흩어 놓지 않고 하단에 모아 참여 방법을 빠르게 찾도록 했습니다.', system: '미니언 옐로는 캐릭터와 즉시 연결되는 주조색으로, 오션 블루와 팜 그린은 장소가 해변임을 설명하는 보조색으로 선택했습니다. 원형 패턴은 햇빛과 활동적인 분위기를 더합니다.' },
  { theme: 'ice', accent: '#DCEEF9', background: '#F3F8FC', ink: '#163C66', palette: ['#167DDC', '#A8D9EB', '#F3F5F7'], headline: 'FRESH<br>ON YOUR FEET.', summary: '여름의 청량감에서 할인 정보까지 시선이 멈추지 않게 설계한 세일 팝업.', brief: '세일 팝업은 제품 이미지와 할인율이 서로 경쟁하기 쉽습니다. 먼저 계절감으로 관심을 끌고, 제품을 확인한 뒤 혜택과 행동 버튼으로 이어지는 순서를 만들었습니다.', concept: '운동화와 튀는 물을 결합해 가벼운 착화감을 직관적으로 표현하고, 할인 숫자는 제품을 가리지 않는 위치에 크게 배치했습니다. 비스듬한 화면 분할은 위에서 아래로 이동하는 시선에 속도를 더합니다.', system: '아이스 블루와 화이트로 첫인상을 시원하게 만들고, 깊은 블루는 할인 정보와 버튼처럼 읽어야 하는 요소에 사용했습니다. 같은 계열 안에서 명도 차이를 줘 정보 단계가 분명하게 보이도록 했습니다.' },
  { theme: 'pool', accent: '#F4BBCB', background: '#FFF2F5', ink: '#592940', palette: ['#EA4089', '#15B9C4', '#F9E642'], headline: 'SUMMER<br>IN COLOR.', summary: '다양한 제품과 프로모션 혜택을 한눈에 구분하게 만든 뷰티 팝업.', brief: '여러 제품을 동시에 노출하면서도 여름 한정 행사라는 메시지와 혜택을 놓치지 않게 해야 했습니다. 제품군·계절감·행동 정보에 각각 다른 시각적 역할을 부여했습니다.', concept: '핑크 제품과 청록빛 수영장을 대비시켜 제품 윤곽을 살리고, 대각선 구도로 정적인 진열감을 줄였습니다. 옐로 정보 요소는 사진과 분리되어 할인과 버튼을 빠르게 찾게 합니다.', system: '썸머 핑크는 제품군을, 풀 아쿠아는 계절과 장소를, 레몬 옐로는 혜택과 행동을 담당합니다. 색을 역할별로 고정해 요소가 많아도 무엇을 먼저 봐야 하는지 헷갈리지 않게 했습니다.' },
];

PROJECT_STORIES.push(
  { theme: 'bloom', accent: '#F4ECD9', background: '#FFFCF3', ink: '#242B20', palette: ['#EB78A9', '#579340', '#F4ECD9'], headline: 'A STORY<br>IN BLOOM.', summary: '축제의 입구를 먼저 상상하게 해 기대감을 높이는 봄 배너.', brief: '행사명을 읽기 전에 봄 축제의 분위기가 즉시 느껴져야 한다고 판단했습니다. 꽃과 정원을 단순 장식이 아니라 관람객을 장면 안으로 이끄는 입구로 설정했습니다.', concept: '큰 꽃과 프레임이 중앙을 향하도록 배치해 시선이 행사명으로 모이게 했습니다. 장식적인 타이포그래피는 동화 같은 정원의 인상을 강화하되, 일정 정보와는 크기 차이를 둬 읽는 순서를 지켰습니다.', system: '플라워 핑크는 설렘을, 그린은 정원의 배경을 담당하고 아이보리는 정보가 안정적으로 읽히는 여백을 만듭니다. 세 색의 역할을 분리해 장식이 많아도 핵심 문구가 묻히지 않게 했습니다.' },
  { theme: 'tech', accent: '#ECECEE', background: '#FAFAFA', ink: '#202124', palette: ['#252629', '#F5D326', '#EFC5D3'], headline: 'EVERY DETAIL.<br>YOUR SOUND.', summary: '기능을 나열하지 않고 사용자가 궁금해할 순서로 설계한 헤드폰 상세페이지.', brief: '헤드폰 구매자는 외형을 확인한 뒤 조작 방식과 연결 기능을 궁금해한다고 보았습니다. 그래서 컬러 선택 → 물리 컨트롤 → 앱 경험 순으로 정보를 배치했습니다.', concept: '각 기능을 독립된 구획으로 나눈 이유는 긴 페이지에서도 현재 읽는 주제를 놓치지 않게 하기 위해서입니다. 큰 제품 이미지로 맥락을 먼저 보여 주고, 설명은 충분한 여백과 함께 가까이 배치해 이미지와 기능을 바로 연결했습니다.', system: '차콜은 제품 구조와 본문에, 옐로는 조작 포인트에, 핑크는 컬러 선택 영역에 사용했습니다. 색을 기능별 신호로 반복해 스크롤이 길어져도 같은 종류의 정보를 빠르게 인식하도록 했습니다.' },
  { theme: 'pop', accent: '#FFF3C7', background: '#FFFCF0', ink: '#303329', palette: ['#EAB900', '#FFF3C7', '#303329'], headline: 'GLOW,<br>EVERY DAY.', summary: '제형에 대한 신뢰에서 실제 사용 방법까지 이어지도록 설계한 로션 상세페이지.', brief: '스킨케어 제품은 감성적인 이미지뿐 아니라 제형과 사용 순서가 구매 판단에 중요합니다. 첫인상 → 효능 근거 → 텍스처 → 루틴 순으로 사용자의 질문에 답하도록 흐름을 잡았습니다.', concept: '제품 사진은 각 섹션의 시작에 크게 두어 긴 페이지의 전환점을 만들고, 설명은 짧은 단위로 나눠 정보 피로를 줄였습니다. 마지막에 사용 순서를 배치해 제품 이해가 실제 사용 장면으로 자연스럽게 이어지게 했습니다.', system: '밝은 옐로는 속광과 생기를 연상시키고, 크림은 피부에 닿는 부드러운 느낌을 만듭니다. 짙은 차콜은 효능과 사용법처럼 정확히 읽어야 하는 정보에 사용해 감성과 정보의 대비를 분명히 했습니다.' }
);

const PROJECT_EFFECTS = [
  '사용자가 배너를 짧게 보더라도 풍성한 재료와 불맛을 먼저 떠올리고, 메뉴명을 확인하거나 주문 화면으로 이동하도록 유도했습니다.',
  '첫 화면에서는 밝고 신선한 컬렉션이라는 인상을 주고, 이어서 색의 차이를 따라 자신에게 맞는 향을 비교해 보도록 의도했습니다.',
  '각 가구를 개별 제품으로 비교하면서도 전체 컬렉션은 밝고 자유로운 브랜드로 기억하도록 만드는 것이 목표였습니다.',
  '사용자가 의자를 생활 가구보다 하나의 조형적인 오브제로 인식하고, 꽃잎을 닮은 실루엣을 오래 기억하도록 의도했습니다.',
  '멀리서는 독특한 실루엣으로 관심을 끌고, 가까이에서는 내부 구조와 조작부를 발견하며 제품의 차별점을 이해하도록 설계했습니다.',
  '포스터를 보는 순간 맑고 서늘한 향의 온도를 먼저 상상하고, 낯선 수중 장면을 통해 브랜드를 신비롭게 기억하도록 의도했습니다.',
  '낯선 형태의 가구도 사과라는 익숙한 단서로 쉽게 이해하고, 제품명과 둥근 실루엣을 함께 기억하도록 만들었습니다.',
  '먼저 달리는 장면에서 속도감을 느끼고, 이어서 확대된 제품과 기술 정보를 확인하며 기능에 대한 관심으로 이어지게 했습니다.',
  '설명을 읽기 전에도 상큼하고 부드러운 맛을 예상하게 하고, 시즌 메뉴를 직접 확인하거나 구매해 보고 싶은 마음으로 이어지게 했습니다.',
  '사용자가 살구의 촉촉한 과육과 갓 구운 디저트의 온기를 자연스럽게 떠올리고, 시즌 메뉴에 관심을 갖도록 의도했습니다.',
  '캐릭터로 친근하고 즐거운 첫인상을 만든 뒤, 하단의 일정과 참여 버튼까지 자연스럽게 확인해 실제 방문으로 이어지도록 했습니다.',
  '시원하고 가벼운 착화감을 먼저 느끼게 한 뒤, 할인율과 버튼을 빠르게 확인해 상품 탐색이나 구매 행동으로 이어지게 했습니다.',
  '사용자가 여름 한정 행사를 즉시 인지하고, 제품군을 둘러본 뒤 혜택과 참여 버튼을 놓치지 않도록 하는 데 초점을 맞췄습니다.',
  '사용자가 정원으로 들어가는 듯한 기대감을 느끼고, 중앙의 행사명과 일정 정보를 확인해 방문을 고려하도록 의도했습니다.',
  '긴 상세페이지에서도 궁금한 기능을 빠르게 찾고, 외형에 대한 관심이 조작 편의성과 앱 경험에 대한 신뢰로 이어지도록 구성했습니다.',
  '사용자가 제형과 효능을 충분히 이해한 뒤 자신의 스킨케어 루틴에 적용하는 장면까지 떠올리고, 구매를 판단할 수 있도록 했습니다.',
];

/* const WORK_CATEGORIES = [
  { id: 'popup', label: '팝업', english: 'POP-UP' },
  { id: 'poster', label: '포스터', english: 'POSTER' },
  { id: 'banner', label: '배너', english: 'BANNER' },
  { id: 'detail', label: '상세페이지', english: 'DETAIL PAGE' },
]; */
const WORK_CATEGORIES = [
  { id: 'popup', label: 'POP-UP', english: 'POP-UP' },
  { id: 'poster', label: 'POSTER', english: 'POSTER' },
  { id: 'banner', label: 'BANNER', english: 'BANNER' },
  { id: 'detail', label: 'DETAIL PAGE', english: 'DETAIL PAGE' },
];
// Keep the portfolio taxonomy explicit. The visual format alone is not enough
// to distinguish a pop-up from a poster, so these groups mirror the authored
// arrangement instead of guessing from portrait/landscape orientation.
const PROJECT_GROUPS = [
  'banner', // BURGER KING
  'banner', // PULP!
  'poster', // NESTO — PLAYFUL LIVING
  'poster', // EDRA — GETSUEN
  'poster', // NOTHING — PLAY YOUR WAY
  'poster', // KIELLIA PARFUM
  'poster', // MORRO — POMME LOUNGE
  'poster', // ASICS — GEL-KAYANO 14
  'popup',  // TWOSOME — 코코파인
  'poster', // TWOSOME — 살구
  'popup',  // MINIONS — SUMMER
  'popup',  // NIKE — SUMMER SALE
  'popup',  // OLIVE YOUNG — SUMMER
  'banner', // BLOOM TALE
  'detail', // NOTHING — Headphone (a)
  'detail', // ongredients — 속광 로션 EX
];
const projectGroup = (_orientation, index) => PROJECT_GROUPS[index] || 'poster';
const PROJECTS = PROJECT_BLUEPRINTS.map(([title, imageFile, orientation], index) => ({
  id: `project-${String(index + 1).padStart(2, "0")}`,
  index: String(index + 1).padStart(2, "0"),
  title,
  imageSrc: index === 9 && window.location.protocol !== 'file:'
    ? 'assets/images/personal-project/twosome-apricot-poster.png'
    : window.PORTFOLIO_ARTWORKS?.[imageFile],
  artTitle: [title],
  group: projectGroup(orientation, index),
  media: [WORK_CATEGORIES.find(group => group.id === projectGroup(orientation, index)).english],
  category: WORK_CATEGORIES.find(group => group.id === projectGroup(orientation, index)).english,
  year: "SELECTED WORK",
  summary: title,
  brief: "이 작업이 전달해야 할 핵심 메시지를 먼저 정하고, 사용자가 가장 먼저 봐야 할 요소를 기준으로 정보의 크기와 순서를 설계했습니다.",
  concept: "색과 이미지는 분위기를 꾸미기 위한 장식이 아니라 메시지를 더 빠르게 이해시키는 근거로 선택했습니다.",
  effect: PROJECT_EFFECTS[index],
  scope: "GRAPHIC DESIGN",
  format: orientation === 'detail' ? 'PRODUCT DETAIL PAGE' : orientation === "landscape" ? "LANDSCAPE BANNER" : "PORTRAIT POSTER",
  orientation,
  accent: "#d9d9d5",
  background: "#eeeeea",
  ink: "#17171a",
  palette: ["#eeeeea", "#b8b8b3", "#70706c"],
  art: index,
  ...PROJECT_STORIES[index],
  sceneScale: [0.86, 0.74, 0.82, 0.68, 0.7, 0.64, 0.88, 0.66, 0.72, 0.64, 0.8, 0.67, 0.76][index],
}));
const TAU = Math.PI * 2;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, amount) => a + (b - a) * amount;
const smoothstep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / Math.max(0.00001, edge1 - edge0));
  return x * x * (3 - 2 * x);
};
const easeInOutCubic = (value) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

function vec3(x = 0, y = 0, z = 0) {
  return [x, y, z];
}

function vec3Add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function vec3Sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function vec3Scale(a, scale) {
  return [a[0] * scale, a[1] * scale, a[2] * scale];
}

function vec3Mix(a, b, amount) {
  return [lerp(a[0], b[0], amount), lerp(a[1], b[1], amount), lerp(a[2], b[2], amount)];
}

function vec3Dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function vec3Cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function vec3Normalize(value) {
  const length = Math.hypot(value[0], value[1], value[2]) || 1;
  return [value[0] / length, value[1] / length, value[2] / length];
}

function rotateVectorAroundAxis(vector, axis, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cross = vec3Cross(axis, vector);
  const dot = vec3Dot(axis, vector);
  return [
    vector[0] * cos + cross[0] * sin + axis[0] * dot * (1 - cos),
    vector[1] * cos + cross[1] * sin + axis[1] * dot * (1 - cos),
    vector[2] * cos + cross[2] * sin + axis[2] * dot * (1 - cos),
  ];
}

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return [0, 1, 2].map(
    (axis) =>
      0.5 *
      (2 * p1[axis] +
        (-p0[axis] + p2[axis]) * t +
        (2 * p0[axis] - 5 * p1[axis] + 4 * p2[axis] - p3[axis]) * t2 +
        (-p0[axis] + 3 * p1[axis] - 3 * p2[axis] + p3[axis]) * t3),
  );
}

function mixAngle(a, b, amount) {
  let difference = (b - a) % TAU;
  if (difference > Math.PI) difference -= TAU;
  if (difference < -Math.PI) difference += TAU;
  return a + difference * amount;
}

// A project plane looks identical after a 180-degree turn. Keep its radial
// orientation on the equivalent side that is closest to the camera so a
// center-facing card never flips through an unreadable edge-on pose.
function nearestPlaneAngle(angle, reference) {
  let result = angle;
  while (result - reference > Math.PI * 0.5) result -= Math.PI;
  while (result - reference < -Math.PI * 0.5) result += Math.PI;
  return result;
}

function createMat4() {
  const output = new Float32Array(16);
  output[0] = output[5] = output[10] = output[15] = 1;
  return output;
}

function mat4Multiply(output, a, b) {
  const result = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      result[column * 4 + row] =
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3];
    }
  }
  output.set(result);
  return output;
}

function mat4Perspective(output, fieldOfView, aspect, near, far) {
  output.fill(0);
  const f = 1 / Math.tan(fieldOfView / 2);
  output[0] = f / aspect;
  output[5] = f;
  output[10] = (far + near) / (near - far);
  output[11] = -1;
  output[14] = (2 * far * near) / (near - far);
  return output;
}

function mat4LookAt(output, eye, center, up) {
  const zAxis = vec3Normalize(vec3Sub(eye, center));
  let xAxis = vec3Normalize(vec3Cross(up, zAxis));
  if (Math.hypot(xAxis[0], xAxis[1], xAxis[2]) < 0.0001) xAxis = [1, 0, 0];
  const yAxis = vec3Cross(zAxis, xAxis);

  output[0] = xAxis[0];
  output[1] = yAxis[0];
  output[2] = zAxis[0];
  output[3] = 0;
  output[4] = xAxis[1];
  output[5] = yAxis[1];
  output[6] = zAxis[1];
  output[7] = 0;
  output[8] = xAxis[2];
  output[9] = yAxis[2];
  output[10] = zAxis[2];
  output[11] = 0;
  output[12] = -vec3Dot(xAxis, eye);
  output[13] = -vec3Dot(yAxis, eye);
  output[14] = -vec3Dot(zAxis, eye);
  output[15] = 1;
  return output;
}

function mat4Compose(output, position, rotation, scale) {
  const halfX = rotation[0] * 0.5;
  const halfY = rotation[1] * 0.5;
  const halfZ = rotation[2] * 0.5;
  const sx = Math.sin(halfX);
  const cx = Math.cos(halfX);
  const sy = Math.sin(halfY);
  const cy = Math.cos(halfY);
  const sz = Math.sin(halfZ);
  const cz = Math.cos(halfZ);

  const qx = sx * cy * cz + cx * sy * sz;
  const qy = cx * sy * cz - sx * cy * sz;
  const qz = cx * cy * sz + sx * sy * cz;
  const qw = cx * cy * cz - sx * sy * sz;
  const x2 = qx + qx;
  const y2 = qy + qy;
  const z2 = qz + qz;
  const xx = qx * x2;
  const xy = qx * y2;
  const xz = qx * z2;
  const yy = qy * y2;
  const yz = qy * z2;
  const zz = qz * z2;
  const wx = qw * x2;
  const wy = qw * y2;
  const wz = qw * z2;

  output[0] = (1 - (yy + zz)) * scale[0];
  output[1] = (xy + wz) * scale[0];
  output[2] = (xz - wy) * scale[0];
  output[3] = 0;
  output[4] = (xy - wz) * scale[1];
  output[5] = (1 - (xx + zz)) * scale[1];
  output[6] = (yz + wx) * scale[1];
  output[7] = 0;
  output[8] = (xz + wy) * scale[2];
  output[9] = (yz - wx) * scale[2];
  output[10] = (1 - (xx + yy)) * scale[2];
  output[11] = 0;
  output[12] = position[0];
  output[13] = position[1];
  output[14] = position[2];
  output[15] = 1;
  return output;
}

function transformPoint(matrix, point) {
  const x = point[0];
  const y = point[1];
  const z = point[2];
  const w = point[3] ?? 1;
  return [
    matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w,
    matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w,
    matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w,
    matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w,
  ];
}

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function roundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function addArtworkGrain(context, width, height, seed, amount = 620) {
  const random = mulberry32(seed + 91);
  context.save();
  for (let index = 0; index < amount; index += 1) {
    const alpha = random() * 0.055;
    context.fillStyle = random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    const size = random() * 2.2 + 0.4;
    context.fillRect(random() * width, random() * height, size, size);
  }
  context.restore();
}

function drawMultiline(context, lines, x, y, lineHeight, align = "left") {
  context.textAlign = align;
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
}

function artworkSize(project) {
  if (project.orientation === 'detail') return [860, 1140];
  if (project.imageElement) {
    const image = project.imageElement;
    const scale = Math.min(1, 4096 / Math.max(image.naturalWidth, image.naturalHeight));
    return [Math.round(image.naturalWidth * scale), Math.round(image.naturalHeight * scale)];
  }
  if (project.orientation === "landscape") return [960, 620];
  if (project.orientation === "square") return [760, 760];
  return [640, 860];
}

function drawLegacyProjectArtwork(canvas, project) {
  const [width, height] = artworkSize(project);
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  const unit = Math.min(width, height) / 640;
  const random = mulberry32(3109 + project.art * 991);

  context.clearRect(0, 0, width, height);
  context.fillStyle = project.background;
  context.fillRect(0, 0, width, height);

  const small = Math.max(11, Math.round(12 * unit));
  const medium = Math.max(28, Math.round(34 * unit));
  const huge = Math.max(72, Math.round(92 * unit));

  switch (project.art) {
    case 0: {
      context.fillStyle = "#f6efe1";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#ee5832";
      context.beginPath();
      context.arc(width * 0.69, height * 0.33, width * 0.27, 0, TAU);
      context.fill();
      context.strokeStyle = "#173ec9";
      context.lineWidth = 18 * unit;
      context.beginPath();
      context.moveTo(-40, height * 0.66);
      context.bezierCurveTo(width * 0.28, height * 0.43, width * 0.54, height * 0.91, width + 40, height * 0.56);
      context.stroke();
      context.fillStyle = "#11121a";
      context.font = `900 ${huge}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 42 * unit, height * 0.66, huge * 0.83);
      break;
    }
    case 1: {
      const gradient = context.createRadialGradient(width * 0.32, height * 0.42, 5, width * 0.32, height * 0.42, width * 0.7);
      gradient.addColorStop(0, "#29351d");
      gradient.addColorStop(0.45, "#111216");
      gradient.addColorStop(1, "#030405");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "#c7f22f";
      context.lineWidth = 5 * unit;
      for (let ring = 0; ring < 5; ring += 1) {
        context.beginPath();
        context.arc(width * 0.56, height * 0.43, width * (0.1 + ring * 0.075), 0, TAU);
        context.stroke();
      }
      context.fillStyle = "#f2efe5";
      context.font = `800 ${huge * 0.94}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 38 * unit, height * 0.68, huge * 0.82);
      context.fillStyle = "#c7f22f";
      context.fillRect(width * 0.78, 0, width * 0.22, height);
      break;
    }
    case 2: {
      context.fillStyle = "#e43828";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(255,244,226,.8)";
      context.lineWidth = 2 * unit;
      for (let offset = -height; offset < width; offset += 72 * unit) {
        context.beginPath();
        context.moveTo(offset, 0);
        context.lineTo(offset + height, height);
        context.stroke();
      }
      context.fillStyle = "#f4eee2";
      context.fillRect(width * 0.09, height * 0.11, width * 0.82, height * 0.2);
      context.fillRect(width * 0.09, height * 0.69, width * 0.82, height * 0.2);
      context.fillStyle = "#121319";
      context.font = `900 ${huge * 1.15}px Arial, sans-serif`;
      context.textAlign = "center";
      context.fillText("SIGNAL", width / 2, height * 0.28);
      context.fillText("24", width / 2, height * 0.86);
      break;
    }
    case 3: {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f2a557");
      gradient.addColorStop(0.35, "#6276ef");
      gradient.addColorStop(0.66, "#1d1720");
      gradient.addColorStop(1, "#73c8e2");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "rgba(10,10,14,.92)";
      context.beginPath();
      context.moveTo(width * 0.42, height * 0.16);
      context.quadraticCurveTo(width * 0.52, height * 0.1, width * 0.58, height * 0.23);
      context.lineTo(width * 0.73, height * 0.86);
      context.quadraticCurveTo(width * 0.5, height * 0.97, width * 0.27, height * 0.84);
      context.closePath();
      context.fill();
      context.strokeStyle = "rgba(255,255,255,.86)";
      context.lineWidth = 3 * unit;
      for (let ring = 0; ring < 3; ring += 1) {
        context.beginPath();
        context.ellipse(width * 0.52, height * 0.47, width * (0.36 - ring * 0.08), height * (0.27 + ring * 0.03), ring * 0.35, 0, TAU);
        context.stroke();
      }
      context.fillStyle = "#f7f0e4";
      context.font = `800 ${medium}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 30 * unit, 62 * unit, medium * 0.92);
      break;
    }
    case 4: {
      context.fillStyle = "#d4cbb7";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(51,43,30,.17)";
      context.lineWidth = 1;
      for (let line = 0; line < 80; line += 1) {
        context.beginPath();
        context.moveTo(0, random() * height);
        context.lineTo(width, random() * height);
        context.stroke();
      }
      context.fillStyle = "#b1d328";
      context.beginPath();
      context.moveTo(width * 0.2, height * 0.2);
      context.lineTo(width * 0.82, height * 0.16);
      context.lineTo(width * 0.7, height * 0.55);
      context.lineTo(width * 0.32, height * 0.62);
      context.closePath();
      context.fill();
      context.fillStyle = "#18200d";
      context.font = `900 ${huge * 1.25}px Arial, sans-serif`;
      context.fillText("FN", width * 0.23, height * 0.51);
      context.font = `800 ${medium}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 40 * unit, height * 0.75, medium * 1.05);
      break;
    }
    case 5: {
      context.fillStyle = "#d8eef1";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(28,64,90,.17)";
      context.lineWidth = 1;
      for (let x = 0; x <= width; x += width / 12) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = 0; y <= height; y += height / 8) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }
      const cards = [
        [0.08, 0.18, 0.27, 0.44, "#f05b36"],
        [0.38, 0.1, 0.24, 0.68, "#172b95"],
        [0.66, 0.27, 0.26, 0.5, "#f1c44d"],
      ];
      cards.forEach(([x, y, w, h, color]) => {
        context.fillStyle = color;
        roundedRect(context, width * x, height * y, width * w, height * h, 20 * unit);
        context.fill();
      });
      context.fillStyle = "#101319";
      context.font = `900 ${huge * 0.95}px Arial, sans-serif`;
      context.fillText("KINETIC / UI", width * 0.06, height * 0.9);
      break;
    }
    case 6: {
      context.fillStyle = "#222328";
      context.fillRect(0, 0, width, height);
      const columns = 5;
      for (let column = 0; column < columns; column += 1) {
        const x = 30 * unit + column * ((width - 60 * unit) / columns);
        context.fillStyle = column % 2 ? "#d8d4ca" : "#777980";
        context.fillRect(x, height * (0.12 + random() * 0.15), width * 0.12, height * (0.55 + random() * 0.2));
        context.fillStyle = "rgba(17,18,22,.72)";
        for (let row = 0; row < 9; row += 1) context.fillRect(x + 8, height * 0.18 + row * 34 * unit, width * 0.085, 3 * unit);
      }
      context.fillStyle = "#f3eee2";
      context.font = `800 ${medium}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 28 * unit, height * 0.87, medium * 1.02);
      break;
    }
    case 7: {
      context.fillStyle = "#f3eadb";
      context.fillRect(0, 0, width, height);
      context.save();
      context.translate(width * 0.15, -height * 0.05);
      context.rotate(-0.18);
      context.fillStyle = "#ff5b2d";
      context.fillRect(0, 0, width * 0.32, height * 1.2);
      context.fillStyle = "#16358f";
      context.fillRect(width * 0.34, 0, width * 0.18, height * 1.2);
      context.restore();
      context.fillStyle = "#102b86";
      context.font = `900 ${huge * 0.86}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, width * 0.42, height * 0.58, huge * 0.78);
      context.strokeStyle = "#102b86";
      context.lineWidth = 2 * unit;
      context.strokeRect(25 * unit, 25 * unit, width - 50 * unit, height - 50 * unit);
      break;
    }
    case 8: {
      context.fillStyle = "#f8f4e7";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#ffc325";
      context.fillRect(0, 0, width, height * 0.34);
      context.strokeStyle = "#174cb1";
      context.lineWidth = 13 * unit;
      for (let stripe = -2; stripe < 9; stripe += 1) {
        context.beginPath();
        context.moveTo(width * 0.5, height * 0.46);
        context.quadraticCurveTo(width * (0.12 + stripe * 0.12), height * 0.69, width * (0.06 + stripe * 0.13), height);
        context.stroke();
      }
      context.fillStyle = "#174cb1";
      context.font = `900 ${huge * 0.78}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 30 * unit, height * 0.24, huge * 0.76);
      break;
    }
    case 9: {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f07945");
      gradient.addColorStop(0.46, "#7039d1");
      gradient.addColorStop(1, "#182a9d");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      for (let orb = 0; orb < 8; orb += 1) {
        const x = random() * width;
        const y = random() * height;
        const radius = width * (0.06 + random() * 0.16);
        const orbGradient = context.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 2, x, y, radius);
        orbGradient.addColorStop(0, "rgba(255,244,205,.94)");
        orbGradient.addColorStop(0.43, "rgba(236,102,72,.7)");
        orbGradient.addColorStop(1, "rgba(31,17,115,0)");
        context.fillStyle = orbGradient;
        context.beginPath(); context.arc(x, y, radius, 0, TAU); context.fill();
      }
      context.fillStyle = "#f5ecd9";
      context.font = `900 ${huge * 0.78}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 32 * unit, height * 0.76, huge * 0.75);
      break;
    }
    case 10: {
      context.fillStyle = "#d9422f";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#47333a";
      context.beginPath();
      context.ellipse(width * 0.5, height * 0.47, width * 0.25, height * 0.3, -0.12, 0, TAU);
      context.fill();
      context.fillStyle = "#e8c9ad";
      context.beginPath();
      context.arc(width * 0.47, height * 0.4, width * 0.12, 0, TAU);
      context.fill();
      context.strokeStyle = "#f3e9d5";
      context.lineWidth = 2 * unit;
      for (let ring = 0; ring < 4; ring += 1) {
        context.beginPath();
        context.arc(width * 0.5, height * 0.47, width * (0.31 + ring * 0.055), Math.PI * (0.15 + ring * 0.11), Math.PI * (1.68 + ring * 0.05));
        context.stroke();
      }
      context.fillStyle = "#f3e9d5";
      context.font = `900 ${medium * 1.16}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 30 * unit, height * 0.82, medium * 1.03);
      break;
    }
    case 11: {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#7c5236");
      gradient.addColorStop(0.55, "#c79c79");
      gradient.addColorStop(1, "#513426");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.save();
      context.translate(width * 0.48, height * 0.5);
      context.rotate(-0.12);
      context.fillStyle = "#efe9da";
      roundedRect(context, -width * 0.28, -height * 0.26, width * 0.56, height * 0.52, 22 * unit);
      context.fill();
      context.fillStyle = "#173243";
      context.beginPath(); context.arc(0, 0, height * 0.13, 0, TAU); context.fill();
      context.fillStyle = "#ef5b36";
      context.beginPath(); context.arc(width * 0.05, -height * 0.03, height * 0.08, 0, TAU); context.fill();
      context.restore();
      context.fillStyle = "#f5ede0";
      context.font = `800 ${medium}px Arial, sans-serif`;
      context.fillText("OBJECT / STUDY", 35 * unit, height - 34 * unit);
      break;
    }
    case 12: {
      context.fillStyle = "#df3528";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#f3eee2";
      context.font = `900 ${huge * 1.65}px Arial Black, Arial, sans-serif`;
      context.textAlign = "center";
      context.fillText("T", width * 0.26, height * 0.37);
      context.fillText("C", width * 0.72, height * 0.79);
      context.strokeStyle = "#111216";
      context.lineWidth = 4 * unit;
      context.strokeRect(width * 0.08, height * 0.08, width * 0.84, height * 0.84);
      context.fillStyle = "#111216";
      context.font = `800 ${small * 1.15}px monospace`;
      context.fillText("OPEN LETTERFORM COMMUNITY", width / 2, height * 0.52);
      break;
    }
    case 13: {
      const cell = Math.min(width / 10, height / 7);
      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          context.fillStyle = (Math.floor(x / cell) + Math.floor(y / cell)) % 2 ? "#3359d7" : "#e988bf";
          context.fillRect(x, y, cell + 1, cell + 1);
        }
      }
      context.fillStyle = "#f1eddf";
      roundedRect(context, width * 0.12, height * 0.16, width * 0.76, height * 0.68, 24 * unit);
      context.fill();
      context.fillStyle = "#111216";
      context.font = `900 ${huge * 0.92}px Arial, sans-serif`;
      context.textAlign = "center";
      drawMultiline(context, project.artTitle, width / 2, height * 0.45, huge * 0.82, "center");
      break;
    }
    case 14: {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#171a20");
      gradient.addColorStop(0.24, "#e9edf0");
      gradient.addColorStop(0.43, "#666d78");
      gradient.addColorStop(0.67, "#f6f7f7");
      gradient.addColorStop(1, "#222733");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(5,7,10,.7)";
      context.lineWidth = 22 * unit;
      for (let ring = 0; ring < 4; ring += 1) {
        context.beginPath();
        context.ellipse(width * 0.5, height * 0.48, width * (0.12 + ring * 0.09), height * (0.32 - ring * 0.045), ring * 0.62, 0, TAU);
        context.stroke();
      }
      context.fillStyle = "#0f1218";
      context.fillRect(0, height * 0.82, width, height * 0.18);
      context.fillStyle = "#f0f2f3";
      context.font = `800 ${medium}px Arial, sans-serif`;
      context.fillText("MONO / OBJECT", 30 * unit, height * 0.91);
      break;
    }
    default: {
      context.fillStyle = "#171719";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#f06b2d";
      context.beginPath();
      context.moveTo(width * 0.12, 0);
      context.lineTo(width * 0.58, 0);
      context.lineTo(width * 0.86, height);
      context.lineTo(width * 0.4, height);
      context.closePath();
      context.fill();
      context.fillStyle = "#f2ecdd";
      context.font = `900 ${huge * 0.82}px Arial, sans-serif`;
      drawMultiline(context, project.artTitle, 35 * unit, height * 0.42, huge * 0.82);
      context.strokeStyle = "#f2ecdd";
      context.lineWidth = 2 * unit;
      context.strokeRect(24 * unit, 24 * unit, width - 48 * unit, height - 48 * unit);
    }
  }

  context.textAlign = "left";
  context.fillStyle = project.ink;
  context.font = `700 ${small}px monospace`;
  context.fillText(project.index, 22 * unit, 27 * unit);
  context.textAlign = "right";
  context.fillText(project.year, width - 22 * unit, 27 * unit);
  context.textAlign = "left";
  context.font = `600 ${Math.max(8, small * 0.7)}px monospace`;
  context.fillText(project.category, 22 * unit, height - 19 * unit);
  addArtworkGrain(context, width, height, 600 + project.art * 27);
  return canvas;
}

function drawProjectArtwork(canvas, project) {
  const [width, height] = artworkSize(project);
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (project.imageElement) {
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    if (project.orientation === 'detail') {
      context.drawImage(project.imageElement, 0, 0, project.imageElement.naturalWidth, project.imageElement.naturalWidth * height / width, 0, 0, width, height);
    } else context.drawImage(project.imageElement, 0, 0, width, height);
    return canvas;
  }
  // Detail images remain available even when WebGL initialization is unavailable.
  if (project.imageSrc) {
    if (!project.imageLoading) project.imageLoading = new Promise(resolve => {
      const image = new Image();
      image.onload = () => { project.imageElement = image; resolve(true); };
      image.onerror = () => resolve(false);
      image.src = project.imageSrc;
    });
    project.imageLoading.then(loaded => { if (loaded && canvas.isConnected) drawProjectArtwork(canvas, project); });
  }
  const tones = ["#8b8e91", "#7f8387", "#96999b", "#74787d"];

  context.clearRect(0, 0, width, height);
  context.fillStyle = tones[project.art % tones.length];
  context.fillRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(255,255,255,.12)");
  gradient.addColorStop(0.52, "rgba(255,255,255,0)");
  gradient.addColorStop(1, "rgba(0,0,0,.12)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  return canvas;
}

function drawContactWord(canvas) {
  canvas.width = 2304;
  canvas.height = 600;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f4f3ed";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "900 420px Arial, sans-serif";
  context.fillText("CONTACT", canvas.width / 2, canvas.height * 0.51);
  return canvas;
}

const PLANE_VERTEX_SHADER = `#version 300 es
in vec3 aPosition;
in vec2 aUv;
uniform mat4 uMvp;
out vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = uMvp * vec4(aPosition, 1.0);
}`;

const PLANE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
uniform float uHover;
uniform float uActive;
uniform float uDim;
uniform float uFog;
uniform float uCategoryHighlight;
uniform float uCategoryFilter;
uniform float uGlowPass;
in vec2 vUv;
out vec4 outColor;
void main() {
  float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  if (uGlowPass > 0.5) {
    float softHalo = smoothstep(0.0, 0.035, edge) * (1.0 - smoothstep(0.035, 0.22, edge));
    float edgeLight = 1.0 - smoothstep(0.0, 0.032, abs(edge - 0.045));
    vec3 glowColor = mix(vec3(0.62, 0.80, 1.0), vec3(0.95, 0.985, 1.0), edgeLight);
    float glowAlpha = (softHalo * 0.28 + edgeLight * 0.26) * uCategoryHighlight;
    outColor = vec4(glowColor, glowAlpha);
    return;
  }
  vec4 texel = texture(uTexture, vUv);
  vec3 color = texel.rgb;
  float selected = uCategoryFilter * uCategoryHighlight;
  float muted = uCategoryFilter * (1.0 - uCategoryHighlight);
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(color, vec3(luminance), muted * 0.58);
  color = mix(vec3(0.5), color, 1.0 - muted * 0.16);
  color *= 1.0 - muted * 0.34;
  luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(luminance), color, 1.0 + selected * 0.22);
  color = mix(vec3(0.5), color, 1.0 + selected * 0.08);
  color *= 1.0 + selected * 0.075;
  float border = 1.0 - smoothstep(0.0, 0.012 + uHover * 0.012 + uCategoryHighlight * 0.006, edge);
  vec3 borderColor = mix(vec3(0.94), vec3(0.86, 0.96, 1.0), uCategoryHighlight);
  float borderLight = max(max(uHover * 0.72, uActive * 0.045), selected * 0.92);
  color = mix(color, borderColor, border * borderLight);
  color = mix(color, vec3(1.0), uHover * 0.055);
  color += vec3(0.018, 0.035, 0.055) * selected;
  color *= 1.0 - uDim * 0.76;
  color = mix(color, vec3(0.1569, 0.3451, 1.0), uFog * 0.2);
  if (!gl_FrontFacing) color *= 0.26;
  outColor = vec4(color, texel.a);
}`;

const TUNNEL_VERTEX_SHADER = `#version 300 es
in vec3 aPosition;
in vec2 aUv;
uniform mat4 uMvp;
out vec2 vUv;
out float vDepth;
void main() {
  vUv = aUv;
  vDepth = -aPosition.z;
  gl_Position = uMvp * vec4(aPosition, 1.0);
}`;

const TUNNEL_FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
in float vDepth;
out vec4 outColor;
float gridLine(float value) {
  float distanceToLine = abs(fract(value + 0.5) - 0.5);
  float width = max(fwidth(value), 0.0007);
  return 1.0 - smoothstep(width * 0.35, width * 1.35, distanceToLine);
}
void main() {
  float vertical = gridLine(vUv.x * 28.0);
  float depth = gridLine(vUv.y * 18.0);
  float grid = max(vertical, depth);
  vec3 room = vec3(0.1569, 0.3451, 1.0);
  vec3 line = vec3(0.88, 0.94, 1.0);
  vec3 color = mix(room, line, grid * 0.14);
  outColor = vec4(color, 1.0);
}`;

const KNOT_VERTEX_SHADER = `#version 300 es
in vec3 aPosition;
in vec3 aNormal;
in float aBand;
uniform mat4 uModel;
uniform mat4 uViewProjection;
out vec3 vNormal;
out vec3 vWorld;
out float vBand;
void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(uModel) * aNormal);
  vBand = aBand;
  gl_Position = uViewProjection * world;
}`;

const KNOT_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec3 uCamera;
uniform float uDim;
uniform float uRoughness;
uniform sampler2D uEnvironment;
in vec3 vNormal;
in vec3 vWorld;
in float vBand;
out vec4 outColor;
const float PI = 3.141592653589793;
vec2 environmentUv(vec3 direction) {
  return vec2(atan(direction.z, direction.x) / (2.0 * PI) + 0.5, asin(clamp(direction.y, -1.0, 1.0)) / PI + 0.5);
}
vec3 toneMap(vec3 value) {
  value = max(value, vec3(0.0));
  return pow(value / (value + vec3(0.72)), vec3(1.0 / 2.2));
}
void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(uCamera - vWorld);
  vec3 reflection = reflect(-viewDirection, normal);
  vec3 environment = textureLod(uEnvironment, environmentUv(reflection), uRoughness * 4.2).rgb;
  float facing = max(dot(normal, viewDirection), 0.0);
  vec3 fresnel = vec3(0.91, 0.93, 0.97) + vec3(0.09, 0.07, 0.03) * pow(1.0 - facing, 5.0);
  vec3 keyDirection = normalize(vec3(-0.42, 0.76, 0.5));
  vec3 halfVector = normalize(keyDirection + viewDirection);
  float specular = pow(max(dot(normal, halfVector), 0.0), mix(180.0, 64.0, uRoughness));
  float rim = pow(1.0 - facing, 2.7);
  float ao = mix(0.72, 1.0, clamp(vBand, 0.0, 1.0));
  vec3 color = environment * fresnel * (0.86 + rim * 0.22) * ao;
  color += specular * vec3(1.35, 1.38, 1.45);
  color += rim * vec3(0.14, 0.17, 0.28);
  vec3 mapped = toneMap(color);
  float alpha = 1.0;
  if (vBand > 1.5) {
    // Glossy molded plastic. Accessory materials share the same lighting so
    // the mask, strap and snorkel stay part of the toy through a full turn.
    vec3 base = vec3(1.0, 0.86, 0.006);
    if (vBand > 2.8 && vBand < 3.5) base = vec3(1.0, 0.245, 0.008);
    if (vBand > 3.5 && vBand < 4.5) base = vec3(0.86, 0.135, 0.004);
    if (vBand > 4.5 && vBand < 5.5) base = vec3(0.009, 0.012, 0.014);
    if (vBand > 5.5 && vBand < 6.0) base = vec3(0.99);
    if (vBand > 6.0 && vBand < 7.0) base = vec3(0.004, 0.54, 1.0);
    if (vBand > 7.0 && vBand < 8.0) base = vec3(0.015, 0.79, 0.085);
    float diffuse = max(dot(normal, keyDirection), 0.0);
    float fill = max(dot(normal, normalize(vec3(0.65, 0.3, -0.7))), 0.0);
    float softbox = pow(max(dot(normal, halfVector), 0.0), 24.0);
    float gloss = vBand > 4.5 && vBand < 5.5 ? 0.22 : 0.72;
    mapped = base * (0.86 + diffuse * 0.19 + fill * 0.08);
    mapped += vec3(1.0, 0.985, 0.9) * (specular * gloss + softbox * 0.14);
    mapped += environment * rim * 0.095 + base * rim * 0.09;
    if (vBand > 8.0) {
      // A clear, slightly blue lens with white reflections; the eyes remain
      // visible beneath it. Its mesh is drawn after the opaque duck.
      mapped = vec3(0.74, 0.93, 1.0) + specular * 0.28;
      alpha = 0.055 + rim * 0.22 + specular * 0.4 + softbox * 0.1;
    }
  }
  mapped = mix(mapped, vec3(0.1569, 0.3451, 1.0), uDim);
  outColor = vec4(mapped, alpha);
}`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compilation failed: ${message}`);
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program linking failed: ${message}`);
  }
  return program;
}

function createQuadGeometry(gl) {
  const vertices = new Float32Array([
    -0.5, -0.5, 0, 0, 0,
    0.5, -0.5, 0, 1, 0,
    -0.5, 0.5, 0, 0, 1,
    0.5, 0.5, 0, 1, 1,
  ]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  return { buffer, count: 4 };
}

function createStaticBoxGeometry(gl) {
  const positions = [
    -0.5,-0.5, 0.5,  0.5,-0.5, 0.5,  0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
     0.5,-0.5,-0.5, -0.5,-0.5,-0.5, -0.5, 0.5,-0.5,  0.5, 0.5,-0.5,
    -0.5,-0.5,-0.5, -0.5,-0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,-0.5,
     0.5,-0.5, 0.5,  0.5,-0.5,-0.5,  0.5, 0.5,-0.5,  0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,  0.5, 0.5, 0.5,  0.5, 0.5,-0.5, -0.5, 0.5,-0.5,
    -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,  0.5,-0.5, 0.5, -0.5,-0.5, 0.5,
  ];
  const normals = [
     0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
     0, 0,-1, 0, 0,-1, 0, 0,-1, 0, 0,-1,
    -1, 0, 0,-1, 0, 0,-1, 0, 0,-1, 0, 0,
     1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
     0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
     0,-1, 0, 0,-1, 0, 0,-1, 0, 0,-1, 0,
  ];
  const indices = [];
  for (let face = 0; face < 6; face += 1) {
    const base = face * 4;
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  return uploadIndexedGeometry(gl, positions, normals, new Array(24).fill(0.35), indices);
}

function createTunnelGeometry(gl) {
  const sides = 112;
  const radius = 17.8;
  const centerZ = 5.25;
  const halfHeight = 9.2;
  const arc = 1.34;
  const vertices = [];
  const indices = [];

  for (let side = 0; side <= sides; side += 1) {
    const fraction = side / sides;
    const angle = lerp(-arc, arc, fraction);
    const x = Math.sin(angle) * radius;
    const z = centerZ - Math.cos(angle) * radius;
    vertices.push(x, -halfHeight, z, fraction, 0);
    vertices.push(x, halfHeight, z, fraction, 1);
  }

  for (let side = 0; side < sides; side += 1) {
    const index = side * 2;
    indices.push(index, index + 1, index + 2, index + 2, index + 1, index + 3);
  }

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return { vertexBuffer, indexBuffer, count: indices.length };
}

function torusKnotPoint(t) {
  const major = 1.52;
  const minor = 0.67;
  return [
    (major + minor * Math.cos(3 * t)) * Math.cos(2 * t),
    (major + minor * Math.cos(3 * t)) * Math.sin(2 * t) * 0.9,
    minor * Math.sin(3 * t) * 1.15,
  ];
}

function createSmoothKnotGeometry(gl) {
  const segments = 168;
  const radialSegments = 6;
  const tubeRadius = 0.19;
  const centers = [];
  const tangents = [];
  const normals = [];
  const binormals = [];

  for (let segment = 0; segment < segments; segment += 1) {
    centers.push(torusKnotPoint((segment / segments) * TAU));
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const previous = centers[(segment - 1 + segments) % segments];
    const next = centers[(segment + 1) % segments];
    tangents.push(vec3Normalize(vec3Sub(next, previous)));
  }

  let initialReference = Math.abs(vec3Dot(tangents[0], [0, 0, 1])) > 0.86 ? [0, 1, 0] : [0, 0, 1];
  normals[0] = vec3Normalize(vec3Cross(tangents[0], initialReference));
  binormals[0] = vec3Normalize(vec3Cross(tangents[0], normals[0]));

  for (let segment = 1; segment < segments; segment += 1) {
    const previousTangent = tangents[segment - 1];
    const tangent = tangents[segment];
    const axisValue = vec3Cross(previousTangent, tangent);
    const axisLength = Math.hypot(axisValue[0], axisValue[1], axisValue[2]);
    let transported = normals[segment - 1];
    if (axisLength > 0.00001) {
      const axis = vec3Scale(axisValue, 1 / axisLength);
      const angle = Math.acos(clamp(vec3Dot(previousTangent, tangent), -1, 1));
      transported = rotateVectorAroundAxis(transported, axis, angle);
    }
    normals[segment] = vec3Normalize(transported);
    binormals[segment] = vec3Normalize(vec3Cross(tangent, normals[segment]));
  }

  const positions = [];
  const vertexNormals = [];
  const bands = [];
  const indices = [];

  for (let segment = 0; segment < segments; segment += 1) {
    for (let radial = 0; radial < radialSegments; radial += 1) {
      const angle = (radial / radialSegments) * TAU;
      const offset = vec3Add(
        vec3Scale(normals[segment], Math.cos(angle) * tubeRadius),
        vec3Scale(binormals[segment], Math.sin(angle) * tubeRadius),
      );
      const position = vec3Add(centers[segment], offset);
      positions.push(...position);
      vertexNormals.push(...vec3Normalize(offset));
      bands.push(segment / segments);
    }
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const nextSegment = (segment + 1) % segments;
    for (let radial = 0; radial < radialSegments; radial += 1) {
      const nextRadial = (radial + 1) % radialSegments;
      const a = segment * radialSegments + radial;
      const b = nextSegment * radialSegments + radial;
      const c = segment * radialSegments + nextRadial;
      const d = nextSegment * radialSegments + nextRadial;
      indices.push(a, b, c, c, b, d);
    }
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  const bandBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bandBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bands), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return { positionBuffer, normalBuffer, bandBuffer, indexBuffer, count: indices.length };
}

function appendPrismBetween(positions, vertexNormals, bands, indices, start, end, halfWidth, halfHeight, band) {
  const directionVector = vec3Sub(end, start);
  const fullLength = Math.hypot(directionVector[0], directionVector[1], directionVector[2]);
  if (fullLength < 0.0001) return;
  const direction = vec3Scale(directionVector, 1 / fullLength);
  const reference = Math.abs(direction[1]) > 0.88 ? [1, 0, 0] : [0, 1, 0];
  const side = vec3Normalize(vec3Cross(direction, reference));
  const up = vec3Normalize(vec3Cross(side, direction));
  const center = vec3Scale(vec3Add(start, end), 0.5);
  const halfLength = fullLength * 0.425;

  const corner = (along, across, vertical) =>
    vec3Add(
      center,
      vec3Add(
        vec3Scale(direction, along * halfLength),
        vec3Add(vec3Scale(side, across * halfWidth), vec3Scale(up, vertical * halfHeight)),
      ),
    );
  const corners = [
    corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1),
    corner(-1, -1, 1), corner(1, -1, 1), corner(1, 1, 1), corner(-1, 1, 1),
  ];
  const faces = [
    [[0, 3, 2, 1], vec3Scale(up, -1)],
    [[4, 5, 6, 7], up],
    [[0, 1, 5, 4], vec3Scale(side, -1)],
    [[3, 7, 6, 2], side],
    [[0, 4, 7, 3], vec3Scale(direction, -1)],
    [[1, 2, 6, 5], direction],
  ];

  faces.forEach(([face, normal]) => {
    const base = positions.length / 3;
    face.forEach((cornerIndex) => {
      positions.push(...corners[cornerIndex]);
      vertexNormals.push(...normal);
      bands.push(band);
    });
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  });
}

function uploadIndexedGeometry(gl, positions, normals, bands, indices) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  const bandBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bandBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bands), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  return { positionBuffer, normalBuffer, bandBuffer, indexBuffer, count: indices.length };
}

function sampleCatmullControls(controls, closed, subdivisions = 18) {
  const samples = [];
  const segmentCount = closed ? controls.length : controls.length - 1;
  const pointAt = (index) => {
    if (closed) return controls[(index + controls.length) % controls.length];
    return controls[clamp(index, 0, controls.length - 1)];
  };
  for (let segment = 0; segment < segmentCount; segment += 1) {
    const p0 = pointAt(segment - 1);
    const p1 = pointAt(segment);
    const p2 = pointAt(segment + 1);
    const p3 = pointAt(segment + 2);
    for (let step = 0; step < subdivisions; step += 1) {
      samples.push(catmullRom(p0, p1, p2, p3, step / subdivisions));
    }
  }
  if (!closed) samples.push([...controls[controls.length - 1]]);
  return samples;
}

function resampleCurve(samples, count, closed) {
  const source = closed ? [...samples, samples[0]] : samples;
  const distances = [0];
  for (let index = 1; index < source.length; index += 1) {
    const delta = vec3Sub(source[index], source[index - 1]);
    distances.push(distances[index - 1] + Math.hypot(delta[0], delta[1], delta[2]));
  }
  const total = distances[distances.length - 1] || 1;
  const result = [];
  let cursor = 1;
  for (let index = 0; index < count; index += 1) {
    const fraction = closed ? index / count : index / Math.max(1, count - 1);
    const target = total * fraction;
    while (cursor < distances.length - 1 && distances[cursor] < target) cursor += 1;
    const startDistance = distances[cursor - 1];
    const endDistance = distances[cursor];
    const amount = (target - startDistance) / Math.max(0.00001, endDistance - startDistance);
    result.push(vec3Mix(source[cursor - 1], source[cursor], amount));
  }
  return result;
}

function buildTransportFrames(points, closed) {
  const tangents = points.map((point, index) => {
    const previous = points[closed ? (index - 1 + points.length) % points.length : Math.max(0, index - 1)];
    const next = points[closed ? (index + 1) % points.length : Math.min(points.length - 1, index + 1)];
    return vec3Normalize(vec3Sub(next, previous));
  });
  const normals = [];
  const binormals = [];
  const reference = Math.abs(vec3Dot(tangents[0], [0, 0, 1])) > 0.84 ? [0, 1, 0] : [0, 0, 1];
  normals[0] = vec3Normalize(vec3Cross(tangents[0], reference));
  binormals[0] = vec3Normalize(vec3Cross(tangents[0], normals[0]));
  for (let index = 1; index < points.length; index += 1) {
    const axisValue = vec3Cross(tangents[index - 1], tangents[index]);
    const axisLength = Math.hypot(axisValue[0], axisValue[1], axisValue[2]);
    let transported = normals[index - 1];
    if (axisLength > 0.00001) {
      const axis = vec3Scale(axisValue, 1 / axisLength);
      const angle = Math.acos(clamp(vec3Dot(tangents[index - 1], tangents[index]), -1, 1));
      transported = rotateVectorAroundAxis(transported, axis, angle);
    }
    transported = vec3Sub(transported, vec3Scale(tangents[index], vec3Dot(transported, tangents[index])));
    normals[index] = vec3Normalize(transported);
    binormals[index] = vec3Normalize(vec3Cross(tangents[index], normals[index]));
  }
  return { tangents, normals, binormals };
}

function appendBeveledSegment(positions, vertexNormals, bands, indices, start, end, sideHint, halfWidth, halfHeight, bevel) {
  const delta = vec3Sub(end, start);
  const length = Math.hypot(delta[0], delta[1], delta[2]);
  if (length < 0.0001) return;
  const direction = vec3Scale(delta, 1 / length);
  let side = vec3Sub(sideHint, vec3Scale(direction, vec3Dot(sideHint, direction)));
  side = vec3Normalize(side);
  const up = vec3Normalize(vec3Cross(direction, side));
  const center = vec3Scale(vec3Add(start, end), 0.5);
  const halfLength = length * 0.46;
  const innerLength = Math.max(0.01, halfLength - bevel);
  const outline = (width, height, corner) => [
    [-width + corner, -height], [width - corner, -height], [width, -height + corner], [width, height - corner],
    [width - corner, height], [-width + corner, height], [-width, height - corner], [-width, -height + corner],
  ];
  const crossNormals = [
    [-0.38, -0.92], [0.38, -0.92], [0.92, -0.38], [0.92, 0.38],
    [0.38, 0.92], [-0.38, 0.92], [-0.92, 0.38], [-0.92, -0.38],
  ];
  const rings = [
    { along: -halfLength, width: halfWidth - bevel * 0.58, height: halfHeight - bevel * 0.58, corner: bevel * 0.58, end: -0.72, ao: 0.7 },
    { along: -innerLength, width: halfWidth, height: halfHeight, corner: bevel, end: 0, ao: 0.98 },
    { along: innerLength, width: halfWidth, height: halfHeight, corner: bevel, end: 0, ao: 0.98 },
    { along: halfLength, width: halfWidth - bevel * 0.58, height: halfHeight - bevel * 0.58, corner: bevel * 0.58, end: 0.72, ao: 0.7 },
  ];
  const ringStarts = [];
  rings.forEach((ring) => {
    ringStarts.push(positions.length / 3);
    outline(ring.width, ring.height, ring.corner).forEach(([across, vertical], radial) => {
      const point = vec3Add(center, vec3Add(vec3Scale(direction, ring.along), vec3Add(vec3Scale(side, across), vec3Scale(up, vertical))));
      const crossNormal = vec3Normalize(vec3Add(vec3Scale(side, crossNormals[radial][0]), vec3Scale(up, crossNormals[radial][1])));
      const normal = vec3Normalize(vec3Add(crossNormal, vec3Scale(direction, ring.end)));
      positions.push(...point);
      vertexNormals.push(...normal);
      bands.push(ring.ao);
    });
  });
  for (let ring = 0; ring < rings.length - 1; ring += 1) {
    for (let radial = 0; radial < 8; radial += 1) {
      const nextRadial = (radial + 1) % 8;
      const a = ringStarts[ring] + radial;
      const b = ringStarts[ring + 1] + radial;
      const c = ringStarts[ring] + nextRadial;
      const d = ringStarts[ring + 1] + nextRadial;
      indices.push(a, b, c, c, b, d);
    }
  }
  [-1, 1].forEach((sign, capIndex) => {
    const capCenter = vec3Add(center, vec3Scale(direction, sign * halfLength));
    const centerIndex = positions.length / 3;
    positions.push(...capCenter);
    vertexNormals.push(...vec3Scale(direction, sign));
    bands.push(0.62);
    const sourceRing = ringStarts[capIndex === 0 ? 0 : 3];
    const capRing = [];
    for (let radial = 0; radial < 8; radial += 1) {
      const sourceIndex = sourceRing + radial;
      capRing.push(positions.length / 3);
      positions.push(positions[sourceIndex * 3], positions[sourceIndex * 3 + 1], positions[sourceIndex * 3 + 2]);
      vertexNormals.push(...vec3Scale(direction, sign));
      bands.push(0.66);
    }
    for (let radial = 0; radial < 8; radial += 1) {
      const next = (radial + 1) % 8;
      if (sign < 0) indices.push(centerIndex, capRing[next], capRing[radial]);
      else indices.push(centerIndex, capRing[radial], capRing[next]);
    }
  });
}

function appendSweptTube(positions, vertexNormals, bands, indices, points, radius, depthRadius = radius, closed = false) {
  const radialSegments = 12;
  const frames = buildTransportFrames(points, closed);
  const ringStarts = [];
  points.forEach((point, index) => {
    ringStarts.push(positions.length / 3);
    for (let radial = 0; radial < radialSegments; radial += 1) {
      const angle = (radial / radialSegments) * TAU;
      const outward = vec3Add(vec3Scale(frames.normals[index], Math.cos(angle)), vec3Scale(frames.binormals[index], Math.sin(angle)));
      const offset = vec3Add(vec3Scale(frames.normals[index], Math.cos(angle) * radius), vec3Scale(frames.binormals[index], Math.sin(angle) * depthRadius));
      positions.push(...vec3Add(point, offset));
      vertexNormals.push(...vec3Normalize(outward));
      bands.push(1);
    }
  });
  const connections = closed ? points.length : points.length - 1;
  for (let index = 0; index < connections; index += 1) {
    const nextIndex = (index + 1) % points.length;
    for (let radial = 0; radial < radialSegments; radial += 1) {
      const nextRadial = (radial + 1) % radialSegments;
      const a = ringStarts[index] + radial;
      const b = ringStarts[nextIndex] + radial;
      const c = ringStarts[index] + nextRadial;
      const d = ringStarts[nextIndex] + nextRadial;
      indices.push(a, b, c, c, b, d);
    }
  }
  if (!closed) {
    [0, points.length - 1].forEach((pointIndex, capIndex) => {
      const sign = capIndex === 0 ? -1 : 1;
      const centerIndex = positions.length / 3;
      positions.push(...points[pointIndex]);
      vertexNormals.push(...vec3Scale(frames.tangents[pointIndex], sign));
      bands.push(0.78);
      for (let radial = 0; radial < radialSegments; radial += 1) {
        const next = (radial + 1) % radialSegments;
        if (sign < 0) indices.push(centerIndex, ringStarts[pointIndex] + next, ringStarts[pointIndex] + radial);
        else indices.push(centerIndex, ringStarts[pointIndex] + radial, ringStarts[pointIndex] + next);
      }
    });
  }
}

function appendUvSphere(positions, vertexNormals, bands, indices, center, radius, longitude = 16, latitude = 10) {
  const start = positions.length / 3;
  for (let y = 0; y <= latitude; y += 1) {
    const v = y / latitude;
    const phi = v * Math.PI;
    for (let x = 0; x <= longitude; x += 1) {
      const theta = (x / longitude) * TAU;
      const normal = [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
      positions.push(center[0] + normal[0] * radius, center[1] + normal[1] * radius, center[2] + normal[2] * radius);
      vertexNormals.push(...normal);
      bands.push(1);
    }
  }
  for (let y = 0; y < latitude; y += 1) {
    for (let x = 0; x < longitude; x += 1) {
      const a = start + y * (longitude + 1) + x;
      const b = a + longitude + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
}

function createRubberDuckGeometry(gl) {
  const positions = [], normals = [], bands = [], indices = [];

  const addSphere = (center, radii, material, rotationZ = 0, longitude = 38, latitude = 26) => {
    const start = positions.length / 3;
    const cosine = Math.cos(rotationZ);
    const sine = Math.sin(rotationZ);
    for (let y = 0; y <= latitude; y += 1) {
      const phi = (y / latitude) * Math.PI;
      for (let x = 0; x <= longitude; x += 1) {
        const theta = (x / longitude) * TAU;
        const normal = [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
        const localX = normal[0] * radii[0];
        const localY = normal[1] * radii[1];
        const rotatedX = localX * cosine - localY * sine;
        const rotatedY = localX * sine + localY * cosine;
        const localNormalX = normal[0] / radii[0];
        const localNormalY = normal[1] / radii[1];
        positions.push(
          center[0] + rotatedX,
          center[1] + rotatedY,
          center[2] + normal[2] * radii[2],
        );
        normals.push(
          localNormalX * cosine - localNormalY * sine,
          localNormalX * sine + localNormalY * cosine,
          normal[2] / radii[2],
        );
        bands.push(material);
      }
    }
    for (let y = 0; y < latitude; y += 1) {
      for (let x = 0; x < longitude; x += 1) {
        const a = start + y * (longitude + 1) + x;
        const b = a + longitude + 1;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  };

  const addTube = (points, radius, material, closed = false, depthRadius = radius) => {
    const start = bands.length;
    appendSweptTube(positions, normals, bands, indices, points, radius, depthRadius, closed);
    bands.fill(material, start);
  };

  // Local +X is the face, +Y is up. Keep the original model origin so the
  // existing gallery placement, drag rotation and idle turn need no changes.
  addSphere([-0.22, -0.55, 0], [1.94, 1.27, 1.58], 2.1, 0, 56, 38);
  // Flatten the toy's base and lift its rear into a seamless molded tail.
  // Transform the normals with the surface so the gloss follows the shape.
  for (let index = 0; index < positions.length; index += 3) {
    const x = positions[index], z = positions[index + 2];
    let y = positions[index + 1];
    if (y < -0.55) {
      const lower = (-0.55 - y) / 1.27;
      y = -0.55 - 1.27 * (1.4 * lower - 0.4 * lower ** 3);
      normals[index + 1] /= 1.4 - 1.2 * lower ** 2;
    }
    const tail = 0.66 * Math.exp(
      -Math.pow((x + 1.91) / 0.5, 2) -
      Math.pow(z / 0.70, 2) -
      Math.pow((y + 0.05) / 0.82, 2),
    );
    const slopeX = -2 * (x + 1.91) / 0.5 ** 2 * tail;
    const slopeY = 1 - 2 * (y + 0.05) / 0.82 ** 2 * tail;
    const slopeZ = -2 * z / 0.70 ** 2 * tail;
    const normalY = normals[index + 1] / slopeY;
    normals[index] -= normalY * slopeX;
    normals[index + 1] = normalY;
    normals[index + 2] -= normalY * slopeZ;
    positions[index + 1] = y + tail;
  }
  addSphere([0.58, 0.98, 0], [1.22, 1.25, 1.15], 2.1, 0, 56, 38);

  // Raised, rounded wings and the plump two-part orange bill.
  for (const side of [-1, 1]) {
    addSphere([-0.43, -0.36, side * 1.43], [0.94, 0.61, 0.23], 2.1, -0.25, 40, 28);
  }
  addSphere([1.86, 0.61, 0], [0.66, 0.245, 0.66], 3.2, -0.07, 44, 24);
  addSphere([1.91, 0.46, 0], [0.57, 0.155, 0.59], 3.7, 0, 40, 22);

  // Upright black oval eyes sit inside the single panoramic diving mask.
  for (const side of [-1, 1]) {
    addSphere([1.605, 1.14, side * 0.57], [0.12, 0.225, 0.145], 5.1, 0, 30, 22);
    addSphere([1.706, 1.225, side * 0.57 - 0.035], [0.026, 0.057, 0.04], 5.8, 0, 18, 12);
  }

  // A wide blue strap follows the back of the head, with a rounded rectangular
  // cross-section (thin against the head, broad vertically).
  const strapStart = positions.length / 3;
  const strapRows = 72, strapSides = 16;
  const rounded = value => Math.sign(value) * Math.pow(Math.abs(value), 0.5);
  for (let row = 0; row <= strapRows; row += 1) {
    const angle = 0.91 + row / strapRows * (TAU - 1.82);
    for (let side = 0; side <= strapSides; side += 1) {
      const around = side / strapSides * TAU;
      const thickness = rounded(Math.cos(around)) * 0.055;
      positions.push(
        0.58 + (1.24 + thickness) * Math.cos(angle),
        1.19 + rounded(Math.sin(around)) * 0.175,
        (1.16 + thickness) * Math.sin(angle),
      );
      normals.push(...vec3Normalize([
        Math.cos(angle) * Math.cos(around) ** 3 / 0.055,
        Math.sin(around) ** 3 / 0.175,
        Math.sin(angle) * Math.cos(around) ** 3 / 0.055,
      ]));
      bands.push(6.2);
    }
  }
  for (let row = 0; row < strapRows; row += 1) {
    for (let side = 0; side < strapSides; side += 1) {
      const a = strapStart + row * (strapSides + 1) + side;
      const b = a + strapSides + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }

  // Bow the mask around the face, including its sidewalls, instead of putting
  // a flat ring in front of the head. The lower frame tucks behind the bill.
  const maskOutline = roundedRectanglePath(2.12, 1.18, 0.47, 18);
  const maskFront = (z, y) => [1.91 - 0.40 * (z / 1.06) ** 2, 1.18 + y, z];
  const rim = maskOutline.map(([z, y]) => maskFront(z, y));
  const maskSeal = rim.map(([, y, z]) => [
    0.60 + 1.22 * Math.sqrt(Math.max(0.01, 1 - ((y - 0.98) / 1.25) ** 2 - (z / 1.15) ** 2)), y, z,
  ]);
  addTube(rim, 0.118, 6.2, true);
  addTube(rim.map(([x, y, z]) => [x - 0.10, y, z]), 0.105, 6.2, true);
  addTube(maskSeal, 0.045, 6.2, true);
  for (const side of [-1, 1]) {
    addSphere([1.22, 1.19, side * 1.10], [0.27, 0.235, 0.13], 6.2, 0, 28, 20);
  }

  // One continuous green snorkel curls under the cheek to the mouthpiece.
  // The straight upper tube, rounded cap and blue keeper remain visible from
  // the back as well as the front while the complete duck rotates.
  const snorkel = sampleCatmullControls([
    [0.98, 2.64, 1.30], [0.98, 2.16, 1.30], [0.99, 1.46, 1.30],
    [1.04, 0.78, 1.29], [1.19, 0.37, 1.21], [1.44, 0.19, 0.96],
    [1.70, 0.21, 0.61], [1.83, 0.40, 0.34],
  ], false, 14);
  addTube(snorkel, 0.155, 7.2);
  addTube([[0.98, 2.58, 1.30], [0.98, 2.76, 1.30]], 0.184, 7.2);
  addSphere([0.98, 2.76, 1.30], [0.184, 0.095, 0.184], 7.2, 0, 28, 16);
  addSphere([1.01, 1.19, 1.30], [0.215, 0.19, 0.215], 6.2, 0, 28, 20);
  addSphere([1.83, 0.40, 0.34], [0.19, 0.145, 0.19], 7.2, 0, 24, 16);

  // Keep the transparent mask last in the index buffer for a separate pass.
  // Its clear skirt closes the gap between the raised frame and the face.
  const opaqueCount = indices.length;
  const skirtStart = positions.length / 3;
  maskOutline.forEach((point, index) => {
    const previous = maskOutline[(index - 1 + maskOutline.length) % maskOutline.length];
    const next = maskOutline[(index + 1) % maskOutline.length];
    const normal = vec3Normalize([0, previous[0] - next[0], next[1] - previous[1]]);
    positions.push(...maskSeal[index], rim[index][0] - 0.06, rim[index][1], rim[index][2]);
    normals.push(...normal, ...normal);
    bands.push(8.2, 8.2);
  });
  for (let point = 0; point < maskOutline.length; point += 1) {
    const a = skirtStart + point * 2;
    const b = skirtStart + ((point + 1) % maskOutline.length) * 2;
    indices.push(a, b, a + 1, a + 1, b, b + 1);
  }
  // Concentric rings give the lens a subtle convex surface.
  const lensStart = positions.length / 3, lensRings = 12;
  for (let ring = 0; ring <= lensRings; ring += 1) {
    const radius = ring / lensRings;
    maskOutline.forEach(([outlineZ, outlineY]) => {
      const z = outlineZ * radius, y = outlineY * radius;
      const point = maskFront(z, y);
      point[0] += 0.045 * (1 - (y / 0.59) ** 2);
      positions.push(...point);
      normals.push(...vec3Normalize([1, 0.09 * y / (0.59 ** 2), 0.8 * z / (1.06 ** 2)]));
      bands.push(8.2);
    });
  }
  for (let ring = 0; ring < lensRings; ring += 1) {
    for (let point = 0; point < maskOutline.length; point += 1) {
      const next = (point + 1) % maskOutline.length;
      const a = lensStart + ring * maskOutline.length + point;
      const b = a + maskOutline.length;
      const c = lensStart + ring * maskOutline.length + next;
      const d = c + maskOutline.length;
      indices.push(a, b, c, c, b, d);
    }
  }
  const geometry = uploadIndexedGeometry(gl, positions, normals, bands, indices);
  return { ...geometry, opaqueCount, lensCount: indices.length - opaqueCount };
}

// Sculpted glass fish; the complete mesh shares the gallery depth buffer.
function createFishGeometry(gl) {
  const positions = [], normals = [], bands = [], indices = [];
  const ellipsoid = (center, radii, material, longitude = 48, latitude = 28) => {
    const start = positions.length / 3;
    for (let y = 0; y <= latitude; y++) {
      const phi = y / latitude * Math.PI;
      for (let x = 0; x <= longitude; x++) {
        const theta = x / longitude * TAU;
        const n = [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
        positions.push(...n.map((v, i) => center[i] + v * radii[i]));
        normals.push(...vec3Normalize(n.map((v, i) => v / radii[i])));
        bands.push(material);
      }
    }
    for (let y = 0; y < latitude; y++) for (let x = 0; x < longitude; x++) {
      const a = start + y * (longitude + 1) + x, b = a + longitude + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  };
  const line = (points, radius, material) => {
    const start = bands.length;
    appendSweptTube(positions, normals, bands, indices, points, radius, radius, false);
    bands.fill(material, start);
  };
  const fin = (root, outline) => {
    const edge = sampleCatmullControls(outline, false, 5);
    const start = positions.length / 3, steps = 8;
    edge.forEach((tip, i) => {
      for (let j = 0; j <= steps; j++) {
        const t = j / steps, point = vec3Mix(root, tip, t);
        point[2] += Math.sin(i * Math.PI * 0.8) * 0.028 * Math.sin(t * Math.PI);
        positions.push(...point);
        normals.push(...vec3Normalize([0.08, 0.12, 1 + Math.cos(i * Math.PI * 0.8) * 0.3]));
        bands.push(3);
      }
    });
    for (let i = 0; i < edge.length - 1; i++) for (let j = 0; j < steps; j++) {
      const a = start + i * (steps + 1) + j, b = a + steps + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
    edge.forEach((tip, i) => {
      if (i % 2) return;
      line(Array.from({length: 7}, (_, j) => {
        const t = j / 6, point = vec3Mix(root, tip, t);
        point[2] += 0.013 + Math.sin(t * Math.PI) * 0.02;
        return point;
      }), 0.008, 3.2);
    });
    line(edge, 0.012, 3.2);
  };
  fin([-1.15, -0.02, 0], [[-2.85, 0.95, 0.02], [-2.65, 0.4, 0.07], [-2.3, -0.06, 0.12], [-2.62, -0.65, 0.04], [-2.75, -1.03, 0], [-2.25, -0.87, 0], [-1.15, -0.14, 0]]);
  fin([-0.18, 0.68, 0], [[-1.43, 0.65, 0], [-1.25, 1.26, 0], [-0.7, 1.56, 0], [0.02, 1.5, 0], [0.77, 1.04, 0]]);
  fin([-0.3, -0.65, 0], [[-1.2, -0.8, 0], [-1.4, -1.4, 0.04], [-0.8, -1.34, 0.04], [0.25, -0.98, 0]]);
  ellipsoid([0.12, 0, 0], [1.52, 1.12, 0.57], 2);
  ellipsoid([1.26, -0.04, 0], [0.65, 0.69, 0.46], 2);
  ellipsoid([1.81, -0.18, 0], [0.2, 0.2, 0.27], 2);
  for (const side of [-1, 1]) {
    for (let row = 0; row < 11; row++) {
      const cy = -0.86 + row * 0.17;
      for (let col = 0; col < 13; col++) {
        const cx = -1.19 + col * 0.18 + (row % 2) * 0.09;
        const points = [];
        for (let j = 0; j <= 8; j++) {
          const angle = -Math.PI * 0.6 + j / 8 * Math.PI * 1.2;
          const x = cx + Math.cos(angle) * 0.105, y = cy + Math.sin(angle) * 0.11;
          const shell = 1 - ((x - 0.12) / 1.52) ** 2 - (y / 1.12) ** 2;
          if (shell > 0.09) points.push([x, y, side * (0.57 * Math.sqrt(shell) + 0.008)]);
        }
        if (points.length > 2) line(points, 0.008, 2.3);
      }
    }
    line(sampleCatmullControls([[1.1, 0.49, side * 0.3], [0.87, 0.2, side * 0.46], [0.92, -0.32, side * 0.46], [1.3, -0.56, side * 0.28]], false, 9), 0.018, 2.3);
    ellipsoid([1.48, 0.19, side * 0.39], [0.21, 0.21, 0.09], 4, 32, 20);
    ellipsoid([1.49, 0.19, side * 0.46], [0.13, 0.14, 0.045], 5, 32, 20);
    ellipsoid([1.46, 0.24, side * 0.501], [0.038, 0.035, 0.012], 6, 12, 8);
    fin([0.95, -0.32, side * 0.4], [[0.64, -0.5, side * 0.65], [0.1, -0.85, side * 0.86], [0.13, -1.21, side * 0.7], [0.56, -1.12, side * 0.52], [0.95, -0.32, side * 0.4]]);
  }
  line([[1.9, -0.19, -0.16], [1.98, -0.2, 0], [1.9, -0.19, 0.16]], 0.015, 4);
  return uploadIndexedGeometry(gl, positions, normals, bands, indices);
}
function roundedRectanglePath(width, height, radius, cornerSegments = 10) {
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  const corners = [
    [halfWidth - radius, halfHeight - radius, 0],
    [-halfWidth + radius, halfHeight - radius, Math.PI * 0.5],
    [-halfWidth + radius, -halfHeight + radius, Math.PI],
    [halfWidth - radius, -halfHeight + radius, Math.PI * 1.5],
  ];
  const points = [];
  corners.forEach(([centerX, centerY, startAngle]) => {
    for (let step = 0; step < cornerSegments; step += 1) {
      const angle = startAngle + (step / (cornerSegments - 1)) * Math.PI * 0.5;
      points.push([centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 0]);
    }
  });
  return points;
}

function createEnvelopeGeometry(gl) {
  const positions = [];
  const normals = [];
  const bands = [];
  const indices = [];
  const frameStart = bands.length;
  // Fuller, rounded tubes keep the envelope soft and legible at every viewport size.
  appendSweptTube(positions, normals, bands, indices, roundedRectanglePath(5.7, 3.5, 0.55, 11), 0.28, 0.32, true);
  // Reuse the duck's molded-plastic material palette: cyan-blue for the
  // rounded outer frame, yellow for the folds and their soft center joint.
  bands.fill(6.2, frameStart);
  const center = [0, -0.24, 0.26];
  const folds = [
    [[-2.4, 1.34, 0.02], [-1.22, 0.62, 0.12], center],
    [[2.4, 1.34, -0.02], [1.22, 0.62, 0.1], center],
    [[-2.42, -1.34, -0.08], [-1.18, -0.88, 0.05], center],
    [[2.42, -1.34, -0.12], [1.18, -0.88, 0.04], center],
  ];
  folds.forEach((controls, index) => {
    const path = resampleCurve(sampleCatmullControls(controls, false, 8), 13, false);
    const foldStart = bands.length;
    appendSweptTube(positions, normals, bands, indices, path, index < 2 ? 0.205 : 0.185, 0.245, false);
    bands.fill(2.1, foldStart);
  });
  const jointStart = bands.length;
  appendUvSphere(positions, normals, bands, indices, center, 0.29, 18, 12);
  bands.fill(2.1, jointStart);
  return uploadIndexedGeometry(gl, positions, normals, bands, indices);
}

function createTextureFromCanvas(gl, canvas) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);
  return texture;
}

function createStudioEnvironmentTexture(gl) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#f8f8f4");
  gradient.addColorStop(0.19, "#aeb3bf");
  gradient.addColorStop(0.42, "#242a3b");
  gradient.addColorStop(0.68, "#101126");
  gradient.addColorStop(1, "#090043");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.globalCompositeOperation = "screen";
  context.filter = "blur(30px)";
  [[80, 54, 0.82], [356, 92, 0.66], [712, 68, 0.9], [930, 42, 0.72]].forEach(([x, width, alpha]) => {
    const strip = context.createLinearGradient(x, 0, x + width, 0);
    strip.addColorStop(0, "rgba(255,255,255,0)");
    strip.addColorStop(0.48, `rgba(255,255,255,${alpha})`);
    strip.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = strip;
    context.fillRect(x - width, 12, width * 3, canvas.height * 0.72);
  });
  context.restore();

  context.save();
  context.globalCompositeOperation = "multiply";
  context.fillStyle = "rgba(2, 3, 10, .72)";
  context.fillRect(0, canvas.height * 0.72, canvas.width, canvas.height * 0.28);
  context.fillStyle = "rgba(7, 2, 38, .56)";
  context.fillRect(canvas.width * 0.48, 0, canvas.width * 0.12, canvas.height);
  context.restore();

  const texture = createTextureFromCanvas(gl, canvas);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

function projectPlaneSize(project, mobile) {
  // Keep the work legible on narrow screens. The orbit already scales cards
  // down for depth, so mobile cards need a larger base plane to stay readable.
  // Desktop keeps the original proportions while phones get a measured boost.
  // The orbit scale below does the rest without making neighbouring cards collide.
  const multiplier = 1.15 * (mobile ? 1.08 : 1) * (project.sceneScale || 1);
  if (project.orientation === 'detail') return [2.34 * multiplier, 3.1 * multiplier];
  if (project.imageElement) {
    const ratio = project.imageElement.naturalWidth / project.imageElement.naturalHeight;
    const width = (ratio > 1 ? 3.75 : 3.16 * ratio) * multiplier;
    return [width, width / ratio];
  }
  if (project.orientation === "landscape") return [3.75 * multiplier, 2.42 * multiplier];
  if (project.orientation === "square") return [3.05 * multiplier, 3.05 * multiplier];
  return [2.34 * multiplier, 3.16 * multiplier];
}

function buildLayouts(mobile) {
  // Three deliberate height lanes create the fuller top / middle / bottom
  // composition of the reference while every work stays on the same 3D orbit.
  const lanePattern = [0, 1, -1, 0, 1, -1, 0, 1, -1, 0, 1, -1];
  const heightJitter = [0.2, -0.15, 0.1, -0.25, 0.18, -0.12, 0.14, -0.2, 0.22, -0.1, 0.12, -0.18];
  const rowGap = mobile ? 2.35 : 3.4;
  const radiusPattern = [1, 0.9, 1.08, 0.94, 1.06, 0.91, 1.1, 0.96, 1.05, 0.9, 1.08, 0.93];
  const radiusX = mobile ? 3.75 : 7.55;
  const radiusZ = mobile ? 2.8 : 4.55;
  const centerZ = mobile ? -9.25 : -6.35;
  const activePhase = 1.36;
  const orbits = PROJECTS.map((_, index) => ({
    radiusX: radiusX * radiusPattern[index % radiusPattern.length],
    radiusZ: radiusZ * radiusPattern[index % radiusPattern.length],
    height: lanePattern[index % lanePattern.length] * rowGap + heightJitter[index % heightJitter.length] * (mobile ? 0.55 : 1),
  }));
  const orbitalStep = (Math.PI * 2) / PROJECTS.length;
  const rings = orbits.map((orbit, index) => {
    const angle = activePhase + index * orbitalStep;
    return {
      position: [
        Math.cos(angle) * orbit.radiusX,
        orbit.height,
        centerZ + Math.sin(angle) * orbit.radiusZ,
      ],
      rotation: [0, 0, 0],
      scale: 1,
    };
  });
  const spiral = orbits.map((orbit, index) => {
    const angle = index * 2.399963;
    return {
      position: [Math.sin(angle) * orbit.radiusX * 0.82, (index - PROJECTS.length * 0.5) * (mobile ? 0.72 : 0.9), centerZ + Math.cos(angle) * orbit.radiusZ],
      rotation: [0, -Math.sin(angle) * 0.18, Math.sin(index * 0.7) * 0.05],
      scale: 1,
    };
  });
  return { rings, spiral, orbits, centerZ, activePhase };
}

class PortfolioScene {
  constructor() {
    this.canvas = document.querySelector("[data-space-canvas]");
    this.experience = document.querySelector("[data-experience]");
    this.scrollSpace = document.querySelector("[data-scroll-space]");
    this.loadingScreen = document.querySelector("[data-loading-screen]");
    this.loadingPercent = document.querySelector("[data-load-percent]");
    this.loadingBar = document.querySelector("[data-load-bar]");
    this.fallback = document.querySelector("[data-webgl-fallback]");
    this.activeTitle = document.querySelector("[data-active-title]");
    this.activeCategory = document.querySelector("[data-active-category]");
    this.activeMedia = document.querySelector("[data-active-media]");
    this.activeYear = document.querySelector("[data-active-year]");
    this.activeSummary = document.querySelector("[data-active-summary]");
    this.currentIndex = document.querySelector("[data-current-index]");
    this.totalCount = document.querySelector("[data-total-count]");
    this.scrollLabel = document.querySelector("[data-scroll-label]");
    this.progressBar = document.querySelector("[data-progress-bar]");
    this.tooltip = document.querySelector("[data-project-tooltip]");
    this.tooltipIndex = document.querySelector("[data-tooltip-index]");
    this.tooltipTitle = document.querySelector("[data-tooltip-title]");
    this.projectView = document.querySelector("[data-project-view]");
    this.projectScroll = document.querySelector("[data-project-scroll]");
    this.projectContent = document.querySelector("[data-project-content]");
    this.detailCounter = document.querySelector("[data-detail-counter]");
    this.siteMenu = document.querySelector("[data-site-menu]");
    this.menuOpenButton = document.querySelector("[data-menu-open]");
    this.motionToggle = document.querySelector("[data-motion-toggle]");
    this.contactUi = document.querySelector("[data-contact-ui]");
    this.profileView = document.querySelector("[data-profile-view]");
    this.profileScroll = document.querySelector("[data-profile-scroll]");
    this.teamView = document.querySelector("[data-team-view]");
    this.teamScroll = this.teamView?.querySelector("[data-team-scroll]");
    this.teamProgress = this.teamView?.querySelector("[data-team-progress]");
    this.teamResponsive = this.teamView?.querySelector("[data-responsive-section]");
    this.teamResponsiveIndex = this.teamView?.querySelector("[data-responsive-index]");
    this.teamLightbox = this.teamView?.querySelector("[data-team-lightbox]");
    this.teamLightboxImage = this.teamView?.querySelector("[data-team-lightbox-image]");
    this.teamLightboxCaption = this.teamView?.querySelector("[data-team-lightbox-caption]");
    this.sceneCurtain = document.querySelector("[data-scene-curtain]");
    this.intro = document.querySelector("[data-intro]");
    this.introOpen = false;

    this.gl = this.canvas?.getContext("webgl2");

    this.mobile = window.matchMedia("(max-width: 760px)").matches;
    this.systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.userReducedMotion = null;
    try {
      const saved = localStorage.getItem("portfolio-reduced-motion");
      if (saved !== null) this.userReducedMotion = saved === "true";
    } catch (_) {
      this.userReducedMotion = null;
    }

    this.entryDistance = 0;
    this.targetJourney = 0;
    this.journey = 0;
    this.journeyVelocity = 0;
    this.layoutTarget = 0;
    this.layoutMix = 0;
    this.layoutVelocity = 0;
    this.orbitRotation = 0;
    this.lastOrbitInput = Number.NEGATIVE_INFINITY;
    this.duckRotationY = 0.88;
    this.duckSpinVelocity = 0;
    this.isDuckDragging = false;
    this.duckDragStartX = 0;
    this.duckDragStartRotation = 0;
    this.duckDragDistance = 0;
    this.activeGroup = 'all';
    this.visibleIndices = PROJECTS.map((_, index) => index);
    this.categoryHighlightValues = PROJECTS.map(() => 0);
    this.categoryFilterMix = 0;
    this.layouts = buildLayouts(this.mobile);
    this.transforms = [];
    this.modelMatrices = PROJECTS.map(() => createMat4());
    this.hitAreas = [];
    this.hoverValues = PROJECTS.map(() => 0);
    this.hoverIndex = -1;
    this.activeIndex = -1;
    this.infoIndex = -1;
    this.pointerTarget = [0, 0];
    this.pointer = [0, 0];
    this.pointerPosition = [window.innerWidth / 2, window.innerHeight / 2];
    this.pointerInside = false;
    this.focus = null;
    this.detailOpen = false;
    this.menuOpen = false;
    this.profileOpen = false;
    this.teamOpen = false;
    this.teamReady = false;
    this.teamScrollTicking = false;
    this.teamRevealObserver = null;
    this.contactOpen = false;
    this.sceneMode = "index";
    this.transitioning = false;
    this.indexTouchY = null;
    this.mobileSwipe = null;
    this.lastMobileWheelAt = -Infinity;
    this.running = false;
    this.lastTime = performance.now();
    this.projection = createMat4();
    this.view = createMat4();
    this.viewProjection = createMat4();
    this.cameraEye = [0, 0, 1.8];
    this.cameraLook = [0, 0, -9];
    this.frame = this.frame.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.updateTeamScroll = this.updateTeamScroll.bind(this);
  }

  isReducedMotion() {
    return this.userReducedMotion === null ? this.systemReducedMotion.matches : this.userReducedMotion;
  }

  setLoading(value) {
    const percent = Math.round(clamp(value) * 100);
    if (this.loadingPercent) this.loadingPercent.textContent = String(percent).padStart(2, "0");
    if (this.loadingBar) this.loadingBar.style.transform = `scaleX(${clamp(value)})`;
  }

  async init() {
    this.setIntro(!window.location.hash || window.location.hash === "#start");
    this.setupCategoryNavigation();
    this.setupTeamProject();
    this.bindEvents();
    document.querySelectorAll("[data-enter-work]").forEach((button) => {
      button.addEventListener("click", () => this.setIntro(false, true));
    });
    document.querySelector("[data-intro-about]")?.addEventListener("click", () => this.openProfile());
    let introTouchY = null;
    this.intro?.addEventListener("touchstart", (event) => {
      introTouchY = event.touches[0].clientY;
    }, { passive: true });
    this.intro?.addEventListener("touchmove", (event) => {
      if (introTouchY !== null && introTouchY - event.touches[0].clientY > 45) {
        this.setIntro(false);
        introTouchY = null;
      }
    }, { passive: true });
    if (!this.canvas || !this.gl) {
      document.body.classList.add("is-static-gallery");
      if (this.loadingScreen) this.loadingScreen.hidden = true;
      if (this.fallback) {
        this.fallback.hidden = false;
        this.fallback.textContent = "3D 대신 작품 목록에서 모든 작업과 프로젝트를 확인할 수 있습니다.";
      }
      return;
    }

    try {
      this.setupPrograms();
      this.quadGeometry = createQuadGeometry(this.gl);
      this.tunnelGeometry = createTunnelGeometry(this.gl);
      this.fishGeometry = createRubberDuckGeometry(this.gl);
      this.envelopeGeometry = createEnvelopeGeometry(this.gl);
      this.environmentTexture = createStudioEnvironmentTexture(this.gl);
      this.textures = [];
      const scratch = document.createElement("canvas");
      for (let index = 0; index < PROJECTS.length; index += 1) {
        const project = PROJECTS[index];
        const canLoadArtwork = project.imageSrc && (
          window.location.protocol !== "file:" || project.imageSrc.startsWith("data:")
        );
        if (canLoadArtwork) {
          try {
            project.imageElement = await new Promise((resolve, reject) => {
              const image = new Image();
              const timeout = window.setTimeout(() => reject(new Error("Image loading timed out")), 10000);
              image.onload = () => { window.clearTimeout(timeout); resolve(image); };
              image.onerror = () => { window.clearTimeout(timeout); reject(new Error("Image loading failed")); };
              image.src = project.imageSrc;
            });
          } catch (error) {
            console.warn(`Could not load artwork: ${project.title}`, error);
          }
        }
        drawProjectArtwork(scratch, PROJECTS[index]);
        this.textures.push(createTextureFromCanvas(this.gl, scratch));
        this.setLoading(0.12 + ((index + 1) / PROJECTS.length) * 0.82);
        if (index % 3 === 2) await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      const contactCanvas = document.createElement("canvas");
      drawContactWord(contactCanvas);
      this.contactTexture = createTextureFromCanvas(this.gl, contactCanvas);

      this.configureGl();
      this.updateMotionToggle();
      this.handleResize();
      if (this.totalCount) this.totalCount.textContent = String(PROJECTS.length).padStart(2, "0");
      this.setLoading(1);
      this.running = true;
      requestAnimationFrame(this.frame);
      requestAnimationFrame(() => this.loadingScreen?.classList.add("is-complete"));
      window.setTimeout(() => {
        if (this.loadingScreen) this.loadingScreen.hidden = true;
      }, this.isReducedMotion() ? 50 : 1150);

      const initialId = window.location.hash.slice(1);
      const initialIndex = PROJECTS.findIndex((project) => project.id === initialId);
      if (initialIndex >= 0) {
        this.startFocus(initialIndex, [window.innerWidth / 2, window.innerHeight / 2], false, true);
      } else if (initialId === "about") {
        this.openProfile(false);
      } else if (initialId === "team-project") {
        this.openTeamProject(false);
      } else if (initialId === "contact") {
        this.openContact(false);
      }
    } catch (error) {
      console.error(error);
      if (this.loadingScreen) this.loadingScreen.hidden = true;
      if (this.fallback) {
        this.fallback.hidden = false;
        this.fallback.textContent = `3D 장면을 시작하지 못했습니다. ${error?.message || "최신 브라우저에서 다시 열어 주세요."}`;
      }
    }
  }

  setupPrograms() {
    const gl = this.gl;
    this.planeProgram = createProgram(gl, PLANE_VERTEX_SHADER, PLANE_FRAGMENT_SHADER);
    this.tunnelProgram = createProgram(gl, TUNNEL_VERTEX_SHADER, TUNNEL_FRAGMENT_SHADER);
    this.knotProgram = createProgram(gl, KNOT_VERTEX_SHADER, KNOT_FRAGMENT_SHADER);

    this.planeLocations = {
      position: gl.getAttribLocation(this.planeProgram, "aPosition"),
      uv: gl.getAttribLocation(this.planeProgram, "aUv"),
      mvp: gl.getUniformLocation(this.planeProgram, "uMvp"),
      texture: gl.getUniformLocation(this.planeProgram, "uTexture"),
      hover: gl.getUniformLocation(this.planeProgram, "uHover"),
      active: gl.getUniformLocation(this.planeProgram, "uActive"),
      dim: gl.getUniformLocation(this.planeProgram, "uDim"),
      fog: gl.getUniformLocation(this.planeProgram, "uFog"),
      categoryHighlight: gl.getUniformLocation(this.planeProgram, "uCategoryHighlight"),
      categoryFilter: gl.getUniformLocation(this.planeProgram, "uCategoryFilter"),
      glowPass: gl.getUniformLocation(this.planeProgram, "uGlowPass"),
    };

    this.tunnelLocations = {
      position: gl.getAttribLocation(this.tunnelProgram, "aPosition"),
      uv: gl.getAttribLocation(this.tunnelProgram, "aUv"),
      mvp: gl.getUniformLocation(this.tunnelProgram, "uMvp"),
    };

    this.knotLocations = {
      position: gl.getAttribLocation(this.knotProgram, "aPosition"),
      normal: gl.getAttribLocation(this.knotProgram, "aNormal"),
      band: gl.getAttribLocation(this.knotProgram, "aBand"),
      model: gl.getUniformLocation(this.knotProgram, "uModel"),
      viewProjection: gl.getUniformLocation(this.knotProgram, "uViewProjection"),
      camera: gl.getUniformLocation(this.knotProgram, "uCamera"),
      dim: gl.getUniformLocation(this.knotProgram, "uDim"),
      roughness: gl.getUniformLocation(this.knotProgram, "uRoughness"),
      environment: gl.getUniformLocation(this.knotProgram, "uEnvironment"),
    };

  }

  configureGl() {
    const gl = this.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.clearColor(0.1569, 0.3451, 1.0, 1);
    gl.clearDepth(1);
  }

  setIntro(open, moveFocus = false) {
    this.introOpen = open;
    this.experience?.classList.toggle("is-intro", open);
    if (this.intro) {
      this.intro.inert = !open;
      this.intro.setAttribute("aria-hidden", String(!open));
    }
    const controls = document.querySelector(".bottombar");
    if (controls) controls.inert = open;
    if (!open) {
      this.lastOrbitInput = performance.now();
      if (this.mobile) this.lastMobileWheelAt = this.lastOrbitInput;
    }
    if (moveFocus) {
      const target = open ? "[data-enter-work]" : "[data-layout].is-active";
      document.querySelector(target)?.focus({ preventScroll: true });
    }
  }

  setupCategoryNavigation() {
    document.querySelectorAll('[data-category-open]').forEach(button => {
      button.addEventListener('click', () => {
        const applyFilter = () => this.setProjectFilter(button.dataset.categoryOpen);
        if (this.menuOpen) {
          this.closeMenu();
          window.setTimeout(applyFilter, this.isReducedMotion() ? 0 : 420);
        } else {
          applyFilter();
        }
      });
    });
  }

  setProjectFilter(groupId = 'all', { focusFirst = true, instant = false } = {}) {
    const validGroup = groupId === 'all' || WORK_CATEGORIES.some(group => group.id === groupId);
    this.activeGroup = validGroup ? groupId : 'all';
    // Desktop keeps the authored exhibition and its category-lighting effect.
    // On phones the category is the carousel itself: only matching works take
    // part in the loop, and every category begins at its first item.
    this.visibleIndices = this.mobile && this.activeGroup !== 'all'
      ? PROJECTS.reduce((indices, project, index) => {
        if (project.group === this.activeGroup) indices.push(index);
        return indices;
      }, [])
      : PROJECTS.map((_, index) => index);
    this.setIntro(false);
    document.querySelectorAll('[data-category-open]').forEach(button => {
      const active = button.dataset.categoryOpen === this.activeGroup;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (this.totalCount) this.totalCount.textContent = String(this.visibleIndices.length).padStart(2, '0');
    if (focusFirst) {
      const firstIndex = PROJECTS.findIndex(project => this.activeGroup === 'all' || project.group === this.activeGroup);
      if (firstIndex >= 0) {
        if (this.mobile) {
          this.targetJourney = 0;
          this.journey = 0;
          this.orbitRotation = 0;
        } else {
          this.scrollToProject(firstIndex);
        }
        this.journeyVelocity = 0;
        this.setHover(-1);
        if (instant || this.mobile) {
          this.journey = this.targetJourney;
          this.updateTransforms();
          this.updateActiveProject();
        }
      }
    }
  }

  bindEvents() {
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("popstate", this.handlePopState);
    window.addEventListener("wheel", this.handleWheel, { passive: false });
    this.canvas.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    this.canvas.addEventListener("pointerleave", this.handlePointerLeave, { passive: true });
    this.canvas.addEventListener("pointerdown", this.handlePointerDown, { passive: true });
    this.canvas.addEventListener("pointerup", this.handlePointerUp, { passive: true });
    this.canvas.addEventListener("pointercancel", this.handlePointerUp, { passive: true });
    this.canvas.addEventListener("click", this.handleCanvasClick);
    this.canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.running = false;
      document.body.classList.add("is-static-gallery");
      window.dispatchEvent(new Event("portfolio:fallback"));
      if (this.fallback) this.fallback.hidden = false;
    });

    document.querySelectorAll("[data-layout]").forEach((button) => {
      button.addEventListener("click", () => this.setLayout(button.dataset.layout));
    });
    document.querySelector("[data-previous]")?.addEventListener("click", () => this.goRelative(-1));
    document.querySelector("[data-next]")?.addEventListener("click", () => this.goRelative(1));
    document.querySelector("[data-view-active]")?.addEventListener("click", () => {
      this.startFocus(this.infoIndex >= 0 ? this.infoIndex : this.activeIndex, [window.innerWidth * 0.34, window.innerHeight * 0.58]);
    });
    document.querySelector("[data-project-close]")?.addEventListener("click", () => this.requestCloseProject());
    document.querySelector("[data-contact-close]")?.addEventListener("click", () => this.closeContact());
    document.querySelector("[data-profile-close]")?.addEventListener("click", () => this.closeProfile());
    document.querySelector("[data-open-contact]")?.addEventListener("click", () => {
      this.closeProfile(true);
      window.setTimeout(() => this.openContact(), this.isReducedMotion() ? 0 : 420);
    });
    document.querySelector("[data-home-link]")?.addEventListener("click", (event) => {
      event.preventDefault();
      this.setProjectFilter('all');
      this.scrollToProject(0);
      history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
      this.setIntro(true, true);
    });

    this.menuOpenButton?.addEventListener("click", () => this.openMenu());
    document.querySelector("[data-menu-close]")?.addEventListener("click", () => this.closeMenu());
    this.motionToggle?.addEventListener("click", () => {
      this.userReducedMotion = !this.isReducedMotion();
      try {
        localStorage.setItem("portfolio-reduced-motion", String(this.userReducedMotion));
      } catch (_) {
        // The preference still applies for this visit when storage is unavailable.
      }
      this.journeyVelocity = 0;
      this.layoutVelocity = 0;
      this.updateMotionToggle();
    });
    document.querySelectorAll("[data-menu-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const route = link.dataset.menuRoute;
        this.closeMenu();
        window.setTimeout(() => {
          if (route === "home") {
            this.setProjectFilter('all');
            this.setIntro(false);
            this.scrollToProject(0);
          } else if (route === "about") {
            this.openProfile();
          } else if (route === "team") {
            this.openTeamProject();
          } else if (route === "contact") {
            this.openContact();
          }
        }, this.isReducedMotion() ? 0 : 260);
      });
    });
    this.systemReducedMotion.addEventListener?.("change", () => {
      if (this.userReducedMotion === null) {
        this.journeyVelocity = 0;
        this.updateMotionToggle();
      }
    });
  }

  updateMotionToggle() {
    this.experience?.setAttribute("data-reduced-motion", String(this.isReducedMotion()));
    this.profileView?.setAttribute("data-reduced-motion", String(this.isReducedMotion()));
    this.teamView?.setAttribute("data-reduced-motion", String(this.isReducedMotion()));
    if (!this.motionToggle) return;
    const motionOff = this.isReducedMotion();
    this.motionToggle.textContent = `MOTION: ${motionOff ? "OFF" : "ON"}`;
    this.motionToggle.setAttribute("aria-pressed", String(motionOff));
  }

  handleResize() {
    const wasMobile = this.mobile;
    this.mobile = window.matchMedia("(max-width: 760px)").matches;
    if (!this.gl || !this.canvas) return;
    if (wasMobile !== this.mobile) {
      this.layouts = buildLayouts(this.mobile);
      this.visibleIndices = this.mobile && this.activeGroup !== 'all'
        ? PROJECTS.reduce((indices, project, index) => {
          if (project.group === this.activeGroup) indices.push(index);
          return indices;
        }, [])
        : PROJECTS.map((_, index) => index);
      this.targetJourney = 0;
      this.journey = 0;
      this.journeyVelocity = 0;
      if (this.totalCount) this.totalCount.textContent = String(this.visibleIndices.length).padStart(2, '0');
    }
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.mobile ? 1.25 : 1.65);
    const viewportWidth = Math.max(1, Math.round(this.canvas.clientWidth || window.innerWidth));
    const viewportHeight = Math.max(1, Math.round(this.canvas.clientHeight || window.innerHeight));
    const width = Math.max(1, Math.floor(viewportWidth * pixelRatio));
    const height = Math.max(1, Math.floor(viewportHeight * pixelRatio));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.gl.viewport(0, 0, width, height);
    const fieldOfView = (this.mobile ? 72 : 55) * (Math.PI / 180);
    mat4Perspective(this.projection, fieldOfView, viewportWidth / viewportHeight, 0.12, 140);
    if (this.scrollSpace) this.scrollSpace.style.height = "100svh";
  }

  setLayout(layout) {
    const nextTarget = layout === "spiral" ? 1 : 0;
    if (this.layoutTarget === nextTarget) return;
    this.layoutTarget = nextTarget;
    this.lastOrbitInput = performance.now();
    document.querySelectorAll("[data-layout]").forEach((button) => {
      const active = button.dataset.layout === layout;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  handlePointerMove(event) {
    this.pointerInside = event.pointerType !== "touch";
    this.pointerPosition[0] = event.clientX;
    this.pointerPosition[1] = event.clientY;
    if (this.isDuckDragging) {
      const deltaX = event.clientX - this.duckDragStartX;
      this.duckDragDistance = Math.abs(deltaX);
      this.duckRotationY = this.duckDragStartRotation + deltaX * 0.0075;
      this.duckSpinVelocity = deltaX * 0.0036;
      this.lastOrbitInput = performance.now();
    }
    if (event.pointerType === "touch" && this.introOpen && this.indexTouchY !== null) {
      if (this.indexTouchY - event.clientY > 45) {
        this.setIntro(false);
        this.indexTouchY = null;
      }
      return;
    }
    if (event.pointerType === "touch" && this.mobile && this.sceneMode === "index" && this.mobileSwipe) {
      const deltaX = event.clientX - this.mobileSwipe.startX;
      const deltaY = event.clientY - this.mobileSwipe.startY;
      if (!this.mobileSwipe.axis && Math.hypot(deltaX, deltaY) > 7) {
        this.mobileSwipe.axis = Math.abs(deltaX) >= Math.abs(deltaY) ? 'x' : 'y';
      }
      if (this.mobileSwipe.axis === 'x') {
        const width = Math.max(280, this.canvas.clientWidth || window.innerWidth);
        this.targetJourney = this.mobileSwipe.startJourney - deltaX / (width * 0.78);
        this.mobileSwipe.lastX = event.clientX;
        this.mobileSwipe.lastTime = event.timeStamp;
        this.mobileSwipe.moved = Math.max(this.mobileSwipe.moved, Math.abs(deltaX));
        this.duckDragDistance = this.mobileSwipe.moved;
        this.lastOrbitInput = performance.now();
      }
      return;
    }
    if (event.pointerType === "touch" && !this.mobile && this.sceneMode === "index" && this.indexTouchY !== null) {
      const delta = this.indexTouchY - event.clientY;
      this.indexTouchY = event.clientY;
      this.targetJourney += delta * 0.0065;
      this.lastOrbitInput = performance.now();
    }
    if (event.pointerType !== "touch") {
      this.pointerTarget[0] = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      this.pointerTarget[1] = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
      this.positionTooltip(event.clientX, event.clientY);
    }
  }

  handlePointerLeave() {
    this.pointerInside = false;
    this.pointerTarget[0] = 0;
    this.pointerTarget[1] = 0;
    this.setHover(-1);
    if (this.isDuckDragging) {
      this.isDuckDragging = false;
    }
  }

  handlePointerDown(event) {
    if (event.pointerType === "touch" && this.sceneMode === "index" && !this.menuOpen && !this.profileOpen && !this.contactOpen) {
      this.indexTouchY = event.clientY;
      if (this.mobile && !this.introOpen) {
        this.duckDragDistance = 0;
        this.mobileSwipe = {
          startX: event.clientX,
          startY: event.clientY,
          startJourney: Math.round(this.targetJourney),
          lastX: event.clientX,
          lastTime: event.timeStamp,
          axis: null,
          moved: 0,
        };
        this.targetJourney = this.mobileSwipe.startJourney;
        this.journeyVelocity = 0;
        this.canvas.setPointerCapture?.(event.pointerId);
      }
    }
    if ((event.pointerType === "mouse" || (event.pointerType === "touch" && !this.mobile)) && this.sceneMode === "index" && !this.menuOpen && !this.profileOpen && !this.contactOpen && !this.focus) {
      this.isDuckDragging = true;
      this.duckDragStartX = event.clientX;
      this.duckDragStartRotation = this.duckRotationY;
      this.duckDragDistance = 0;
      this.duckSpinVelocity = 0;
    }
  }

  handlePointerUp(event) {
    if (this.mobile && !this.introOpen && this.sceneMode === "index" && this.mobileSwipe) {
      const swipe = this.mobileSwipe;
      const deltaX = (event?.clientX ?? swipe.lastX) - swipe.startX;
      if (swipe.axis === 'x' && Math.abs(deltaX) > 42 && event?.type !== 'pointercancel') {
        this.targetJourney = swipe.startJourney + (deltaX < 0 ? 1 : -1);
      } else {
        this.targetJourney = Math.round(this.targetJourney);
      }
      this.mobileSwipe = null;
      this.lastOrbitInput = performance.now();
    }
    this.indexTouchY = null;
    if (this.isDuckDragging) {
      this.isDuckDragging = false;
      this.duckSpinVelocity = this.duckSpinVelocity * 0.45 + 0.018;
    }
  }

  handleWheel(event) {
    if (this.detailOpen || this.transitioning || this.menuOpen || this.profileOpen || this.teamOpen || this.contactOpen || this.focus) return;
    if (this.introOpen) {
      event.preventDefault();
      if (event.deltaY > 12) this.setIntro(false);
      return;
    }

    if (this.sceneMode === "index") {
      event.preventDefault();
      if (this.mobile) {
        const now = performance.now();
        if (Math.abs(event.deltaY) > 12 && now - this.lastMobileWheelAt > 500) {
          this.lastMobileWheelAt = now;
          this.targetJourney = Math.round(this.targetJourney) + Math.sign(event.deltaY);
          this.lastOrbitInput = now;
        }
        return;
      }
      const delta = clamp(event.deltaY, -140, 140);
      this.targetJourney += delta * 0.0031;
      this.lastOrbitInput = performance.now();
    }
  }

  handleCanvasClick(event) {
    if (this.contactOpen || this.profileOpen || this.teamOpen || this.focus || this.detailOpen || this.menuOpen) return;
    if (this.isDuckDragging || this.duckDragDistance > 8) return;
    const index = this.hitTest(event.clientX, event.clientY);
    if (index >= 0) this.startFocus(index, [event.clientX, event.clientY]);
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      if (this.teamLightbox?.open) {
        event.preventDefault();
        this.closeTeamLightbox();
      }
      else if (this.menuOpen) this.closeMenu();
      else if (this.detailOpen) this.requestCloseProject();
      else if (this.profileOpen) this.closeProfile();
      else if (this.teamOpen) this.closeTeamProject();
      else if (this.contactOpen) this.closeContact();
      else if (this.focus) this.requestCloseProject();
      return;
    }
    if (this.detailOpen || this.profileOpen || this.teamOpen || this.contactOpen || this.menuOpen || this.focus) return;
    if (this.introOpen) {
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key) || (event.key === " " && event.target === document.body)) {
        event.preventDefault();
        this.setIntro(false, true);
      }
      return;
    }
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      this.goRelative(1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      this.goRelative(-1);
    }
  }

  handlePopState() {
    const id = window.location.hash.slice(1);
    if (this.profileOpen && id !== "about") this.closeProfile(true);
    if ((this.detailOpen || this.focus) && !PROJECTS.some(project => project.id === id)) this.closeProjectView(true);
    if (this.contactOpen && id !== "contact") {
      this.closeContact(true);
      window.setTimeout(this.handlePopState, this.isReducedMotion() ? 30 : 1000);
      return;
    }
    if (id === "team-project") {
      if (!this.teamOpen) this.openTeamProject(false);
      return;
    }
    if (this.teamOpen) this.closeTeamProject(true);
    const index = PROJECTS.findIndex((project) => project.id === id);
    if (index >= 0) {
      if (!this.detailOpen && !this.focus) {
        this.startFocus(index, [window.innerWidth / 2, window.innerHeight / 2], false);
      }
      else if (this.detailOpen && index !== this.activeDetailIndex) this.showProjectView(index, [window.innerWidth / 2, window.innerHeight / 2]);
    } else if (id === "about") {
      if (!this.profileOpen) this.openProfile(false);
    } else if (id === "contact") {
      if (!this.contactOpen) this.openContact(false);
    } else {
      if (this.detailOpen) this.closeProjectView(true);
      if (this.profileOpen) this.closeProfile(true);
      if (this.contactOpen) this.closeContact(true);
      if (this.focus) this.requestCloseProject();
    }
  }

  goRelative(direction) {
    this.targetJourney = (this.mobile ? Math.round(this.targetJourney) : this.targetJourney) + direction;
    this.lastOrbitInput = performance.now();
  }
   
  scrollToProject(index) {
    const count = this.visibleIndices.length || 1;
    const visibleSlot = this.visibleIndices.indexOf(index);
    // Account for idle rotation so the requested artwork actually faces front.
    const normalized = (visibleSlot >= 0 ? visibleSlot : 0) + this.orbitRotation / TAU * count;
    const nearestCycle = Math.round((this.targetJourney - normalized) / count);
    this.targetJourney = normalized + nearestCycle * count;
    this.lastOrbitInput = performance.now();
  }

  transitionScene(callback) {
    if (this.transitioning) return;
    this.transitioning = true;
    this.sceneCurtain?.classList.add("is-active");
    const coverDelay = this.isReducedMotion() ? 0 : 380;
    window.setTimeout(() => {
      callback();
      requestAnimationFrame(() => {
        this.sceneCurtain?.classList.remove("is-active");
        window.setTimeout(() => {
          this.transitioning = false;
        }, this.isReducedMotion() ? 0 : 560);
      });
    }, coverDelay);
  }

  initProfileReveals() {
    if (!this.profileView || this.profileRevealObserver || !("IntersectionObserver" in window)) return;
    this.profileRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        this.profileRevealObserver.unobserve(entry.target);
      });
    }, { root: this.profileScroll, threshold: 0.08 });
    this.profileView.classList.add("has-reveals");
    this.profileView.querySelectorAll("[data-profile-reveal]").forEach((element) => {
      this.profileRevealObserver.observe(element);
    });
    this.profileView.querySelector(".profile-skills-link")?.addEventListener("click", (event) => {
      event.preventDefault();
      this.profileView.querySelector(".profile-skills")?.scrollIntoView({
        behavior: this.isReducedMotion() ? "instant" : "smooth", block: "start",
      });
    });
  }

  openProfile(pushHistory = true) {
    if (this.profileOpen || this.teamOpen || this.contactOpen || this.detailOpen) return;
    this.profileOpen = true;
    document.body.classList.add("is-locked");
    if (this.profileView) {
      this.profileView.hidden = false;
      this.profileView.setAttribute("aria-hidden", "false");
      void this.profileView.offsetWidth;
      this.profileView.classList.add("is-visible");
      this.initProfileReveals();
    }
    if (this.experience) this.experience.inert = true;
    window.setTimeout(() => this.profileScroll?.focus({ preventScroll: true }), this.isReducedMotion() ? 0 : 180);
    if (pushHistory && window.location.hash !== "#about") history.pushState({ route: "about" }, "", "#about");
  }

  closeProfile(fromHistory = false) {
    if (!this.profileOpen) return;
    this.profileOpen = false;
    this.profileView?.classList.remove("is-visible");
    this.profileView?.setAttribute("aria-hidden", "true");
    if (this.experience) this.experience.inert = false;
    document.body.classList.remove("is-locked");
    if (!fromHistory && window.location.hash === "#about") history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => {
      if (this.profileView && !this.profileOpen) this.profileView.hidden = true;
    }, this.isReducedMotion() ? 0 : 700);
  }

  setupTeamProject() {
    if (!this.teamView || this.teamReady) return;
    this.teamReady = true;

    const range = this.teamView.querySelector("[data-compare-range]");
    const updateComparison = () => {
      if (!range) return;
      const originalShare = Number(range.value);
      this.teamView.style.setProperty("--compare-position", `${originalShare}%`);
      range.setAttribute("aria-valuetext", `기존 디자인 ${originalShare}% / 리브랜딩 디자인 ${100 - originalShare}%`);
    };
    range?.addEventListener("input", updateComparison);
    updateComparison();

    const deviceStage = this.teamView.querySelector("[data-device-stage]");
    deviceStage?.addEventListener("pointermove", (event) => {
      if (this.isReducedMotion()) return;
      const bounds = deviceStage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      deviceStage.style.setProperty("--stage-x", `${x * 18}px`);
      deviceStage.style.setProperty("--stage-y", `${y * 14}px`);
      deviceStage.style.setProperty("--hero-ry", `${x * 5}deg`);
      deviceStage.style.setProperty("--hero-rx", `${-y * 4}deg`);
    });
    deviceStage?.addEventListener("pointerleave", () => {
      deviceStage.style.setProperty("--stage-x", "0px");
      deviceStage.style.setProperty("--stage-y", "0px");
      deviceStage.style.setProperty("--hero-ry", "0deg");
      deviceStage.style.setProperty("--hero-rx", "0deg");
    });

    this.teamScroll?.addEventListener("scroll", () => {
      if (this.teamScrollTicking) return;
      this.teamScrollTicking = true;
      requestAnimationFrame(() => {
        this.updateTeamScroll();
        this.teamScrollTicking = false;
      });
    }, { passive: true });

    this.teamView.querySelector("[data-team-close]")?.addEventListener("click", () => this.closeTeamProject());
    this.teamView.querySelector("[data-team-next]")?.addEventListener("click", () => {
      this.closeTeamProject();
      this.setIntro(false);
      this.scrollToProject(0);
    });
    this.teamView.querySelectorAll("[data-team-zoom]").forEach((button) => {
      button.addEventListener("click", () => this.openTeamLightbox(button.dataset.teamZoom, button.dataset.teamZoomLabel));
    });
    this.teamView.querySelector("[data-team-lightbox-close]")?.addEventListener("click", () => this.closeTeamLightbox());
    this.teamLightbox?.addEventListener("click", (event) => {
      if (event.target === this.teamLightbox) this.closeTeamLightbox();
    });

    const revealItems = this.teamView.querySelectorAll("[data-team-reveal]");
    if ("IntersectionObserver" in window) {
      this.teamRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          this.teamRevealObserver.unobserve(entry.target);
        });
      }, { root: this.teamScroll, threshold: 0.08, rootMargin: "0px 0px -6%" });
      this.teamView.classList.add("has-team-reveals");
      revealItems.forEach((item) => this.teamRevealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-revealed"));
    }
  }

  updateTeamScroll() {
    if (!this.teamScroll) return;
    const max = Math.max(1, this.teamScroll.scrollHeight - this.teamScroll.clientHeight);
    const progress = clamp(this.teamScroll.scrollTop / max);
    if (this.teamProgress) this.teamProgress.textContent = `${String(Math.round(progress * 100)).padStart(2, "0")}%`;

    const scrollBounds = this.teamScroll.getBoundingClientRect();
    this.teamView?.querySelectorAll("[data-team-reveal]:not(.is-revealed)").forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < scrollBounds.bottom * 0.94 && bounds.bottom > scrollBounds.top) item.classList.add("is-revealed");
    });

    const story = this.teamResponsive?.querySelector(".responsive-story");
    if (!story || !this.teamResponsive) return;
    const storyBounds = story.getBoundingClientRect();
    const storyStart = this.teamScroll.scrollTop + storyBounds.top - scrollBounds.top;
    const travel = Math.max(1, story.offsetHeight - this.teamScroll.clientHeight);
    const stageProgress = clamp((this.teamScroll.scrollTop - storyStart) / travel);
    const stage = Math.min(2, Math.floor(stageProgress * 3));
    if (this.teamResponsive.dataset.stage !== String(stage)) {
      this.teamResponsive.dataset.stage = String(stage);
      if (this.teamResponsiveIndex) this.teamResponsiveIndex.textContent = String(stage + 1).padStart(2, "0");
    }
  }

  openTeamLightbox(src, label = "AESOP PROJECT SCREEN") {
    if (!this.teamLightbox || !src) return;
    if (this.teamLightboxImage) {
      this.teamLightboxImage.src = src;
      this.teamLightboxImage.alt = `${label} 확대 화면`;
    }
    if (this.teamLightboxCaption) this.teamLightboxCaption.textContent = label;
    if (typeof this.teamLightbox.showModal === "function") this.teamLightbox.showModal();
    else this.teamLightbox.setAttribute("open", "");
  }

  closeTeamLightbox() {
    if (!this.teamLightbox?.open) return;
    if (typeof this.teamLightbox.close === "function") this.teamLightbox.close();
    else this.teamLightbox.removeAttribute("open");
  }

  openTeamProject(pushHistory = true) {
    if (this.teamOpen || this.contactOpen || this.detailOpen || this.profileOpen) return;
    this.setupTeamProject();
    this.setIntro(false);
    this.teamOpen = true;
    document.body.classList.add("is-locked");
    this.experience?.classList.add("is-team-project");
    if (this.teamView) {
      this.teamView.hidden = false;
      this.teamView.setAttribute("aria-hidden", "false");
      if (this.teamScroll) this.teamScroll.scrollTop = 0;
      void this.teamView.offsetWidth;
      this.teamView.classList.add("is-visible");
      this.teamView.querySelector(".aesop-hero [data-team-reveal]")?.classList.add("is-revealed");
      const teamSection = new URLSearchParams(window.location.search).get("teamSection");
      const sectionTarget = teamSection
        ? this.teamView.querySelector(`[data-team-section="${CSS.escape(teamSection)}"]`)
        : null;
      if (sectionTarget && this.teamScroll) {
        this.teamScroll.scrollTop = sectionTarget.offsetTop;
        sectionTarget.querySelectorAll("[data-team-reveal]").forEach((item) => item.classList.add("is-revealed"));
      }
    }
    if (this.experience) this.experience.inert = true;
    this.updateTeamScroll();
    if (pushHistory && window.location.hash !== "#team-project") history.pushState({ route: "team-project" }, "", "#team-project");
    window.setTimeout(() => this.teamScroll?.focus({ preventScroll: true }), this.isReducedMotion() ? 0 : 500);
  }

  closeTeamProject(fromHistory = false) {
    if (!this.teamOpen) return;
    this.closeTeamLightbox();
    this.teamOpen = false;
    this.teamView?.classList.remove("is-visible");
    this.teamView?.setAttribute("aria-hidden", "true");
    this.experience?.classList.remove("is-team-project");
    if (this.experience) this.experience.inert = false;
    document.body.classList.remove("is-locked");
    if (!fromHistory && window.location.hash === "#team-project") history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => {
      if (this.teamView && !this.teamOpen) this.teamView.hidden = true;
    }, this.isReducedMotion() ? 0 : 800);
  }

  openContact(pushHistory = true) {
    if (this.contactOpen || this.detailOpen || this.profileOpen || this.teamOpen || this.transitioning) return;
    this.setIntro(false);
    if (pushHistory && window.location.hash !== "#contact") history.pushState({ route: "contact" }, "", "#contact");
    this.transitionScene(() => {
      this.contactOpen = true;
      this.sceneMode = "contact";
      this.experience?.classList.add("is-contact");
      if (this.contactUi) {
        this.contactUi.hidden = false;
        this.contactUi.setAttribute("aria-hidden", "false");
      }
      document.body.classList.add("is-locked");
    });
  }

  closeContact(fromHistory = false) {
    if (!this.contactOpen || this.transitioning) return;
    this.transitionScene(() => {
      this.contactOpen = false;
      this.sceneMode = "index";
      this.experience?.classList.remove("is-contact");
      if (this.contactUi) {
        this.contactUi.hidden = true;
        this.contactUi.setAttribute("aria-hidden", "true");
      }
      document.body.classList.remove("is-locked");
      if (!fromHistory && window.location.hash === "#contact") history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    });
  }

  openMenu() {
    if (this.detailOpen || this.profileOpen || this.teamOpen || this.contactOpen || this.focus || this.menuOpen) return;
    this.menuOpen = true;
    document.body.classList.add("is-locked");
    this.siteMenu?.classList.add("is-open");
    this.siteMenu?.setAttribute("aria-hidden", "false");
    this.menuOpenButton?.setAttribute("aria-expanded", "true");
    if (this.experience) this.experience.inert = true;
    window.setTimeout(() => document.querySelector("[data-menu-close]")?.focus(), 400);
  }

  closeMenu() {
    if (!this.menuOpen) return;
    this.menuOpen = false;
    this.siteMenu?.classList.remove("is-open");
    this.siteMenu?.setAttribute("aria-hidden", "true");
    this.menuOpenButton?.setAttribute("aria-expanded", "false");
    if (this.experience) this.experience.inert = false;
    if (!this.detailOpen && !this.focus) document.body.classList.remove("is-locked");
    window.setTimeout(() => this.menuOpenButton?.focus(), 450);
  }

  positionTooltip(x, y) {
    if (!this.tooltip) return;
    this.tooltip.style.left = `${clamp(x, 4, window.innerWidth - 182)}px`;
    this.tooltip.style.top = `${clamp(y, 4, window.innerHeight - 70)}px`;
  }

  setHover(index) {
    if (this.hoverIndex === index) return;
    this.hoverIndex = index;
    this.experience?.classList.toggle("has-hover", index >= 0);
    if (index >= 0) {
      this.updateProjectInfo(index);
      const project = PROJECTS[index];
      if (this.tooltipIndex) this.tooltipIndex.textContent = project.index;
      if (this.tooltipTitle) this.tooltipTitle.textContent = project.title;
    }
  }

  hitTest(x, y) {
    let best = -1;
    let bestDepth = Infinity;
    this.hitAreas.forEach((area) => {
      if (!area || area.depth >= bestDepth) return;
      if (pointInQuad(x, y, area.points)) {
        best = area.index;
        bestDepth = area.depth;
      }
    });
    return best;
  }

  updateTransforms() {
    const visibleCount = this.mobile ? Math.max(1, this.visibleIndices.length) : PROJECTS.length;
    this.transforms = PROJECTS.map((project, index) => {
      const visibleSlot = this.visibleIndices.indexOf(index);
      const count = visibleCount;
      if (this.mobile && visibleSlot < 0) {
        return {
          position: [0, 0, -40],
          rotation: [0, 0, 0],
          scale: 0,
          screenWidth: 0,
          visible: false,
          activity: 0,
        };
      }
      const rawRelative = visibleSlot - this.journey;
      const relative = ((rawRelative + count * 0.5) % count + count) % count - count * 0.5;
      if (this.mobile) {
        // Keep the one-card snap, but move the outgoing and incoming sheets on
        // the front half of a shallow ellipse. The centre stays square to the
        // camera; cards turn, recede and shrink progressively toward the sides.
        const distance = Math.abs(relative);
        const travel = Math.min(distance, 1);
        const [planeWidth, planeHeight] = projectPlaneSize(project, true);
        const aspect = planeWidth / planeHeight;
        const viewportWidth = Math.max(1, this.canvas.clientWidth || window.innerWidth);
        const viewportHeight = Math.max(1, this.canvas.clientHeight || window.innerHeight);
        // Reserve space above and below the canvas centre for mobile navigation.
        const maxCardHeight = Math.max(64, viewportHeight - 352);
        const mainWidth = Math.min(aspect >= 1.2 ? 0.84 : aspect >= 0.9 ? 0.72 : 0.68,
          maxCardHeight / viewportWidth * aspect);
        const orbitAngle = relative * 1.16;
        const centreDepth = -5.2;
        const centreCameraDepth = 6.8 - centreDepth;
        const viewWidth = 2 * centreCameraDepth * Math.tan(72 * Math.PI / 360)
          * viewportWidth / viewportHeight;
        // Keep a useful slice of each neighbour inside the viewport so its
        // angled face is visible before it starts travelling toward centre.
        const orbitX = Math.sin(orbitAngle) * viewWidth * 0.62;
        const orbitLift = (1 - Math.cos(orbitAngle)) * 0.52;
        const orbitDepth = (1 - Math.cos(orbitAngle)) * 3.8;
        const hiddenDepth = Math.max(0, distance - 1) * 4;
        const sideTurn = Math.sin(orbitAngle);
        return {
          position: [orbitX, 0.15 + orbitLift, centreDepth - orbitDepth - hiddenDepth],
          rotation: [0.018 * travel, -0.54 * sideTurn, 0.04 * sideTurn],
          scale: 1,
          screenWidth: mainWidth * lerp(1, 0.72, smoothstep(0, 1, travel)),
          visible: distance <= 1.12,
          activity: Math.exp(-distance * distance * 8),
        };
      }
      // A single horizontal X/Z orbit rotates as one group around the object.
      // Small per-work Y offsets keep it organic without becoming an X/Y wall.
      const orbit = this.layouts.orbits[index];
      const orbitalOffset = relative * ((Math.PI * 2) / count) + this.orbitRotation;
      const ringPhase = this.layouts.activePhase + orbitalOffset;
      const angularDistance = Math.atan2(Math.sin(orbitalOffset), Math.cos(orbitalOffset));
      const activeWeight = Math.exp(-angularDistance * angularDistance * 8);
      const ringCos = Math.cos(ringPhase);
      const ringSin = Math.sin(ringPhase);
      const frontness = (ringSin + 1) * 0.5;
      const ringX = ringCos * orbit.radiusX;
      // On a phone, adjacent works need their own vertical space. Tying the
      // lanes to the relative slot keeps the selected work centered while the
      // previous and next works move to opposite sides of it as users scroll.
      const mobileLaneY = Math.sin(relative * Math.PI * 0.5) * 2.6
        + Math.sin(relative * Math.PI) * 0.3;
      const ringPosition = [
        ringX,
        this.mobile
          ? mobileLaneY
          : orbit.height * (1 - activeWeight * 0.94)
            + Math.sin(ringPhase * 2 + index * 0.61) * 0.1,
        this.layouts.centerZ + ringSin * orbit.radiusZ,
      ];
      const cameraZ = this.mobile ? 6.8 : 5.25;
      const ringCameraYaw = Math.atan2(-ringX, cameraZ - ringPosition[2]);
      const ringRadialYaw = nearestPlaneAngle(
        Math.atan2(-ringX, this.layouts.centerZ - ringPosition[2]),
        ringCameraYaw,
      );
      const ringYaw = this.mobile
        ? ringCameraYaw
        : mixAngle(ringRadialYaw, ringCameraYaw, 0.4 + activeWeight * 0.22);
      const ringRotation = [
        this.mobile ? 0 : -ringSin * 0.025,
        ringYaw,
        this.mobile ? 0 : Math.sin(ringPhase * 2 + index * 0.71) * 0.035,
      ];
      const ringScale = this.mobile
        ? 0.3 + frontness * 0.13 + activeWeight * 0.38
        : 0.4 + frontness * 0.2 + activeWeight * 0.4;

      // SPIRAL is a closed wave around the same physical orbit. Using a
      // periodic curve avoids a card jumping from the top to the bottom when
      // the rotation crosses the array seam.
      const spiralAngle = ringPhase;
      const spiralSin = Math.sin(spiralAngle);
      const spiralCos = Math.cos(spiralAngle);
      const spiralX = spiralCos * orbit.radiusX * 0.8;
      const spiralPosition = [
        spiralX,
        this.mobile
          ? mobileLaneY * 0.9 + Math.sin(spiralAngle * 2) * 0.25
          : Math.sin(spiralAngle * 2) * 2.25 + orbit.height * 0.18,
        this.layouts.centerZ + spiralSin * orbit.radiusZ * 0.76,
      ];
      const spiralFrontness = (spiralSin + 1) * 0.5;
      const spiralCameraYaw = Math.atan2(-spiralX, cameraZ - spiralPosition[2]);
      const spiralRadialYaw = nearestPlaneAngle(
        Math.atan2(-spiralX, this.layouts.centerZ - spiralPosition[2]),
        spiralCameraYaw,
      );
      const spiralRotation = [
        this.mobile ? 0 : -spiralSin * 0.035,
        this.mobile
          ? spiralCameraYaw
          : mixAngle(spiralRadialYaw, spiralCameraYaw, 0.46 + activeWeight * 0.2),
        this.mobile ? 0 : Math.sin(index * 0.72) * 0.055,
      ];
      const spiralScale = this.mobile
        ? 0.33 + spiralFrontness * 0.13 + activeWeight * 0.27
        : 0.46 + spiralFrontness * 0.23 + activeWeight * 0.16;
      return {
        position: vec3Mix(ringPosition, spiralPosition, this.layoutMix),
        rotation: [
          mixAngle(ringRotation[0], spiralRotation[0], this.layoutMix),
          mixAngle(ringRotation[1], spiralRotation[1], this.layoutMix),
          mixAngle(ringRotation[2], spiralRotation[2], this.layoutMix),
        ],
        scale: lerp(ringScale, spiralScale, this.layoutMix),
        activity: activeWeight,
      };
    });
  }

  sampleTransformPath(route) {
    const value = clamp(route, 0, PROJECTS.length - 1);
    const index = Math.floor(value);
    const amount = value - index;
    const getPosition = (offset) => this.transforms[clamp(index + offset, 0, PROJECTS.length - 1)].position;
    return catmullRom(getPosition(-1), getPosition(0), getPosition(1), getPosition(2), amount);
  }

  calculateBrowseCamera(route) {
    const pointerAmount = this.mobile || this.isReducedMotion() ? 0 : 1;
    const eye = [
      this.pointer[0] * 0.1 * pointerAmount,
      (this.mobile ? 0.72 : 1.35) - this.pointer[1] * 0.08 * pointerAmount,
      this.mobile ? 6.8 : 5.25,
    ];
    const look = [this.pointer[0] * 0.3 * pointerAmount, -this.pointer[1] * 0.14 * pointerAmount, this.layouts.centerZ];
    return { eye, look };
  }

  updateProjectInfo(index) {
    const project = PROJECTS[index];
    if (!project || this.infoIndex === index) return;
    this.infoIndex = index;
    if (this.activeTitle) this.activeTitle.textContent = project.title;
    if (this.activeCategory) this.activeCategory.textContent = project.category;
    if (this.activeMedia) this.activeMedia.textContent = project.media.join(" / ");
    if (this.activeYear) this.activeYear.textContent = project.year;
    if (this.activeSummary) this.activeSummary.textContent = project.summary;
  }

  updateActiveProject() {
    const count = this.visibleIndices.length || 1;
    const activeSlot = ((Math.round(this.journey) % count) + count) % count;
    let nextIndex = this.visibleIndices[activeSlot] ?? 0;
    if (this.focus) {
      nextIndex = this.focus.index;
    } else {
      let strongest = -1;
      this.transforms.forEach((transform, index) => {
        if (!this.visibleIndices.includes(index)) return;
        if ((transform.activity ?? 0) > strongest) {
          strongest = transform.activity ?? 0;
          nextIndex = index;
        }
      });
    }
    this.activeIndex = nextIndex;
    if (this.currentIndex) {
      const visibleNumber = this.visibleIndices.indexOf(nextIndex) + 1;
      const label = String(visibleNumber).padStart(2, '0');
      if (this.currentIndex.textContent !== label) this.currentIndex.textContent = label;
    }
    // Keep the last hovered work readable while the pointer moves to its link.
    // Touch navigation and focused works still follow the active card.
    if (this.focus || this.mobile || this.infoIndex < 0) this.updateProjectInfo(nextIndex);
    this.experience?.classList.add("is-entered");
    if (this.scrollLabel) this.scrollLabel.textContent = this.mobile ? "SWIPE TO BROWSE" : "SCROLL · ROTATE";
  }

  update(delta, time) {
    const reduced = this.isReducedMotion();

    if (reduced) {
      this.journey = this.targetJourney;
      this.journeyVelocity = 0;
      this.layoutMix = this.layoutTarget;
      this.layoutVelocity = 0;
      this.pointer[0] = this.pointerTarget[0];
      this.pointer[1] = this.pointerTarget[1];
    } else {
      const journeySpring = this.mobile ? 26 : 36;
      const journeyDamping = this.mobile ? 10.5 : 8.8;
      this.journeyVelocity += (journeySpring * (this.targetJourney - this.journey) - journeyDamping * this.journeyVelocity) * delta;
      this.journey += this.journeyVelocity * delta;
      this.layoutVelocity += (38 * (this.layoutTarget - this.layoutMix) - 10.5 * this.layoutVelocity) * delta;
      this.layoutMix += this.layoutVelocity * delta;
      this.layoutMix = clamp(this.layoutMix, -0.025, 1.025);
      const pointerDamping = 1 - Math.exp(-delta * 5.2);
      this.pointer[0] = lerp(this.pointer[0], this.pointerTarget[0], pointerDamping);
      this.pointer[1] = lerp(this.pointer[1], this.pointerTarget[1], pointerDamping);
    }

    const orbitIsIdle = time - this.lastOrbitInput > 1200 && Math.abs(this.targetJourney - this.journey) < 0.025 && Math.abs(this.journeyVelocity) < 0.035;
    if (this.mobile) {
      // Mobile navigation already moves the orbit through touch input. Keeping
      // the desktop idle rotation here makes cards drift out of their lanes.
      this.orbitRotation = 0;
    } else if (!reduced && orbitIsIdle && this.sceneMode === "index" && !this.focus && !this.menuOpen && !this.profileOpen && !this.contactOpen) {
      this.orbitRotation = (this.orbitRotation + delta * (Math.PI * 2 / 68)) % (Math.PI * 2);
    }
    if (!this.isDuckDragging && !reduced && (!this.mobile || this.introOpen) && this.sceneMode === "index" && !this.focus && !this.menuOpen && !this.profileOpen && !this.contactOpen) {
      this.duckRotationY += delta * (Math.PI * 2 / 32);
      this.duckRotationY = (this.duckRotationY + Math.PI * 2) % (Math.PI * 2);
      this.duckSpinVelocity *= 0.987;
    } else if (!this.isDuckDragging) {
      this.duckRotationY += this.duckSpinVelocity * delta * 60;
      this.duckSpinVelocity *= 0.965;
    }

    this.updateTransforms();
    this.updateActiveProject();
    const visibleCount = this.visibleIndices.length || 1;
    const wrappedJourney = ((this.journey % visibleCount) + visibleCount) % visibleCount;
    const progress = wrappedJourney / visibleCount;
    if (this.progressBar) this.progressBar.style.transform = `scaleX(${progress})`;

    const browseCamera = this.calculateBrowseCamera(this.journey);
    this.cameraEye = browseCamera.eye;
    this.cameraLook = browseCamera.look;

    if (this.contactOpen) {
      const idle = this.isReducedMotion() ? 0 : Math.sin(time * 0.00018) * 0.035;
      this.cameraEye = [this.pointer[0] * 0.14, idle - this.pointer[1] * 0.08, 5.2];
      this.cameraLook = [this.pointer[0] * 0.22, -this.pointer[1] * 0.1, -6.1];
    }

    if (this.focus) {
      const elapsed = time - this.focus.started;
      const raw = this.focus.instant ? 1 : clamp(elapsed / this.focus.duration);
      const amount = easeInOutCubic(raw);
      this.focus.progress = amount;
      this.cameraEye = vec3Mix(this.focus.startEye, this.focus.targetEye, amount);
      this.cameraLook = vec3Mix(this.focus.startLook, this.focus.targetLook, amount);
      if (raw >= 1 && !this.focus.viewShown) {
        this.focus.viewShown = true;
        this.showProjectView(this.focus.index, this.focus.origin);
      }
    }

    PROJECTS.forEach((_, index) => {
      const hoverTarget = index === this.hoverIndex ? 1 : 0;
      const damping = reduced ? 1 : 1 - Math.exp(-delta * 9);
      this.hoverValues[index] = lerp(this.hoverValues[index], hoverTarget, damping);
    });

    // A roughly 0.55s ease makes category lighting feel like gallery lights
    // warming up/down rather than a binary visibility switch.
    const categoryDamping = reduced ? 1 : 1 - Math.exp(-delta * 6.2);
    const filterTarget = this.activeGroup === 'all' ? 0 : 1;
    this.categoryFilterMix = lerp(this.categoryFilterMix, filterTarget, categoryDamping);
    PROJECTS.forEach((project, index) => {
      const highlightTarget = this.activeGroup !== 'all' && project.group === this.activeGroup ? 1 : 0;
      this.categoryHighlightValues[index] = lerp(
        this.categoryHighlightValues[index],
        highlightTarget,
        categoryDamping,
      );
    });
  }

  frame(time) {
    if (!this.running) return;
    if (this.mobile && !this.focus && time - (this.lastRenderAt || 0) < 1000 / 30) {
      requestAnimationFrame(this.frame);
      return;
    }
    this.lastRenderAt = time;
    const delta = Math.min(1 / 30, Math.max(0.001, (time - this.lastTime) / 1000));
    this.lastTime = time;
    const covered = this.detailOpen || this.teamOpen || this.profileOpen || this.menuOpen || document.querySelector("dialog[open]");
    if (!document.hidden && !covered) {
      this.update(delta, time);
      this.render(time);
    }
    requestAnimationFrame(this.frame);
  }

  render(time) {
    const gl = this.gl;
    gl.clearColor(0.1569, 0.3451, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4LookAt(this.view, this.cameraEye, this.cameraLook, [0, 1, 0]);
    mat4Multiply(this.viewProjection, this.projection, this.view);
    if (this.sceneMode === "contact") {
      this.renderContact(time);
    } else {
      this.renderTunnel();
      this.renderDuckBubbles(time);
      this.renderFish(time);
      // The enlarged mobile duck spans a much deeper volume than the flat
      // project sheets. Start the sheets on a fresh depth layer so a card is
      // always wholly in front instead of appearing to pass through the duck.
      if (this.mobile) gl.clear(gl.DEPTH_BUFFER_BIT);
      this.renderProjects(time);
    }

    this.underwater?.updateHitTargets();
    if (this.sceneMode === "index" && this.pointerInside && !this.focus && !this.detailOpen && !this.menuOpen) {
      this.setHover(this.hitTest(this.pointerPosition[0], this.pointerPosition[1]));
    }
  }

  renderDuckBubbles(time) {
    if (!this.underwater) this.underwater = new UnderwaterScene(this);
    this.underwater.render(time);
  }
  renderTunnel() {
    const gl = this.gl;
    const locations = this.tunnelLocations;
    gl.useProgram(this.tunnelProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.tunnelGeometry.vertexBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(locations.uv);
    gl.vertexAttribPointer(locations.uv, 2, gl.FLOAT, false, 20, 12);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.tunnelGeometry.indexBuffer);
    gl.uniformMatrix4fv(locations.mvp, false, this.viewProjection);
    gl.drawElements(gl.TRIANGLES, this.tunnelGeometry.count, gl.UNSIGNED_SHORT, 0);
  }

  renderFish(time) {
    const gl = this.gl;
    const locations = this.knotLocations;
    const motion = this.isReducedMotion() ? 0 : time * 0.000028;
    const focusDim = this.focus ? this.focus.progress : 0;
    gl.useProgram(this.knotProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.fishGeometry.positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.fishGeometry.normalBuffer);
    gl.enableVertexAttribArray(locations.normal);
    gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.fishGeometry.bandBuffer);
    gl.enableVertexAttribArray(locations.band);
    gl.vertexAttribPointer(locations.band, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.fishGeometry.indexBuffer);
    gl.uniformMatrix4fv(locations.viewProjection, false, this.viewProjection);
    gl.uniform3fv(locations.camera, this.cameraEye);
    gl.uniform1f(locations.dim, focusDim);
    gl.uniform1f(locations.roughness, 0.18);
    gl.uniform1i(locations.environment, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.environmentTexture);

    const model = createMat4();
    const baseScale = this.mobile ? (this.introOpen ? 1.05 : 0.58) : window.innerWidth <= 1024 ? 0.8 : 1.14;
    const fishScale = baseScale * 0.76;
    const fishPosition = this.mobile
      ? this.introOpen ? [1.5, -3.0, this.layouts.centerZ + 1] : [1.2, -1.2, this.layouts.centerZ - 0.8]
      : [0.72, -0.04, this.layouts.centerZ + 0.46];
    this.duckBubbleAnchor = { position: fishPosition, scale: fishScale };
    mat4Compose(
      model,
      fishPosition,
      [0.08, this.duckRotationY + 0.88, 0.05],
      [fishScale, fishScale, fishScale],
    );
    gl.uniformMatrix4fv(locations.model, false, model);
    gl.drawElements(gl.TRIANGLES, this.fishGeometry.opaqueCount, gl.UNSIGNED_SHORT, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
    gl.drawElements(gl.TRIANGLES, this.fishGeometry.lensCount, gl.UNSIGNED_SHORT, this.fishGeometry.opaqueCount * Uint16Array.BYTES_PER_ELEMENT);
    gl.depthMask(true);
    gl.disable(gl.BLEND);
  }

  renderContact(time) {
    const gl = this.gl;
    const plane = this.planeLocations;
    const wordModel = createMat4();
    const wordAspect = 2304 / 600;
    const viewportAspect = window.innerWidth / window.innerHeight;
    const contactFov = (this.mobile ? 63 : 55) * (Math.PI / 180);
    const visibleWidth = 2 * 15 * Math.tan(contactFov * 0.5) * viewportAspect;
    const wordWidth = Math.min(
      this.mobile ? 6.2 : window.innerWidth <= 1024 ? 13.8 : 19.2,
      visibleWidth * 0.86,
    );
    mat4Compose(
      wordModel,
      [0, this.mobile ? 0.52 : 0.44, -9.8],
      [0, 0, 0],
      [wordWidth, wordWidth / wordAspect, 1],
    );
    const wordMvp = createMat4();
    mat4Multiply(wordMvp, this.viewProjection, wordModel);
    gl.useProgram(this.planeProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadGeometry.buffer);
    gl.enableVertexAttribArray(plane.position);
    gl.vertexAttribPointer(plane.position, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(plane.uv);
    gl.vertexAttribPointer(plane.uv, 2, gl.FLOAT, false, 20, 12);
    gl.uniformMatrix4fv(plane.mvp, false, wordMvp);
    gl.uniform1i(plane.texture, 0);
    gl.uniform1f(plane.hover, 0);
    gl.uniform1f(plane.active, 0);
    gl.uniform1f(plane.dim, 0);
    gl.uniform1f(plane.fog, 0);
    gl.uniform1f(plane.categoryHighlight, 0);
    gl.uniform1f(plane.categoryFilter, 0);
    gl.uniform1f(plane.glowPass, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.contactTexture);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.quadGeometry.count);
    gl.depthMask(true);
    gl.disable(gl.BLEND);

    const locations = this.knotLocations;
    gl.useProgram(this.knotProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.envelopeGeometry.positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.envelopeGeometry.normalBuffer);
    gl.enableVertexAttribArray(locations.normal);
    gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.envelopeGeometry.bandBuffer);
    gl.enableVertexAttribArray(locations.band);
    gl.vertexAttribPointer(locations.band, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.envelopeGeometry.indexBuffer);
    gl.uniformMatrix4fv(locations.viewProjection, false, this.viewProjection);
    gl.uniform3fv(locations.camera, this.cameraEye);
    gl.uniform1f(locations.dim, 0);
    gl.uniform1f(locations.roughness, 0.28);
    gl.uniform1i(locations.environment, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.environmentTexture);

    const reduced = this.isReducedMotion();
    const spin = reduced ? -0.34 : (time * 0.000075 - 0.34) % (Math.PI * 2);
    const drift = reduced ? 0 : time * 0.00018;
    const model = createMat4();
    const scale = this.mobile ? 0.56 : window.innerWidth <= 1024 ? 0.86 : 1.2;
    mat4Compose(
      model,
      [0, this.mobile ? -0.12 : -0.08, this.mobile ? -6.8 : window.innerWidth <= 1024 ? -6.25 : -5.9],
      [0.12 + Math.sin(drift) * 0.035, spin, -0.04 + Math.sin(drift * 0.67) * 0.025],
      [scale, scale, scale],
    );
    gl.uniformMatrix4fv(locations.model, false, model);
    gl.drawElements(gl.TRIANGLES, this.envelopeGeometry.count, gl.UNSIGNED_SHORT, 0);
  }

  renderProjects(time) {
    if (this.mobile && this.introOpen) { this.hitAreas = []; return; }
    const gl = this.gl;
    const locations = this.planeLocations;
    const reduced = this.isReducedMotion();
    const corners = [
      [-0.5, -0.5, 0, 1],
      [0.5, -0.5, 0, 1],
      [0.5, 0.5, 0, 1],
      [-0.5, 0.5, 0, 1],
    ];
    this.hitAreas = [];
    gl.useProgram(this.planeProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadGeometry.buffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(locations.uv);
    gl.vertexAttribPointer(locations.uv, 2, gl.FLOAT, false, 20, 12);
    gl.uniform1i(locations.texture, 0);

    PROJECTS.forEach((project, index) => {
      const transform = this.transforms[index];
      if (this.mobile && !transform.visible && (!this.focus || this.focus.index !== index)) return;
      const bob = reduced || this.focus || this.mobile ? 0 : Math.sin(time * 0.00028 + index * 1.73) * 0.022;
      const position = [
        transform.position[0],
        transform.position[1] + bob,
        transform.position[2] + this.hoverValues[index] * 0.18,
      ];
      const rotation = [...transform.rotation];
      let scaleUp = (transform.scale || 1) * (1 + this.hoverValues[index] * 0.055);
      if (!this.mobile && index === this.activeIndex) scaleUp += 0.015;
      const [width, height] = projectPlaneSize(project, this.mobile);
      if (this.mobile) {
        // Size in world units from the resting camera, so focus animation can
        // move closer without a sudden resize. Every orientation has the same
        // on-screen width at its carousel position.
        const cameraDepth = 6.8 - transform.position[2];
        const viewportWidth = Math.max(1, this.canvas.clientWidth || window.innerWidth);
        const viewportHeight = Math.max(1, this.canvas.clientHeight || window.innerHeight);
        const viewportAspect = viewportWidth / viewportHeight;
        const mobileFov = 72 * (Math.PI / 180);
        scaleUp = transform.screenWidth * 2 * cameraDepth
          * Math.tan(mobileFov * 0.5) * viewportAspect / width;
      }
      if (this.focus && index === this.focus.index) {
        rotation[0] = lerp(rotation[0], 0, this.focus.progress);
        rotation[1] = lerp(rotation[1], 0, this.focus.progress);
        rotation[2] = lerp(rotation[2], 0, this.focus.progress);
        scaleUp *= 1 + this.focus.progress * 0.08;
      }
      const model = this.modelMatrices[index];
      mat4Compose(model, position, rotation, [width * scaleUp, height * scaleUp, 1]);
      const mvp = createMat4();
      mat4Multiply(mvp, this.viewProjection, model);

      const categoryHighlight = this.categoryHighlightValues[index] || 0;
      if (categoryHighlight > 0.002) {
        const glowModel = createMat4();
        const glowExpansion = 1 + categoryHighlight * 0.12;
        mat4Compose(
          glowModel,
          position,
          rotation,
          [width * scaleUp * glowExpansion, height * scaleUp * glowExpansion, 1],
        );
        const glowMvp = createMat4();
        mat4Multiply(glowMvp, this.viewProjection, glowModel);
        gl.uniformMatrix4fv(locations.mvp, false, glowMvp);
        gl.uniform1f(locations.hover, 0);
        gl.uniform1f(locations.active, 0);
        gl.uniform1f(locations.dim, 0);
        gl.uniform1f(locations.fog, 0);
        gl.uniform1f(locations.categoryHighlight, categoryHighlight * (this.mobile ? 0.3 : 0.7));
        gl.uniform1f(locations.categoryFilter, this.categoryFilterMix);
        gl.uniform1f(locations.glowPass, 1);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.depthMask(false);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.quadGeometry.count);
        gl.depthMask(true);
        gl.disable(gl.BLEND);
      }

      gl.uniformMatrix4fv(locations.mvp, false, mvp);
      gl.uniform1f(locations.hover, this.hoverValues[index]);
      gl.uniform1f(locations.active, index === this.activeIndex ? 1 : 0);
      const hoverDim = this.hoverIndex >= 0 && index !== this.hoverIndex ? this.hoverValues[this.hoverIndex] * 0.18 : 0;
      const categoryDim = this.categoryFilterMix * (1 - categoryHighlight) * 0.36;
      const carouselDim = this.mobile && !this.focus ? (1 - (transform.activity ?? 0)) * 0.2 : 0;
      const dim = this.focus && index !== this.focus.index
        ? this.focus.progress
        : Math.max(hoverDim, categoryDim, carouselDim);
      gl.uniform1f(locations.dim, dim);
      gl.uniform1f(locations.categoryHighlight, categoryHighlight);
      gl.uniform1f(locations.categoryFilter, this.categoryFilterMix);
      gl.uniform1f(locations.glowPass, 0);
      const distance = Math.hypot(position[0] - this.cameraEye[0], position[1] - this.cameraEye[1], position[2] - this.cameraEye[2]);
      gl.uniform1f(locations.fog, smoothstep(this.mobile ? 12.4 : 13.2, this.mobile ? 17.2 : 18.4, distance));
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textures[index]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.quadGeometry.count);

      const projected = corners.map((corner) => transformPoint(mvp, corner));
      if (projected.some((point) => point[3] <= 0.08)) return;
      const points = projected.map((point) => [
        (point[0] / point[3] * 0.5 + 0.5) * window.innerWidth,
        (1 - (point[1] / point[3] * 0.5 + 0.5)) * window.innerHeight,
      ]);
      const depth = projected.reduce((sum, point) => sum + point[2] / point[3], 0) / projected.length;
      if (depth < -1 || depth > 1) return;
      this.hitAreas.push({ index, points, depth });
    });
  }

  startFocus(index, origin = [window.innerWidth / 2, window.innerHeight / 2], pushHistory = true, instant = false) {
    if (!this.running) {
      if (pushHistory) history.pushState({ project: PROJECTS[index].id }, "", `#${PROJECTS[index].id}`);
      document.body.classList.add("is-locked");
      this.showProjectView(index, origin);
      return;
    }
    if (this.focus || this.detailOpen || this.menuOpen) return;
    this.setIntro(false);
    const projectIndex = clamp(index, 0, PROJECTS.length - 1);
    if (this.mobile && this.transforms[projectIndex] && !this.transforms[projectIndex].visible) {
      // A direct project link may name a work outside the three visible cards.
      // Centre it before starting the camera move so the focus path stays local.
      this.scrollToProject(projectIndex);
      this.journey = this.targetJourney;
      this.journeyVelocity = 0;
      this.updateTransforms();
      this.updateActiveProject();
    }
    const transform = this.transforms[projectIndex] || this.layouts.rings[projectIndex];
    const position = transform.position;
    const project = PROJECTS[projectIndex];
    const distance = project.orientation === "portrait" ? (this.mobile ? 4.8 : 4.25) : this.mobile ? 4.1 : 3.6;
    // Freeze every driver before taking the camera target snapshot. This keeps
    // a card clicked during wheel inertia or a layout morph under the camera.
    this.targetJourney = this.journey;
    this.journeyVelocity = 0;
    this.layoutTarget = this.layoutMix;
    this.layoutVelocity = 0;
    this.lastOrbitInput = performance.now();
    this.setHover(-1);
    document.body.classList.add("is-locked");
    this.experience?.classList.add("is-focusing");
    this.focus = {
      index: projectIndex,
      origin,
      started: performance.now(),
      duration: instant || this.isReducedMotion() ? 1 : this.mobile ? 320 : 650,
      instant,
      progress: 0,
      startEye: [...this.cameraEye],
      startLook: [...this.cameraLook],
      targetEye: [position[0], position[1], position[2] + distance],
      targetLook: [...position],
      viewShown: false,
    };
    this.updateActiveProject();
    if (pushHistory && window.location.hash !== `#${project.id}`) {
      history.pushState({ project: project.id }, "", `#${project.id}`);
    }
  }

  showProjectView(index, origin) {
    const project = PROJECTS[index];
    if (!project || !this.projectView || !this.projectContent) return;

    this.activeDetailIndex = index;
    this.detailOpen = true;
    this.projectView.hidden = false;
    this.projectView.style.setProperty("--origin-x", `${origin[0]}px`);
    this.projectView.style.setProperty("--origin-y", `${origin[1]}px`);
    this.projectView.style.setProperty("--detail-accent", project.accent);
    this.projectView.style.setProperty("--detail-bg", project.background);
    this.projectView.style.setProperty("--detail-ink", project.ink);
    this.projectView.dataset.theme = project.theme;
    this.projectView.style.setProperty("--detail-main", project.palette[0]);
    this.projectView.style.setProperty("--detail-secondary", project.palette[1]);
    this.projectView.style.setProperty("--hero-ink", getLuminance(project.accent) < 0.42 ? "#FFF9EE" : project.ink);
    const showAllProjects = this.activeGroup === 'all';
    const navigation = getProjectNavigation(project, showAllProjects);
    this.setProjectFilter(showAllProjects ? 'all' : project.group, { focusFirst: false });
    this.projectContent.innerHTML = projectDetailMarkup(project, index, showAllProjects);
    if (this.detailCounter) this.detailCounter.textContent = `${navigation.category.english} ${String(navigation.position + 1).padStart(2, "0")} / ${String(navigation.projects.length).padStart(2, "0")}`;
    const backLabel = this.projectView.querySelector('[data-project-close] span:last-child');
    if (backLabel) backLabel.textContent = `${navigation.category.label}로 돌아가기`;
    this.projectContent.querySelectorAll("[data-detail-art]").forEach((canvas) => drawProjectArtwork(canvas, project));
    this.projectContent.querySelectorAll('[data-detail-project]').forEach(button => {
      button.addEventListener('click', () => {
        const target = navigation.projects.find(item => item.id === button.dataset.detailProject);
        if (!target) return;
        history.replaceState({ project: target.id }, '', `#${target.id}`);
        this.showProjectView(PROJECTS.indexOf(target), [window.innerWidth / 2, window.innerHeight / 2]);
      });
    });
    this.projectContent.querySelectorAll('[data-detail-return]').forEach(button => {
      button.addEventListener('click', () => this.requestCloseProject());
    });
    this.projectScroll.scrollTop = 0;
    window.dispatchEvent(new Event("portfolio:detail"));
    this.projectView.setAttribute("aria-hidden", "false");
    if (this.experience) this.experience.inert = true;
    requestAnimationFrame(() => {
      this.projectView.classList.add("is-visible");
      window.setTimeout(() => this.projectScroll?.focus({ preventScroll: true }), this.isReducedMotion() ? 0 : 720);
    });
  }

  requestCloseProject() {
    if (this.focus && !this.detailOpen) {
      this.focus = null;
      this.experience?.classList.remove("is-focusing");
      document.body.classList.remove("is-locked");
      if (window.location.hash) history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
      return;
    }
    if (
      history.state?.project &&
      window.location.hash === `#${PROJECTS[this.activeDetailIndex ?? this.focus?.index ?? 0].id}` &&
      history.length > 1
    ) {
      history.back();
    } else {
      history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
      this.closeProjectView();
    }
  }

  closeProjectView(fromHistory = false) {
    if (!this.detailOpen && !this.focus) return;
    const returnGroup = this.activeGroup === 'all'
      ? 'all'
      : PROJECTS[this.activeDetailIndex ?? this.focus?.index]?.group || this.activeGroup;
    const delay = this.isReducedMotion() ? 0 : 900;
    this.projectView?.classList.remove("is-visible");
    this.projectView?.setAttribute("aria-hidden", "true");
    this.detailOpen = false;
    this.focus = null;
    const returnIndex = this.activeDetailIndex;
    this.setProjectFilter(returnGroup, { instant: true, focusFirst: false });
    if (Number.isInteger(returnIndex)) this.scrollToProject(returnIndex);
    this.experience?.classList.remove("is-focusing");
    if (this.experience) this.experience.inert = false;
    document.body.classList.remove("is-locked");
    if (!fromHistory && window.location.hash) history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    window.setTimeout(() => {
      if (this.projectView && !this.detailOpen) this.projectView.hidden = true;
      if (!this.detailOpen && !this.profileOpen && !this.teamOpen && !document.querySelector("[data-nesto-dialog]")?.open) document.querySelector("[data-view-active]")?.focus({ preventScroll: true });
    }, delay);
  }
}

function pointInTriangle(point, a, b, c) {
  const sign = (p1, p2, p3) => (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
  const d1 = sign(point, a, b);
  const d2 = sign(point, b, c);
  const d3 = sign(point, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

function pointInQuad(x, y, points) {
  const point = [x, y];
  return pointInTriangle(point, points[0], points[1], points[2]) || pointInTriangle(point, points[0], points[2], points[3]);
}

function getProjectNavigation(project, showAllProjects = false) {
  const projects = showAllProjects ? PROJECTS : PROJECTS.filter(item => item.group === project.group);
  const position = projects.findIndex(item => item.id === project.id);
  return {
    category: showAllProjects
      ? { label: '전체', english: 'ALL WORKS' }
      : WORK_CATEGORIES.find(item => item.id === project.group),
    projects,
    position,
    previous: projects[position - 1],
    next: projects[position + 1],
  };
}

function projectDetailMarkup(project, projectIndex, showAllProjects = false) {
  const navigation = getProjectNavigation(project, showAllProjects);
  const nextProject = navigation.next;
  const orientationClass = `is-${project.orientation}`;
  const presentation = project.media;
  const palette = project.palette
    .map((color, index) => {
      const light = getLuminance(color) > 0.52;
      return `<span class="detail-swatch" style="--swatch:${color};--swatch-ink:${light ? "#101114" : "#f3f0e7"}">${['MAIN COLOR', 'SECONDARY', 'ACCENT'][index]}<br>${color.toUpperCase()}</span>`;
    })
    .join("");

  return `
    <section data-reader-section="01 / PROJECT" class="detail-hero detail-hero--${project.orientation}" data-index="${project.index}">
      <div class="detail-hero__copy">
        <p class="detail-kicker">${project.index} / ${project.category} / ${project.year}</p>
        <h2>${project.title}</h2>
        <p class="detail-hero__summary">${project.summary}</p>
        <ul class="detail-media-key" aria-label="이 프로젝트의 매체">
          ${project.media.map((media, index) => `<li><span>0${index + 1}</span>${media}</li>`).join("")}
        </ul>
        <dl class="detail-facts">
          <div><dt>Scope</dt><dd>${project.scope}</dd></div>
          <div><dt>Format</dt><dd>${project.format}</dd></div>
          <div><dt>Collection</dt><dd>SELECTED WORK</dd></div>
        </dl>
      </div>
      <div class="detail-presentation" aria-label="${project.category} 적용 예시">
        ${presentation.map((label, index) => `
          <figure class="detail-art-card ${orientationClass} detail-art-card--${index === 0 ? "primary" : "secondary"}" style="--art-tilt:${index === 0 ? (projectIndex % 2 ? "-1.7deg" : "1.5deg") : "0deg"}">
            <figcaption><span>0${index + 1}</span>${label}</figcaption>
            <canvas data-detail-art role="img" aria-label="${project.title} ${label} 미리보기"></canvas>
          </figure>`).join("")}
      </div>
    </section>



    <section class="detail-intro" data-reader-section="02 / CONCEPT">
      <div>
        <p class="detail-section-label">02 / CONCEPT + DECISIONS</p>
        <h3>${project.headline}</h3>
      </div>
      <div class="detail-intro__body">
        <div class="detail-intro__copy">
          ${project.briefTitle ? `<h4>${project.briefTitle}</h4>` : ''}
          <p>${project.brief}</p>
        </div>
        <div class="detail-intro__copy">
          ${project.conceptTitle ? `<h4>${project.conceptTitle}</h4>` : ''}
          <p>${project.concept}</p>
        </div>
      </div>
    </section>

    <section class="detail-system" data-reader-section="03 / DESIGN">
      <div>
        <p class="detail-section-label">03 / DESIGN · COLOR</p>
        <h3>COLOR &amp;<br>CHARACTER.</h3>
      </div>
      <div class="detail-system__right">
        <p>${project.system}</p>
        <div class="detail-palette">${palette}</div>
      </div>
    </section>

    <section class="detail-system detail-outcome" data-reader-section="04 / RESULT">
      <div>
        <p class="detail-section-label">04 / RESULT · EXPECTED EXPERIENCE</p>
        <h3>SEE.<br>FEEL.<br>ACT.</h3>
      </div>
      <div class="detail-system__right">
        <p>${project.effect}</p>
      </div>
    </section>

    ${project.orientation === 'detail' ? `<section class="detail-original" data-reader-section="05 / FULL PAGE"><details class="full-artwork"><summary>전체 상세페이지 펼쳐 보기 <span>FULL PAGE ↗</span></summary><img src="${project.imageSrc}" alt="${project.title} 전체 상세페이지" loading="lazy" decoding="async" /></details></section>` : ''}

    <nav class="detail-navigation" aria-label="${navigation.category.label} 작품 탐색">
      ${navigation.previous ? `<button type="button" data-detail-project="${navigation.previous.id}">← 이전 ${navigation.category.label} 작품<span>${navigation.previous.title}</span></button>` : `<p>${navigation.category.label}의 첫 번째 작품입니다.</p>`}
      <button type="button" data-detail-return>${navigation.category.label}로 돌아가기 ↗</button>
    </nav>
    <button type="button" class="detail-next" ${nextProject ? `data-detail-project="${nextProject.id}"` : 'data-detail-return'}>
      <small>${nextProject ? `NEXT / ${navigation.category.english} · ${String(navigation.position + 2).padStart(2, '0')} / ${String(navigation.projects.length).padStart(2, '0')}` : `${navigation.category.english} / 모든 작품을 감상했습니다`}</small>
      <strong>${nextProject ? nextProject.title : `BACK TO<br>${navigation.category.english}`}</strong>
      <span aria-hidden="true">↗</span>
    </button>`;
}

function getLuminance(hex) {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

const portfolioScene = new PortfolioScene();
portfolioScene.init();
