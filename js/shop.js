//INAUGURAMOS THE FITROMA SHOP --------------------------------------------------------------
fetch('http://127.0.0.1:5500/productos.json')
    .then( (resp) => resp.json() )
    .then( (productosJson) => {
        // Pintar cards --------------------------------------
        let aux = '';
        function obtenerProductos() {
            for (let i = 0; i < productosJson.length; i++) {
                aux += `
                <div class="card col-lg-2 col-md-2 col-sm-2 col-xs-2 item" style="width: 18rem;">
                <img src="${productosJson[i].img}" onmouseover="src='${productosJson[i].imgHover}'" onmouseout="src='${productosJson[i].img}'" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title itemTitulo">${productosJson[i].producto}</h5>
                <p class="card-text itemPrecio">${productosJson[i].precio}</p>
                <button class="btn btn-dark agregarCarritoButton">Add to cart</button>
                </div>
                </div>
                `
            }
            document.getElementById('FitRomaShop').innerHTML = aux;
        }
        obtenerProductos();

        // Filtrar categorías --------------------------------------
        let all = document.getElementById('all');
        let leggings = document.getElementById('leggings');
        let sportsbras = document.getElementById('sportsbras');
        let shorts = document.getElementById('shorts');
        let tops = document.getElementById('tops');

        let aux1 = '';
        function mostrarCategoria(categoriaArray) {
            for (let i = 0; i < categoriaArray.length; i++) {
                aux1 += `
                <div class="card col-lg-2 col-md-2 col-sm-2 col-xs-2 item" style="width: 18rem;">
                <img src="${categoriaArray[i].img}" onmouseover="src='${categoriaArray[i].imgHover}'" onmouseout="src='${categoriaArray[i].img}'" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title itemTitulo">${categoriaArray[i].producto}</h5>
                <p class="card-text itemPrecio">${categoriaArray[i].precio}</p>
                <button class="btn btn-primary agregarCarritoButton">Add to cart</button>
                </div>
                </div>
                `
            }
            document.getElementById('FitRomaShop').innerHTML = aux1;
        }

        all.addEventListener('click', (e)=>{
            e.preventDefault();
            obtenerProductos()
        })

        leggings.addEventListener('click', (e)=>{
            e.preventDefault();
            let leggingsArray = productosJson.filter(item => item.categoria == 'BOTTOMS & LEGGINGS');
            mostrarCategoria(leggingsArray)
        })
        
        sportsbras.addEventListener('click', (e)=>{
            e.preventDefault();
            let sportsbrasArray = productosJson.filter(item => item.categoria == 'SPORTS BRAS');
            mostrarCategoria(sportsbrasArray)
        })
        

        shorts.addEventListener('click', (e)=>{
            e.preventDefault();
            let shortsArray = productosJson.filter(item => item.categoria == 'SHORTS');
            mostrarCategoria(shortsArray)
        })

        tops.addEventListener('click', (e)=>{
            e.preventDefault();
            let topsArray = productosJson.filter(item => item.categoria == 'T-SHIRTS & TOPS');
            mostrarCategoria(topsArray)
        })

        // Agregar al carrito --------------------------------------
        let agregarCarritoButtons = document.querySelectorAll('.agregarCarritoButton');
        console.log(agregarCarritoButtons)
        agregarCarritoButtons.forEach(agregarCarritoButton => {agregarCarritoButton.addEventListener('click', agregarCarritoClicked)})

        let vaciarButton = document.querySelector('.vaciarButton');
        vaciarButton.addEventListener('click', vaciarButtonClicked);

        let comprarButton = document.querySelector('.comprarButton');
        comprarButton.addEventListener('click', comprarButtonClicked);

        let itemsCarritoContainer = document.querySelector('.itemsCarritoContainer');
        console.log(itemsCarritoContainer);

        function agregarCarritoClicked(event) {
            let button = event.target;

            //button.forEach

            let item = button.closest('.item');
            let itemTitulo = document.querySelector('.itemTitulo').textContent;
            let itemPrecio = document.querySelector('.itemPrecio').textContent;
            console.log('button:')
            console.log(button);
            console.log('item:')
            console.log(item);
            console.log(itemTitulo);
            console.log(itemPrecio);
            agregarCarritoItem(itemTitulo, itemPrecio);
            agregado();
        }

        function agregarCarritoItem(itemTitulo, itemPrecio) {
            let carritoTitulos = itemsCarritoContainer.getElementsByClassName('.carritoTituloItem');

            for (let i = 0; i < carritoTitulos.length; i++) {
                if (carritoTitulos[i].innerText === itemTitulo) {
                    let carritoCantidad = carritoTitulos[i].parentElement.parentElement.parentElement.querySelector('.carritoCantidadItem');
                    carritoCantidad.value++;
                    updateCarritoTotal();
                    return
                }
            }

            const carritoRow = document.createElement('div');
            const carritoContent = `
        <div class="row carritoItem">

            <div class="col-6">
                <div>
                    <h6 class="carritoTituloItem">${itemTitulo}</h6>
                </div>
            </div>

            <div class="col-2">
                <div>
                    <p class="carritoPrecioItem">${itemPrecio}</p>
                </div>
            </div>

            <div class="col-4">
                <div>
                    <input class="carritoCantidadItem" type="number" value="1">
                    <button class="btn btn-danger eliminarButton" type="button">X</button>
                </div>
            </div>

            </div>
        `;

            carritoRow.innerHTML = carritoContent;
            itemsCarritoContainer.append(carritoRow);

            carritoRow.querySelector('.eliminarButton').addEventListener('click', carritoEliminarItem);

            //carritoRow.querySelector('.carritoCantidadItem').addEventListener('change', cantidadChanged);

            updateCarritoTotal();
        }

        function updateCarritoTotal() {
            let totalShop = 0;

            let carritoTotalShop = document.querySelector('.carritoTotalShop');

            let carritoItems = document.querySelectorAll('.carritoItem');

            let cantidad = 0;

            carritoItems.forEach((carritoItem)=> {
                let carritoPrecioItemElement = carritoItem.querySelector('.carritoPrecioItem');
                let carritoPrecioItem = Number(carritoPrecioItemElement.textContent.replace('$USD', ''));
                
                let carritoCantidadItemElement = carritoItem.querySelector('.carritoCantidadItem');
                let carritoCantidadItem = Number(carritoCantidadItemElement.value);

                totalShop = totalShop + carritoPrecioItem * carritoCantidadItem;
            })

            carritoTotalShop.innerHTML = `${totalShop.toFixed(2)} $USD`
        }

        function carritoEliminarItem(e) {
            let buttonClicked = e.target;
            buttonClicked.closest('.carritoItem').remove();
            updateCarritoTotal();
        }

        function vaciarButtonClicked() {
            itemsCarritoContainer.innerHTML = '';
            updateCarritoTotal();
        }

        function comprarButtonClicked() {
            itemsCarritoContainer.innerHTML = '';
            updateCarritoTotal();
        }

    })

/* 

function agregarCarritoDos(onclick="agregarCarritoDos({producto: '${categoriaArray[i].producto}', nombre: '${categoriaArray[i].categoria}', precio: '${categoriaArray[i].precio}'})") {
            carrito.push(objetoProducto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log(carrito)
        }
        
        */
