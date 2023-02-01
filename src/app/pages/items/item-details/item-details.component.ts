import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Item,
  ItemActionsList,
  ItemsType,
} from 'src/app/core/interfaces/item.interface';
import { mockup__items } from 'src/app/core/mockups/item.mockup';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  item: Item | null = null;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredActions: Observable<string[]>;
  allActions: string[] = ItemActionsList;

  actionCtrl = new FormControl('');
  @ViewChild('actionInput') actionInput: ElementRef<HTMLInputElement> | null =
    null;

  constructor(actRoute: ActivatedRoute) {
    const id = actRoute.snapshot.paramMap.get('id')!;
    if (id === 'new') {
      this.createNewItem();
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
    // this.item = this.itemsService.getItem(id);
    this.item = mockup__items.find((item) => item.id === id)!;
  }
  createNewItem() {
    this.item = {
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

  save() {
    console.log('save', this.item);
  }
}
