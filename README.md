# Platformix Portal

Корпоративный портал для управления документами. Позволяет создавать, просматривать и искать документы через веб-интерфейс.

## Стек технологий

**Backend**
- Java 21 + Spring Boot 4
- Spring Data JPA + Hibernate
- PostgreSQL 16
- Swagger / OpenAPI

**Frontend**
- React 18 + Vite
- React Router
- Axios
- CSS Modules

**Инфраструктура**
- Docker + Docker Compose
- Nginx (раздача фронтенда + proxy к бэкенду)

## Структура проекта

```
portalProject/
├── docker-compose.yml
├── .env
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    └── src/
```

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone <repository-url>
cd portalProject
```

### 2. Создать `.env` файл в корне проекта

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=portal
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### 3. Запустить проект

```bash
docker compose up --build
```

### 4. Открыть в браузере

| Адрес | Что |
|---|---|
| http://localhost | React приложение |
| http://localhost:8080/swagger-ui.html | Swagger UI |

## API

Base URL: `http://localhost:8080`

| Метод | Эндпоинт | Описание |
|---|---|---|
| GET | `/documents` | Получить список всех документов |
| GET | `/documents?query=текст` | Поиск по документам |
| GET | `/documents/{id}` | Получить документ по ID |
| POST | `/documents` | Создать новый документ |

### Пример запроса

```bash
# Создать документ
curl -X POST http://localhost:8080/documents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Тестовый документ",
    "author": "Иван Иванов",
    "description": "Краткое описание",
    "content": "Полное содержимое документа"
  }'

# Получить все документы
curl http://localhost:8080/documents

# Поиск
curl http://localhost:8080/documents?query=договор
```

## Разработка без Docker

### Backend

```bash
cd backend
mvn spring-boot:run
```

> Убедись что PostgreSQL запущен локально и настроен `application.yml`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Фронтенд будет доступен на `http://localhost:3000`

## Остановить проект

```bash
docker compose down
```

Чтобы также удалить данные базы:

```bash
docker compose down -v
```