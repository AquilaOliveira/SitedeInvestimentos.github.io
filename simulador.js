document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtenção dos valores do formulário
    let amount = parseFloat(document.getElementById("amount").value);
    let monthly = parseFloat(document.getElementById("monthly").value) || 0;
    let duration = parseInt(document.getElementById("duration").value);
    let interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    let dividendRate = parseFloat(document.getElementById("dividend-rate").value) / 100 || 0;
    let investmentType = document.getElementById("investment-type").value;
    let calculationType = document.getElementById("calculation-type").value;

    if (isNaN(amount) || isNaN(duration) || isNaN(interestRate)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    let finalAmount = amount;

    // Definindo rendimento específico para cada tipo de investimento
    if (investmentType === "renda-fixa") {
        interestRate = 0.08; // 8% ao ano para renda fixa
    } else if (investmentType === "acoes") {
        interestRate = 0.12; // 12% ao ano para ações (exemplo)
    } else if (investmentType === "criptomoedas") {
        interestRate = 0.25; // 25% ao ano para criptomoedas (exemplo)
    } else if (investmentType === "tesouro-direto") {
        interestRate = 0.10; // 10% ao ano para Tesouro Direto (exemplo)
    } else if (investmentType === "fundos-imobiliarios") {
        interestRate = 0.10; // 10% ao ano para Fundos Imobiliários (FII)
    } else if (investmentType === "cdb") {
        interestRate = 0.09; // 9% ao ano para CDB
    } else if (investmentType === "lci-lca") {
        interestRate = 0.085; // 8.5% ao ano para LCI/LCA
    } else if (investmentType === "debentures") {
        interestRate = 0.11; // 11% ao ano para Debêntures
    }

    // Cálculo com base no tipo de cálculo selecionado
    if (calculationType === "compostos") {
        // Juros Compostos
        for (let i = 0; i < duration; i++) {
            finalAmount += monthly * 12; // Contribuições anuais
            finalAmount *= (1 + interestRate); // Juros compostos
            finalAmount += finalAmount * dividendRate; // Dividendos
        }
    } else if (calculationType === "simples") {
        // Juros Simples
        let totalInterest = amount * interestRate * duration;
        finalAmount = amount + totalInterest + (monthly * 12 * duration); // Juros simples e contribuições mensais
        finalAmount += finalAmount * dividendRate; // Dividendos
    } else if (calculationType === "dividendos") {
        // Cálculo apenas para Dividendos
        let totalDividends = amount * dividendRate * duration;
        finalAmount = amount + totalDividends + (monthly * 12 * duration); // Dividendos
    }

    // Exibição do resultado
    let resultText = `Após ${duration} ano(s), seu investimento de R$ ${amount.toFixed(2)} será de R$ ${finalAmount.toFixed(2)} com as contribuições mensais de R$ ${monthly.toFixed(2)} e considerando o tipo de investimento: ${investmentType}.`;
    document.getElementById("investment-result").innerText = resultText;
    document.getElementById("result").style.display = "block";
});
