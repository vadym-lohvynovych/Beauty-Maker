$(document).ready(function() {

    $('html, body').smoothWheel();

    window.scrollTo(0, 0);

    animateTextShowing('.header-text', 20);

    const selectors = {
        teamItem1Img: $('.team-item-1 .team-item-img'),
        teamItem2Img: $('.team-item-2 .team-item-img'),
        teamItem3Img: $('.team-item-3 .team-item-img'),
        teamItem4Img: $('.team-item-4 .team-item-img'),
        teamItem5Img: $('.team-item-5 .team-item-img'),

        teamItem1text: $('.team-item-1 .team-item-text'),
        teamItem2text: $('.team-item-2 .team-item-text'),
        teamItem3text: $('.team-item-3 .team-item-text'),
        teamItem4text: $('.team-item-4 .team-item-text'),
        teamItem5text: $('.team-item-5 .team-item-text'),

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

    $(window)
        .on('scroll', function() {
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

            // moveItemOnScroll(selectors.projectsLetter, defaultOffsets.projectsLetter, .1);
            // moveItemOnScroll(selectors.teamLetter, defaultOffsets.teamLetter, .26);
            // moveItemOnScroll(selectors.eventLetter, defaultOffsets.eventLetter, -.2);

            showItem(selectors.projectsLetter, 500);
            showItem(selectors.eventLetter, 500);
            showItem(selectors.missionImg, 100);

            showItem(selectors.teamItem1text, 100);
            showItem(selectors.teamItem2text, 100);
            showItem(selectors.teamItem3text, 100);
            showItem(selectors.teamItem4text, 100);
            showItem(selectors.teamItem5text, 100);

            showItem($('.event-description h3'), 100);
            showItem($('.event-description p:first'), 100);
            showItem($('.event-description p:last'), 100);
        })
        .on('resize', function() {
            wh = $(window).height();
        });

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
                    setTimeout(function() {
                        $('.logo').addClass('visible');
                        $('.video-wrapper').addClass('visible');
                    }, 700);
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

    function showItem(item, additionalOffset) {
        if(item.offset().top + item.height() / 2 < st + wh) item.addClass('visible');

    }


});