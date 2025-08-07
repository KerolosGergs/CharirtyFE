import { DynamicPage } from './dynamic-pages.service';

export const MOCK_DYNAMIC_PAGES: DynamicPage[] = [
  {
    id: 1,
    pageName: 'صفحة رضا العملاء',
    items: [
      {
        id: 1,
        type: 'text',
        content: 'نحن نعتز بخدمة عملائنا الكرام ونحرص على تلبية احتياجاتهم بأفضل الطرق الممكنة. نسعى دائماً لتقديم خدمات عالية الجودة تلبي توقعات عملائنا.',
        order: 0
      },
      {
        id: 2,
        type: 'image_text',
        content: 'صورة توضيحية لمركز خدمة العملاء',
        imageUrl: '/assets/images/customer-service.jpg',
        order: 1
      },
      {
        id: 3,
        type: 'file',
        content: 'تقرير رضا العملاء للعام 2023',
        fileUrl: '/assets/pdfs/customer-satisfaction-2023.pdf',
        fileName: 'customer-satisfaction-2023.pdf',
        order: 2
      }
    ],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: 2,
    pageName: 'الخدمات الطبية',
    items: [
      {
        id: 4,
        type: 'text',
        content: 'نقدم مجموعة شاملة من الخدمات الطبية المتخصصة لجميع أفراد المجتمع. فريقنا الطبي المؤهل يحرص على تقديم أفضل رعاية صحية ممكنة.',
        order: 0
      },
      {
        id: 5,
        type: 'image_text',
        content: 'مركز الخدمات الطبية',
        imageUrl: '/assets/images/medical-center.jpg',
        order: 1
      },
      {
        id: 6,
        type: 'text',
        content: 'تشمل خدماتنا: الفحوصات الطبية، الاستشارات الطبية، العلاج الطبيعي، والرعاية الوقائية.',
        order: 2
      },
      {
        id: 7,
        type: 'file',
        content: 'دليل الخدمات الطبية',
        fileUrl: '/assets/pdfs/medical-services-guide.pdf',
        fileName: 'medical-services-guide.pdf',
        order: 3
      }
    ],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-12-10')
  },
  {
    id: 3,
    pageName: 'البرامج التعليمية',
    items: [
      {
        id: 8,
        type: 'text',
        content: 'نقدم برامج تعليمية متنوعة تهدف إلى تطوير مهارات الأفراد وزيادة معرفتهم في مختلف المجالات.',
        order: 0
      },
      {
        id: 9,
        type: 'image_text',
        content: 'فصول تعليمية مجهزة بأحدث التقنيات',
        imageUrl: '/assets/images/education-center.jpg',
        order: 1
      },
      {
        id: 10,
        type: 'file',
        content: 'البرامج التعليمية المتاحة',
        fileUrl: '/assets/pdfs/educational-programs.pdf',
        fileName: 'educational-programs.pdf',
        order: 2
      }
    ],
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2023-12-05')
  }
]; 