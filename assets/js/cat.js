$(document).ready(() => {

    var catName = localStorage.getItem('catName');
    var catId = localStorage.getItem('catId');
    var topHeight = $('header').height();

    // display sorry box
    if(catName && catId) {
        $('.sorry').hide()
        fetchData()
        displayGallery()
    } else if (catName == null || catId == null) {
        $('.sorry').show()
    }

    // async fetchData function
    async function fetchData() {
        var url1 = `https://api.thecatapi.com/v1/breeds/search?q=${catName}`
        var url2 = `https://api.thecatapi.com/v1/images/search?breed_id=${catId}`
        var catInfo = await fetch(url1).then(res => res.json()).catch(e => console.log(e))
        var catImg = await fetch(url2).then(res => res.json()).catch(e => console.log(e))
        displayCat(catInfo, catImg);
    }

    // createLevel function
    function createLevels(n) {
        var info = '';
        if(n > 0) {
            var rest = 5-n;
            for(var i=1; i<=n; i++) {
                info += '<li class="fill">fill</li>'
            }
            if(5-n != 0) {
                for(var j=1; j<=5-n; j++) {
                    info += '<li class="empty">empty</li>'
                }
            }
        } else {
            for(var k=1; k<=5; k++) {
                info += `<li class="empty">empty</li>`;
            }
        }
        return info;
    }

    // async display cat info function
    async function displayCat(catInfo, catImg) {
        $('.cat-info .wrapper').html(' ');
        var content = '';

        if(catInfo.length && catImg.length) {
            $(catInfo).each(function(i, e) {
                content += `
                <div class="img">
                    <figure>
                        <img src="${catImg[0].url}" alt="${e.name}">
                    </figure>
                    </div>
                    <div class="info">
                    <h2>${e.name}</h2>
                    <p>${e.description}</p>
                    <ul class="details">
                        <li>
                            <h3>Temperament:</h3>
                            <p>${e.temperament}</p>
                        </li>
                        <li>
                            <h3>Origin:</h3>
                            <p>${e.origin}</p>
                        </li>
                        <li>
                        <h3>Life Span:</h3>
                            <p>${e.life_span} years</p>
                            </li>
                        <li>
                            <h3>Adaptability:</h3>
                            <ul class="levels">
                                ${createLevels(e.adaptability)}
                            </ul>
                        </li>
                        <li>
                            <h3>Affection level:</h3>
                            <ul class="levels">${createLevels(e.affection_level)}</ul>
                        </li>
                        <li>
                            <h3>Child Friendly:</h3>
                            <ul class="levels">${createLevels(e.child_friendly)}</ul>
                        </li>
                        <li>
                            <h3>Grooming:</h3>
                            <ul class="levels">${createLevels(e.grooming)}</ul>
                        </li>
                        <li>
                            <h3>Intelligence:</h3>
                            <ul class="levels">${createLevels(e.intelligence)}</ul>
                        </li>
                        <li>
                            <h3>Health issues:</h3>
                            <ul class="levels">${createLevels(e.health_issues)}</ul>
                        </li>
                        <li>
                            <h3>Social needs:</h3>
                            <ul class="levels">${createLevels(e.social_needs)}</ul>
                        </li>
                        <li>
                            <h3>Stranger friendly:</h3>
                            <ul class="levels">${createLevels(e.stranger_friendly)}</ul>
                        </li>
                    </ul>
                </div>
                `;
            })

            $('main').prepend(
                `<section class="cat-info">
                    <div class="wrapper">${content}</div>
                </section>`
            );
        }
    }

    // async display catGallery function
    async function displayGallery() {
        var content = '';
        for(var i=0; i<8; i++) {
            var url1 = `https://api.thecatapi.com/v1/images/search?breed_id=${catId}`
            var catImage = await fetch(url1).then(res => res.json()).catch(e => console.log(e))

            if(catImage.length) {
                content += `<li><img src="${catImage[0].url}" alt="Cat Image ${i}"></li>`;
            }
        }

        if(content.length) {
            $('main > a').after(`
            <section class="gallery">
                <div class="wrapper">
                    <h2>Other photos</h2>
                    <ul>
                    ${content}
                    </ul>
                </div>
            </section>
        `)
        } else {
            $('.sorry').html("Oops! Error Occured.")
            $('.sorry').show()
        }
    }

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
})