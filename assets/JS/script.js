function Get(id) {
    return document.getElementById(id);
}

const Valider = Get('valider');
const generateur = Get('generateur');
const resistance = Get('resistance');
const inductance = Get('inductance');
const capacite = Get('capacite');
const chartContainer = document.querySelector('.chart');

let myChart; 


let L, R, C, V0 = 1.0, dt = 0.01, tFinal = 50.0; 


function tension(t) {
    const freq = 5.0; 

    if (t % 20 < 10) {
        return V0 * Math.sin(2 * Math.PI * freq * t); 
    } else {
        return V0 * 2; 
    }
}


function equationsRLC(y, t) {
    const i = y[0];      
    const di_dt = y[1];  
    const d2i_dt2 = (tension(t) - R * di_dt - i / C) / L;
    return [di_dt, d2i_dt2];
}


function newtonRLC(y, t) {
    const dydt = equationsRLC(y, t);
    return [y[0] + dydt[0] * dt, y[1] + dydt[1] * dt];
}


function simulateRLC(y0) {
    const numSteps = Math.floor(tFinal / dt);
    const solution = [];
    let y = [...y0];
    
    for (let step = 0; step < numSteps; step++) {
        const t = step * dt;
        solution.push([t, y[0]]); 
        y = newtonRLC(y, t);
    }
    
    return solution;
}

Valider.addEventListener("click", () => {
    
    L = parseFloat(inductance.value) || 1.0;  
    R = parseFloat(resistance.value) || 1.0;  
    C = parseFloat(capacite.value) || 1.0;    

    var ctx = document.getElementById('myChart').getContext('2d');
    
    
    if (myChart) {
        myChart.destroy();
    }

    console.log(generateur.value, resistance.value, inductance.value, capacite.value);
    chartContainer.classList.add('displaychart');

    chartContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    chartContainer.style.webkitBackdropFilter = 'blur(5px)';
    chartContainer.style.backdropFilter = 'blur(5px)';
    chartContainer.style.padding = '30px';
    chartContainer.style.boxShadow = '2px 2px 6px rgba(128, 128, 128, 0.235)';
    chartContainer.style.borderRadius = '6px';
    chartContainer.style.width = '800px';  
    chartContainer.style.height = '500px'; 
    chartContainer.style.borderRadius = '8px';  

    
    const initialCurrent = parseFloat(generateur.value);
    const initialRateOfChange = 50; 
    const initialConditions = [initialCurrent, initialRateOfChange];

    
    const results = simulateRLC(initialConditions);

    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: results.map(r => r[0]), 
            datasets: [{
                label: 'Courant dans le circuit RLC',
                data: results.map(r => r[1]), 
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.4 
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temps (s)'
                    },
                    min: 0, 
                    max: tFinal, 
                    ticks: {
                        stepSize: 2 
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Courant (A)'
                    },
                    min: -200,
                    max: 500, 
                    ticks: {
                        stepSize: 10 
                    }
                }
            }
        }
    });
});
