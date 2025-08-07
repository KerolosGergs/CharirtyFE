import { Environment } from "../../../Environment/environment";


/**
 * API Routes Configuration
 * Centralized configuration for all backend API endpoints
 */
export class ApiRoutes {
  private static baseUrl = Environment.apiUrl;

  /**
   * Dynamic Page Management API Routes
   */
  static readonly DynamicPages = {
    // Public endpoints (no authentication required)
    getAll: `${this.baseUrl}dynamicpage`,
    getAllActive: `${this.baseUrl}dynamicpage/active`,
    getById: (id: number) => `${this.baseUrl}dynamicpage/${id}`,
    getBySlug: (slug: string) => `${this.baseUrl}dynamicpage/slug/${slug}`,
    getItems: (id: number) => `${this.baseUrl}dynamicpage/${id}/items`,

    // Admin endpoints (require authentication)
    create: `${this.baseUrl}dynamicpage/Create`,
    update: (id: number) => `${this.baseUrl}dynamicpage/${id}`,
    delete: (id: number) => `${this.baseUrl}dynamicpage/${id}`,
    toggleActive: (id: number) => `${this.baseUrl}dynamicpage/${id}/toggle-active`,
    uploadFile: `${this.baseUrl}dynamicpage/upload`,
    deleteFile: `${this.baseUrl}dynamicpage/delete-file`,
  };

  /**
   * Authentication API Routes
   */
  static readonly Auth = {
    login: `${this.baseUrl}authentication/login`,
    register: `${this.baseUrl}authentication/register`,
    refreshToken: `${this.baseUrl}authentication/refresh-token`,
    forgotPassword: `${this.baseUrl}authentication/forgot-password`,
    resetPassword: `${this.baseUrl}authentication/reset-password`,
    changePassword: `${this.baseUrl}authentication/change-password`,
    logout: `${this.baseUrl}authentication/logout`,
  };

  /**
   * User Management API Routes
   */
  static readonly Users = {
    getAll: `${this.baseUrl}user`,
    getById: (id: string) => `${this.baseUrl}user/${id}`,
    create: `${this.baseUrl}user`,
    update: (id: string) => `${this.baseUrl}user/${id}`,
    delete: (id: string) => `${this.baseUrl}user/${id}`,
    getProfile: `${this.baseUrl}user/profile`,
    updateProfile: `${this.baseUrl}user/profile`,
  };

  /**
   * Advisor Management API Routes
   */
  static readonly Advisors = {
    getAll: `${this.baseUrl}advisor`,
    getById: (id: number) => `${this.baseUrl}advisor/${id}`,
    create: `${this.baseUrl}advisor`,
    update: (id: number) => `${this.baseUrl}advisor/${id}`,
    delete: (id: number) => `${this.baseUrl}advisor/${id}`,
    getAvailable: `${this.baseUrl}advisor/available`,
    getSchedule: (id: number) => `${this.baseUrl}advisor/${id}/schedule`,
  };

  /**
   * Consultation Management API Routes
   */
  static readonly Consultations = {
    getAll: `${this.baseUrl}consultation`,
    getById: (id: number) => `${this.baseUrl}consultation/${id}`,
    create: `${this.baseUrl}consultation`,
    update: (id: number) => `${this.baseUrl}consultation/${id}`,
    delete: (id: number) => `${this.baseUrl}consultation/${id}`,
    getByUser: (userId: string) => `${this.baseUrl}consultation/user/${userId}`,
    getByAdvisor: (advisorId: number) => `${this.baseUrl}consultation/advisor/${advisorId}`,
  };

  /**
   * News Management API Routes
   */
  static readonly News = {
    getAll: `${this.baseUrl}news`,
    getById: (id: number) => `${this.baseUrl}news/${id}`,
    create: `${this.baseUrl}news`,
    update: (id: number) => `${this.baseUrl}news/${id}`,
    delete: (id: number) => `${this.baseUrl}news/${id}`,
    getPublished: `${this.baseUrl}news/published`,
    publish: (id: number) => `${this.baseUrl}news/${id}/publish`,
    unpublish: (id: number) => `${this.baseUrl}news/${id}/unpublish`,
  };

  /**
   * Complaint Management API Routes
   */
  static readonly Complaints = {
    getAll: `${this.baseUrl}complaint`,
    getById: (id: number) => `${this.baseUrl}complaint/${id}`,
    create: `${this.baseUrl}complaint`,
    update: (id: number) => `${this.baseUrl}complaint/${id}`,
    delete: (id: number) => `${this.baseUrl}complaint/${id}`,
    getByUser: (userId: string) => `${this.baseUrl}complaint/user/${userId}`,
    updateStatus: (id: number) => `${this.baseUrl}complaint/${id}/status`,
  };

  /**
   * Volunteer Management API Routes
   */
  static readonly Volunteers = {
    getAll: `${this.baseUrl}volunteer`,
    getById: (id: number) => `${this.baseUrl}volunteer/${id}`,
    create: `${this.baseUrl}volunteer`,
    update: (id: number) => `${this.baseUrl}volunteer/${id}`,
    delete: (id: number) => `${this.baseUrl}volunteer/${id}`,
    getApplications: `${this.baseUrl}volunteer/applications`,
    approveApplication: (id: number) => `${this.baseUrl}volunteer/applications/${id}/approve`,
    rejectApplication: (id: number) => `${this.baseUrl}volunteer/applications/${id}/reject`,
  };

  /**
   * Help Request Management API Routes
   */
  static readonly HelpRequests = {
    getAll: `${this.baseUrl}helprequest`,
    getById: (id: number) => `${this.baseUrl}helprequest/${id}`,
    create: `${this.baseUrl}helprequest`,
    update: (id: number) => `${this.baseUrl}helprequest/${id}`,
    delete: (id: number) => `${this.baseUrl}helprequest/${id}`,
    getByUser: (userId: string) => `${this.baseUrl}helprequest/user/${userId}`,
    updateStatus: (id: number) => `${this.baseUrl}helprequest/${id}/status`,
  };

  /**
   * File Upload API Routes
   */
  static readonly FileUpload = {
    upload: `${this.baseUrl}fileupload`,
    delete: (fileUrl: string) => `${this.baseUrl}fileupload?fileUrl=${encodeURIComponent(fileUrl)}`,
    getByType: (fileType: string) => `${this.baseUrl}fileupload/type/${fileType}`,
  };

  /**
   * Dashboard API Routes
   */
  static readonly Dashboard = {
    getStats: `${this.baseUrl}dashboard/stats`,
    getRecentActivity: `${this.baseUrl}dashboard/recent-activity`,
    getCharts: `${this.baseUrl}dashboard/charts`,
    getNotifications: `${this.baseUrl}dashboard/notifications`,
  };

  /**
   * Utility method to build query parameters
   */
  static buildQueryParams(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Utility method to build URL with query parameters
   */
  static buildUrl(baseUrl: string, params?: Record<string, any>): string {
    if (!params) return baseUrl;
    return `${baseUrl}${this.buildQueryParams(params)}`;
  }
} 