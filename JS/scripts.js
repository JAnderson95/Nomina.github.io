// Objeto para almacenar datos del formulario
const datos = {
    nombre: '',
    salario: ''
};

// Referencias a elementos del DOM
const nombre = document.querySelector('#Nombre');
const salario = document.querySelector('#Salario');
const formulario = document.querySelector('.formulario');
const mensajeDiv = document.querySelector('.mensaje-validacion');
const detalleEmpleadoDiv = document.querySelector('.detalleEmpleado'); // Usamos la clase correcta

// Función para mostrar mensajes de validación y detalles del empleado
function mostrarMensaje(mensaje, error = false, resultados = {}) {
    mensajeDiv.innerHTML = ''; // Limpia el contenido anterior
    detalleEmpleadoDiv.innerHTML = ''; // Limpia el contenido anterior de detalles

    const mensajeP = document.createElement('p');
    mensajeP.textContent = mensaje;

    if (error) {
        mensajeP.classList.add('error');
    } else {
        mensajeP.classList.add('correcto');
    }

    mensajeDiv.appendChild(mensajeP);

    // Si tienes resultados intermedios, también puedes mostrarlos
    if (resultados) {
        // Itera sobre los resultados y crea párrafos para mostrarlos
        for (const key in resultados) {
            const resultadoP = document.createElement('p');
            resultadoP.textContent = `${key}: $${resultados[key].toFixed(2)}`;
            detalleEmpleadoDiv.appendChild(resultadoP);
        }
    }
}

// Función para calcular el costo del trabajador
function calcularCostoTrabajador(salarioNumerico) {
    const salarioMinimo = 1160000;
    const auxilioTransporte = 140606;
    const aporteCajaCompensacion = 46400;
    const porcentajePension = 0.12;
    const porcentajeARL = 0.00522;
    const porcentajePrima = 1 / 12; // Prima corresponde al salario dividido entre 12
    const porcentajeCesantias = 1 / 12; // Cesantías corresponden al salario dividido entre 12
    const porcentajeInteresesCesantias = 0.12; // Intereses sobre cesantías corresponden al 12% del resultado de las cesantías
    const porcentajeVacaciones = 0.0417; // Vacaciones corresponden al 4.17% del salario

    let costoTotal = salarioNumerico;

    // Si el salario es menor a 2 salarios mínimos, se agrega el auxilio de transporte
    if (salarioNumerico < salarioMinimo * 2) {
        costoTotal += auxilioTransporte;
    }

    // Se agregan los aportes parafiscales
    costoTotal += aporteCajaCompensacion;

    // Se calculan los aportes a seguridad social
    const aportePension = salarioNumerico * porcentajePension;
    const aporteARL = salarioNumerico * porcentajeARL;

    costoTotal += aportePension;
    costoTotal += aporteARL;

    // Se calculan las prestaciones sociales
    const prima = salarioNumerico * porcentajePrima;
    const cesantias = salarioNumerico * porcentajeCesantias;
    const interesesCesantias = cesantias * porcentajeInteresesCesantias;
    const vacaciones = salarioNumerico * porcentajeVacaciones;

    costoTotal += prima;
    costoTotal += cesantias;
    costoTotal += interesesCesantias;
    costoTotal += vacaciones;

    return { costoTotal, aportePension, aporteARL, prima, cesantias, interesesCesantias, vacaciones };
}

// Evento de envío del formulario
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // Validar el formulario y calcular el costo total aquí
    const { nombre, salario } = datos;

    if (nombre === '' || salario === '') {
        mostrarMensaje('Todos los campos son obligatorios', true);
        return;
    }

    // Verificar si el salario es un número
    const salarioNumerico = parseFloat(salario);
    if (isNaN(salarioNumerico)) {
        mostrarMensaje('El salario debe ser un número', true);
        return;
    }

    // Calcular el costo del trabajador
    const resultados = calcularCostoTrabajador(salarioNumerico);

    mostrarMensaje('Formulario enviado correctamente', false, resultados);
});

// Eventos de entrada de datos en los campos del formulario
nombre.addEventListener('input', function (e) {
    datos.nombre = e.target.value;
});

salario.addEventListener('input', function (e) {
    datos.salario = e.target.value;
});

// Limpiar mensajes de validación al volver a ingresar datos
nombre.addEventListener('input', function () {
    mensajeDiv.innerHTML = '';
});

salario.addEventListener('input', function () {
    mensajeDiv.innerHTML = '';
});

/////////////////////////////////////////////////////////


// Objeto para almacenar datos del formulario de Descuento Trabajador
const datosDescuento = {
    nombre: '',
    salario: ''
};

// Referencias a elementos del DOM en el formulario de Descuento Trabajador
const nombreDescuento = document.querySelector('#Nombre2');
const salarioDescuento = document.querySelector('#Salario2');
const formularioDescuento = document.querySelector('.formulario2');
const mensajeDivDescuento = document.querySelector('.mensaje-validacion_dcto');
const detalleEmpleadoDivDescuento = document.querySelector('#resultadodcto'); // Usamos el ID correcto

// Función para calcular los descuentos del trabajador
function calcularDescuentosTrabajador(salarioNumerico) {
    const porcentajeDescuento = 0.08; // 8% de descuento

    let descuentoTrabajador = 0;
    let totaldcto = 0;

    if (salarioNumerico >= 0) {
        descuentoTrabajador = salarioNumerico * porcentajeDescuento;
        totaldcto = salarioNumerico-descuentoTrabajador;
    }

    return {
        'Total salario con descuento:': totaldcto,
    };
}

// Evento de envío del formulario de Descuento Trabajador
formularioDescuento.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // Validar el formulario y calcular los descuentos aquí
    const { nombre, salario } = datosDescuento;

    if (nombre === '' || salario === '') {
        mostrarMensajeDescuento('Todos los campos son obligatorios', true);
        return;
    }

    // Verificar si el salario es un número
    const salarioNumerico = parseFloat(salario);
    if (isNaN(salarioNumerico)) {
        mostrarMensajeDescuento('El salario debe ser un número', true);
        return;
    }

    // Calcular los descuentos del trabajador
    const descuentos = calcularDescuentosTrabajador(salarioNumerico);

    mostrarMensajeDescuento('Formulario enviado correctamente', false, descuentos);
});

// Eventos de entrada de datos en los campos del formulario de Descuento Trabajador
nombreDescuento.addEventListener('input', function (e) {
    datosDescuento.nombre = e.target.value;
});

salarioDescuento.addEventListener('input', function (e) {
    datosDescuento.salario = e.target.value;
});

// Función para mostrar mensajes de validación y detalles del empleado en el formulario de Descuento Trabajador
function mostrarMensajeDescuento(mensaje, error = false, descuentos = {}) {
    mensajeDivDescuento.innerHTML = ''; // Limpia el contenido anterior
    detalleEmpleadoDivDescuento.innerHTML = ''; // Limpia el contenido anterior de detalles

    const mensajeP = document.createElement('p');
    mensajeP.textContent = mensaje;

    if (error) {
        mensajeP.classList.add('error');
    } else {
        mensajeP.classList.add('correcto');
    }

    mensajeDivDescuento.appendChild(mensajeP);

    // Si tienes descuentos, también puedes mostrarlos
    if (descuentos) {
        // Itera sobre los descuentos y crea párrafos para mostrarlos
        for (const key in descuentos) {
            const descuentoP = document.createElement('p');
            descuentoP.textContent = `${key}: $${descuentos[key].toFixed(2)}`;
            detalleEmpleadoDivDescuento.appendChild(descuentoP);
        }
    }
}
/////////////////////////////////////////////////////////////

// Objeto para almacenar datos del formulario de liquidación
const datosLiquidacion = {
    diasTranscurridos: '',
    salario: ''
};

// Referencias a elementos del DOM en la sección de liquidación
const diasTranscurridos = document.querySelector('#Nombre3'); // Clase corregida
const salarioLiquidacion = document.querySelector('#Salario3'); // Clase corregida
const formularioLiquidacion = document.querySelector('.formulario3'); // Clase corregida
const mensajeDivLiquidacion = document.querySelector('.mensaje-validacion_liqui'); // Clase corregida
const resultadoLiquidacionDiv = document.querySelector('#resultadoliqui'); // ID correcto

// Función para mostrar mensajes de validación y resultados de liquidación
function mostrarMensajeLiquidacion(mensaje, error = false, resultados = {}) {
    mensajeDivLiquidacion.innerHTML = ''; // Limpia el contenido anterior
    resultadoLiquidacionDiv.innerHTML = ''; // Limpia el contenido anterior de resultados

    const mensajeP = document.createElement('p');
    mensajeP.textContent = mensaje;

    if (error) {
        mensajeP.classList.add('error');
    } else {
        mensajeP.classList.add('correcto');
    }

    mensajeDivLiquidacion.appendChild(mensajeP);

    // Si tienes resultados, también puedes mostrarlos
    if (resultados) {
        // Itera sobre los resultados y crea párrafos para mostrarlos
        for (const key in resultados) {
            const resultadoP = document.createElement('p');
            resultadoP.textContent = `${key}: $${resultados[key].toFixed(2)}`;
            resultadoLiquidacionDiv.appendChild(resultadoP);
        }
    }
}

// Función para calcular la liquidación del trabajador
// ... (Código anterior)

// Función para calcular la liquidación del trabajador
function calcularLiquidacion(diasTranscurridos, salarioNumerico) {
    const diasTrabajoAnuales = 360;
    const porcentajeCesantias = 1 / 360; // Cesantías corresponden al salario dividido por 360 días

    // Calcular cesantías
    const cesantias = (salarioNumerico * diasTranscurridos) / diasTrabajoAnuales;

    // Calcular intereses sobre cesantías
    const interesesCesantias = (cesantias * diasTranscurridos * 0.12) / diasTrabajoAnuales;

    // Calcular prima de servicios
    const primaServicios = (salarioNumerico * diasTranscurridos) / diasTrabajoAnuales;

    // Calcular vacaciones
    const vacaciones = (salarioNumerico * 8) / 720;

    // Calcular la sumatoria total
    const totalLiquidacion = cesantias + interesesCesantias + primaServicios + vacaciones;

    return {
        'Cesantías': cesantias,
        'Intereses sobre Cesantías': interesesCesantias,
        'Prima de Servicios': primaServicios,
        'Vacaciones': vacaciones,
        'Total Liquidación': totalLiquidacion // Agregamos el total a los resultados
    };
}

// Evento de envío del formulario de liquidación
formularioLiquidacion.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // Validar el formulario y calcular la liquidación aquí
    const { diasTranscurridos, salario } = datosLiquidacion;

    if (diasTranscurridos === '' || salario === '') {
        mostrarMensajeLiquidacion('Todos los campos son obligatorios', true);
        return;
    }

    // Verificar si los valores son numéricos
    const salarioNumerico = parseFloat(salario);
    const diasTranscurridosNumerico = parseFloat(diasTranscurridos);

    if (isNaN(salarioNumerico) || isNaN(diasTranscurridosNumerico)) {
        mostrarMensajeLiquidacion('Los valores deben ser numéricos', true);
        return;
    }

    // Calcular la liquidación
    const resultadosLiquidacion = calcularLiquidacion(diasTranscurridosNumerico, salarioNumerico);

    mostrarMensajeLiquidacion('Formulario enviado correctamente', false, resultadosLiquidacion);
});


// Eventos de entrada de datos en los campos del formulario de liquidación
diasTranscurridos.addEventListener('input', function (e) {
    datosLiquidacion.diasTranscurridos = e.target.value;
});

salarioLiquidacion.addEventListener('input', function (e) {
    datosLiquidacion.salario = e.target.value;
});

// Limpiar mensajes de validación al volver a ingresar datos en el formulario de liquidación
diasTranscurridos.addEventListener('input', function () {
    mensajeDivLiquidacion.innerHTML = '';
});

salarioLiquidacion.addEventListener('input', function () {
    mensajeDivLiquidacion.innerHTML = '';
});
