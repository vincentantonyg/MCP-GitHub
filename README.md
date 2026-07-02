# RAG Mongo Demo with DeepEval

A full-stack demonstration application for storing, retrieving, and evaluating generated test cases using MongoDB Atlas Vector Search and DeepEval.

This application consists of three main components:
1. **React Frontend (Client)**: A modern user interface for managing documents, executing queries, and viewing evaluation metrics.
2. **Node.js Backend (Server)**: Connects to MongoDB, manages file uploads, and coordinates RAG pipelines.
3. **FastAPI DeepEval Server (llm-eval-providers)**: A Python sidecar service that computes evaluation metrics (such as faithfulness, answer relevancy, contextual precision/recall, and hallucination detection).

---

## 📋 Prerequisites

Before running the application, make sure you have the following installed:
* **Node.js** (v18.0 or higher)
* **npm** (v9.0 or higher)
* **Python** (v3.9 or higher) and `pip`
* A **MongoDB Atlas** database connection string (with Vector Search index configured)
* **API Keys**:
  * **Mistral AI API Key** (for generating embeddings)
  * **Groq API Key** (for generation, summarization, and reranking)

---

## 🛠️ Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone & Initialize Environment
Clone the repository and copy the environment template to create a `.env` file at the root:
```bash
cp .env.example .env
```
Ensure your `.env` contains your correct API keys and database strings.
> [!IMPORTANT]
> The backend server port is configured as `PORT=3001` in the `.env` file to match the frontend client's API base URL (`http://localhost:3001/api`). Do not change it to `3000` as it will clash with the React dev server.

### 2. Install Node.js Dependencies
Install all root Node.js packages (which will automatically trigger frontend package installation via `postinstall`):
```bash
npm install
```

### 3. Install Python Dependencies
Install the required Python packages from the root using our automated installer script:
```bash
npm run install-python-deps
```
This script automatically detects your active Python launcher (`python`, `python3`, or `py`) and runs the appropriate `pip` command to install requirements.

---

## 🚀 Running the Application

To start the entire stack (React client, Node backend, and FastAPI python server) concurrently with a single command, run:
```bash
npm run dev
```

This starts:
* **React Client**: [http://localhost:3000](http://localhost:3000)
* **Node.js Backend**: [http://localhost:3001](http://localhost:3001)
* **DeepEval Python Server**: [http://localhost:8000](http://localhost:8000)

Once running, you can open your browser to [http://localhost:3000](http://localhost:3000) to interact with the application.

---

## 📁 Project Architecture & Run Scripts

```
rag-mongo-demo-deepeval/
├── client/                     # React Frontend
├── server/                     # Node.js Express Backend
├── llm-eval-providers/         # Python FastAPI DeepEval Server
├── scripts/                    # Unified startup/installation scripts
│   ├── install-python-deps.js  # Auto-installs Python packages
│   └── run-python-server.js    # Launches FastAPI evaluation service
├── requirements.txt            # Python dependencies
├── package.json                # Root package configurations
└── .env                        # Root environment variables
```

### Available npm Commands (from root)

* `npm run dev`: Starts Express Backend, React Frontend, and FastAPI DeepEval server concurrently.
* `npm run install-python-deps`: Detects the installed Python version and runs pip install for `requirements.txt`.
* `npm run python-server`: Launches the FastAPI server standalone.
* `npm run server`: Launches the Express Node.js server standalone.
* `npm run client`: Launches the React frontend standalone.
