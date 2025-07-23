export interface RequestModel {
  userId: string;
  title: string;
  description: string;
  category: number;
  priority: string;
}
export enum CategoryEnum {
  Employee = 0, // شكوى عن موظف
  Service = 1,   // شكوى عن خدمة
  Facility = 2,  // شكوى عن مرفق
  Other = 3      // أخرى
}

export const CategoryOptions = [
  { value: CategoryEnum.Employee, text: 'شكوى عن موظف' },
  { value: CategoryEnum.Service, text: 'شكوى عن خدمة' },
  { value: CategoryEnum.Facility, text: 'شكوى عن مرفق' },
  { value: CategoryEnum.Other, text: 'أخرى' },

];
