import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualFireRoutingModule } from './manual-fire-routing.module';
import { ManualFireComponent } from './manual-fire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialBundleModule } from 'src/app/core/material/bundle.module';
import { ManualFireDetailsComponent } from './manual-fire-details/manual-fire-details.component';

@NgModule({
  declarations: [ManualFireComponent, ManualFireDetailsComponent],
  imports: [
    CommonModule,
    ManualFireRoutingModule,
    MaterialBundleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ManualFireModule {}
