# TOJam2023

## Setup

Follow these steps to get things up and running.

1. Install dependencies

    - [Visual Studio Code](https://code.visualstudio.com/download) - Our recommended code editor. Feel free to use whatever you're comfortable with.

    - [NodeJS](https://nodejs.org/en/download)

        A Javascript runtime used for running server-side code and bundling our client-side code for distribution. See [here](./.nvmrc) for the supported version.

        Note: If you have an existing installation of NodeJS you may want to consider using a tool like [nvm-sh](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage multiple installations.

        To see which version of NodeJS you have installed, run the following in your terminal:
        ```
        node --version
        ```

1. Setup `apps/client` package

    Install dependencies:
    ```
    cd ./apps/client
    npm install
    ```

    Start dev server:
    ```
    npm run dev
    ```

    Finally, follow the URL printed in your terminal. Changes made will automatically update served website as long as this dev command is runing.

1. Setup `apps/server` package
