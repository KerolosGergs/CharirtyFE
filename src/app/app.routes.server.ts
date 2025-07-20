import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  {
    path: 'dashboard/dashboard-advisor-details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard/dashboard-advisor-edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard/dashboard-news-edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'advisor-dashboard/date-details/:id',
    renderMode: RenderMode.Client
  },
];
