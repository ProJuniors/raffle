import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentformComponent } from './components/paymentform/paymentform.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentGuard } from './guards/payment.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "finalizar-compra",
    component: PaymentformComponent,
    canActivate: [PaymentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
