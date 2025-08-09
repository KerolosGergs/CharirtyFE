// nav.models.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;   // رسائل عربية من الـ API
  data: T;
  statusCode: number;
  errors: string[];
}

/** DTOs اللي الـ GET بيرجعها */
export interface PageDto {
  id:number;
  subTilte: string;       // نفس التسمية اللي في الـ DTO عندك
  subLink: string;
}

export interface NavItemDto {
  id:number
  label: string;
  href: string;
  pages: PageDto[];
}
export interface NavItemCreatedDto{
  label: string;
  href: string;
  pages: PageDto[];
}

/** كيانات الكتابة (POST/PUT) حسب الكنترولر */
export interface NavItems {
  id?: number;
  label: string;
  href: string;
  // السيرفر ما يحتاجش الصفحات هنا لأنك بتضيفها باندبوينت منفصل
}

export interface Pages {
  id?: number;
  subTilte: string;
  subLink: string;
  navItemsId?: number; // بيتحدد من الـ route لما تضيف صفحة، لكن نسيبه اختياري
}
