const invoice = require('./invoices');

console.log(statement(invoice));

function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        }).format;

    for (let i = 0; i < invoice.performance.length; i++) {
        const performance = invoice.performance[i];
        let thisAmount = 0;
        switch (performance.type) {
            case "tragedy":
                thisAmount = 40000;
                if (performance.audience > 30) {
                    thisAmount += 1000 * (performance.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (performance.audience > 20) {
                    thisAmount += 10000 + 500 * (performance.audience - 20);
                }
                thisAmount += 300 * performance.audience;
                break;
            default:
                throw new Error(`неизвестный тип пьесы: ${performance.type}`);
        }
        // Добавление бонусов
        volumeCredits += Math.max(performance.audience - 30, 0);
        // Дополнительный бонус за каждые 5 мест на комедию
        if ("comedy" === performance.type) volumeCredits += Math.floor(performance.audience / 5);
        // Добавляем к строке результата информацию по каждому произведению
        result += ` ${performance.playId}: ${format(thisAmount)}`;
        result += ` (${performance.audience} мест)\n`;
        totalAmount += thisAmount;
    }
    // Добавляем к строке результата итоговый счет и начисленные бонусы
    result += `Итого с вас ${format(totalAmount)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    // Вывод получившейся строки
    return result;
}
