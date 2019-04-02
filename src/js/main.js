(function ($) {

})(jQuery);

$(document).ready(function() {
    let
        modal = $('.modal'),
        modalContent = modal.find('.content'),
        pfImg = $('.col img'),
        formFields = $('.field'),
        err = $('.error'),
        good = $('.good'),
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
        if(!e.target.closest('img') && !e.target.closest('.contact-me') || !e.target.closest('form')) {
            modal.removeClass('active');
            modalContent.removeClass('active');
        }
    });

    $(modal).on('mousewheel', function(e) {
        e.preventDefault();
    });

    $('form').on('submit', function(e) {
        e.preventDefault();

        $.get({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            cache: false,
            success: function(res) {
                formFields.val('');
                formFields.blur();
                err.html('');
                good.html(res);
            },
            error: function(e) {
                good.html('');
                err.html(e.responseText);
            }
        })
    });

    formFields.on('focus', function() {
        $(this).siblings('span').addClass('active');
    });

    formFields.on('blur', function() {
        if($(this).val().length < 1) {
            $(this).siblings('span').removeClass('active');
        }
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

    (function() {
        if (!Element.prototype.matches) {

            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector;

        }

    })();

    (function() {
        if (!Element.prototype.closest) {

            Element.prototype.closest = function(css) {
                var node = this;

                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }

    })();
});