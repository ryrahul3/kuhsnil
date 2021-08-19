(function ($) {
  'use strict';
  var Solar = {
    initialised: false,
    version: 1.0,
    Solar: false,
    init: function () {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }

      // Functions Calling

      this.blog_slider();
      this.testimonial_slider();
      this.ke_click();
      this.ke_toggle();
      this.ke_checkout();
      this.ke_subMenu();
      this.ke_checkout_two();
      this.ke_checkout_three();
      this.Video_popup();
      this.s_graph();
      this.counter();
      this.counter_two();
      this.product();
    },
    // ---------------blog-----------------------------
    blog_slider: function () {
      var swiper = new Swiper('.ke_section_eight .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: true,
        speed: 1000,
        autoplay: {
          delay: 2000,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    },
    // --------team----------
    testimonial_slider: function () {
      var swiper = new Swiper('.ke_testimonial .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: true,
        speed: 1000,
        autoplay: {
          delay: 2000,
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },
    // ---------search---------
    ke_click: function () {
      $('.ke_search_main').click(function (e) {
        e.stopPropagation();
        $('.ke_search_input').toggleClass('ke_open_search');
      });
      $('body').on('click', function () {
        $('.ke_search_input').removeClass('ke_open_search');
      });
      $('.ke_search_input').click(function (event) {
        event.stopPropagation();
      });
    },
    // --------menu bar----------
    ke_toggle: function () {
      $('.ke_menu_bar').on('click', function () {
        $('.ke_menu').toggleClass('ke_toggle');
      });
    },
    // --------checkout bar----------
    ke_checkout: function () {
      $('.show_c_one').on('click', function (e) {
        e.preventDefault();
        $('.show_cart_one').addClass('show_checkout_page');
      });
    },
    // --------checkout bar----------
    ke_checkout_two: function () {
      $('.show_c_two').on('click', function (e) {
        e.preventDefault();
        $('.show_cart_two').addClass('show_checkout_page');
      });
    },
    // --------checkout bar----------
    ke_checkout_three: function () {
      $('.show_c_three').on('click', function (e) {
        e.preventDefault();
        $('.show_cart_three').addClass('show_checkout_page');
      });
    },
    // --------checkout bar----------
    ke_subMenu: function () {
      $('.ke_menuP').on('click', function () {
        $(this).toggleClass('show_subMenu');
      });
    },
    // ---------video popup---------
    Video_popup: function () {
      $('.ke_about_img .ke_video_popup').magnificPopup({
        type: 'iframe',
        iframe: {
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: function (url) {
                return url;
              },
              src: '%id%',
            },
            vimeo: {
              index: 'vimeo.com/',
              id: function (url) {
                return url;
              },
              src: '%id%',
            },
          },
        },
      });
    },

    // ---------graph---------

    s_graph: function () {
      if ($('.ke_about').length > 0) {
        // Graph Data
        var graphData = [
          {
            // Suppliers
            data: [
              [6, 1300],
              [7, 1600],
              [8, 1900],
              [9, 2100],
              [10, 2500],
              [11, 2200],
              [12, 2000],
              [13, 1950],
              [14, 1900],
              [15, 2000],
            ],
            color: '#ad7cff',
          },
          {
            // Seller
            data: [
              [6, 500],
              [7, 600],
              [8, 550],
              [9, 600],
              [10, 800],
              [11, 900],
              [12, 800],
              [13, 850],
              [14, 830],
              [15, 1000],
            ],
            color: '#56dcf0',
            points: { radius: 4, fillColor: '#fff' },
          },
        ];

        // Lines Graph
        $.plot($('#graph-lines'), graphData, {
          series: {
            points: {
              show: true,
              radius: 5,
            },
            lines: {
              show: true,
            },
            shadowSize: 0,
          },
          grid: {
            color: '#646464',
            borderColor: 'transparent',
            borderWidth: 20,
            hoverable: true,
          },
          xaxis: {
            tickColor: 'transparent',
            tickDecimals: 2,
          },
          yaxis: {
            tickSize: 1000,
          },
        });

        // Bars Graph
        $.plot($('#graph-bars'), graphData, {
          series: {
            bars: {
              show: true,
              barWidth: 0.9,
              align: 'center',
            },
            shadowSize: 0,
          },
          grid: {
            color: '#646464',
            borderColor: 'transparent',
            borderWidth: 20,
            hoverable: true,
          },
          xaxis: {
            tickColor: 'transparent',
            tickDecimals: 2,
          },
          yaxis: {
            tickSize: 1000,
          },
        });

        // Graph Toggle
        $('#graph-bars').hide();

        $('#lines').on('click', function (e) {
          $('#bars').removeClass('active');
          $('#graph-bars').fadeOut();
          $(this).addClass('active');
          $('#graph-lines').fadeIn();
          e.preventDefault();
        });

        $('#bars').on('click', function (e) {
          $('#lines').removeClass('active');
          $('#graph-lines').fadeOut();
          $(this).addClass('active');
          $('#graph-bars').fadeIn().removeClass('hidden');
          e.preventDefault();
        });

        // Tooltip
        function showTooltip(x, y, contents) {
          $('<div id="tooltip">' + contents + '</div>')
            .css({
              top: y - 16,
              left: x + 20,
            })
            .appendTo('body')
            .fadeIn();
        }

        var previousPoint = null;

        $('#graph-lines, #graph-bars').bind(
          'plothover',
          function (event, pos, item) {
            if (item) {
              if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                $('#tooltip').remove();
                var x = item.datapoint[0],
                  y = item.datapoint[1];
                showTooltip(
                  item.pageX,
                  item.pageY,
                  y + ' suppliers at ' + x + '.00h'
                );
              }
            } else {
              $('#tooltip').remove();
              previousPoint = null;
            }
          }
        );
      }
    },
    // --------counter----------
    counter: function () {
      if ($('.ke_about_counter').length > 0) {
        var a = 0;
        $(window).scroll(function () {
          var oTop = $('#counter').offset().top - window.innerHeight;
          if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function () {
              var $this = $(this),
                countTo = $this.attr('data-count');
              $({
                countNum: $this.text(),
              }).animate(
                {
                  countNum: countTo,
                },

                {
                  duration: 5000,
                  easing: 'swing',
                  step: function () {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                  },
                }
              );
            });
            a = 1;
          }
        });
      }
    },
    // --------counter----------
    counter_two: function () {
      if ($('.ke_pv_two_right').length > 0) {
        var a = 0;
        $(window).scroll(function () {
          var oTop = $('#counter').offset().top - window.innerHeight;
          if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function () {
              var $this = $(this),
                countTo = $this.attr('data-count');
              $({
                countNum: $this.text(),
              }).animate(
                {
                  countNum: countTo,
                },

                {
                  duration: 5000,
                  easing: 'swing',
                  step: function () {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                  },
                }
              );
            });
            a = 1;
          }
        });
      }
    },
    product: function () {
      $('#thumbs_img img').on('click', function () {
        $('#large_image').attr(
          'src',
          $(this).attr('src').replace('thumb', 'large')
        );
        $('#thumbs_img ul li img.ke_active_bdr').removeClass('ke_active_bdr');
        $(this).addClass('ke_active_bdr');
      });
    },
  };
  Solar.init();
})(jQuery);

new WOW().init();

// Contact Form Submission
function checkRequire(formId, targetResp) {
  targetResp.html('');
  var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
  var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
  var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
  var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
  var check = 0;
  $('#er_msg').remove();
  var target = typeof formId == 'object' ? $(formId) : $('#' + formId);
  target.find('input , textarea , select').each(function () {
    if ($(this).hasClass('require')) {
      if ($(this).val().trim() == '') {
        check = 1;
        $(this).focus();
        $(this).parent('div').addClass('form_error');
        targetResp.html('You missed out some fields.');
        $(this).addClass('error');
        return false;
      } else {
        $(this).removeClass('error');
        $(this).parent('div').removeClass('form_error');
      }
    }
    if ($(this).val().trim() != '') {
      var valid = $(this).attr('data-valid');
      if (typeof valid != 'undefined') {
        if (!eval(valid).test($(this).val().trim())) {
          $(this).addClass('error');
          $(this).focus();
          check = 1;
          targetResp.html($(this).attr('data-error'));
          return false;
        } else {
          $(this).removeClass('error');
        }
      }
    }
  });
  return check;
}
$('.submitForm').on('click', function () {
  var _this = $(this);
  var targetForm = _this.closest('form');
  var errroTarget = targetForm.find('.response');
  var check = checkRequire(targetForm, errroTarget);

  if (check == 0) {
    var formDetail = new FormData(targetForm[0]);
    formDetail.append('form_type', _this.attr('form-type'));
    $.ajax({
      method: 'post',
      url: 'ajaxmail.php',
      data: formDetail,
      cache: false,
      contentType: false,
      processData: false,
    }).done(function (resp) {
      console.log(resp);
      if (resp == 1) {
        targetForm.find('input').val('');
        targetForm.find('textarea').val('');
        errroTarget.html(
          '<p style="color:green;">Mail has been sent successfully.</p>'
        );
      } else {
        errroTarget.html(
          '<p style="color:red;">Something went wrong please try again latter.</p>'
        );
      }
    });
  }
});
