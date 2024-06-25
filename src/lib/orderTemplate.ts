export const orderTemplate = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Order</title>
</head>
<body>
<h3>Інформація про замовника</h3>
<p>Ім'я: {{data.name}}</p>
<p>Номер телефону: {{data.number}}</p>
<p>Адреса: {{data.address}}</p>
<p>Коментар: {{data.comment}}</p>
<p>Загальна сума: {{data.sum}} грн.</p>
<h3>Замовлення</h3>
<div>
    {{#each data.items}}
        <p>{{this.title}} - {{this.quantity}} шт.</p>
    {{/each}}
</div>
</body>
</html>`;
