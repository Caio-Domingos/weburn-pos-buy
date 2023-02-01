import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MaterialBundleModule } from 'src/app/core/material/bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemsComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MaterialBundleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ItemsModule {}
