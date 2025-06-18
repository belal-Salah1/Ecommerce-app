import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product-page/:name',
    renderMode: RenderMode.Server
  },
  {
    path: 'product-details/:name/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'userLogin',
    renderMode: RenderMode.Client
  },
  {
    path: 'cart',
    renderMode: RenderMode.Server
  },
  {
    path: 'notFound',
    renderMode: RenderMode.Client
  }
];
