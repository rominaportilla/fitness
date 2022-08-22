//INAUGURAMOS THE FITROMA SHOP --------------------------------------------------------------
fetch('http://127.0.0.1:5500/productos.json')
    .then( (resp) => resp.json() )
    .then( (productosJson) => {
        // Pintar cards --------------------------------------
        function obtenerProductos() {
            let aux = '';
            for (let i = 0; i < productosJson.length; i++) {
                aux += `
                <div class="card col-lg-2 col-md-2 col-sm-2 col-xs-2 item" style="width: 17rem">
                <img src="${productosJson[i].img}" onmouseover="src='${productosJson[i].imgHover}'" onmouseout="src='${productosJson[i].img}'" class="card-img-top" alt="...">
                <div class="card-body cardBody">
                <div class="cardContent">
                <h5 class="card-title itemTitulo">${productosJson[i].producto}</h5>
                <p class="card-text itemPrecio">$${productosJson[i].precio}USD</p>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>XS</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
                <option value="4">XL</option>
                <option value="5">XXL</option>
                </select>
                </div>
                <button onclick="agregarCarritoProductos({producto: '${productosJson[i].producto}', categoria:'${productosJson[i].categoria}', precio: ${productosJson[i].precio}, cantidad: 1})" class="btn btn-dark">Add to cart</button>
                
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
                <div class="card col-lg-2 col-md-2 col-sm-2 col-xs-2 item" style="width: 18rem">
                <img src="${categoriaArray[i].img}" onmouseover="src='${categoriaArray[i].imgHover}'" onmouseout="src='${categoriaArray[i].img}'" class="card-img-top" alt="...">
                <div class="card-body cardBody">
                <div class="cardContent">
                <h5 class="card-title itemTitulo">${categoriaArray[i].producto}</h5>
                <p class="card-text itemPrecio">${categoriaArray[i].precio}</p>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>XS</option>
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
                <option value="4">XL</option>
                <option value="5">XXL</option>
                </select>
                </div>
                <button onclick="agregarCarritoProductos({producto: '${categoriaArray[i].producto}', categoria:'${categoriaArray[i].categoria}', precio: ${categoriaArray[i].precio}, cantidad: 1})" class="btn btn-dark">Add to cart</button>
                </div>
                </div>
                `
            }
            document.getElementById('FitRomaShop').innerHTML = aux1;
        }

        all.addEventListener('click', (e)=>{
            obtenerProductos();
            all.className+= " active";
            leggings.className.replace(" active", "");
            sportsbras.className.replace(" active", "");
            shorts.className.replace(" active", "");
            tops.className.replace(" active", "");
        })

        leggings.addEventListener('click', (e)=>{
            let leggingsArray = productosJson.filter(item => item.categoria == 'LEGGINGS');
            aux1 = '';
            mostrarCategoria(leggingsArray);
            leggings.className+= " active"
            all.className.replace(" active", "");
            sportsbras.className.replace(" active", "");
            shorts.className.replace(" active", "");
            tops.className.replace(" active", "");
        })

        sportsbras.addEventListener('click', (e)=>{
            let sportsbrasArray = productosJson.filter(item => item.categoria == 'SPORTS BRAS');
            aux1 = '';
            mostrarCategoria(sportsbrasArray);
            sportsbras.className+= " active";
            leggings.className.replace(" active", "");
            all.className.replace(" active", "");
            shorts.className.replace(" active", "");
            tops.className.replace(" active", "");
        })

        shorts.addEventListener('click', (e)=>{
            let shortsArray = productosJson.filter(item => item.categoria == 'SHORTS');
            aux1 = '';
            mostrarCategoria(shortsArray);
            shorts.className+= " active";
            leggings.className.replace(" active", "");
            sportsbras.className.replace(" active", "");
            all.className.replace(" active", "");
            tops.className.replace(" active", "");
        })

        tops.addEventListener('click', (e)=>{
            let topsArray = productosJson.filter(item => item.categoria == 'T-SHIRTS & TOPS');
            aux1 = '';
            mostrarCategoria(topsArray);
            tops.className+= " active";
            leggings.className.replace(" active", "");
            sportsbras.className.replace(" active", "");
            shorts.className.replace(" active", "");
            all.className.replace(" active", "");
        })
    })
