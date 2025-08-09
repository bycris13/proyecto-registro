document.addEventListener('DOMContentLoaded', function() {
  // Verificar si el usuario está autenticado como Admin
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser || currentUser !== 'Admin') {
    // Redirigir a login si no es Admin
    window.location.href = 'login.html';
    return;
  }

  // Referencias a elementos del DOM
  const btnNuevoRegistro = document.getElementById('btnNuevoRegistro');
  const btnRefrescar = document.getElementById('btnRefrescar');
  const btnCerrarSesion = document.getElementById('btnCerrarSesion');
  const tablaVisitantes = document.getElementById('tablaVisitantes');

  // Cargar datos de visitantes desde localStorage
  function cargarVisitantes() {
    // Obtener datos almacenados
    const visitantes = JSON.parse(localStorage.getItem('visitantes')) || [];
    
    // Limpiar tabla
    tablaVisitantes.innerHTML = '';
    
    if (visitantes.length === 0) {
      // Mostrar mensaje si no hay visitantes
      tablaVisitantes.innerHTML = `
        <tr class="no-data-row">
          <td colspan="8" class="text-center">No hay visitantes registrados</td>
        </tr>
      `;
      return;
    }
    
    // Generar filas de la tabla con los datos de visitantes
    visitantes.forEach((visitante, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${visitante.fecha || '-'}</td>
        <td>${visitante.nombre || '-'}</td>
        <td>${(visitante.tipoDocumento || '-') + ': ' + (visitante.documento || '-')}</td>
        <td>${visitante.empresa || '-'}</td>
        <td>${visitante.ingreso || '-'}</td>
        <td>${visitante.salida || '-'}</td>
        <td>${visitante.motivo || '-'}</td>
        <td>
          <button class="btn btn-sm btn-info btn-action" data-index="${index}" title="Ver detalles">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-danger btn-action btn-eliminar" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tablaVisitantes.appendChild(fila);
    });
    
    // Agregar event listeners a los botones de acción
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        eliminarVisitante(index);
      });
    });
  }

  // Función para eliminar un visitante
  function eliminarVisitante(index) {
    if (confirm('¿Está seguro que desea eliminar este registro?')) {
      const visitantes = JSON.parse(localStorage.getItem('visitantes')) || [];
      visitantes.splice(index, 1);
      localStorage.setItem('visitantes', JSON.stringify(visitantes));
      cargarVisitantes();
    }
  }

  // Event listeners para los botones
  btnNuevoRegistro.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  btnRefrescar.addEventListener('click', function() {
    cargarVisitantes();
  });

  btnCerrarSesion.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });

  // Cargar visitantes al iniciar
  cargarVisitantes();
});