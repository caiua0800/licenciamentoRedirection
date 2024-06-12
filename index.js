
let choice = '';
let intervalo = ''
function setChoice(e){
    (e.id === 'percentual') ? choice = 'percentual' : choice = 'real';
    
    document.querySelector('.container-box-inicial').style.display = 'none';
    document.querySelector('.modal').style.display = 'flex';


}

function createProducts(){
    let qtde = document.querySelector('#productsN').value;
    intervalo = document.querySelector("#intervaloLances").value
    if(!qtde)
        window.location.reload();

    let pai = document.querySelector('.form')

    for(let i = 0; i < qtde; i++){
        let formGroup = document.createElement('div');
        formGroup.className = "form-group";
    
        let h4 = document.createElement('h4');
        h4.style.marginBottom = '5px'
        h4.textContent = `Item ${i+1}`
    
        let inputValor = document.createElement('input');
        inputValor.type = "number";
        
        if(choice === 'percentual')
            inputValor.placeholder = 'Percentual Mínimo'
        else
            inputValor.placeholder = 'Valor Mínimo'

        formGroup.appendChild(h4)
        formGroup.appendChild(inputValor)
    
        pai.appendChild(formGroup);
    }

    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.container-box').style.display = 'flex';
    document.querySelector('.submit-button').style.display = 'block';

}


function startServer(){

    let objects = [];

    const forms = document.querySelectorAll('.form-group');
    forms.forEach(form => {

        let valor = form.querySelector('input').value;
        let item = form.querySelector('h4').textContent;

        let obj = {
            nome: item,
            valor: valor,
            choice: choice,
            intervalo: intervalo
        }
        console.log(obj)
        objects.push(obj);
    })


    fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(objects),
      })
      .then(response => {
        if (response.ok) {
          console.log('POST request successful');
        } else {
          console.error('POST request failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

      alert('CLIQUE EM OK E SERÁ REDIRECIONADO');

      window.location.href = 'http://comprasnet.gov.br/seguro/loginPortal.asp';
}