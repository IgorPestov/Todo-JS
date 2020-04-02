const AddItem = document.getElementById('add-item');
const TextItem = document.getElementById('text-item');
const ListItem = document.getElementById('list-item');
const containerInput = document.querySelectorAll('.container-input .radio')
let Items = [];
let item = {};
let color = document.querySelector('.container-input .radio').style.backgroundColor;
if (localStorage.getItem('todo')) {
    Items = JSON.parse(localStorage.getItem('todo'));
    displayItems();
}


document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        if (TextItem.value) {
            addItem();

        }
    }
});
AddItem.onclick = function () {
    addItem();
};
let complete ;
function addItem() {

    if (TextItem.value) {
        item = {
            Item: TextItem.value,
            Checked: false,
            Id: null,
            color: color,
            Complete: complete

        };
        Items.push(item);

        displayItems();
        TextItem.value = '';
    }
}

function displayItems() {
    if (Items.length === 0) ListItem.innerHTML = '';
    let displayItem = '';
    Items.forEach(function (name, i) {

        displayItem += `<li id ="${createID(i)}" style="background: ${name.color}" class="list">
              <p id="${createID(i)}" class="span-checkbox"><input id="${createID(i)}" class="checkbox active" type="checkbox" ${name.Checked ? 'checked' : ''}></p>            
              <label style="text-decoration:${name.complete}" id="${createID(i)}" class="label active" ondblclick="Edit();">${name.Item}</label>
              <input id ="${createID(i)}" class="editing text" type="text" style="background:${name.color}" >
              <input id ="${createID(i)}" class="button delete active" type="button" value="Delete">             
            </li>`;
        ListItem.innerHTML = displayItem;
        item.Id = i;
        localStorage.setItem('todo', JSON.stringify(Items));
    });

}

function Edit() {
    let textInputBack = event.srcElement;
    textInputBack.style.display = 'none';
    let textInput = event.currentTarget.nextSibling.nextSibling;
    textInput.style.display = 'inline';
    textInput.focus(focusin());
    textInput.value = event.target.textContent;

    function focusin() {
        textInput.addEventListener('focusin', function () {

                Items.forEach(function (name, i) {

                    window.addEventListener('keypress', function (e) {
                        if (e.keyCode === 13) {
                            if(textInput.value) {
                            if (e.target.id.split('_')[0] === `${i}`) {
                                name.Item = textInput.value;

                            } }
                            displayItems();
                            localStorage.setItem('todo', JSON.stringify(Items));
                        }
                    });


                });


        });
    } ;

    textInput.addEventListener('focusout', function (e) {

           Items.forEach(function (name, i) {
          if(textInput.value) {
              if (e.target.id.split('_')[0] === `${i}`)
                  name.Item = textInput.value;
                  }

              displayItems();
              localStorage.setItem('todo', JSON.stringify(Items));
          });
        return Edit();
    });


}


function checkItem() {

    ListItem.addEventListener('change', function (e) {

        if (e.target.className === 'checkbox active') {
            Items.forEach(function (name, i) {
                if (e.target.id.split('')[0] === `${i}`) {
                    name.Checked = !name.Checked }
                    if (name.Checked) {
                        name.complete = 'line-through ;opacity: 0.2'}
                     else if(!name.Checked) name.complete = 'none; ';
                    localStorage.setItem('todo', JSON.stringify(Items));
                     displayItems();
            })

        }

    });
}

function deleteItem() {
    ListItem.addEventListener('click', function (e) {
        if (e.target.className === 'button delete active') {
            Items.forEach(function (name, i) {

                if (e.target.id.split('_')[0] === `${i}`) {
                    Items.splice(i, 1)
                }
                displayItems();
                localStorage.setItem('todo', JSON.stringify(Items));

            })

        }

    });
}

function choiceColorfunc() {

    containerInput.forEach(checkbox => {
        checkbox.addEventListener('click', function (event) {
            color = event.target.style.backgroundColor;
            console.log(event.target.style.backgroundColor);
        });
    });

}

checkItem();
deleteItem();
addItem();
choiceColorfunc();


function createID(value) {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return value + '_' + Math.random().toString(36).substr(2, 9);
};