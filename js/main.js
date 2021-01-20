$(function () { // jQB //////////////////////////////
    console.log("로딩완료!");

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

    /*a링크 마우스 오버시 색채우기*/
    $("a,.ham, button").hover(
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
    console.log("슬라이드개수:" + scnt);
    /////////////////////////////////

    var goSlide = function (dir) {

        console.log("광클금지상태:" + sprot);

        /// 광클 금지 설정 ///////////////////
        if (sprot === 1) return false;
        sprot = 1; // 잠금
        setTimeout(function () {
            sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
        }, 800); ///// 타임아웃 ///////////
        ////////////////////////////////////


        //dir-방향(0-왼쪽, 1-오른쪽)
        console.log("이동방향:" + dir);

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
        var $clicked = $(this);
        var $slider = $(this).closest('.slider');

        var index = $(this).index();
        var isLeft = index == 0;
        //console.log(index);

        var $current = $slider.find(' > .slides > .bn.active');
        var $post;

        if (isLeft) {
            $post = $current.prev();
        } else {
            $post = $current.next();
        }
        //console.log($post.length);

        if ($post.length == 0) {
            if (isLeft) {
                $post = $slider.find(' > .slides > .bn:last-child');
            } else {
                $post = $slider.find(' > .slides > .bn:first-child');
            }
        }

        $current.removeClass('active');
        $post.addClass('active');

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
        var totalSlideNo = $('.main-bn > .slider').attr('data-slide-total');
        var currentSlideNo = $('.main-bn > .slider > .slides > .bn.active').attr('data-slide-no');

        $('.main-bn > .slider > .page-btns > .page-no > .total-slide-no').html(totalSlideNo);
        $('.main-bn > .slider > .page-btns > .page-no > .current-slide-no').html(currentSlideNo);
    };

    updateCurrentPageNumber()









}); // jQB ///////////////////////////////////////////////////
