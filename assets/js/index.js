$(document).ready(() => {

    var regexName = /[^a-zA-z]/g;
    var topHeight = $('header').height();

    // call fetchSummary function
    fetchSummary()

    // async fetch summary
    async function fetchSummary() {
        var url = `https://api.thecatapi.com/v1/breeds?limit=4`;
        var data = await fetch(url).then(res => res.json()).catch(e => e.error);
        displaySummary(data);
    }

    // display summary
    function displaySummary(data) {
        var content = '';

        if(data.length) {
            $(data).each(function(i, e) {
                content += `
                    <li>
                        <figure>
                        <img src="${e.image.url}" alt="${e.name}">
                        </figure>
                        <a href="cat.html" title="${e.name}" data-id="${e.id}">${e.name}</a>
                    </li>
                `;
            })

            $('.breeds .wrapper div').after(`<ul>${content}</ul>`)

            $('.breeds ul li a').each(function(index, elem) {
                $(this).click(p => {
                    localStorage.setItem('catName', $(this).text())
                    localStorage.setItem('catId', $(this).attr('data-id'))
                })
            })
        }
    }

    // async fetchModal data
    async function fetchModalData(value) {
        var url = `https://api.thecatapi.com/v1/breeds/search?q=${value}`
        var data = await fetch(url).then(res => res.json()).catch(e => e)
        displayModal(data);
    }

    // display modal data
    function displayModal(data) {
        $('.modal-list ul').html(' ');
        var content = '';

        if(data.length) {
            if($('#breed').val() != '') {
                $(data).each(function(i, e) {
                    content += `
                        <li><a href="cat.html" title="${e.name}" data-id="${e.id}">${e.name}</a></li>
                    `;
                })

                $('.modal-list').removeClass('no')
                $('.modal-list').show();
            } else { $('.modal-list').addClass('no') }

            $('.modal-list ul').html(content);
            $('.modal-list ul li a').each(function(index, elem) {
                $(this).click(p => {
                    localStorage.setItem('catName', $(this).text())
                    localStorage.setItem('catId', $(this).attr('data-id'))
                })
            })

        } else if(!data.length) {
            $('.modal-list').addClass('no')
        }
    }

    // form validation functionality
    function checkName() {
        var breed = $('#breed').val();

        if(breed == '') {
            $('.modal-list').addClass('no');
            displayError('Above field is required')
            $('.modal-list').hide();
        } else if(regexName.test(breed)) displayError('Please enter valid name')
        else {
            displaySuccess()
            return 1
        }
    }

    // display error function
    function displayError(msg) {
        $('.error').text(msg)
        $('.error').show()
    }

    // display success function
    function displaySuccess() {
        $('.error').html('')
        $('.error').hide()
    }

    // hide and show toggle btn functionality
    $('.layer').on('click',function(e){
        if(!(($(e.target).closest("#cats").length > 0 ) || ($(e.target).closest("#cats").length > 0))){
            $('.layer').hide();
            $(".modal").removeClass('respo');
            $('#breed').val('');
            $('.modal-list').hide()
            $('html, body').css("overflow", "visible")
        }
    });

    // hide and show toggle btn functioanality
    $(window).scroll(function() {
        if ($(this).scrollTop() > topHeight) {
            $('.toggleUp').addClass('flex');
        } else {
            $('.toggleUp').removeClass('flex');
        }
    });

    // on toggleBtn click functionality
    $('.toggleUp').click(e => {
        e.preventDefault();
        window.scroll({top: 0, behavior: "smooth"});
    })

    // window resize functioanality
    $(window).resize(() => {
        responsivePage()
    })
    $(window).load(() => {
        responsivePage()
    })

    // responsivePage function
    function responsivePage() {
        if (window.matchMedia('(max-width: 540px)').matches) {
            $('#breed').attr('placeholder', 'Search')
    
            $('#cats').on('click', e => {
                $('.layer').show();
                $('.modal').addClass('respo')
                $('html, body').css("overflow", "hidden")
            });
            $('.error').hide()
        } else if (window.matchMedia('(min-width: 540px)').matches) {
            $('.modal').removeClass('respo');
            $('.layer').hide();
            $('input').attr('placeholder', 'Enter your breed')
            $('html, body').css("overflow", "visible")
            $('.error').hide()
        }
    }

    // close responsive modal
    $('.close').click(e => {
        $('.layer').hide();
        $('.modal').removeClass('respo')
        $('#breed').val('');
        $('.modal-list').hide();
        $('html, body').css("overflow", "visible")
    })

    // checkName on input blur
    $('#breed').blur(e => $(this).focusout(checkName()))
    
    // fetchData on input change
    $("#breed").on("input", function() {
        var checkNum = checkName()
        if(checkNum == 1) {
            fetchModalData($(this).val())
        }
    });

    // fetchData on submit form
    $('#cats').submit(async function(e) {
        e.preventDefault()
        
        var checkNum = checkName();
        if(checkNum == 1) {
            displaySuccess()
            var text = $('#breed').val();
            var url = `https://api.thecatapi.com/v1/breeds/search?q=${text}`;
            var data = await fetch(url).then(res => res.json()).catch(e => e);

            if(data.length) {
                localStorage.setItem('catName', data[0].name)
                localStorage.setItem('catId', data[0].id)

                window.location = '/cat.html'
            } else if (!data.length) {
                displayError('Sorry! No such results.')
            }
        }
    })
})