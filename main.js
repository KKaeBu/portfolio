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
    // dataset객체를 통해 data속성을 가져오기 위해서는 속성 이름의 data-뒷 부분을 사용한다
    // 각 속성은 문자열이며 읽거나 쓸 수 있다.
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

// 우선 프로젝트 카테고리 버튼들이 눌렸을때 눌린 버튼만 active 되고
/**
 * 내가 해본 버젼

// 나머지 버튼들은 unactive한 상태로 만들기
const categories = document.querySelector('.work__categories');
const projects = document.querySelector('.work__projects');

categories.addEventListener('click', (event) => {
    // Event 인터페이스의 target 속성은 이벤트가 발생한 대상 객체를 가리킵니다.
    // console.log(event.target)
    const target = event.target;
    const link = target.dataset.link;

    // 버튼이 아닌 다른 빈 여백을 눌렀을 경우엔 아무것도 하지 않음
    if(link == null) {
        return;
    }
    
    console.log(`link: ${link}`)

    // 각 카테코리별 버튼 클릭시 선택되지 않는 프로젝트들을 선별
    const Allproject = projects.querySelectorAll('.project');
    const project = projects.querySelectorAll(link);

    Allproject.forEach(element => {
        element.classList.remove('selected');
    });

    Allproject.forEach(element => {
        element.classList.add('unselected');
    });

    project.forEach(element => {
        element.classList.remove('unselected');
        element.classList.add('selected');
    });

});
*/

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
// project클래스를 가지고있는 쿼리 리스트가 전달됨
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    // const filter = e.target.dataset.filter;
    // console.log(filter);
    // 단, 이 때 버튼 옆의 숫자는 span 태그로 감싸져 있어서 눌러도 undefined이 뜰텐데
    // 이를 방지하기 위해 개발자 툴에서 source를 통해 디버깅을 하고
    // 해당 span 태그(e.target 활용)의 부모 노드의 filter 값을 가져오면 된다.
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

    if(filter == null) {
        return;
    }

    // 버튼 클릭시 project container 자체가 사라지는 효과를 넣기 위해
    projectContainer.classList.add('anim-out');

    /**
     * 이떄 문제점은 필터링이 이루어진후 애니메이션이 이루어지기에 좀 부자연 스러운 모습이 보인다
     * 이를 방지하기 위해 먼저 애니메이션이 일어난 후 다시 보여질떄 필터링이 이루어져야하기에
     * 아래의 코드를 setTimeout 함수 안으로 넣는다.
     */
    // 선택된 애들만 보이고 나머지는 안보이게
    // projects.forEach(project => {
    //     if(filter === '*' || filter === project.dataset.type) {
    //         project.classList.remove('invisible');
    //     }else {
    //         project.classList.add('invisible');
    //     }
    // });

    // 위의 foreach구문은 아래의 for문과 똑같다.
    // for(let project of projects){

    // }

    // animation out이 버튼이 클릭된 상태면 계속 out 된 상태로 남아있기 때문에
    // 일정 시간이 지난 후에는 이를 없애줘야댐
    // setTimeout함수 사용, 300ms가 지난 후에 우리가 지정한 함수를 불러달라는 의미
    setTimeout(() => {
        projects.forEach(project => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});




 
// functions
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}