# Me Salva! Front Platform (Next)

**Front Platform Next** é um projeto que usa o [Next.js](https://nextjs.org/) como framework e é responsável pela maior parte da nossa plataforma B2C.

### Ambientes homologados:

- [front-platform-next production](https://front-front-platform-next.herokuapp.com)
- [front-platform-next develop](https://front-front-platform-next-qa.herokuapp.com)

# Tabela de Conteúdo

- [Sobre](#sobre)
- [Tabela de Conteúdo](#tabela-de-conteudo)
- [Instalação](#instalacao)
  - [Pré-requisitos](#pre-requisitos)
  - [Organização dos arquivos](#organizacao-dos-arquivos)
- [Testes](#testes)
- [Publicação](#publicacao)
- [Tecnologias](#tecnologias)

# Instalação <a name="instalacao"></a>

Para rodar o projeto você precisa clonar a aplicação em usa máquina:

```bash
# Clone este repositório
$ git clone git@github.com:mesalva/front-platform-next.git

# Acesse a pasta do projeto no terminal/cmd
$ cd front-platform-next

# Instale as dependências
$ yarn

# Atualize o arquivo .env
# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# A aplicação inciará na porta 3000 em <http://localhost>
```

## Pre-requisitos <a name="pre-requisitos"></a>

- Git
- Node.js >= 14 <= 16 (Recomendado)
- Yarn >= 1 <= 2
- `localhost` vinculado ao `localhost` (isso é necessário para evitar problemas relacionados a CORS)

```shell-session
$ sudo echo "127.0.0.1 localhost localhost" | sudo tee -a /etc/hosts # Linux/macOS/WSL
```

```batch
echo 127.0.0.1 localhost >> %WinDir%\system32\drivers\etc\hosts
```

Os seguintes padrões foram adotados e devem ser seguidos:

- [Conventional Commits](https://www.conventionalcommits.org)
- [BEM](https://en.bem.info/methodology/quick-start/)

## Organização dos arquivos <a name="organizacao-dos-arquivos"></a>

:warning: incompleto

O projeto está organizado da seguinte maneira:

```bash
📦src
 ┣ 📂components
 ┣ 📂configs
 ┣ 📂contexts
 ┣ 📂dictionary
 ┣ 📂helpers # métodos e helpers
 ┣ 📂libs
 ┣ 📂pages
 ┣ 📂requests
 ┣ 📂store
 ┣ 📂styles # estilos dos componentes e import de variáveis e tokens
 ┗ 📂configs
```

## Como usar a Store

Para facilitar o gerenciamento de estados, foi utilizada uma abstração dos hooks do react, por meio da lib `react-hooks-global-state`. Dentro dos exemplos de uso da lib, a solução foi baseada no [exemplo de actions](https://github.com/dai-shi/react-hooks-global-state/tree/main/examples/03_actions). No entanto, algumas melhorias forma criadas para facilitar ainda mais o uso dos estados. Veja o exemplo:

```tsx
// src/front/components/pages/example.tsx
import { StoreType, useStore } from "@/store";

function ExamplePage() {
  const [user, setUser] = useStore(StoreType.User);

  const handleClick = () => {
    setUser({ ...user, name: "Fulano" });
  };

  return (
    <div>
      <h3>Nome: {user.name}</h3>
      <button onClick={handleClick}>Mudar o nome para Fulano</button>
    </div>
  );
}
```

outra forma de alterar o estado, é usando as actions:

```tsx
import { StoreType, useStore, UserStore } from "@/store";

function ExamplePage() {
  const [user] = useStore(StoreType.User);

  const handleClick = () => {
    UserStore.update({ name: "Fulano" });
  };

  return (
    <div>
      <h3>Nome: {user.name}</h3>
      <button onClick={handleClick}>Mudar o nome para Fulano</button>
    </div>
  );
}
```

## Como criar um novo componente

Um componente dentro do projeto deve seguir extritamente a seguinte organização:

```bash
📂 Button # diretório deve seguir o padrão CamelCase
 ┣ 📜calendar.component.tsx # componente react
 ┣ 📜calendar.types.ts # contém todos os tipos do componente
 ┣ 📜button.test.ts # teste unitário
 ┣ 📜button.stories.tsx # contém a documentação do componente
 ┣ 📜button.styles.scss # contém os estilos no padrão BEM
 ┗ 📜index.ts # exporta o componente como default
```

Além disso todos os arquivos `.scss` devem ser importado dentro do arquivo `src/front/styles/components.scss`.

### Muita coisa para lembrar né?

:warning: não implementado ainda

Por isso foi criado um script para te ajudar nesse passo. Para isso basta ir para o terminar e digitar os seguintes comandos:

```bash
# Script para gerar criar novo componente
$ yarn new-component

# Qual o nome do componente?
# Informar a pasta e o nome em kebab-case
$ [diretorio-dentro-de-src]/[nome-do-component]

# Confirmar a criação? [*/N]
$

# Done: components reindex
# Done: styles reindex
# Success
```

Pronto agora o componente foi criado e registrado dentro os arquivos de styles e componentes.

## Como fazer a indexação automática

:warning: não implementado ainda

```bash
# Script para atualizar os arquivos scss e index.ts
$ yarn reindex
```

# Testes <a name="testes"></a>

## Testes unitários e funcionais

:warning: não implementado ainda

Os testes da aplicação usam o [RTL (React Testing Library)](https://testing-library.com/docs/react-testing-library), que trabalham em conjunto com o [Jest](https://jestjs.io/pt-BR/) e o [React Test Utils](https://reactjs.org/docs/test-utils.html).

Os arquivos de testes unitários devem seguir a extensão `.spec.ts`, enquanto os testes funcionais de componentes devem seguir a seguinte extensão `.test.tsx`.

```bash
# Rodando os testes
$ yarn test

# Rodando os testes com watch
$ yarn test:watch

# Rodando os testes com coverage
$ yarn test:coverage

# Rodando os testes end-to-end
$ yarn test:e2e
```

# Publicação <a name="publicacao"></a>

:warning: Em construção

# Tecnologias <a name="tecnologias"></a>

- [TypeScript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/en)
- [axios](https://axios-http.com)
- [swr](https://swr.vercel.app)
- [React](https://pt-br.reactjs.org)
- [Next.js](https://nextjs.org)
- [Sass](https://sass-lang.com)
- [Jest](https://jestjs.io/pt-BR)
- [RTL (React Testing Library)](https://testing-library.com/docs/react-testing-library)
- [Playwright](https://playwright.dev)
