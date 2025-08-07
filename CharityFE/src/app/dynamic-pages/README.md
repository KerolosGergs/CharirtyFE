# Dynamic Page Management Module

## Overview
The Dynamic Page Management Module is a comprehensive Angular-based solution that enables administrators to create, edit, and delete dynamic pages with flexible content blocks. This module supports various content types including text, images with text, and file attachments.

## Features

### 🎯 Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete dynamic pages
- **Flexible Content**: Support for multiple content types (text, image+text, files)
- **File Upload**: Secure file upload with validation
- **Responsive Design**: Mobile-friendly interface with RTL support
- **Real-time Validation**: Form validation with user-friendly error messages

### 📝 Content Types
1. **Text Content**: Rich text content with markdown support
2. **Image + Text**: Images with accompanying text descriptions
3. **File Attachments**: PDF, DOC, DOCX, and image files

### 🎨 User Interface
- Modern, clean design following the site's color palette
- Right-to-left (RTL) Arabic interface
- Responsive design for all device sizes
- Intuitive drag-and-drop file upload
- Real-time preview of uploaded content

## Architecture

### File Structure
```
dynamic-pages/
├── admin/
│   ├── dynamic-page-admin.component.html
│   ├── dynamic-page-admin.component.scss
│   └── dynamic-page-admin.component.ts
├── dynamic-pages.service.ts
├── mock-data.ts
└── README.md
```

### Key Components

#### DynamicPageAdminComponent
- Main component for page management
- Handles form creation and validation
- Manages file uploads and content organization
- Provides CRUD operations interface

#### DynamicPagesService
- Service layer for API communication
- Handles data transformation and validation
- Manages file upload operations
- Provides type-safe interfaces

## Data Structure

### DynamicPage Interface
```typescript
interface DynamicPage {
  id?: string;
  pageName: string;
  items: ContentItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
```

### ContentItem Interface
```typescript
interface ContentItem {
  id?: string;
  type: 'text' | 'image_text' | 'file';
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  order?: number;
}
```

## Usage

### Creating a New Page
1. Navigate to the Dynamic Page Management interface
2. Click "إنشاء صفحة جديدة" (Create New Page)
3. Enter the page title
4. Add content items using the available buttons:
   - إضافة نص (Add Text)
   - إضافة صورة مع نص (Add Image with Text)
   - إضافة ملف (Add File)
5. Configure each content item as needed
6. Click "إنشاء الصفحة" (Create Page)

### Editing an Existing Page
1. Find the page in the table
2. Click the edit button (pencil icon)
3. Modify the content as needed
4. Click "تحديث الصفحة" (Update Page)

### Deleting a Page
1. Find the page in the table
2. Click the delete button (trash icon)
3. Confirm the deletion

## API Endpoints

### Required Backend Endpoints
```
POST   /api/dynamic-pages          # Create new page
GET    /api/dynamic-pages          # Get all pages
GET    /api/dynamic-pages/:id      # Get page by ID
PUT    /api/dynamic-pages/:id      # Update page
DELETE /api/dynamic-pages/:id      # Delete page
POST   /api/dynamic-pages/upload   # Upload file
```

### Request/Response Examples

#### Create Page Request
```json
{
  "pageName": "صفحة رضا العملاء",
  "items": [
    {
      "type": "text",
      "content": "محتوى النص هنا",
      "order": 0
    },
    {
      "type": "image_text",
      "content": "وصف الصورة",
      "imageUrl": "https://example.com/image.jpg",
      "order": 1
    }
  ]
}
```

#### File Upload Response
```json
{
  "url": "https://example.com/uploads/file.pdf",
  "fileName": "document.pdf"
}
```

## Styling

### Design System
- **Primary Color**: #007b5e (Green)
- **Secondary Color**: #005a4a (Dark Green)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #222 (Dark Gray)
- **Error**: #dc3545 (Red)
- **Success**: #28a745 (Green)

### CSS Classes
- `.dynamic-page-admin`: Main container
- `.form-section`: Form container
- `.item-card`: Content item container
- `.btn-primary`: Primary action buttons
- `.alert-success`: Success messages
- `.alert-danger`: Error messages

## Validation Rules

### Form Validation
- Page title is required
- At least one content item is required
- File uploads are validated for type and size
- Image files: JPG, PNG, GIF (max 5MB)
- Document files: PDF, DOC, DOCX (max 10MB)

### Error Handling
- Network errors are handled gracefully
- File upload errors are displayed to users
- Form validation errors are shown inline
- Loading states are managed appropriately

## Testing

### Unit Tests
- Component logic testing
- Service method testing
- Form validation testing
- File upload testing

### Integration Tests
- API endpoint testing
- End-to-end workflow testing
- Cross-browser compatibility testing

## Future Enhancements

### Planned Features
- [ ] Drag-and-drop content reordering
- [ ] Rich text editor integration
- [ ] Image compression and optimization
- [ ] Multi-language support
- [ ] Content versioning
- [ ] Bulk operations
- [ ] Advanced search and filtering
- [ ] Content templates
- [ ] Analytics and reporting

### Technical Improvements
- [ ] Caching strategy implementation
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] SEO optimization
- [ ] Progressive Web App features

## Dependencies

### Required Angular Modules
- `@angular/common`
- `@angular/forms`
- `@angular/core`

### External Dependencies
- Font Awesome (for icons)
- Cairo font family

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing
1. Follow Angular style guide
2. Write unit tests for new features
3. Update documentation
4. Ensure RTL support
5. Test on multiple devices

## License
This module is part of the CharityFE project and follows the same licensing terms. 