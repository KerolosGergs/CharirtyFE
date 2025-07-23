import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
interface Card {
description: any;
  image: string;
  title: string;
  link :string;
}
@Component({
  selector: 'app-content',
  imports: [NgStyle,NgClass,RouterLink],
  templateUrl: './content.html',
  styleUrl: './content.scss'
})
export class Content {
sectionTitle = 'خدمات الجمعية';
sectionSubtitle = 'نحن جمعية خيرية غير ربحية نسعى لمد يد العون للأسر المحتاجة من خلال برامج إنسانية شاملة تعزز التكافل الاجتماعي، وتزرع الأمل في حياة المستفيدين.';

cards: Card[] = [
  {
    image: 'Images/home/3.jpg',
    title: 'المتبرعين',
    description:'نوفر فرصة المشاركة في دعم المحتاجين',
    link: '/donors'
  },
  {
    image: 'Images/home/4.jpg',
    title: 'طلبات المساعدة',
     description:'نرعاكم ونلبي احتياجكم',
     link: '/HelpPeopole'
  },
  {
    image: 'Images/home/2.jpg',
    title: 'اصلاح ذات البين',
     description:'نسعى لإصلاح ات البين للوصول لمجتمع مطمئن آمن',
     link: '/donations'

  },
  {
    image: 'Images/home/1.jpg',
    title: 'قسم دخول المشرفين',
     description:'نطبق  معايير العمل المؤسسي المحوكم',
     link: '/admin'
  },
];

}
