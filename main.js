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
    // console.log(event.target.dataset.link);

    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: 'smooth' });
    scrollIntoView(link);
});

// 3. Scrolling when "contact me" button clicked
const homeContactMeBtn = document.querySelector('.home__contact');

homeContactMeBtn.addEventListener('click', (event) => {
    // console.log('button clicked');

    scrollIntoView('#contact');
});

// 4. Home opacity
// 스크롤을 내릴수록 홈 화면의 아이템들이 점점 투명해지도록함
const home = document.querySelector('.home__container');

// 높이를 가져오기 위한 함수사용
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(`homeHeight: ${homeHeight}`);

    // 스크롤이 가장 위에 있을때는 window.scrollY 값이 0 이고 내려갈수록 점점 커짐
    // opacity는 1일때 가장 불투명하고 0이하일떄 가장 투명하다.
    // console.log(1 - window.scrollY / homeHeight);

    // css에 opacity 적용하기
    home.style.opacity = 1 - window.scrollY / homeHeight;
    // 이 때 home 전체가 투명해지는것이 아니라 home 안에 컨텐츠들만 투명해지게 하기 위해
    // html코드의 home 안에 있는 코드들을 home__container라는 div로 한번 묶어줘서
    // 해당 컨테이너가 투명해지도록 한다.
});

// 5. Arrow up button
const arrowUpBtn = document.querySelector('.arrowUpBtn');

// 윈도우의 scroll 위치를 지정해주는 함수 window.scroll()
// option값인 top을 사용해 가장 위로 이동
arrowUpBtn.addEventListener('click', () => {
    // window.scroll({
    //     top,
    //     behavior: 'smooth'
    // });

    // 다른 방법으로는 우리가 만들어 놓은 함수를 사용해 home으로 이동
    scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUpBtn.classList.add('arrowUpBtn--display');
    }else{
        arrowUpBtn.classList.remove('arrowUpBtn--display');
    }

});

// 6. project selection



// functions
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}