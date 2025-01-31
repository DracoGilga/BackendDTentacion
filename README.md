# 🚀 API GraphQL (v2) for D.Tentacion 🍰
This project is the second version of the API for **D.Tentacion**, a pastry shop. Now, it is developed using **GraphQL** instead of REST, with **Node.js** and **TypeScript**, using **Apollo Server** as the GraphQL server, **SQL Server** as the database, and **Redis** for performance optimization.🎉

If you want to check out the first version of the API (REST API), you can find it here: 
([ApiTentacion_V1.0] (https://github.com/DracoGilga/ApiTentacion))

## ✨ Author

- César González López ([DracoGilga](https://github.com/DracoGilga))

## 👩‍💻👨‍💻 Contributors

<a href="https://github.com/DracoGilga/BackendDTentacion/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DracoGilga/BackendDTentacion" />
</a>

## 🛠️ Requirements

- **Node.js** vversion 23 or later.
- **SQL Server** as the database.
- **Redis** for caching.

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DracoGilga/BackendDTentacion.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BackendDTentacion
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## ⚠️ Environment Variables

**It is essential to configure environment variables for the API to work properly.**

1. To ensure the correct functioning of the API, create a .env file in the root of the project and define the following environment variables:

### Development

   ```bash
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=
    DB_PORT=

    REDIS_HOST=
    REDIS_PORT=
    REDIS_PASSWORD=
    REDIS_EXPIRATION_TIME_MINUTES=
   ```

### Testing

   ```bash
    TEST_DB_HOST=
    TEST_DB_USER=
    TEST_DB_PASSWORD=
    TEST_DB_DATABASE=
    TEST_DB_PORT=

    TEST_REDIS_HOST=
    TEST_REDIS_PORT=
    TEST_REDIS_PASSWORD=
    TEST_REDIS_EXPIRATION_TIME_MINUTES=
   ```

### Production

    ```bash
    PROD_DB_HOSTNAME=
    PROD_DB_USER=
    PROD_DB_PASSWORD=
    PROD_DB_DATABASE=
    PROD_DB_PORT=

    PROD_REDIS_HOST=
    PROD_REDIS_PORT=
    PROD_REDIS_PASSWORD=
    PROD_REDIS_EXPIRATION_TIME_MINUTES=
    ```

### JWT Configuration

    ```bash
    JWT_SECRET=
    JWT_EXPIRATION_TIME=
    ```

### Security Configuration

    ```bash
    JWT_SECRET=
    JWT_EXPIRATION_TIME=
    ```

## 🖥️ Usage

The project includes a command-line interface (CLI) that allows you to choose between running migrations or starting the server when executing npm start.

### Available Commands
| Command          | Description |
|-----------------|-------------|
| `npm start`     | Runs an interactive CLI to choose between migrating the database or starting the server. |
| `npm run migrate` | Runs the latest database migrations using Knex. |
| `npm run server` | Starts the GraphQL server. |
| `npm run dev`   | Starts the server in development mode (`NODE_ENV=development`). |
| `npm run test`  | Runs tests using Jest in test mode (`NODE_ENV=test`). |
| `npm run prod`  | Starts the server in production mode (`NODE_ENV=production`). |

### Running in Different Environments
The application supports different environments:

#### 1️⃣ Development (default)
If no environment is specified, the app runs in development mode:

    ```bash
    npm run dev
    ```

#### 2️⃣ Production Mode
For production deployments, set NODE_ENV=production to ensure the correct configuration is used:

    ```bash
    npm run prod
    ```
In a cloud or containerized environment, NODE_ENV=production should be set in the system environment variables instead of passing it in the command

## 🤝 Contributions

Suggestions and contributions are welcome! If you want to contribute, follow these steps:

1. **Fork** the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature_name`.
3. Make your changes and **commit:** `git commit -m 'Add new feature'`.
4. Push the changes to your fork: `git push origin my-new-feature`.
5. Open a **pull request** on GitHub.

## 📜 License

This project is licensed under a **Custom Software License**. See the [LICENSE](LICENSE) file for details.
