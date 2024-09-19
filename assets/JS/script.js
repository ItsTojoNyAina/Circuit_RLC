function Get(id) {
    return document.getElementById(id)
}
const Valider = Get('valider');
const generateur=Get('generateur');
const resistance=Get('resistance');
Valider.addEventListener("click", ()=>{
    console.log(generateur.value, resistance.value)

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',  
    data: {
        labels: ['1','2','3','4','5','6'],  
        datasets: [{
            label: 'Ano Daholo ny tay',
            data: [generateur.value, resistance.value,generateur.value, resistance.value,generateur.value, resistance.value], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    callback: function(value, index, values) {
                        if (index === values.length - 1) {
                            return 'X';  
                        }
                        return value;
                    }
                }
                
            },
            y: {
                ticks: {
                    callback: function(value, index, values) {
                        var maxValue = Math.max(...values.map(v => v.value));  
                        if (value === maxValue) {
                            return 'Y'; 
                        }
                        return value;
                    }
                }
            }
        }
    }
});
})