import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualFireComponent } from './manual-fire.component';

const routes: Routes = [{ path: '', component: ManualFireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualFireRoutingModule { }
