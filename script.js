// elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")
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

        // adicionar name e category na div 
        expenseInfo.append(expenseName, expenseCategory)

        //adiciona as informações do icone
        expenseItem.append(expenseIcon, expenseInfo)
        expenseList.append(expenseItem)
    } catch (error) {
        alert("não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}