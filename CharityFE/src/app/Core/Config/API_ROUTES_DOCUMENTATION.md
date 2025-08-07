# API Routes Documentation

## Overview

This document provides comprehensive documentation for all API routes and services in the Charity Frontend application. The API routes are centralized in the `ApiRoutes` configuration class and used by various services throughout the application.

## Base Configuration

### Environment Configuration
```typescript
// Environment configuration
static apiUrl: string = 'https://localhost:7121/api/';
static ImgUrl: string = 'https://localhost:7121/';
```

### ApiRoutes Class
The `ApiRoutes` class provides centralized configuration for all backend API endpoints, making it easy to maintain and update API URLs.

## API Services

### 1. Dynamic Pages API Service

**Service**: `DynamicPagesService`  
**File**: `src/app/dynamic-pages/dynamic-pages.service.ts`

#### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/dynamicpage` | Get all pages | None |
| GET | `/api/dynamicpage/active` | Get all active pages | None |
| GET | `/api/dynamicpage/{id}` | Get page by ID | None |
| GET | `/api/dynamicpage/slug/{slug}` | Get page by slug | None |
| POST | `/api/dynamicpage` | Create new page | Admin |
| PUT | `/api/dynamicpage/{id}` | Update existing page | Admin |
| DELETE | `/api/dynamicpage/{id}` | Delete page | Admin |
| PATCH | `/api/dynamicpage/{id}/toggle-active` | Toggle page active status | Admin |
| POST | `/api/dynamicpage/upload` | Upload file | Admin |
| DELETE | `/api/dynamicpage/delete-file` | Delete file | Admin |

#### Usage Example
```typescript
// Get all pages
this.dynamicPagesService.getPages().subscribe({
  next: (response) => {
    if (response.success) {
      this.pages = response.data;
    }
  }
});

// Create new page
this.dynamicPagesService.createPage(pageData).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Page created successfully');
    }
  }
});
```

### 2. Authentication API Service

**Service**: `AuthApiService`  
**File**: `src/app/Core/Services/auth-api.service.ts`

#### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/authentication/login` | User login | None |
| POST | `/api/authentication/register` | User registration | None |
| POST | `/api/authentication/refresh-token` | Refresh access token | None |
| POST | `/api/authentication/forgot-password` | Forgot password | None |
| POST | `/api/authentication/reset-password` | Reset password | None |
| POST | `/api/authentication/change-password` | Change password | User |
| POST | `/api/authentication/logout` | User logout | User |

#### Usage Example
```typescript
// Login
this.authApiService.login(credentials).subscribe({
  next: (response) => {
    if (response.success) {
      // Store token and user data
      this.authService.setSession(
        response.data.token,
        response.data.user,
        response.data.user.role,
        response.data.user.roleId
      );
    }
  }
});
```

### 3. News API Service

**Service**: `NewsApiService`  
**File**: `src/app/Core/Services/news-api.service.ts`

#### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/news` | Get all news | None |
| GET | `/api/news/published` | Get published news | None |
| GET | `/api/news/{id}` | Get news by ID | None |
| POST | `/api/news` | Create news | Admin |
| PUT | `/api/news/{id}` | Update news | Admin |
| DELETE | `/api/news/{id}` | Delete news | Admin |
| PATCH | `/api/news/{id}/publish` | Publish news | Admin |
| PATCH | `/api/news/{id}/unpublish` | Unpublish news | Admin |

#### Usage Example
```typescript
// Get published news
this.newsApiService.getPublishedNews().subscribe({
  next: (response) => {
    if (response.success) {
      this.news = response.data;
    }
  }
});

// Publish news
this.newsApiService.publishNews(newsId).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('News published successfully');
    }
  }
});
```

### 4. Complaint API Service

**Service**: `ComplaintApiService`  
**File**: `src/app/Core/Services/complaint-api.service.ts`

#### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/complaint` | Get all complaints | Admin |
| GET | `/api/complaint/{id}` | Get complaint by ID | User/Admin |
| GET | `/api/complaint/user/{userId}` | Get complaints by user | User |
| POST | `/api/complaint` | Create complaint | User |
| PUT | `/api/complaint/{id}` | Update complaint | User/Admin |
| DELETE | `/api/complaint/{id}` | Delete complaint | Admin |
| PATCH | `/api/complaint/{id}/status` | Update complaint status | Admin |

#### Usage Example
```typescript
// Create complaint
this.complaintApiService.createComplaint(complaintData).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Complaint submitted successfully');
    }
  }
});

// Update complaint status
this.complaintApiService.updateComplaintStatus(complaintId, statusData).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Complaint status updated');
    }
  }
});
```

### 5. Dashboard API Service

**Service**: `DashboardApiService`  
**File**: `src/app/Core/Services/dashboard-api.service.ts`

#### Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics | Admin |
| GET | `/api/dashboard/recent-activity` | Get recent activity | Admin |
| GET | `/api/dashboard/charts` | Get chart data | Admin |
| GET | `/api/dashboard/notifications` | Get notifications | User/Admin |

#### Usage Example
```typescript
// Get dashboard statistics
this.dashboardApiService.getDashboardStats().subscribe({
  next: (response) => {
    if (response.success) {
      this.stats = response.data;
    }
  }
});

// Get notifications
this.dashboardApiService.getNotifications().subscribe({
  next: (response) => {
    if (response.success) {
      this.notifications = response.data;
    }
  }
});
```

## Additional API Routes

### User Management
```typescript
ApiRoutes.Users.getAll                    // GET /api/user
ApiRoutes.Users.getById(id)               // GET /api/user/{id}
ApiRoutes.Users.create                    // POST /api/user
ApiRoutes.Users.update(id)                // PUT /api/user/{id}
ApiRoutes.Users.delete(id)                // DELETE /api/user/{id}
ApiRoutes.Users.getProfile                // GET /api/user/profile
ApiRoutes.Users.updateProfile             // PUT /api/user/profile
```

### Advisor Management
```typescript
ApiRoutes.Advisors.getAll                 // GET /api/advisor
ApiRoutes.Advisors.getById(id)            // GET /api/advisor/{id}
ApiRoutes.Advisors.create                 // POST /api/advisor
ApiRoutes.Advisors.update(id)             // PUT /api/advisor/{id}
ApiRoutes.Advisors.delete(id)             // DELETE /api/advisor/{id}
ApiRoutes.Advisors.getAvailable           // GET /api/advisor/available
ApiRoutes.Advisors.getSchedule(id)        // GET /api/advisor/{id}/schedule
```

### Consultation Management
```typescript
ApiRoutes.Consultations.getAll            // GET /api/consultation
ApiRoutes.Consultations.getById(id)       // GET /api/consultation/{id}
ApiRoutes.Consultations.create            // POST /api/consultation
ApiRoutes.Consultations.update(id)        // PUT /api/consultation/{id}
ApiRoutes.Consultations.delete(id)        // DELETE /api/consultation/{id}
ApiRoutes.Consultations.getByUser(userId) // GET /api/consultation/user/{userId}
ApiRoutes.Consultations.getByAdvisor(id)  // GET /api/consultation/advisor/{advisorId}
```

### Volunteer Management
```typescript
ApiRoutes.Volunteers.getAll               // GET /api/volunteer
ApiRoutes.Volunteers.getById(id)          // GET /api/volunteer/{id}
ApiRoutes.Volunteers.create               // POST /api/volunteer
ApiRoutes.Volunteers.update(id)           // PUT /api/volunteer/{id}
ApiRoutes.Volunteers.delete(id)           // DELETE /api/volunteer/{id}
ApiRoutes.Volunteers.getApplications      // GET /api/volunteer/applications
ApiRoutes.Volunteers.approveApplication(id) // POST /api/volunteer/applications/{id}/approve
ApiRoutes.Volunteers.rejectApplication(id)  // POST /api/volunteer/applications/{id}/reject
```

### Help Request Management
```typescript
ApiRoutes.HelpRequests.getAll             // GET /api/helprequest
ApiRoutes.HelpRequests.getById(id)        // GET /api/helprequest/{id}
ApiRoutes.HelpRequests.create             // POST /api/helprequest
ApiRoutes.HelpRequests.update(id)         // PUT /api/helprequest/{id}
ApiRoutes.HelpRequests.delete(id)         // DELETE /api/helprequest/{id}
ApiRoutes.HelpRequests.getByUser(userId)  // GET /api/helprequest/user/{userId}
ApiRoutes.HelpRequests.updateStatus(id)   // PATCH /api/helprequest/{id}/status
```

### File Upload
```typescript
ApiRoutes.FileUpload.upload               // POST /api/fileupload
ApiRoutes.FileUpload.delete(fileUrl)      // DELETE /api/fileupload?fileUrl={fileUrl}
ApiRoutes.FileUpload.getByType(fileType)  // GET /api/fileupload/type/{fileType}
```

## Utility Methods

### Query Parameter Building
```typescript
// Build query parameters
const params = { page: 1, size: 10, search: 'test' };
const queryString = ApiRoutes.buildQueryParams(params);
// Result: "?page=1&size=10&search=test"

// Build URL with query parameters
const url = ApiRoutes.buildUrl(ApiRoutes.News.getAll, params);
// Result: "https://localhost:7121/api/news?page=1&size=10&search=test"
```

## Authentication

### HTTP Interceptor
The application uses an HTTP interceptor (`AuthInterceptor`) to automatically add JWT tokens to all API requests:

```typescript
// Automatic token inclusion
Authorization: Bearer {jwt_token}
```

### Error Handling
The interceptor also handles 401 Unauthorized responses by automatically logging out the user and clearing local storage.

## Response Format

All API responses follow a consistent format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}
```

### Example Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "title": "Sample Page",
    "content": "Sample content"
  },
  "statusCode": 200
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "statusCode": 400
}
```

## Best Practices

### 1. Service Usage
- Always use the centralized `ApiRoutes` configuration
- Handle API responses consistently using the `ApiResponse<T>` interface
- Implement proper error handling for all API calls

### 2. Authentication
- Use the `AuthInterceptor` for automatic token management
- Check authentication status before making protected API calls
- Handle token expiration gracefully

### 3. Error Handling
- Always check the `success` property of API responses
- Display user-friendly error messages
- Log errors for debugging purposes

### 4. Type Safety
- Use TypeScript interfaces for all API requests and responses
- Leverage the `ApiResponse<T>` generic interface
- Define proper DTOs for create/update operations

## Testing

### Unit Testing
```typescript
// Mock API responses
const mockResponse: ApiResponse<DynamicPage[]> = {
  success: true,
  message: 'Pages retrieved successfully',
  data: mockPages,
  statusCode: 200
};

// Test service methods
it('should get all pages', () => {
  service.getPages().subscribe(response => {
    expect(response.success).toBe(true);
    expect(response.data).toEqual(mockPages);
  });
});
```

### Integration Testing
- Test API endpoints with real backend
- Verify authentication and authorization
- Test error scenarios and edge cases

## Maintenance

### Adding New API Routes
1. Add the route to the `ApiRoutes` class
2. Create corresponding service methods
3. Define TypeScript interfaces for request/response data
4. Update this documentation
5. Add unit tests

### Updating Existing Routes
1. Update the route in `ApiRoutes` class
2. Update service methods if needed
3. Update TypeScript interfaces if data structure changes
4. Update this documentation
5. Update unit tests

## Conclusion

This centralized API routes configuration provides a maintainable and scalable approach to managing backend API endpoints. By using the `ApiRoutes` class and consistent service patterns, the application ensures type safety, proper error handling, and easy maintenance. 