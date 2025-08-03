document.addEventListener('DOMContentLoaded', function (){
    const formVisitantes = document.getElementById('formVisitantes');
    // Verificar si el usuario está autenticado
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirigir a login si no está autenticado
        window.location.href = 'login.html';
        return;
    }

    // Mostrar botón de dashboard solo para Admin
    const btnDashboard = document.getElementById('btnDashboard');
    if (currentUser === 'Admin') {
        btnDashboard.style.display = 'block';
    } else {
        btnDashboard.style.display = 'none';
    }

    // Captura el formulario
    formVisitantes.addEventListener('submit', function (event){
        event.preventDefault(); // Evita que recargue la página
    
        const datos = {
            fecha: document.getElementById('fechaInput').value,
            nombre: document.getElementById('nombreInput').value,
            tipoDocumento: document.getElementById('tipoDocInput').value,
            documento: document.getElementById('documentoInput').value,
            eps: document.getElementById('epsInput').value,
            arl: document.getElementById('arlInput').value,
            ingreso: document.getElementById('ingresoInput').value,
            salida: document.getElementById('salidaInput').value,
            emergencia: document.getElementById('emergenciaInput').value,
            empresa: document.getElementById('empresaInput').value, // Corregido de emergenciaInput a empresaInput
            motivo: document.getElementById('motivoInput').value,
            registradoPor: currentUser,
            fechaRegistro: new Date().toISOString()
        };

        // Guardar en localStorage
        const visitantes = JSON.parse(localStorage.getItem('visitantes')) || [];
        visitantes.push(datos);
        localStorage.setItem('visitantes', JSON.stringify(visitantes));

        // Mostrar mensaje de éxito
        mostrarAlerta('Visitante registrado correctamente', 'success');
        
        // Limpiar formulario
        formVisitantes.reset();
    });

    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        // Eliminar alertas previas
        const alertaExistente = document.querySelector('.alert');
        if (alertaExistente) {
            alertaExistente.remove();
        }
        
        // Crear nueva alerta
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alert alert-${tipo === 'success' ? 'success' : 'danger'} mt-3`;
        alertaDiv.textContent = mensaje;
        
        // Insertar alerta después del botón de envío
        const botonEnvio = document.querySelector('button[type="submit"]');
        botonEnvio.parentNode.insertBefore(alertaDiv, botonEnvio.nextSibling);
        
        // Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);
    }

    // Event listener para el botón de dashboard
    document.getElementById('btnDashboard').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });

    // Event listener para el botón de cerrar sesión
    document.getElementById('btnCerrarSesion').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
})