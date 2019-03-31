(function ($) {
    let
        modal = $('.modal'),
        modalContent = modal.find('.content'),
        pfImg = $('.col img'),
        serImg = $('.service-item img');

    makePfImagesHeight.call(serImg);


    if($('.services').hasClass('active')) {
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
        modal.addClass('active');
        if(e.target.closest('.col img')) {
            modalContent.find('img').attr('src', $(e.target).attr('src'));
        }
        setTimeout(function() {
            modalContent.addClass('active')
        }, 120);
    }

    function makePfImagesHeight() {
        this.height(this.width() * .7);
    }
})(jQuery);