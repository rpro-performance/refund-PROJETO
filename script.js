// elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")


//capturando o evento do input.
amount.oninput = () => {
    //obtem o valor atual do input remove as palavras.
    let value = amount.value.replace(/\D/g, "")

    //transfooramndo em centavos validos.
    value = Number(value) / 100
    // atualiza o valor do input.
    amount.value = value
}

function formatCurrencyBRL(value) {
    //formata a moeda pra padrao BRL.
    value = value.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL",
    })
    return value
}


form.onsubmit = (event) => {

    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //chamando a função.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        //criando um item (li) lista.
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // cria o icone da categoria.
        expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)
        
        //cria a informção da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria a categoria da despesa.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //cria um valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        // adicionar name e category na div 
        expenseInfo.append(expenseName, expenseCategory)

        //adiciona as informações do icone
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        expenseList.append(expenseItem)

        //limpa os formularios 
        formclear()

        //atualiza totais.
        updateTotals()
    } catch (error) {
        alert("não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}

//função que atualiza total.
function updateTotals() {
    try {
        const items = expenseList.children
        
        expenseQuantity.textContent = `${items.length} ${
        items.length > 1 ? "despesas" : "despesa"
        }`

        //variavel para incrementar o total.
        let total = 0 

        //percorrer cada item (li) da lista (ul)
        for (let item = 0; item < items.length; item++) {
          
            const itemAmount = items[item].querySelector(".expense-amount")
            
            //remove caracteres não númericos e substitui a virgula.
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            //converte o valor para float.
            value = parseFloat(value)

            //verifica se é um número valido.
            if (isNaN(value)) {
                return alert("não foi possivel calcular, o valor não é um número.")
            }

            total += Number(value)
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //limpa o conteudo do elemento
        expenseTotal.innerHTML = ""

        expenseTotal.append(symbolBRL, total)
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais.")
    }
}

//evento de clique.
expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-icon")) {
        const item = event.target.closest(".expense")

        item.remove()
    }
    
    updateTotals()
})

function formclear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}