$(function () { // jQB //////////////////////////////
    console.log("로딩완료!");


    // 부드러운 스크롤 함수 호출!
    startSS();








    /*마우스 커서*/
    $("body").mousemove(function (e) {
        var posx = e.pageX - 5;
        var posy = e.pageY - 5;
        //console.log("x축:"+posx+"\ny축:"+posy);

        $("#cursor").css({
            top: posy + "px",
            left: posx + "px"
        });



    }); //////////////// mousemove ///////////////



    /*메뉴창************************************/
    $(".ham").click(function () {
        $(this).toggleClass("toggle");
        $(".mwrap").toggleClass("down");
        $("body").toggleClass("bodyYhd");
        
    $(".bodyYhd").on('scroll touchmove mousewheel', function () {

        return false;

    })
        
    });
    

    



    /*메뉴리스트 클릭시 메뉴창 닫기*/
    var mlist = $(".mwrap > nav > ul > li > a");

    mlist.click(function () {
        $(".ham").removeClass("toggle");
        $(".mwrap").removeClass("down");
        $("body").removeClass("bodyYhd");
        $(".bodyYhd").off('scroll touchmove mousewheel'); 
    });






        /*예약아이콘 클릭시 예약창 보이기*/
        $("#resbtn").click(function (e) {
            e.preventDefault();
            $(".res_modal").fadeIn(500);
           $("body").addClass("bodyYhd");
             $(".bodyYhd").on('scroll touchmove mousewheel', function () {

        return false;

    })
        });


    /*예약모달창 닫기버튼 클릭시 예약모달창 닫기 */
    $(".modal_cbtn").click(function (e) {
        e.preventDefault();
        $(".res_modal").fadeOut(500);
        $("body").removeClass("bodyYhd");
    });



    /*성인 up아이콘 클릭시 숫자증가*******/
    $('.upIcon1').click(function (e) {

        e.preventDefault();
        var plus = $('.count1').text();
        var num = parseInt(plus, 10);

        num++;


        $('.count1').text(num);
        console.log(plus);
    });

    /*성인 down아이콘 클릭시 숫자감소*******/
    $('.downIcon1').click(function (e) {

        e.preventDefault();
        var plus = $('.count1').text();
        var num = parseInt(plus);

        num--;


        $('.count1').text(num);
        //console.log(plus);
        if (num < 0) {

            alert("한명부터가능합니다.")
            $('.count1').text("1")
        }
    });

    /*어린이 up아이콘 클릭시 숫자증가*******/
    $('.upIcon2').click(function (e) {

        e.preventDefault();
        var plus = $('.count2').text();
        var num = parseInt(plus, 10);

        num++;


        $('.count2').text(num);
        //console.log(plus);
    });


    /*어린이 down아이콘 클릭시 숫자감소*******/
    $('.downIcon2').click(function (e) {

        e.preventDefault();
        var plus = $('.count2').text();
        var num = parseInt(plus);

        num--;


        $('.count2').text(num);
        console.log(plus);
        if (num < 0) {

            alert("한명부터가능합니다.")
            $('.count2').text("0")
        }
    });



    /*지도에 마우스 오버시 커서 바꾸기*/
    $("iframe").mouseenter(function () {
        //console.log("커서올라감?")
        $("#cursor").css({
            display: "none"
        });
    });

    $("iframe").mouseleave(function () {
        $("#cursor").css({
            display: "block"
        });
    });





    /*a링크 마우스 오버시 색채우기*/
    $("a,.ham, button, select, .date, .modal_cbtn").hover(
        function () { // 오버시
            //console.log("호버");
            $(".cursor").addClass("curfill");
        },
        function () { // 아웃시
            $(".cursor").removeClass("curfill");
        }); // hover ///////////////////////////////////



    // 배너영역 /////////////////////////////////////
    // 배너이미지 이동 대상: 배너박스(.slide)
    var tg = $(".slide");


    /* ///////////////////////////////////////////
    함수명: goSlide
    기능: 슬라이드 방향별 이동
    */ ///////////////////////////////////////////

    // 광클금지 변수
    var sprot = 0; //0-허용, 1-금지
    // 슬라이드 순번 변수
    var sno = 0;
    // 슬라이드 개수 변수
    var scnt = tg.find("li").length;
    //console.log("슬라이드개수:" + scnt);
    /////////////////////////////////

    var goSlide = function (dir) {

        //console.log("광클금지상태:" + sprot);

        /// 광클 금지 설정 ///////////////////
        if (sprot === 1) return false;
        sprot = 1; // 잠금
        setTimeout(function () {
            sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
        }, 800); ///// 타임아웃 ///////////
        ////////////////////////////////////


        //dir-방향(0-왼쪽, 1-오른쪽)
        //console.log("이동방향:" + dir);

        // 오른쪽 전달값이 1이므로 true
        if (dir) {
            $(".slide").animate({
                left: "-100%"
            }, 800, function () {
                $(this).append($(">li", this).first())
                    .css({
                        left: "0"
                    });
            });
            //슬라이드 순번증가
            sno++;
            if (sno === scnt) sno = 0; //한계수(처음으로)

        } // if ///////////////////

        // 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {
            $(".slide").prepend($(".slide>li").last()).css({
                left: "-100%"
            });
            $(".slide").delay(100).animate({
                left: "0"
            }, 800);

            // 슬라이드 개수 감소
            sno--;
            if (sno === -1) sno = scnt - 1; // 한계수(마지막 번호로)

        } // else //////////////////

        // 슬라이드 번호변경
        $(".now_num").text("0" + (sno + 1));



    }; //////////////// goSlide함수 /////////////////////
    ////////////////////////////////////////////////////


    /* ///////////////////////////////////////////
        함수명: autoCall
        기능: 자동호출 기능
    */ ///////////////////////////////////////////
    var autoI; //인터발용 변수
    var autoCall = function () {
        // console.log("자동넘김!");

        // 4초간격으로 슬라이드함수 호출
        autoI = setInterval(function () {
            goSlide(1);
        }, 4000); /////// 인터발함수 /////////        

    }; //////////////// autoCall 함수 /////////////////////
    //////////////////////////////////////////////////////

    /* ///////////////////////////////////////////
        함수명: clearAuto
        기능: 자동넘김 지우기
    */ ///////////////////////////////////////////
    var autoT; //타임아웃용 변수
    var clearAuto = function () {
        //console.log("자동지워!");

        // 인터발 지우기
        clearInterval(autoI);
        // 타임아웃지우기(실행쓰나미 방지)
        clearTimeout(autoT);

        //재실행 호출 세팅(3초 후 한번실행 세팅)
        autoT = setTimeout(autoCall, 3000);

    }; //////////////// clearAuto 함수 /////////////////////
    /////////////////////////////////////////////////////



    //// 자동넘김함수 호출!
    autoCall();



    /// 오른쪽버튼 클릭시 갤러리박스 맨앞 이미지 맨뒤로 이동!
    $(".right_btn").click(function (e) {
        //console.log("오른쪽!");
        e.preventDefault();
        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(1); // 오른쪽 전달값은 1

    }); /////// click ///////////


    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤 이미지 맨앞로 이동!
    $(".left_btn").click(function (e) {
        //console.log("왼쪽!");
        e.preventDefault();
        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(0); // 왼쪽 전달값은 0

    }); /////// click ///////////



    /*메뉴영역*******************************************/
    $(".menu_box li").mouseenter(function () {
        $(this).find("figure").addClass("menu_hover");
    });

    $(".menu_box li").mouseleave(function () {
        $(this).find("figure").removeClass("menu_hover");
    });




    /*룸영역************************************************/

    // 세번째 홀영역 박스 배너돌리기
    $('.main-bn > .slider > .page-btns > .page-btn').click(function () {
        var clicked = $(this);
        var slider = $(this).closest('.slider');

        var index = $(this).index();
        var isLeft = index == 0;
        //console.log(index);

        var current = slider.find(' > .slides > .bn.active');
        var post;

        if (isLeft) {
            post = current.prev();
        } else {
            post = current.next();
        }
        //console.log($post.length);

        if (post.length == 0) {
            if (isLeft) {
               post = slider.find(' > .slides > .bn:last-child');
            } else {
                post = slider.find(' > .slides > .bn:first-child');
            }
        }

        current.removeClass('active');
        post.addClass('active');

        updateCurrentPageNumber();
    });

    setInterval(function () {

        $('.main-bn > .slider > .page-btns > .next-btn').click();
    }, 8000);

    // 슬라이더 페이지 번호 지정
    function pageNumber__Init() {
        // 전채 배너 페이지 갯수 세팅해서 .slider 에 'data-slide-total' 넣기
        var totalSlideNo = $('.main-bn > .slider > .slides > .bn').length;
        //console.log(totalSlideNo);

        $('.main-bn > .slider').attr('data-slide-total', totalSlideNo);

        // 각 배너 페이지 번호 매기기
        $('.main-bn > .slider > .slides > .bn').each(function (index, node) {

            $(node).attr('data-slide-no', index + 1);
        });
    };

    pageNumber__Init();

    // 슬라이더 이동시 페이지 번호 변경
    function updateCurrentPageNumber() {

        // 총슬라이드 개수
        var totalSlideNo = $('.main-bn > .slider').attr('data-slide-total');
        // 넘어가는 슬라이드 번호
        var currentSlideNo = $('.main-bn > .slider > .slides > .bn.active').attr('data-slide-no');
        //console.log(currentSlideNo);

        $('.main-bn > .slider > .page-btns > .page-no > .total-slide-no').html(totalSlideNo);
        $('.main-bn > .slider > .page-btns > .page-no > .current-slide-no').html(currentSlideNo);


    };

    updateCurrentPageNumber();








    /// 스크롤액션 셋팅 /////////////////////////////////////////
    // value위치값 셋팅
    tgpos[0] = $("#value").offset().top;
    //console.log("value영역위치값:" + tgpos[0]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[0] = tgpos[0] - winH / 2



    // 메뉴위치값 셋팅
    tgpos[1] = $(".menu_txt").offset().top;
    //console.log("메뉴txt위치값:" + tgpos[1]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[1] = tgpos[1] - winH / 2



    // 셰프위치값 셋팅 -1
    tgpos[2] = $(".chef_txt").offset().top;
    //console.log("셰프txt위치값:" + tgpos[2]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[2] = tgpos[2] - winH / 2



    // 셰프위치값 셋팅 -2
    tgpos[3] = $(".chef2").offset().top;
    //console.log("셰프txt위치값:" + tgpos[2]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[3] = tgpos[3] - winH / 2



    // 룸위치값 셋팅
    tgpos[4] = $(".room_txt").offset().top;
    //console.log("룸txt위치값:" + tgpos[4]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[4] = tgpos[4] - winH / 2


    // 맵위치값 셋팅
    tgpos[5] = $(".map_txt").offset().top;
    console.log("룸txt위치값:" + tgpos[5]);

    // 시작기준값을 계산함!(원래위치값 - 윈도우절반)
    tgpos[5] = tgpos[5] - winH / 2






}); // jQB ///////////////////////////////////////////////////







// 스크롤액션 /////////////////////////////////////////////////////
// 윈도우 보이는 화면 (윈도우 높이값)
var winH = $(window).height();
// 보이는 화면의 반 또는 어떤 비율만큼 위치값에서 뺀다!

// 위치값 변수(여러개의 위치를 담는 목적)
var tgpos = [];

$(window).scroll(function () {

    // 현재 스크롤 위치값
    var scTop = $(this).scrollTop();
    //console.log("스위:"+scTop);

    // value 영역 스크롤액션!
    if (scTop > tgpos[0] - 500 &&
        scTop < tgpos[0]) {
        //console.log("움직여!");
        $("#value").css({
            bottom: "0",
            opacity: "1"
        })


    } // if //////////////////////////////
    // 메뉴 영역 스크롤액션!
    else if (scTop > tgpos[1] - 500 &&
        scTop < tgpos[1]) {
        //console.log("움직여!");
        $(".menu_txt").css({
            bottom: "0",
            opacity: "1"
        })
        $(".menu_box").css({
            bottom: "0",
            opacity: "1"
        })




    } // esle if ///////////////////////
    // 셰프 영역 스크롤액션! - 첫번째
    else if (scTop > tgpos[2] - 600 &&
        scTop < tgpos[2]) {
        //console.log("셰프1움직여!");
        $(".chef_txt").css({
            bottom: "0",
            opacity: "1"
        })
        $(".chef1").css({
            bottom: "0",
            opacity: "1"
        })




    } // esle if ///////////////////////
    // 셰프 영역 스크롤액션! - 두번째
    else if (scTop > tgpos[3] - 600 &&
        scTop < tgpos[3]) {
        //console.log("셰프2움직여!");
        $(".chef2").css({
            bottom: "0",
            opacity: "1"
        })



    } // esle if ///////////////////////
    // 룸 영역 스크롤액션!
    else if (scTop > tgpos[4] - 600 &&
        scTop < tgpos[4]) {
        //console.log("룸움직여!");
        $(".room_txt").css({
            bottom: "0",
            opacity: "1"
        })
        $(".roomlist").css({
            bottom: "0",
            opacity: "1"
        })



    } // esle if ///////////////////////
    // 맵 영역 스크롤액션!
    else if (scTop > tgpos[5] - 600 &&
        scTop < tgpos[5]) {
        console.log("맵움직여!");
        $(".map_txt").css({
            bottom: "0",
            opacity: "1"
        })
        $(".map_box").css({
            bottom: "0",
            opacity: "1"
        })



    } // esle if ///////////////////////


}); ////////// scroll /////////////////////////
//////////////////////////////////////////////
