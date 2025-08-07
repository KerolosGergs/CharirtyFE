# Frontend-Backend Integration Guide

## Dynamic Page Management Module

This document describes the integration between the Angular frontend and .NET backend for the Dynamic Page Management module.

## Overview

The frontend and backend are now fully integrated with the following features:

### Frontend Features
- ✅ CRUD operations for dynamic pages
- ✅ File upload support (images and documents)
- ✅ Real-time form validation
- ✅ Responsive RTL design
- ✅ Authentication integration
- ✅ Error handling and user feedback

### Backend Features
- ✅ RESTful API endpoints
- ✅ JWT authentication and role-based authorization
- ✅ File upload and management
- ✅ Database persistence with Entity Framework Core
- ✅ Comprehensive validation and error handling

## API Endpoints

### Public Endpoints (No Authentication Required)
- `GET /api/dynamicpage` - Get all pages
- `GET /api/dynamicpage/active` - Get all active pages
- `GET /api/dynamicpage/{id}` - Get page by ID
- `GET /api/dynamicpage/slug/{slug}` - Get page by slug

### Admin Endpoints (Require Admin Role)
- `POST /api/dynamicpage` - Create new page
- `PUT /api/dynamicpage/{id}` - Update existing page
- `DELETE /api/dynamicpage/{id}` - Delete page
- `PATCH /api/dynamicpage/{id}/toggle-active` - Toggle page active status
- `POST /api/dynamicpage/upload` - Upload file
- `DELETE /api/dynamicpage/delete-file` - Delete file

## Data Flow

### 1. Page Creation Flow
```
Frontend Form → Validation → File Upload → API Request → Backend Processing → Database → Response
```

### 2. Page Update Flow
```
Frontend Form → Load Existing Data → Validation → File Upload → API Request → Backend Processing → Database → Response
```

### 3. File Upload Flow
```
File Selection → Frontend Validation → FormData → API Upload → Backend Storage → URL Response
```

## Authentication Integration

### Frontend Authentication
- **Service**: `AuthServ` in `src/app/Auth/Services/auth-serv.ts`
- **Interceptor**: `AuthInterceptor` in `src/app/Core/Services/auth.interceptor.ts`
- **Token Management**: Automatic JWT token inclusion in API requests
- **Error Handling**: Automatic logout on 401 responses

### Backend Authentication
- **JWT Bearer Token**: Required for admin endpoints
- **Role-Based Access**: Admin role required for CRUD operations
- **User Tracking**: CreatedBy/UpdatedBy fields populated automatically

## Configuration

### Frontend Configuration
```typescript
// Environment configuration
static apiUrl: string = 'https://localhost:7121/api/';
static ImgUrl: string = 'https://localhost:7121/';
```

### Backend Configuration
- **Database**: SQL Server with Entity Framework Core
- **File Storage**: wwwroot/uploads directory
- **Authentication**: JWT with role-based authorization

## Error Handling

### Frontend Error Handling
- **API Response Wrapper**: All responses wrapped in `ApiResponse<T>` format
- **User Feedback**: Success/error messages displayed to users
- **Console Logging**: Detailed error logging for debugging
- **Form Validation**: Real-time validation with user feedback

### Backend Error Handling
- **Structured Responses**: Consistent error response format
- **Validation**: Model validation with detailed error messages
- **Exception Handling**: Global exception middleware
- **HTTP Status Codes**: Proper status codes for different scenarios

## File Management

### Supported File Types
- **Images**: JPG, PNG, GIF (max 5MB)
- **Documents**: PDF, DOC, DOCX (max 10MB)

### File Storage
- **Backend**: Files stored in `wwwroot/uploads/{fileType}/`
- **Frontend**: File URLs returned from upload endpoint
- **Cleanup**: Automatic file deletion when pages are deleted

## Testing the Integration

### 1. Start the Backend
```bash
cd ../Charity_Last_BE
dotnet run
```

### 2. Start the Frontend
```bash
cd CharityFE
ng serve
```

### 3. Test Authentication
- Login as admin user
- Verify JWT token is stored in localStorage
- Check that API requests include Authorization header

### 4. Test CRUD Operations
- Create a new dynamic page
- Add different content types (text, image+text, file)
- Edit the page
- Toggle active status
- Delete the page

### 5. Test File Upload
- Upload images and documents
- Verify files are accessible via returned URLs
- Test file deletion

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Solution**: Ensure backend CORS policy allows frontend origin
```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

#### 2. Authentication Errors
**Solution**: Check JWT token validity and role assignments
- Verify token is not expired
- Ensure user has "Admin" role
- Check Authorization header format

#### 3. File Upload Errors
**Solution**: Verify file storage permissions and directory structure
- Ensure upload directories exist
- Check file size limits
- Verify file type restrictions

#### 4. Database Connection Errors
**Solution**: Check connection string and database availability
- Verify SQL Server is running
- Check connection string in appsettings.json
- Ensure database migrations are applied

### Debug Steps

1. **Check Browser Network Tab**
   - Verify API requests are being made
   - Check request/response headers
   - Look for error responses

2. **Check Browser Console**
   - Look for JavaScript errors
   - Check authentication status
   - Verify API response format

3. **Check Backend Logs**
   - Look for exception details
   - Check authentication logs
   - Verify database operations

4. **Check Database**
   - Verify tables exist
   - Check data integrity
   - Look for constraint violations

## Security Considerations

### Frontend Security
- **Input Validation**: Client-side validation for user experience
- **XSS Prevention**: Angular's built-in XSS protection
- **CSRF Protection**: JWT tokens provide CSRF protection

### Backend Security
- **Input Validation**: Server-side validation with Data Annotations
- **Authentication**: JWT token validation
- **Authorization**: Role-based access control
- **File Upload Security**: File type and size validation
- **SQL Injection Prevention**: Entity Framework Core parameterized queries

## Performance Considerations

### Frontend Performance
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images and thumbnails
- **Caching**: HTTP response caching where appropriate

### Backend Performance
- **Database Indexing**: Proper indexes on frequently queried fields
- **File Storage**: Efficient file organization
- **Response Caching**: API response caching for public endpoints

## Future Enhancements

### Planned Features
- **Bulk Operations**: Bulk create/update/delete pages
- **Page Templates**: Pre-defined page templates
- **Version Control**: Page versioning and rollback
- **Advanced Search**: Full-text search capabilities
- **Analytics**: Page view and usage analytics
- **Export/Import**: JSON/CSV export and import functionality

### Technical Improvements
- **Real-time Updates**: SignalR integration for real-time updates
- **Offline Support**: Service worker for offline functionality
- **Progressive Web App**: PWA capabilities
- **Microservices**: Service decomposition for scalability

## Support and Maintenance

### Code Organization
- **Frontend**: Feature-based organization in `src/app/dynamic-pages/`
- **Backend**: Clean architecture with DAL, BLL, and API layers
- **Documentation**: Comprehensive README files for both modules

### Maintenance Tasks
- **Regular Updates**: Keep dependencies updated
- **Security Patches**: Apply security updates promptly
- **Performance Monitoring**: Monitor API response times
- **Error Tracking**: Implement error tracking and alerting
- **Backup Strategy**: Regular database and file backups

## Conclusion

The Dynamic Page Management module is now fully integrated with a robust frontend-backend architecture. The system provides a complete solution for managing dynamic content with proper authentication, validation, and error handling. The modular design allows for easy maintenance and future enhancements. 