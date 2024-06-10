# SutHub 💼

<img src="https://github.com/Antonio-Jefferson/Suthub/blob/main/assets/images/logo-suthub-white.png" alt="logo">

Este projeto é uma aplicação web front-end construída utilizando Vue 3 e Nuxt 3, projetada para demonstrar proficiência em práticas modernas de desenvolvimento web. A aplicação se conecta com a API pública fornecida pelo DummyJSON para buscar e exibir dados. Ela apresenta um formulário de registro de usuário com validação abrangente, uma galeria de receitas com filtragem dinâmica por tags e uma funcionalidade de busca de usuário com perfis detalhados.

## Sumário

- [SutHub 💼](#suthub-)
  - [Sumário](#sumário)
  - [Design no Figma](#design-no-figma)
  - [Deploy do Projeto](#deploy-do-projeto)
  - [Principais Recursos](#principais-recursos)
    - [Formulário de Registro de Usuário](#formulário-de-registro-de-usuário)
    - [Galeria de Receitas](#galeria-de-receitas)
    - [Busca de Usuário](#busca-de-usuário)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Quer testar o projeto na sua maquina então vem comigo](#quer-testar-o-projeto-na-sua-maquina-então-vem-comigo)
  - [1. Requisitos](#1-requisitos)
  - [2. Instalação](#2-instalação)
  - [3. Executando o Projeto](#3-executando-o-projeto)

## Design no Figma

- [Figma](https://www.figma.com/design/UFHDmdFsj4oczu3SVgKfPY/Untitled?node-id=0-1&t=nmaUfreZEztOi5sA-1)

## Deploy do Projeto

  Deploy: [ SutHub](https://suthub-gray.vercel.app/)

## Principais Recursos

### Formulário de Registro de Usuário
Um formulário que valida a entrada do usuário para os seguintes campos:
- Data de nascimento
- Nome completo
- CPF
- Espécie e raça do pet
- Renda mensal
- Detalhes de endereço

O formulário inclui atualizações dinâmicas com base nas seleções do usuário e utiliza uma pesquisa de CEP para autocompletar o endereço.

### Galeria de Receitas
Uma página que busca e exibe receitas de uma API, permitindo que os usuários filtrem as receitas por tags. Cada receita inclui:
- Nome
- Imagem
- Tags
- Ingredientes
- Instruções
- Número de porções

### Busca de Usuário
Uma página que lista os usuários em ordem alfabética e inclui uma funcionalidade de busca por nome. Cada perfil de usuário exibe:
- Foto
- Nome completo
- Data de nascimento
- Gênero
- Botão de localização para abrir a localização no Google Maps.

O projeto demonstra a integração de APIs externas, componentes de interface de usuário amigáveis e validação robusta de dados.

## Tecnologias Utilizadas

- **Nuxt.js**: Um framework Vue.js para construir aplicações renderizadas no servidor.
- **TypeScript**: Um superset do JavaScript que adiciona tipagem estática.
- **Vue.js**: Um framework JavaScript progressivo para construir interfaces de usuário.
- **Vue Router**: O roteador oficial para Vue.js.
- **Tailwind CSS**: Um framework CSS de utilidades para construir designs customizados.
- **Zod**: Uma biblioteca de declaração e validação de esquemas com foco em TypeScript.
- **Maska**: Uma biblioteca de mascaramento de entrada leve e sem dependências para Vue.js.
- **Nuxt DevTools**: Uma extensão do navegador para depurar aplicações Nuxt.js.
- **Nuxt UI**: Componentes de interface oficial para aplicações Nuxt.js.
- **Vite**: Uma ferramenta de construção rápida e servidor de desenvolvimento para projetos web modernos.

## Quer testar o projeto na sua maquina então vem comigo

## 1. Requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de começar.

## 2. Instalação

1. Clone este repositório para o seu computador:

 ```bash
git clone git@github.com:Antonio-Jefferson/Suthub.git
```

1. Navegue até o diretório do projeto:

  ```bash
  cd Suthub
  ```

1. Instale as dependências do projeto:

```bash
npm install
```

## 3. Executando o Projeto

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento local. Execute o seguinte comando:

```bash
  npm run dev
```

Isso iniciará o servidor de desenvolvimento e abrirá automaticamente o projeto em seu navegador padrão. Se não abrir automaticamente, você pode acessá-lo manualmente em `http://localhost:3000`
