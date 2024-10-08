$('.cupcake-form').on('submit', addCupcake);

async function addCupcake(evt) {
    evt.preventDefault();

    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let image = $('#image').val();

    const response = await axios.post('/api/cupcakes', {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    });

    let newCupcake = $(`
        <div class="card small-card" data-id="${response.data.cupcake.id}">
            <img class="card-img-top cupcake-img" src="${response.data.cupcake.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${response.data.cupcake.flavor}</h5>
                <p class="card-text">Size: ${response.data.cupcake.size}</p>
                <p class="card-text">Rating: ${response.data.cupcake.rating}</p>
            </div>
        </div>
    `);
    
    $('.all-cupcakes').append(newCupcake);

    $('#flavor').val('');
    $('#size').val('');
    $('#rating').val('');
    $('#image').val('');
}


$(document).ready(loadCupcakes);

async function loadCupcakes() {
    const response = await axios.get('/api/cupcakes');

    for (let cupcake of response.data.cupcakes) {
        let cupcakeHTML = $(
            `<div class="card small-card" data-id="${cupcake.id}">
                <img class="card-img-top cupcake-img" src="${cupcake.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${cupcake.flavor}</h5>
                    <p class="card-text">Size: ${cupcake.size}</p>
                    <p class="card-text">Rating: ${cupcake.rating}</p>
                </div>
            </div>`);
        
                
        $('.all-cupcakes').append(cupcakeHTML);
    }
}
