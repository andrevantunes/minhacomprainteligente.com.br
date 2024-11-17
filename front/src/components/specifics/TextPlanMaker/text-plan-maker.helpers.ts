export const minLength = 1;

export const printTextPlan = ({
  topic,
  ideas,
  thesis,
  firstArgument,
  secondArgument,
  agent,
  action,
  means,
  aim,
}: any) => {
  if (typeof window === "undefined") return;

  const HTML = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" class="next-head">
        <title>Plano de texto - Me Salva!</title>
        <style>
          body{
            font-family: Helvetica, Helvetica Neue, Arial;
            margin: .4in;
          }

          p{
            color: #4b5563;
          }

          h1{ text-align: center; }
          .tabbed p, .tabbed h3{
            padding-left: 28px;
          }
        </style>
        <style type="text/css" media="print"> body { margin:0px; } </style>
      </head>
      <body style="background-color: white;">
        <div>
          <h1>Plano de texto</h1>
          ${topic ? `<h2>Tema</h2><p>${topic}</p>` : ""}
          <h2>Ideias</h2>
          <p>${ideas}</p>
          <h2>Tese</h2>
          <p>${thesis}</p>
          <h2>Primeiro Argumento</h2>
          <p>${firstArgument}</p>
          <h2>Segundo Argumento</h2>
          <p>${secondArgument}</p>
          <h2>Proposta de intervenção</h2>
          <div class="tabbed">
            <h3>Agente</h3>
            <p>${agent}</p>
            <h3>Ação</h3>
            <p>${action}</p>
            <h3>Meio</h3>
            <p>${means}</p>
            <h3>Finalidade</h3>
            <p>${aim}</p>
          </div>
        </div>
      </body>
    </html>`;

  const win = window.open(undefined, "_blank", "height: 500, width: 500");
  if (win) {
    win.opener = null;
    win.document.write(HTML);
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 500);
  }

  return;
};
