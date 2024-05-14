$(document).ready(function() {
    // Variable para controlar si el carrito está abierto
    var carritoAbierto = false;
    var total = 0;

    // Agregar evento de clic a los botones "Agregar al Carrito"
    $(".add-to-cart").click(function() {
        // Extraer información del producto
        var productName = $(this).siblings("h3").text();
        var productPrice = parseInt($(this).siblings("p").eq(0).text().replace("Precio: CLP ", "").replace(".", "").trim());
        var stockElement = $(this).siblings("p").eq(1);
        var stock = parseInt(stockElement.text().replace("Stock: ", "").trim());

        // Buscar si el producto ya está en el carrito
        var existingProduct = $("#cart-content").find(".product-item").filter(function() {
            return $(this).find(".product-name").text() === productName;
        });

        // Validar stock
        if (stock > 0) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            if (existingProduct.length > 0) {
                total += productPrice;
                $("#total-price").text(total);
                var productQuantityElement = existingProduct.find(".product-quantity");
                var quantity = parseInt(productQuantityElement.text());
                quantity++;
                // Actualizar la cantidad en el elemento del carrito
                productQuantityElement.text(quantity);
                
            } else {
                // Si el producto no está en el carrito, agregarlo
                total += productPrice;
                $("#total-price").text(total);

                // Crear elementos para el producto en el carrito
                var productItem = $("<div class='product-item'></div>");
                productItem.append("<p class='product-name'>" + productName + "</p>");
                productItem.append("<p class='product-price'>Precio: CLP " + productPrice + "</p>");
                productItem.append("<p class='product-quantity'>1</p>");

                // Agregar el producto al contenido del carrito
                $("#cart-content").append(productItem);
            }

            
            // Actualizar el texto de cantidad de productos en el botón de carrito
            updateCartButtonText();

            stock--; // Disminuir el stock
            stockElement.text("Stock: " + stock); // Actualizar el stock

            // Abrir la barra lateral del carrito si no está abierta
            if (!carritoAbierto) {
                openNav();
                carritoAbierto = true;
            }
        } else {
            alert("Producto fuera de stock");
        }
    });

    // Función para abrir la barra lateral del carrito
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
    }

    function closeNav() {
        $("#mySidebar").css("width", "0");
        carritoAbierto = false;
    }

    // Función para vaciar el carrito
    function clearCart() {
        total = 0;
        $("#total-price").text(total);
        $("#cart-content").empty(); // Eliminar el contenido del carrito

        // Actualizar el texto de cantidad de productos en el botón de carrito
        updateCartButtonText();
    }

    // Función para finalizar la compra (agregar lógica de pago)
    function checkout() {
        // Aquí debes agregar la lógica para procesar el pago, guardar el pedido, etc.
        alert("Compra finalizada. Total: CLP " + total + ". ¡Pronto te contactaremos!");
        // Opcional: Vaciar el carrito después de la compra
        clearCart();
    }

    // Función para actualizar el texto de cantidad de productos en el botón de carrito
    function updateCartButtonText() {
        var numItems = $("#cart-content").find(".product-item").length;
        $(".cart-button").text("Carrito (" + numItems + " productos)");
    }

    // Asociar eventos de clic a los botones
    $(".closebtn").click(closeNav);
    $("#clear-cart").click(clearCart); // Asignar evento al botón "Vaciar Carrito"
    $("#checkout").click(checkout); // Asignar evento al botón "Finalizar Compra"
});