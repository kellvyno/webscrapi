require('dotenv').config();
const fs = require('fs');
const scrapeAmazon = require('./scraper');
const sendEmail = require('./email');

const url = 'https://www.amazon.com.br/dp/B08G4QYZ1V'; // Altere para o link desejado

(async () => {
  const data = await scrapeAmazon(url);

  if (data) {
    let template = fs.readFileSync('template.html', 'utf8');
    template = template
      .replace('{{title}}', data.title)
      .replace('{{price}}', data.price)
      .replace('{{link}}', data.link);

    await sendEmail({
      to: 'destinatario@email.com',
      subject: 'Informações do produto da Amazon',
      html: template
    });

    console.log('Email enviado com sucesso!');
  } else {
    console.log('Falha ao obter dados do produto.');
  }
})();
