function Get(id) {
    return document.getElementById(id);
}

const Valider = Get('valider');
const generateur = Get('generateur');
const resistance = Get('resistance');
const chartContainer = document.querySelector('.chart');

Valider.addEventListener("click", () => {
    console.log(generateur.value, resistance.value);
    chartContainer.classList.add('displaychart')

    chartContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    chartContainer.style.webkitBackdropFilter = 'blur(5px)';
    chartContainer.style.backdropFilter = 'blur(5px)';
    chartContainer.style.padding = '30px';
    chartContainer.style.boxShadow = '2px 2px 6px rgba(128, 128, 128, 0.235)';
    chartContainer.style.borderRadius = '6px';
    chartContainer.style.width = '400px';  
    chartContainer.style.height = '400px';  

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: 'Ano Daholo ny tay',
                data: [generateur.value, resistance.value, generateur.value, resistance.value, generateur.value, resistance.value],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        callback: function (value, index, values) {
                            if (index === values.length - 1) {
                                return 'X';
                            }
                            return value;
                        }
                    }
                },
                y: {
                    ticks: {
                        callback: function (value, index, values) {
                            var maxValue = Math.max(...values.map(v => v.value));
                            if (value === maxValue) {
                                return;
                            }
                            return value;
                        }
                    }
                }
            }
        }
    });
});
