// Email template for contact form notifications
function getContactEmailHTML(formData) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #0A0A0A;
      color: #FFFFFF;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: linear-gradient(135deg, rgba(176, 38, 255, 0.1) 0%, rgba(10, 10, 10, 0.95) 100%);
      border: 1px solid rgba(176, 38, 255, 0.3);
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #B026FF 0%, #D946EF 100%);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .content {
      padding: 40px 30px;
    }
    .field {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(176, 38, 255, 0.2);
    }
    .field:last-child {
      border-bottom: none;
    }
    .label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #B026FF;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .value {
      font-size: 16px;
      color: #FFFFFF;
      line-height: 1.6;
    }
    .message-box {
      background: rgba(176, 38, 255, 0.05);
      border: 1px solid rgba(176, 38, 255, 0.2);
      border-radius: 8px;
      padding: 20px;
      margin-top: 10px;
    }
    .footer {
      background: rgba(26, 26, 26, 0.8);
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #B0B0B0;
    }
    .badge {
      display: inline-block;
      background: rgba(176, 38, 255, 0.2);
      color: #D946EF;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Nová poptávka z portfolia</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Jméno</div>
        <div class="value">${formData.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Email</div>
        <div class="value">
          <a href="mailto:${formData.email}" style="color: #D946EF; text-decoration: none;">
            ${formData.email}
          </a>
        </div>
      </div>
      
      ${formData.phone ? `
      <div class="field">
        <div class="label">Telefon</div>
        <div class="value">
          <a href="tel:${formData.phone}" style="color: #D946EF; text-decoration: none;">
            ${formData.phone}
          </a>
        </div>
      </div>
      ` : ''}
      
      ${formData.service ? `
      <div class="field">
        <div class="label">Typ služby</div>
        <div class="value">
          <span class="badge">${getServiceName(formData.service)}</span>
        </div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Zpráva</div>
        <div class="message-box">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
    <div class="footer">
      Odesláno z portfolia FilipHirt.cz • ${new Date().toLocaleString('cs-CZ')}
    </div>
  </div>
</body>
</html>
  `;
}

function getServiceName(serviceCode) {
    const services = {
        'smart-web': 'Chytrý Web s AI',
        'eshop': 'Online Obchod',
        'restaurant': 'Web pro Restauraci',
        'corporate': 'Firemní Prezentace',
        'other': 'Jiné'
    };
    return services[serviceCode] || serviceCode;
}

module.exports = { getContactEmailHTML };
