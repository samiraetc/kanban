
## Stacks utilizadas no projeto

<div align="center">

![Next.JS](https://img.shields.io/badge/-%20NEXT%20JS%20-black?style=for-the-badge&logo=react&labelColor=black)
![Node](https://img.shields.io/badge/-%20NODE%2020%20-gray?style=for-the-badge&logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
</div>


## Antes de tudo

Primeiro, rode a aplicação no ambiente de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no browser para acessar a aplicação.

## Funcionalidades implementadas além dos requisitos solicitados

### BACKEND
- Rota das colunas no backend

### FRONTEND
- Os cards possuem Drag & Drop, para facilitar o transporte de um card de uma coluna para outra
- É possível editar o titulo e o conteudo do card clicando em cima dos respectivos, ou seja, não há necessidade de clicar no icone de Edit

## Requisitos solicitados

- A API que provemos deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.
- A interface gráfica será apenas uma tela, nela deve haver três colunas chamadas "To do", "Doing" e "Done".
- Os cards deve ser listados nessas colunas de acordo com o valor do campo lista presente no card. Os valores de lista devem ser "ToDo", "Doing" e "Done", respectivamente.
- Deve haver um local que permita criar um card passando valores para o titulo e conteudo, deve haver um botão para adicionar o card.
- Um novo card deve sempre cair na lista "To Do" após persistido na API.
- O card deverá ter dois modos: Visualização e Edição.
- No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões.
- O conteudo do card pode ser markdown, utilize uma biblioteca para renderizá-lo no modo de visualização (recomendamos uma combinação de dompurify e marked). Lembre-se de estilizar o html resultante do parse do markdown... [Se quiser usar highlight para campos de código no markdown será um diferencial].
- Um dos botões do card deverá excluí-lo (persistindo pela API), outro colocá-lo em modo de edição.
- Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.
- No modo de edição, o card conterá um input para o titulo, um textarea para o conteudo e dois botões.
- No modo de edição, um dos botões cancela a edição, quando precionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.
- O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida.
- Toda decisão de visual, de UI e UX é sua. Apenas utilize uma única tela.
- Se estiver usando REACT priorize componentes funcionais e hooks.
- O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.



