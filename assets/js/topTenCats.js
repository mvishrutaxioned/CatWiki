$(document).ready(() => {

    fetchTopTen()
    async function fetchTopTen() {
        var url = `https://api.thecatapi.com/v1/breeds?limit=10`;
        var data = await fetch(url).then(res => res.json()).catch(e => e.error);
        displayTopTen(data);
    }

    async function displayTopTen(data) {
        var content = '';

        if(data.length) {
            $(data).each(function(i, e) {
                content += `
                    <li>
                        <figure>
                            <img src="${e.image.url}" alt="${e.name}">
                        </figure>
                        <div class="cat-content">
                            <h3>${i+1}. <a href="cat.html" title="${e.name}" data-id="${e.id}">${e.name}</a></h3>
                            <p>${e.description}</p>
                        </div>
                    </li>
                `;
            })

            $('.searchedCats .wrapper h2').after(`<ul>${content}</ul>`)

            $('.searchedCats ul li a').each(function(index, elem) {
                $(this).click(p => {
                    localStorage.setItem('catName', $(this).text())
                    localStorage.setItem('catId', $(this).attr('data-id'))
                })
            })
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