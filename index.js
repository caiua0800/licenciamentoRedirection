
let choice = '';

function setChoice(e){
    (e.id === 'percentual') ? choice = 'percentual' : choice = 'real';
    
    document.querySelector('.info-in').style.display = 'block';
    document.querySelector('.container-box').style.display = 'flex';
    document.querySelector('.submit-button').style.display = 'block';
    document.querySelector('.container-box-inicial').style.display = 'none';

}

function removeItem(element){
    element.parentNode.remove();
}

function checkInputsEmpty() {
    let inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    
    for (let input of inputs) {
        if (input.value === "") {
            return false;
        }
    }
    
    return true;
}


let createNewProductButton = document.querySelector('#createNewProduct');

createNewProductButton.addEventListener('click', () => {
    let info_in = document.querySelector('.info-in');

    info_in.style.display = 'none'

    let formDiv = document.querySelector('.form');

    if (checkInputsEmpty()) {
        let formGroup = document.createElement('div');
        formGroup.className = "form-group";


        let inputNome = document.createElement('input');
        inputNome.placeholder = 'Nome do Produto';


        let inputValor = document.createElement('input');
        inputValor.type = "number";
        
        if(choice === 'percentual')
            inputValor.placeholder = 'Percentual Mínimo'
        else
            inputValor.placeholder = 'Valor Mínimo'


        let infoInSpan = document.createElement('span');
        infoInSpan.className = "remove-x";
        infoInSpan.addEventListener('click', () => {removeItem(infoInSpan)})
        infoInSpan.textContent = 'X';



        formGroup.appendChild(inputNome)
        formGroup.appendChild(inputValor)
        formGroup.appendChild(infoInSpan)

        formDiv.appendChild(formGroup)
    } else {
        alert("Preencha todos os campos antes de adicionar um novo produto.");
    }
});

function startServer(){

    let objects = [];

    const forms = document.querySelectorAll('.form-group');
    forms.forEach(form => {
        let inputs = form.querySelectorAll('input');
        let inputNome = inputs[0].value;
        let inputValor = inputs[1].value;

        let obj = {
            nome: inputNome,
            valor: inputValor,
            choice: choicewha
        }
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

}