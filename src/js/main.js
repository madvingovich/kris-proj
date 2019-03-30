(function ($) {
    let
        modal = $('.modal'),
        modalContent = modal.find('.content'),
        pfImg = $('.photo img'),
        serImg = $('.service-item img');

    makePfImagesHeight.call(pfImg);
    makePfImagesHeight.call(serImg);


    if($('.main').hasClass('active')) {
        $(window).on('resize', function() {
            makePfImagesHeight.call(pfImg)
        });
    } else if($('.services').hasClass('active')) {
        $(window).on('resize', function() {
            makePfImagesHeight.call(serImg)
        });
    }

    pfImg.on('click', function(e) {
        openModal(e);
    });
    $('.service-item').on('click',function(e) {
        openModal(e);
    });

    modal.on('click', function(e) {
        if(!e.target.closest('img') && !e.target.closest('.contact-me')) {
            modal.removeClass('active');
            modalContent.removeClass('active');
        }
    });
    
    $(modal).on('mousewheel', function(e) {
        e.preventDefault();
    });



    function openModal(e) {
        if($(window).width() < 450 && e.target.closest('.photo')) return;
        modal.addClass('active');
        if(e.target.closest('.photo')) {
            modalContent.find('img').attr('src', $(e.target).attr('src'));
        }
        setTimeout(function() {
            modalContent.addClass('active')
        }, 120);
    }

    function makePfImagesHeight() {
        this.height(this.width() * .573);
    }
})(jQuery);