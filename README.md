### Game Inventory manager with Express JS and PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-90A93A?style=for-the-badge\&logo=ejs\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
---

## 📦 Getting Started

Follow these steps to run the project locally.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/iamzehan/Project-Inventory-Mgt.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

### 4️⃣ Open in browser

```shell
http://localhost:3000
```

### 5️⃣ Populate Database
```shell
node ./src/models/populatedb
```
### 6️⃣ Create Super User (v2.0.0 update)
```shell
node ./src/models/createUser
```
### 7️⃣ Create session table for session persist (v2.0.0 update)
```shell
node ./src/models/session
```
---

## 🗂 Project Structure

```text
Express-APP-template/
├── src
    ├── auth/               # Passport auth handler
    ├── controllers/        # Request handlers (business logic)
    ├── models/             # Database logic
    ├── routes/             # Application routes
    ├── views/              # EJS templates
    ├── public/             # Static assets (CSS, JS, images)
    ├── app.js              # App entry point
├── package.json
├── .env.example        # Environment variables example
└── README.md
```

---

## ⚙️ Available Scripts

| Command       | Description                                |
| ------------- | ------------------------------------------ |
| `npm run dev` | Starts development server with live reload |
| `npm start`   | Starts production server                   |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

> Refer to `.env.example` for required variables.

---

## 🎯 Use Cases

* `CREATE`, `UPDATE`, `DELETE`, `READ`
  - Games, Genres, Developers
* Dashboard View Information
---
## Log in Form (v2.0.0 feature)
![dashboard](readme_assets/13.png)
![dashboard](readme_assets/14.png)

## Dashboard (version 2.0.0 shows logged in user) 
![dashboard](readme_assets/15.png)
## Games Inventory Data View
![games](readme_assets/2.png)
## Developers Inventory Data view
![games](readme_assets/7.png)
## Genre Data View
![games](readme_assets/8.png)
## Game Edit Form
![games](readme_assets/3.png)
## Game Add Form
![games](readme_assets/4.png)
## Add New Genre Form
![games](readme_assets/5.png)
## Edit Genre Form
![games](readme_assets/6.png)
## Delete View
![games](readme_assets/9.png)
## Confirmation Popup Modals
### Add
![games](readme_assets/10.png)
![games](readme_assets/11.png)

### Update
![games](readme_assets/12.png)

## Dark mode (v2.1.0)
![games](readme_assets/16.gif)
---

## ⭐ Support

If this repository helped you, consider giving the repo a ⭐ on GitHub — it really helps!