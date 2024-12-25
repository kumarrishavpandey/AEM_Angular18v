import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppCustomPreloader } from "./app-routing-loader";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('../app/modules/home/home.module').then((m) => m.HomeModule),
  // },

  {
    path: 'leave',
    loadChildren: () =>
      import('../app/modules/leave/leave.module').then((m) => m.LeaveModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})], //, {onSameUrlNavigation: 'reload'}
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
