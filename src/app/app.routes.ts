import { Routes } from '@angular/router';
import { LoginForm } from './Auth/Components/login-form/login-form';
import { RegisterForm } from './Auth/Components/register-form/register-form';
import { advisoRreservationGuard } from './Guards/adviso-rreservation-guard';
import { Consultant } from './Pages/Consultant/all-consultants/consultant';
import { Questions } from './Pages/questions/questions';
import { OurService } from './Pages/Home/our-service/our-service';
import { HelpPeopole } from './Pages/Forms/Components/help-peopole/help-peopole';
import { RequestRepair } from './Pages/Forms/Components/request-repair/request-repair';
import { AboutUs } from './Pages/About/about-us';
import { AboutSummaryComponent } from './Pages/AboutSummary/about-summary.component';
import { StrategicPlanComponent } from './Pages/StrategicPlan/strategic-plan.component';
import { OperationalPlanComponent } from './Pages/OperationalPlan/operational-plan.component';
import { InvestmentPlanComponent } from './Pages/InvestmentPlan/investment-plan.component';
import { VisionMissionComponent } from './Pages/VisionMission/vision-mission.component';
import { TasksAuthoritiesComponent } from './Pages/TasksAuthorities/tasks-authorities.component';
import { ServiceLocationsComponent } from './Pages/ServiceLocations/service-locations.component';
import { ContactPhoneComponent } from './Pages/ContactPhone/contact-phone.component';
import { NationalAddressComponent } from './Pages/NationalAddress/national-address.component';
import { AssociationSectorsComponent } from './Pages/AssociationSectors/association-sectors.component';
import { RegistrationCertificateComponent } from './Pages/RegistrationCertificate/registration-certificate.component';
import { OperationalPlan2023Component } from './Pages/OperationalPlan2023/operational-plan-2023.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginForm },
    { path: 'register', component: RegisterForm },
    { path: 'home', loadComponent: () => import('./Pages/Home/home/home').then(m => m.Home), title: 'Home' },
    {path: 'HelpPeopole',component:HelpPeopole,title:'HelpPeopole'},
    {path:'RequesrRepair',component:RequestRepair,title:'RequestRepair'},
    { path: 'our-service', component:OurService,title:'Our Service'},
    { path: 'all-consultants', component: Consultant, title: 'Consultants'  ,canActivate: [advisoRreservationGuard]},
    { path: 'advisor-details', loadComponent: () => import('../app/Pages/advisor-details/advisor-details').then(m => m.AdvisorDetails), title: 'Advisor Details' },
    { path: 'advisor-reservation', loadComponent: () => import('../app/Pages/reservation/reservation').then(m => m.Reservation), canActivate: [advisoRreservationGuard], title: 'Advisor Reservation' },
    { path: 'must-login', loadComponent: () => import('../app/Pages/must-login/must-login').then(m => m.MustLogin), title: 'Must Login' },
    { path: 'questions',component:Questions,title:'Questions'},
    { path: 'dashboard', loadComponent: () => import('../app/Pages/Dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard Main' ,children:[
        { path: '', redirectTo: 'dashboard-main', pathMatch: 'full'},
        { path: 'dashboard-main', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-main/dashboard-main').then(m => m.DashboardMain), title: 'Dashboard Main' },
        { path: 'dashboard-advisors', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/dashboard-advisors').then(m => m.DashboardAdvisors), title: 'Dashboard Advisors' },
        { path: 'dashboard-advisor-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/dashboard-advisors-details/dashboard-advisors-details').then(m => m.DashboardAdvisorsDetails), title: 'Dashboard Advisor Details' },
        { path: 'dashboard-advisor-edit/:id', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/edit-advisor/edit-advisor').then(m => m.EditAdvisor), title: 'Dashboard Advisor Edit' },
        { path: 'dashboard-advisor-new', loadComponent: () => import('../app/Pages/Dashboard/components/dashboard-advisors/components/new-advisor/new-advisor').then(m => m.NewAdvisor), title: 'Dashboard Advisor New' },
        
        { path: 'dashboard-meditation', loadComponent: ()=> import('../../src/app/Pages/Dashboard/components/midetation/midetation').then(m => m.Midetation), title: 'Dashboard Meditation' },
        { path: 'dashboard-midetation-new', loadComponent: ()=> import('../../src/app/Pages/Dashboard/components/midetation/components/add-midetation/add-midetation').then(m => m.AddMidetation), title: 'Dashboard Add Meditation' },
        { path: 'dashboard-midetation-edit/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/midetation/components/edit-midetation/edit-midetation').then(m => m.EditMidetation), title: 'Dashboard Edit Meditation' },
        { path: 'dashboard-midetation-details/:id', loadComponent: () => import('../app/Pages/Dashboard/components/midetation/components/midetation-detatils/midetation-detatils').then(m => m.MidetationDetatils), title: 'Dashboard Meditation Details' },
        {path:'dashboard-consultants',loadComponent:()=> import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent),title:'Dashboard Consultants'},
        { path: 'dashboard-awareness', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/awareness').then(m => m.Awareness), title: 'Dashboard Awareness' },
        { path: 'dashboard-awareness-new-video', loadComponent: ()=> import('../app/Pages/Dashboard/components/awareness/components/add-new-video/add-new-video').then(m => m.AddNewVideo), title: 'Add New Video' },
        
        { path: 'dashboard-news', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/dashboard-news').then(m => m.DashboardNews), title: 'Dashboard News' },
        { path: 'dashboard-news-new', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-add-news/dashboard-add-news').then(m => m.DashboardAddNews), title: 'Add New News' },
        { path: 'dashboard-news-edit/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/dashboard-news/components/dashboard-edit-news/dashboard-edit-news').then(m => m.DashboardEditNews), title: 'edit New News' },
        
        { path: 'dashboard-services', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/services').then(m => m.ServicesComponent), title: 'Dashboard Services' },
        { path: 'dashboard-new-services', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/component/add-new-service/add-new-service').then(m => m.AddNewService), title: 'Dashboard New Services' },
        { path: 'dashboard-edit-services/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/services/component/edit-services/edit-services').then(m => m.EditServices), title: 'Dashboard Edit Services' },
        { path: 'dashboard-complaints', loadComponent: ()=> import('../app/Pages/Dashboard/components/complaints/complaints').then(m => m.Complaints), title: 'Complaints' },
        
        { path: 'complaint-details/:id', loadComponent: ()=> import('../app/Pages/Dashboard/components/complaints/components/complaint-details/complaint-details').then(m => m.ComplaintDetails), title: 'Complaint Details' },
        { path: 'consultation-management', loadComponent: ()=> import('../app/Pages/Dashboard/components/consultation-management/consultation-management.component').then(m => m.ConsultationManagementComponent), title: 'Consltation Managment' },
        
    ]},
    { path: 'advisor-dashboard', loadComponent: ()=> import('../app/Pages/advisor-dashboard/advisor-dashboard').then(m => m.AdvisorDashboard), title: 'Advisor Dashboard', children:[
        { path: '', redirectTo: 'dashboard-main', pathMatch: 'full' },
        { path: 'dashboard-main', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-main/dashboard-main').then(m =>m.DashboardMain), title: 'Advisor Dashboard Main'},
        { path: 'dashboard-date', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-date/dashboard-date').then(m =>m.DashboardDate), title: 'Advisor Dashboard Date' },
        { path: 'dashboard-schedule', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-schedule/dashboard-schedule').then(m =>m.DashboardSchedule), title: 'Advisor Dashboard Schedule' },
        { path: 'date-details/:id', loadComponent: ()=> import('../app/Pages/advisor-dashboard/component/dashboard-date/components/date-details/date-details').then(m => m.DateDetails),title: 'Date Details' }
    ] },

    { path: 'questions', component: Questions, title: 'Questions' },

    { path: 'questions', component: Questions, title: 'Questions' },
    { path: 'about-us', component: AboutUs, title: 'عن الجمعية' },
    { path: 'about-summary', component: AboutSummaryComponent, title: 'نبذة عن الجمعية' },
    { path: 'strategic-plan', component: StrategicPlanComponent, title: 'الخطة الاستراتيجية' },
    { path: 'operational-plan', component: OperationalPlanComponent, title: 'الخطة التشغيلية' },
    { path: 'operational-plan-2023', component: OperationalPlan2023Component, title: 'الخطة التشغيلية لعام 2023' },
    { path: 'investment-plan', component: InvestmentPlanComponent, title: 'الخطة الاستثمارية' },
    { path: 'vision-mission', component: VisionMissionComponent, title: 'الرؤية والرسالة والقيم والأهداف' },
    { path: 'tasks-authorities', component: TasksAuthoritiesComponent, title: 'المهام والاختصاصات' },
    { path: 'service-locations', component: ServiceLocationsComponent, title: 'مواقع تقديم الخدمة' },
    { path: 'contact-phone', component: ContactPhoneComponent, title: 'بيانات التواصل الهاتفية' },
    { path: 'national-address', component: NationalAddressComponent, title: 'العنوان الوطني' },
    { path: 'association-sectors', component: AssociationSectorsComponent, title: 'قطاعات الجمعية' },
    { path: 'registration-certificate', component: RegistrationCertificateComponent, title: 'شهادة تسجيل مؤسسة أهلية' },

    { path: 'not-found', loadComponent: () => import('../app/Pages/not-found/not-found').then(m => m.NotFound), title: 'Page Not Found' },
    { path: '**', redirectTo: 'not-found', pathMatch: 'full' }





];
