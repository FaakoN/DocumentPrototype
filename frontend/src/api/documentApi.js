import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/documents',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Нет ответа от сервера: обрыв сети / CORS / сервер недоступен
      return Promise.reject(
        new Error('Сервер недоступен. Проверьте подключение к сети.'),
      );
    }

    const { status, data } = error.response;

    switch (status) {
      case 400: {
        // ErrorResponse.fieldErrors: { field: message } | ErrorResponse.message
        const message = data?.fieldErrors
          ? Object.entries(data.fieldErrors)
              .map(([field, msg]) => `${field}: ${msg}`)
              .join('; ')
          : (data?.message ?? 'Некорректные данные запроса.');
        return Promise.reject(new Error(message));
      }

      case 404:
        return Promise.reject(new Error(data?.message ?? 'Документ не найден.'));

      case 409:
        return Promise.reject(new Error('Конфликт: документ уже существует.'));

      case 500:
        return Promise.reject(
          new Error('Внутренняя ошибка сервера. Попробуйте позже.'),
        );

      default:
        return Promise.reject(
          new Error(data?.message ?? `Неизвестная ошибка (${status}).`),
        );
    }
  },
);

export const getAllDocuments = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await apiClient.post('/', documentData);
  return response.data;
};

export default apiClient;
