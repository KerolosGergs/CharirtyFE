import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
interface Card {
  image: string;
  title: string;
}
@Component({
  selector: 'app-content',
  imports: [NgStyle,NgClass],
  templateUrl: './content.html',
  styleUrl: './content.scss'
})
export class Content {
sectionTitle = 'نحن قلب نابض بالخير';
sectionSubtitle = 'نحن جمعية خيرية غير ربحية نسعى لمد يد العون للأسر المحتاجة من خلال برامج إنسانية شاملة تعزز التكافل الاجتماعي، وتزرع الأمل في حياة المستفيدين.';

cards: Card[] = [
  {
    image: 'Images/home/3.jpg',
    title: 'التمكين',
  },
  {
    image: 'Images/home/4.jpg',
    title: 'الشفافية والوضوح',
  },
  {
    image: 'Images/home/1.jpg',
    title: 'الرحمة',
  },
  {
    image: 'Images/home/2.jpg',
    title: 'الشراكة والاحترافية',
  },
];

}
