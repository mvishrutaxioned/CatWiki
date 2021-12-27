$(document).ready(() => {
    var regexName = /[^a-zA-z]/g;

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
})