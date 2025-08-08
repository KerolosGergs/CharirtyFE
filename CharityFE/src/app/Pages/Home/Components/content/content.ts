import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Service } from './../../../../Core/Services/ServiceOffering/service';
import { CardItem } from '../../../Consultant/Components/card-item/card-item';
interface Card {
  description: any;
  image: string;
  title: string;
  link: string;
}
@Component({
  selector: 'app-content',
  imports: [NgStyle, NgClass, RouterLink],
  templateUrl: './content.html',
  styleUrl: './content.scss'
})
export class Content implements OnInit {
  sectionTitle = 'خدمات الجمعية';
  sectionSubtitle = 'نحن جمعية خيرية غير ربحية نسعى لمد يد العون للأسر المحتاجة من خلال برامج إنسانية شاملة تعزز التكافل الاجتماعي، وتزرع الأمل في حياة المستفيدين.';
  serviceApi = inject(Service)
  cards: Card[] = [
    {
      image: 'Images/home/3.jpg',
      title: 'المتبرعين',
      description: 'نوفر فرصة المشاركة في دعم المحتاجين',
      link: '/donors'
    },
    {
      image: 'Images/home/4.jpg',
      title: 'طلبات المساعدة',
      description: 'نرعاكم ونلبي احتياجكم',
      link: '/HelpPeopole'
    },
    {
      image: 'Images/home/2.jpg',
      title: 'اصلاح ذات البين',
      description: 'نسعى لإصلاح ات البين للوصول لمجتمع مطمئن آمن',
      link: '/RequesrRepair'

    },
    {
      image: 'Images/home/1.jpg',
      title: 'قسم دخول المشرفين',
      description: 'نطبق  معايير العمل المؤسسي المحوكم',
      link: '/admin'
    },
  ];
  async ngOnInit(): Promise<void> {
    // this.loading = true;
  await  this.serviceApi.getAllAvailable().subscribe({
      next: (res) => {
        const main = res.data;
        this.sectionTitle = main.title;
        this.sectionSubtitle = main.description;
        this.cards = main.serviceItem.map(element => ({
          title: element.name,
          description: element.description,
          image: element.imageUrl,
          link: element.url
        }));


      },
      error: () => {
        // this.toastr.error('فشل تحميل البيانات');
        // this.loading = false;
      }
    });
  }


}
