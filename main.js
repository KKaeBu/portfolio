// 처음 시작할떄는 use strict를 통해 실수 할 수 있는 부분을
// 미연에 방지 (자세한 내용은 구글 검색)
'use strict';

// 1. Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// MDN: Window.scrollY 를 통해 스크롤된 높이를 알아냄
// scroll이 될 때 마다 우리가 블럭 안에서 작성한 코드들이 실행되도록 
// 이벤트 리스터를 등록한다.
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(`navbarHeight: ${navbarHeight}`);
    // 윈도우의 스크롤이 navbar높이 이상으로 지나가게 되면 navbar색상을 진하게함
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }else {
        // 그렇지 않다면 어두워지게하는 클래스 추가한걸 없애줌
        navbar.classList.remove('navbar--dark');
    }
});

// 2. Scrolling when navbar items clicked
const navbarMenu = document.querySelector('.navbar__menu');
// navbar item 클릭시 이벤트 리스너 작성(보통은 클릭시 인자로 event가 들어옴)
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    // 우리가 원하는 데이터가 아닌 아이템 클릭시 undefined가 나오는데
    // 이를 처리하기 위해 아래의 구문 사용
    if(link == null){
        return;
    }
    console.log(event.target.dataset.link);

    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
});