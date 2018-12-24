$(document).ready(function() {

    const selectors = {
        teamItem1Text: $('.team-item-1 .team-item-text'),
        teamItem2Text: $('.team-item-2 .team-item-text'),
        teamItem3Text: $('.team-item-3 .team-item-text'),
        teamItem4Text: $('.team-item-4 .team-item-text'),
        teamItem5Text: $('.team-item-5 .team-item-text'),
        teamItem1Img: $('.team-item-1 .team-item-img'),
        teamItem2Img: $('.team-item-2 .team-item-img'),
        teamItem3Img: $('.team-item-3 .team-item-img'),
        teamItem4Img: $('.team-item-4 .team-item-img'),
        teamItem5Img: $('.team-item-5 .team-item-img'),
        eventDescr: $('.event-description'),
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

    $('.header-text').css('opacity', 1);
    
    $(window).on('scroll', function() {
        
        st = $(window).scrollTop();

        moveAndAnimateSectionTitleOnScroll(selectors.missionTitle, defaultOffsets.missionTitle, .7);
        moveAndAnimateSectionTitleOnScroll(selectors.projectsTitle, defaultOffsets.projectsTitle, .5);
        moveAndAnimateSectionTitleOnScroll(selectors.teamTitle, defaultOffsets.teamTitle, .3);
        moveAndAnimateSectionTitleOnScroll(selectors.eventTitle, defaultOffsets.eventTitle, .8);

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
                    $('.menu-burger').addClass('visible');
                    return;
                }
                setTimeout(function() {
                    animateByTurns(i + 1);
                }, interval)
            })(0)
        }, 500)
    }

    function moveAndAnimateSectionTitleOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if((st + wh) > selector.offset().top && st < selector.offset().top + selector.height()) {
            selector.css('transform', 'translateY(-'+ ((st + wh - defaultOffset) * (speedCoef || 1)) + 'px)');
            if(!selector.hasClass('showed') ) {
                selector.addClass('showed');
                animateTextShowing(selector.find('p:nth-child(2)'), 200);
            }
        }
    }

    function moveItemOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if((st + wh) > selector.offset().top && st < selector.offset().top + selector.height()) {
            $(selector).css('transform', 'translateY('+ (((st) + wh - defaultOffset  + 300) * (speedCoef || 1)) + 'px)');
        }
    }

});