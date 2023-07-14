
const transform = document.querySelector('#transform');
const amountConverted = document.querySelector('#convertedCurrency');


transform.addEventListener( 'click', () => {

    const clpAmount = document.querySelector('#clpAmount').value;
    const currency = document.querySelector('#currency').value;


    if(clpAmount && currency){

        getValor(currency)
            .then(data => updateUI(data, clpAmount))
            .catch(err => {
                console.log(err);
                amountConverted.innerHTML = '';
                amountConverted.innerHTML += `Ha ocurrido un error, vuelve a intentarlo más tarde`; 
            });

    }else if(!isNaN(clpAmount) && currency){
        alert('Llena el campo a convertir e ingresa solo números');
    }else {
        alert('Llena todos los campos para continuar');
    }

});


// Formula de intercambio 
const clpInto = (clp, amount) => (clp / amount).toFixed(2);

const updateUI = (data, clpAmount) => {

    const value = data.serie[0].valor;
    const moneda = data.codigo;

    //Actualiza info que se muestra como resumen
    amountConverted.innerHTML = '';
    amountConverted.innerHTML += `<strong>${clpAmount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} pesos chilenos</strong> equivalen a <strong>${clpInto(clpAmount, value)} ${moneda}</strong>`; 

    //Arma grafico
    armarGrafico(data);

}


//Render de grafico

const ctx = document.getElementById('myChart');
let myChart;

const armarGrafico = (data) => {

    const titulo = `Historial de ${data.codigo} los últimos 10 días`;
    
    const previousDates = [];
    const previousValues = [];

    // Recorre la data de los 10 dias anteriores
    for(let i = 0; i < 10; i++){
        previousDates.push(data.serie[i].fecha.slice(0, 10));
        previousValues.push(data.serie[i].valor);
    }

    // Arma grafico

    if(myChart){
        myChart.data.labels = previousDates;
        myChart.data.datasets[0].data = previousValues;
        myChart.data.datasets[0].label = titulo;
        myChart.update();
        
    }else{
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: previousDates,
                datasets: [{
                label: titulo,
                data: previousValues,
                fill: false,
                borderColor: '#81FFFD',
                tension: 0.1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                y: {
                    beginAtZero: false,
                    ticks : {
                        color: '#ffffff'
                    }
                },
                x: {
                    ticks : {
                        color: '#ffffff'
                    }
                    
                }
                }
            }
        });
    }

}
