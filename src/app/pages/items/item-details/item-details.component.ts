import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Item,
  ItemActionsList,
  ItemsType,
} from 'src/app/core/interfaces/item.interface';
import { mockup__items } from 'src/app/core/mockups/item.mockup';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  item: Item = this.createNewItem();
  ItemTypes = ItemsType;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredActions: Observable<string[]>;
  allActions: string[] = ItemActionsList;

  actionCtrl = new FormControl('');
  @ViewChild('actionInput') actionInput: ElementRef<HTMLInputElement> | null =
    null;

  constructor(
    actRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    const id = actRoute.snapshot.paramMap.get('id')!;
    if (id === 'new') {
      this.item = this.createNewItem();
    } else {
      this.getItem(id);
    }

    this.filteredActions = this.actionCtrl.valueChanges.pipe(
      startWith(null),
      map((action: string | null) => {
        console.log('action', action);
        const retFilter = action
          ? this._filter(action)
          : this.allActions.slice();
        console.log('retFilter', retFilter);
        const ret = this.filterArrayWithArray(retFilter, this.item!.actions);
        console.log('ret filter', ret);
        return ret;
      })
    );
  }

  getItem(id: string) {
    this.itemService.getOne(id).subscribe({
      next: (event) => {
        this.item = event;
        this.fillEmptyConfigurations();
      },
    });
    this.item = mockup__items.find((item) => item.id === id)!;
  }
  private fillEmptyConfigurations() {
    if (!this.item.acConfig)
      this.item.acConfig = {
        urlApi: 0,
        list: 0,
        customField: 0,
      };
    if (!this.item.mfitConfig)
      this.item.mfitConfig = {
        duration: '',
        auth: '',
        token: '',
      };
    if (!this.item.weburnConfig)
      this.item.weburnConfig = {
        duration: '',
        partner: '',
        planIdV2: '',
        prefix: '',
      };
    if (!this.item.nutriVoucherConfig)
      this.item.nutriVoucherConfig = {
        count: 0,
        creditValue: 0,
        creditField: 0,
        usedVoucherField: 0,

        prefix: '',
      };
    if (!this.item.voucherConfig)
      this.item.voucherConfig = {
        count: 0,
        isPack: false,
        packSku: '',
      };
  }
  createNewItem() {
    return {
      id: '',
      name: '',
      type: ItemsType.PAGARME,
      compareItemID: '',
      actions: [],
      voucherConfig: {
        count: 0,
        isPack: false,
        packSku: '',
      },
      nutriVoucherConfig: {
        count: 0,
        creditValue: 0,
        creditField: 0,
        usedVoucherField: 0,
        prefix: '',
      },
      mfitConfig: {
        duration: '',
        auth: '',
        token: '',
      },
      weburnConfig: {
        duration: '',
        partner: '',
        planIdV2: '',
        prefix: '',
      },
      acConfig: {
        urlApi: 0,
        list: 0,
        customField: 0,
      },
    };
  }
  getErrorMessage(form: NgForm, control: string) {
    return form.controls[control].hasError('required')
      ? 'Precisa inserir um valor válido'
      : form.controls[control].hasError('email')
      ? 'Não é um email válido'
      : form.controls[control].hasError('minlength')
      ? 'Mínimo de 6 caracteres'
      : form.controls[control].hasError('mask')
      ? 'Formato de campo não válido'
      : '';
  }

  selected(event: any) {
    this.item!.actions.push(event.option.viewValue);
    this.actionInput!.nativeElement.value = '';
    this.actionCtrl.setValue(null);
  }
  removeAction(action: string) {
    this.item!.actions = this.item!.actions.filter((a) => a !== action);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActions.filter((action) =>
      action.toLowerCase().includes(filterValue)
    );
  }

  private filterArrayWithArray(array: string[], filter: string[]) {
    return array.filter((item) => !filter.includes(item));
  }

  async save() {
    console.log('save', this.item);

    this.item.compareItemID = !isNaN(+this.item.compareItemID!)
      ? +this.item.compareItemID!
      : this.item.compareItemID;
    try {
      if (this.item.id) {
        await this.itemService.update(this.item.id, this.item);
      } else {
        await this.itemService.create(this.item);
      }

      this.snack.open('Item salvo com sucesso', 'OK', {
        duration: 10000,
      });
      this.router.navigate(['/items']);
    } catch (error) {}
  }
}
