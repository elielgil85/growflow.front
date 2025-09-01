# PromptFlow: Guia de Manutenção e Desenvolvimento

Este documento serve como um guia abrangente para entender e manter o projeto PromptFlow. Ele é destinado a desenvolvedores (humanos e agentes de IA) que precisam navegar, modificar ou estender o aplicativo.

## 1. Visão Geral do Projeto

PromptFlow é um aplicativo de biblioteca de prompts de IA onde os usuários podem explorar, gerenciar e refinar prompts de IA. O objetivo principal é fornecer um repositório centralizado e organizado para prompts de IA, facilitando a produtividade e a criatividade.

## 2. Tecnologias Utilizadas

### Frontend
*   **Next.js:** Framework React para aplicações server-rendered.
*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **Tailwind CSS:** Framework CSS utilitário para desenvolvimento rápido de UI.
*   **Shadcn UI / Radix UI:** Coleção de componentes UI reutilizáveis, acessíveis e modernos.
*   **Zustand:** Solução de gerenciamento de estado rápida e escalável para React.

### Backend / IA
*   **Genkit AI:** Framework open-source para construção de aplicações com IA.
*   **Google AI:** Integração com serviços de IA do Google.
*   **Express.js:** Framework web Node.js minimalista e flexível (para APIs).
*   **Mongoose:** ODM para MongoDB (sugere uso de MongoDB como banco de dados).
*   **bcryptjs & jsonwebtoken:** Utilizados para autenticação e autorização de usuários.

### Outras
*   **Internacionalização (i18n):** Suporte a múltiplos idiomas via contextos e arquivos de localidade (`src/locales`).
*   **Firebase Studio:** Ambiente inicial de configuração do projeto.

## 3. Estrutura do Projeto

A seguir, uma visão detalhada da estrutura de diretórios do projeto e seus propósitos:

```
.
├── .gitignore                  # Arquivo de ignorar para Git
├── apphosting.yaml             # Configuração de hospedagem (Firebase/Google Cloud)
├── components.json             # Configuração para Shadcn UI
├── next.config.ts              # Configuração do Next.js
├── package-lock.json           # Bloqueio de dependências do npm
├── package.json                # Metadados do projeto e scripts
├── postcss.config.mjs          # Configuração do PostCSS
├── README.md                   # Visão geral do projeto (para usuários)
├── tailwind.config.ts          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
├── docs/                       # Documentação adicional do projeto
│   └── blueprint.md            # Documento de blueprint/design
└── src/                        # Código fonte principal da aplicação
    ├── ai/                     # Configurações e fluxos de IA (Genkit)
    │   ├── dev.ts              # Script de desenvolvimento Genkit
    │   ├── genkit.ts           # Configuração principal do Genkit
    │   └── flows/              # Fluxos de IA específicos
    │       └── garden-data-generation.ts # Lógica de geração de dados para o jardim (agora conceitualmente para prompts de IA)
    ├── app/                    # Páginas e layout do Next.js
    │   ├── favicon.ico         # Ícone do site
    │   ├── globals.css         # Estilos globais
    │   ├── layout.tsx          # Layout principal da aplicação
    │   ├── page.tsx            # Página inicial
    │   ├── login/              # Página de login
    │   │   └── page.tsx
    │   └── register/           # Página de registro
    │       └── page.tsx
    ├── components/             # Componentes de UI reutilizáveis
    │   ├── edit-task-sheet.tsx # Componente para edição de prompts
    │   ├── language-switcher.tsx # Componente para troca de idioma
    │   ├── plant.tsx           # Componente de prompt (visual)
    │   ├── theme-provider.tsx  # Provedor de tema
    │   ├── theme-switcher.tsx  # Componente para troca de tema
    │   ├── charts/             # Componentes de gráficos
    │   │   ├── plant-types-chart.tsx # Gráfico de categorias de prompts
    │   │   └── tasks-completed-chart.tsx # Gráfico de prompts refinados
    │   └── ui/                 # Componentes Shadcn UI / Radix UI
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       └── ... (outros componentes UI)
    │   └── views/              # Componentes de visualização de página
    │       ├── customize-view.tsx # Visualização de personalização
    │       ├── garden-view.tsx    # Visualização da biblioteca de prompts
    │       ├── stats-view.tsx     # Visualização de estatísticas
    │       └── task-list-view.tsx # Visualização da lista de prompts
    ├── constants/              # Constantes e configurações globais
    │   └── api.ts              # Constantes de API
    ├── context/                # Contextos React globais
    │   ├── auth-context.tsx    # Contexto de autenticação
    │   └── i18n-context.tsx    # Contexto de internacionalização
    ├── hooks/                  # Hooks React personalizados
    │   ├── use-mobile.tsx      # Hook para detecção de dispositivo móvel
    │   └── use-toast.ts        # Hook para notificações toast
    ├── lib/                    # Funções utilitárias e bibliotecas
    │   └── utils.ts            # Funções utilitárias gerais
    ├── locales/                # Arquivos de tradução para i18n
    │   ├── en.json             # Traduções em inglês
    │   └── pt.json             # Traduções em português
    ├── store/                  # Stores Zustand para gerenciamento de estado
    │   └── task-store.ts       # Store para gerenciamento de prompts (ainda `task-store.ts` no código)
    └── types/                  # Definições de tipos TypeScript
        └── index.ts            # Tipos globais

```

## 4. Principais Recursos

*   **Gerenciamento de Prompts de IA:** Explore, adicione e refine prompts de IA.
*   **Múltiplas Visualizações:** Alternância entre visualizações de Biblioteca de Prompts, Estatísticas e Personalização.
*   **Autenticação de Usuário:** Sistema seguro de login e registro.
*   **Internacionalização:** Suporte a múltiplos idiomas para uma experiência de usuário global.
*   **Integração com IA:** Funcionalidade central gira em torno da geração e gerenciamento de prompts de IA.

## 5. Scripts de Desenvolvimento

Utilize os seguintes scripts via `npm` para gerenciar o projeto:

*   `npm run dev`: Inicia o servidor de desenvolvimento Next.js com Turbopack na porta 9002.
*   `npm run genkit:dev`: Inicia o servidor de desenvolvimento Genkit AI.
*   `npm run genkit:watch`: Inicia o servidor de desenvolvimento Genkit AI com observação de arquivos.
*   `npm run build`: Constrói o aplicativo Next.js para produção.
*   `npm run start`: Inicia o servidor de produção Next.js.
*   `npm run lint`: Executa o ESLint para verificação de estilo e erros de código.
*   `npm run typecheck`: Realiza a verificação de tipo do TypeScript.

## 6. Como Começar

Para configurar e executar o projeto localmente:

1.  **Pré-requisitos:** Certifique-se de ter Node.js (versão recomendada: 18+) e npm (ou yarn) instalados.
2.  **Instalar Dependências:**
    ```bash
    npm install
    ```
3.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará acessível em `http://localhost:9002`.

4.  **Iniciar o Servidor de Desenvolvimento Genkit AI (Opcional, para recursos de IA):**
    ```bash
    npm run genkit:dev
    ```

## 7. Diretrizes de Manutenção

Ao realizar modificações no projeto, por favor, siga estas diretrizes para garantir a consistência e a qualidade do código:

*   **Conformidade com Convenções:** Adira estritamente às convenções de código existentes (formatação, nomenclatura, estrutura). Analise o código circundante antes de fazer alterações.
*   **Reutilização de Componentes:** Priorize a reutilização de componentes Shadcn UI/Radix UI e outros componentes existentes em `src/components`.
*   **Gerenciamento de Estado:** Utilize Zustand (`src/store`) para o gerenciamento de estado global (para prompts).
*   **Internacionalização:** Para qualquer texto visível ao usuário, utilize o sistema de internacionalização (`src/locales` e `i18n-context.tsx`).
*   **Testes:** Se aplicável, escreva ou atualize testes para cobrir suas alterações.
*   **Verificação de Qualidade:** Antes de finalizar as alterações, execute os scripts de linting e type-checking:
    ```bash
    npm run lint
    npm run typecheck
    ```
*   **Documentação:** Atualize este guia ou adicione documentação relevante se introduzir novas funcionalidades complexas ou alterar significativamente a arquitetura.
*   **Comentários:** Adicione comentários de código apenas quando necessário para explicar a *razão* por trás de uma lógica complexa, não o *que* o código faz.