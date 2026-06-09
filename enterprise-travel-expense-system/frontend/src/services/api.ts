import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // File upload
  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  }
}

// Export singleton instance
export const api = new ApiService();

// API Endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  
  // Employee
  employee: {
    list: '/employees',
    get: (id: string) => `/employees/${id}`,
    create: '/employees',
    update: (id: string) => `/employees/${id}`,
    delete: (id: string) => `/employees/${id}`,
    profile: '/employees/profile',
  },

  // Travel Requests
  travelRequests: {
    list: '/travel-requests',
    get: (id: string) => `/travel-requests/${id}`,
    create: '/travel-requests',
    update: (id: string) => `/travel-requests/${id}`,
    delete: (id: string) => `/travel-requests/${id}`,
    submit: (id: string) => `/travel-requests/${id}/submit`,
    cancel: (id: string) => `/travel-requests/${id}/cancel`,
    approve: (id: string) => `/travel-requests/${id}/approve`,
    reject: (id: string) => `/travel-requests/${id}/reject`,
  },

  // Approvals
  approvals: {
    list: '/approvals',
    get: (id: string) => `/approvals/${id}`,
    approve: (id: string) => `/approvals/${id}/approve`,
    reject: (id: string) => `/approvals/${id}/reject`,
  },

  // Travel Bookings
  travelBookings: {
    list: '/travel-bookings',
    get: (id: string) => `/travel-bookings/${id}`,
    create: '/travel-bookings',
    update: (id: string) => `/travel-bookings/${id}`,
    delete: (id: string) => `/travel-bookings/${id}`,
  },

  // Expenses
  expenses: {
    list: '/expenses',
    get: (id: string) => `/expenses/${id}`,
    create: '/expenses',
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`,
    submit: (id: string) => `/expenses/${id}/submit`,
    uploadReceipt: (id: string) => `/expenses/${id}/receipt`,
  },

  // Reimbursements
  reimbursements: {
    list: '/reimbursements',
    get: (id: string) => `/reimbursements/${id}`,
    update: (id: string) => `/reimbursements/${id}`,
    process: (id: string) => `/reimbursements/${id}/process`,
  },

  // Reports
  reports: {
    travel: '/reports/travel',
    expense: '/reports/expense',
    reimbursement: '/reports/reimbursement',
    dashboard: '/reports/dashboard',
    export: (type: string) => `/reports/export/${type}`,
  },

  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
  },

  // Health
  health: '/health',
};

export default api;
