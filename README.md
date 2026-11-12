# MOBILE
# Mobile

O app usa a API do Laravel em `C:\Users\49210768809\Herd\TIF`. O Laravel continua sendo o unico acesso ao MySQL (`tif`); o mobile nao conecta diretamente ao banco.

Configure a URL da API em `.env.local`, usando `.env.example` como referencia:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

Para iniciar a API na rede local, abra outro terminal na pasta do Laravel e execute:

```powershell
& "$env:USERPROFILE\.config\herd\bin\php84\php.exe" artisan serve --host=0.0.0.0 --port=8000
```

No computador, `http://localhost:8000` funciona. Em um celular fisico, substitua `localhost` em `.env.local` pelo IP do computador na rede Wi-Fi, por exemplo `http://192.168.1.20:8000`, e mantenha os dois dispositivos na mesma rede.

No Herd, selecione PHP 8.4 para o site `TIF`; a versao 8.6 atualmente ativa injeta avisos de depreciacao nas respostas JSON do site.

Inicie o app com `npm start`. O cadastro/login e a consulta/cadastro de computadores passam pela API Laravel, compartilhando os registros com o site.
