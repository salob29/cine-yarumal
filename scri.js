
// CONSTANTES Y VARIABLES
const PRECIO_BOLETO = 12000;
let asientosSeleccionados = [];

// FUNCIÓN: MOSTRAR SECCIÓN DE ASIENTOS
function mostrarAsientos() {
    const pelicula = document.getElementById('peliculaSelect').value;
    const horario = document.getElementById('horarioSelect').value;
    
    // Validar que se haya seleccionado película y horario
    if (!pelicula || !horario) {
        alert('Por favor selecciona película y horario');
        return;
    }
    
    // Mostrar la sección de asientos
    document.getElementById('seccionAsientos').style.display = 'block';
    document.getElementById('seccionAsientos').scrollIntoView({ behavior: 'smooth' });
    
    // Generar los asientos
    generarAsientos();
}


// FUNCIÓN: GENERAR ASIENTOS
function generarAsientos() {
    const grid = document.getElementById('asientosGrid');
    grid.innerHTML = '';
    asientosSeleccionados = [];
    
    // Crear 60 asientos (6 filas x 10 columnas)
    const filas = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    filas.forEach(fila => {
        for (let i = 1; i <= 10; i++) {
            const asiento = document.createElement('div');
            const id = fila + i;
            
            // Simular algunos asientos ocupados aleatoriamente (25% ocupados)
            const ocupado = Math.random() > 0.75;
            
            asiento.className = 'seat ' + (ocupado ? 'occupied' : 'available');
            asiento.textContent = id;
            asiento.dataset.id = id;
            
            // Agregar evento click solo si está disponible
            if (!ocupado) {
                asiento.onclick = toggleAsiento;
            }
            
            grid.appendChild(asiento);
        }
    });
    
    actualizarTotal();
}


// FUNCIÓN: TOGGLE ASIENTO (SELECCIONAR/DESELECCIONAR)
function toggleAsiento(e) {
    const asiento = e.target;
    const id = asiento.dataset.id;
    
    if (asiento.classList.contains('available')) {
        // Seleccionar asiento
        asiento.classList.remove('available');
        asiento.classList.add('selected');
        asientosSeleccionados.push(id);
    } else if (asiento.classList.contains('selected')) {
        // Deseleccionar asiento
        asiento.classList.remove('selected');
        asiento.classList.add('available');
        asientosSeleccionados = asientosSeleccionados.filter(a => a !== id);
    }
    
    actualizarTotal();
}


// FUNCIÓN: ACTUALIZAR TOTAL
function actualizarTotal() {
    const cantidad = asientosSeleccionados.length;
    const total = cantidad * PRECIO_BOLETO;
    
    document.getElementById('totalAsientos').textContent = cantidad;
    document.getElementById('totalPrecio').textContent = '$' + total.toLocaleString('es-CO');
}


// FUNCIÓN: MOSTRAR SECCIÓN DE PAGO
function mostrarPago() {
    // Validar que haya al menos un asiento seleccionado
    if (asientosSeleccionados.length === 0) {
        alert('Por favor selecciona al menos un asiento');
        return;
    }
    
    // Obtener datos de la reserva
    const pelicula = document.getElementById('peliculaSelect').value;
    const horario = document.getElementById('horarioSelect').value;
    const total = asientosSeleccionados.length * PRECIO_BOLETO;
    
    // Actualizar resumen de compra
    document.getElementById('resumenPelicula').textContent = pelicula;
    document.getElementById('resumenHorario').textContent = horario;
    document.getElementById('resumenAsientos').textContent = asientosSeleccionados.join(', ');
    document.getElementById('resumenTotal').textContent = '$' + total.toLocaleString('es-CO');
    
    // Mostrar sección de pago
    document.getElementById('seccionPago').style.display = 'block';
    document.getElementById('seccionPago').scrollIntoView({ behavior: 'smooth' });
}

// Manejar formulario de registro
document.getElementById('formRegistro').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Registro exitoso! Ahora puedes reservar tus boletos.');
    this.reset();
    document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
});

// Manejar formulario de pago
document.getElementById('formPago').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('🎉 ¡Compra confirmada! Recibirás tu confirmación por correo electrónico.\n\nDisfruta tu película en Cinema Yarumal!');
    location.reload();
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

        asie