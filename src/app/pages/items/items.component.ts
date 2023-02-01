import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Item, ItemsType } from 'src/app/core/interfaces/item.interface';
import { mockup__items } from 'src/app/core/mockups/item.mockup';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  // Table configuration Init
  displayedColumns: string[] = [
    'name',
    'type',
    'compareItemID',
    'actions',
    'buttons',
  ];

  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') filterInput: ElementRef<HTMLInputElement> | undefined;

  ItemsType = ItemsType;

  filter$: BehaviorSubject<string> = new BehaviorSubject('');
  resultsLength = 0;
  // Table configuration End

  constructor(private router: Router) {
    // Table configuration Init
    const items: Item[] = [];
    this.dataSource = new MatTableDataSource(items);

    // Table configuration End
  }

  ngOnInit(): void {
    // Table configuration Init
    // Table configuration End
  }

  ngAfterViewInit(): void {
    // Table configuration Init
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort! = this.sort!;

    this.sort!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

    fromEvent(this.filterInput!.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((e) => this.filterInput!.nativeElement.value.trim().toLowerCase())
      )
      .subscribe({
        next: (value) => {
          console.log('my inoput value: ', value);
          this.filter$.next(value);
        },
      });

    setTimeout(() => {
      merge(this.sort!.sortChange, this.paginator!.page, this.filter$)
        .pipe(
          startWith({}),
          switchMap((change) => {
            // Get data
            const filter =
              this.filterInput!.nativeElement.value.trim().toLowerCase();
            const sort = this.sort!.active;
            const order = this.sort!.direction;
            const page = this.paginator!.pageIndex;
            const limit = this.paginator!.pageSize;

            return of({ data: mockup__items, total: mockup__items.length });
          }),
          map((data) => {
            if (data === null) {
              return [];
            }

            this.resultsLength = data.total;
            return data.data;
          })
        )
        .subscribe({
          next: (data) => {
            this.dataSource.data = data;
          },
        });
    }, 200);
    // Table configuration End
  }

  // Table methods Init
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue.trim().toLowerCase();

    this.filter$.next(value);
  }

  addItem() {
    console.log('add ');
    this.router.navigate(['items/', 'new']);
  }
  editItem(item: number) {
    console.log('edit ', item);
    this.router.navigate(['items/', item]);
  }
  deleteItem(item: number) {
    console.log('delete', item);
  }
  // Table methods End

  mountTooltipActions(actions: string[]) {
    return actions.join('\n');
  }
}
