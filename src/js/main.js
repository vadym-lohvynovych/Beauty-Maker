$(document).ready(function() {

    let defaultOffsets = {
        missionTitle: $('.mission-title').offset().top,
        projectsTitle: $('.projects-title').offset().top,
        teamTitle: $('.team-title').offset().top,
        eventTitle: $('.event-title').offset().top,
        projectsLetter: $('.projects-letter').offset().top,
        eventLetter: $('.event-letter').offset().top,
        missionImg: $('.mission-img').offset().top,
        teamItem1Img: $('.team-item-1 .team-item-img').offset().top,
        teamItem2Img: $('.team-item-2 .team-item-img').offset().top,
        teamItem3Img: $('.team-item-3 .team-item-img').offset().top,
        teamItem4Img: $('.team-item-4 .team-item-img').offset().top,
        teamItem5Img: $('.team-item-5 .team-item-img').offset().top

    };
    let titlesAnimated = {
        '.mission-title': false,
        '.projects-title': false,
        '.team-title': false,
        '.event-title': false
    };

    
    $(window).on('scroll', function() {
        showTeamItemHeader('.team-item-1 .team-item-text');
        showTeamItemHeader('.team-item-2 .team-item-text');
        showTeamItemHeader('.team-item-3 .team-item-text');
        showTeamItemHeader('.team-item-4 .team-item-text');
        showTeamItemHeader('.team-item-5 .team-item-text');

        moveHeader();
        moveAndAnimateSectionTitleOnScroll('.mission-title', defaultOffsets.missionTitle, .7);
        moveAndAnimateSectionTitleOnScroll('.projects-title', defaultOffsets.projectsTitle, .5);
        moveAndAnimateSectionTitleOnScroll('.team-title', defaultOffsets.teamTitle, .2);
        moveAndAnimateSectionTitleOnScroll('.event-title', defaultOffsets.eventTitle, .8);

        moveItemOnScroll('.mission-img', defaultOffsets.missionImg, .15);
        moveItemOnScroll('.team-item-1 .team-item-img', defaultOffsets.teamItem1Img, -.15);
        moveItemOnScroll('.team-item-2 .team-item-img', defaultOffsets.teamItem2Img, .1);
        moveItemOnScroll('.team-item-3 .team-item-img', defaultOffsets.teamItem3Img, -.1);
        moveItemOnScroll('.team-item-4 .team-item-img', defaultOffsets.teamItem4Img, .2);
        moveItemOnScroll('.team-item-5 .team-item-img', defaultOffsets.teamItem5Img, -.2);

        moveLettersOnScroll('.projects-letter', defaultOffsets.projectsLetter, .15);
        moveLettersOnScroll('.team-letter', defaultOffsets.projectsLetter, .2);
        moveLettersOnScroll('.event-letter', defaultOffsets.eventLetter, -.2);
    });

    animateTextShowing('.header-text', 40);

    
    function showTeamItemHeader(selector) {
        if($(window).scrollTop() + $(window).height() > $(selector).offset().top) {
            if(!$(selector).hasClass('visible')) {
                $(selector).addClass('visible');
                animateTextShowing($(selector).find('h3'), 50);
            }
        }
    }

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

    function moveHeader() {
        if($(window).scrollTop() < 500) {
            $('header').css({
                'transform': 'translateY(-' + $(window).scrollTop() * .5 + 'px)',
                'opacity': 1 - $(window).scrollTop() / 300
            });
        }
    }

    function moveAndAnimateSectionTitleOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if(($(window).scrollTop() + $(window).height()) > $(selector).offset().top && $(window).scrollTop() < $(selector).offset().top + $(selector).height()) {
            $(selector).css('transform', 'translateY(-'+ (($(window).scrollTop() + $(window).height() - defaultOffset) * (speedCoef || 1)) + 'px)');
            if(!$(selector).hasClass('showed') && !titlesAnimated[selector]) $(selector).addClass('showed');
        }
        if($(selector).hasClass('showed') && !titlesAnimated[selector]) {
            titlesAnimated[selector] = true;
            animateTextShowing($(selector).find('p:nth-child(2)'), 200);
        }
    }

    function moveItemOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if(($(window).scrollTop() + $(window).height()) > $(selector).offset().top && $(window).scrollTop() < $(selector).offset().top + $(selector).height()) {
            $(selector).css('transform', 'translateY('+ ((($(window).scrollTop()) + $(window).height() - defaultOffset  + 300) * (speedCoef || 1)) + 'px)');
        }
    }

    function moveLettersOnScroll(selector, defaultOffset, speedCoef) {
        //if block is on screen
        if(($(window).scrollTop() + $(window).height()) > $(selector).offset().top && $(window).scrollTop() < $(selector).offset().top + $(selector).height()) {
            $(selector).css('transform', 'translate(-50%,'+ ((($(window).scrollTop()) + $(window).height() - defaultOffset  + 300) * (speedCoef || 1)) + 'px)');
        }
    }

});