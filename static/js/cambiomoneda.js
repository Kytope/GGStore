$(document).ready(function() {
    // Variable global para almacenar el valor del dólar
    var usdValue;

    // Hacer la solicitud a la API de Mindicador para obtener el valor actual del dólar
    $.getJSON('https://mindicador.cl/api', function(data) {
        console.log('Respuesta de la API:', data);
        // Almacenar el valor del dólar en la variable global
        usdValue = data.dolar.valor;
    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    // Función para actualizar el precio cuando se cambia la selección de la moneda
    $('#currency').change(function() {
        var selectedCurrency = $(this).val();
        if (selectedCurrency === 'clp') {
            $('#product-price').text('$19.990 CLP');
        } else if (selectedCurrency === 'usd') {
            if (usdValue) {
                // Precio en CLP
                var clpPrice = 19990;
                // Convertir el precio de CLP a USD
                var usdPrice = clpPrice / usdValue;
                // Actualizar el precio en la página
                $('#product-price').text('$' + usdPrice.toFixed(2) + ' USD');
            } else {
                console.log('El valor del dólar no está disponible aún.');
            }
        }
    });
});
