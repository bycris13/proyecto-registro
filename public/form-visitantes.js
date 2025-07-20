document.addEventListener('DOMContentLoaded', function (){
    const formVisitantes = document.getElementById('formVisitantes');
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
            empresa: document.getElementById('emergenciaInput').value,
            motivo: document.getElementById('motivoInput').value,
        };

        console.log('datos capturados: ', datos);    
    });
})