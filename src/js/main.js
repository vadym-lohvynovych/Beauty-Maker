$(document).ready(function() {




    // $('body').smoothWheel();


    // $('body').bind('mousewheel', function (e) {
    //     e.preventDefault();
    //     if (!(e.originalEvent.wheelDelta == 120)) {
    //         var top = parseInt($(".content").css("top"));
    //         $(".content").css("top", (top - 100) + "px");
    //         top = parseInt($(".content").css("top"));
    //         if (top <= -500) {
    //             setTimeout(function () {
    //                 $("body").css("top", "-500px");
    //             }, 100);
    //         }
    //     } else {
    //         console.log('--->', 2);
    //         var top = parseInt($(".content").css("top"));
    //
    //         $(".content").css("top", (top + 100) + "px");
    //         top = parseInt($(".content").css("top"));
    //         if (top >= 0) {
    //             setTimeout(function () {
    //                 $(".content").css("top", "0");
    //             }, 100);
    //         }
    //     }
    // });

    const selectors = {
        teamItem1Img: $('.team-item-1 .team-item-img'),
        teamItem2Img: $('.team-item-2 .team-item-img'),
        teamItem3Img: $('.team-item-3 .team-item-img'),
        teamItem4Img: $('.team-item-4 .team-item-img'),
        teamItem5Img: $('.team-item-5 .team-item-img'),
        missionTitle: $('.mission-title'),
        projectsTitle: $('.projects-title'),
        teamTitle: $('.team-title'),
        eventTitle: $('.event-title'),
        projectsLetter: $('.projects-letter'),
        teamLetter: $('.team-letter'),
        eventLetter: $('.event-letter'),
        missionImg: $('.mission-img'),
    };

    let defaultOffsets = {
        missionTitle: selectors.missionTitle.offset().top,
        projectsTitle: selectors.projectsTitle.offset().top,
        teamTitle: selectors.teamTitle.offset().top,
        eventTitle: selectors.eventTitle.offset().top,
        projectsLetter: selectors.projectsLetter.offset().top,
        eventLetter: selectors.eventLetter.offset().top,
        teamLetter: selectors.teamLetter.offset().top,
        missionImg: selectors.missionImg.offset().top,
        teamItem1Img: selectors.teamItem1Img.offset().top,
        teamItem2Img: selectors.teamItem2Img.offset().top,
        teamItem3Img: selectors.teamItem3Img.offset().top,
        teamItem4Img: selectors.teamItem4Img.offset().top,
        teamItem5Img: selectors.teamItem5Img.offset().top
    };

    let st = 0,
        wh = $(window).height();

    //remove blick when page loading
    $('.header-text').css('opacity', 1);

    $(window).on('scroll', function() {
        st = $(window).scrollTop();
        moveItemOnScroll(selectors.missionTitle, defaultOffsets.missionTitle, -.5);
        moveItemOnScroll(selectors.projectsTitle, defaultOffsets.projectsTitle, -.4);
        moveItemOnScroll(selectors.teamTitle, defaultOffsets.teamTitle, -.3);
        moveItemOnScroll(selectors.eventTitle, defaultOffsets.eventTitle, -.4);
        moveItemOnScroll(selectors.missionImg, defaultOffsets.missionImg, .15);

        moveItemOnScroll(selectors.teamItem1Img, defaultOffsets.teamItem1Img, .1);
        moveItemOnScroll(selectors.teamItem2Img, defaultOffsets.teamItem2Img, .2);
        moveItemOnScroll(selectors.teamItem3Img, defaultOffsets.teamItem3Img, -.13);
        moveItemOnScroll(selectors.teamItem4Img, defaultOffsets.teamItem4Img, .2);
        moveItemOnScroll(selectors.teamItem5Img, defaultOffsets.teamItem5Img, -.2);

        moveItemOnScroll(selectors.projectsLetter, defaultOffsets.projectsLetter, .2);
        moveItemOnScroll(selectors.teamLetter, defaultOffsets.teamLetter, .26);
        moveItemOnScroll(selectors.eventLetter, defaultOffsets.eventLetter, -.2);
    }).on('resize', function() {
        wh = $(window).height();
    });

    animateTextShowing('.header-text', 40);

    function animateTextShowing(selector, interval) {
        
        let text = $(selector).html().split(''),
            textList =  '';
        
        text.forEach(function(letter) {
            if(letter === ' ') {
                textList += '<li style="width: 1.3vw"> </li>';
                return;
            }
            textList += '<li>' + letter + '</li>';
        });

        $(selector).html('<ul>' + textList + '</ul>');
        
        let items = $(selector).find('li');

        setTimeout(function() {
            (function animateByTurns(i) {
                $(items[i]).addClass('visible');
                if(i === items.length) {
                    $('header .logo').addClass('visible');
                    $('header video').addClass('visible');
                    return;
                }
                setTimeout(function() {
                    animateByTurns(i + 1);
                }, interval)
            })(0)
        }, 500)
    }

    function moveItemOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if((st + wh + 100) > selector.offset().top && st < selector.offset().top + selector.height()) {
            selector.css('transform', 'translateY('+ ((st + wh - defaultOffset  + 300) * (speedCoef || 1)) + 'px)');
        }
    }

});