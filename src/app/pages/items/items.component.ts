import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
import { ItemService } from 'src/app/services/item.service';

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
  pageSize = 5;
  pageIndex = 0;
  // Table configuration End

  constructor(
    private router: Router,
    private itemService: ItemService,
    private dialog: MatDialog
  ) {
    // Table configuration Init
    const items: Item[] = [];
    this.dataSource = new MatTableDataSource(items);

    // Table configuration End

    // this.itemService.getAllPaginated(10, undefined, 'name').subscribe({
    //   next: (items) => {
    //     console.log('items: ', items);
    //   },
    //   error: (error) => {
    //     console.log('error: ', error);
    //   },
    // });
  }

  ngOnInit(): void {
    // Table configuration Init
    // Table configuration End
  }

  ngAfterViewInit(): void {
    // Table configuration Init
    this.dataSource.paginator = this.paginator!;
    // this.dataSource.sort! = this.sort!;

    // this.sort!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

    // fromEvent(this.filterInput!.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(1000),
    //     map((e) => this.filterInput!.nativeElement.value.trim().toLowerCase())
    //   )
    //   .subscribe({
    //     next: (value) => {
    //       console.log('my inoput value: ', value);
    //       this.filter$.next(value);
    //     },
    //   });

    setTimeout(() => {
      merge(this.paginator!.page, this.filter$)
        .pipe(
          startWith({}),
          switchMap((change) => {
            // Get data
            // const filter =
            //   this.filterInput!.nativeElement.value.trim().toLowerCase();
            // const sort = this.sort!.active;
            // const order = this.sort!.direction;
            this.pageIndex = this.paginator!.pageIndex;
            this.pageSize = this.paginator!.pageSize;

            console.log('change: ', change);

            // return of({ results: mockup__items, total: mockup__items.length });
            return this.itemService.getAllPaginated(
              this.pageSize,
              this.pageIndex === 0
                ? undefined
                : this.dataSource.data[this.dataSource.data.length - 1].name!,
              undefined
            );
          }),
          map((data) => {
            // console.log('data: ', data);
            if (data === null) {
              return [];
            }

            this.resultsLength = data.total;
            return data.results;
          })
        )
        .subscribe({
          next: (data) => {
            this.dataSource.data = data;
            setTimeout(() => {
              this.paginator!.length = this.resultsLength;
              this.paginator!.pageIndex = this.pageIndex;
              this.paginator!.pageSize = this.pageSize;
            }, 200);
          },
        });
    }, 200);
    // Table configuration End
  }

  updatePagination(event: any) {
    console.log('event: ', event);
    if (event.pageSize !== this.pageSize) this.paginator?.firstPage();
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
  deleteItem(item: Item) {
    console.log('delete', item);

    const ref = this.dialog.open(DeleteConfirmationComponent, {
      width: '250px',
      data: item,
    });

    ref.afterClosed().subscribe({
      next: (result) => {
        console.log('result: ', result);
        if (result?.deleted) {
          this.filter$.next('');
        }
      },
    });
  }
  // Table methods End

  mountTooltipActions(actions: string[]) {
    return actions.join('\n');
  }
}

@Component({
  selector: 'app-comfirmation',
  templateUrl: 'delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private itemService: ItemService
  ) {}

  ngOnInit() {}

  async deleteItem() {
    console.log('delete');
    await this.itemService.delete(this.data.id!);

    this.dialogRef.close({ deleted: true });
  }

  cancel() {
    console.log('cancel');
    this.dialogRef.close({ deleted: false });
  }
}
