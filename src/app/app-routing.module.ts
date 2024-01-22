import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './pages/routes';

@NgModule({
  // enableTracing used when debugging to console the routes and routing takingplace
  // imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
