import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AttemptsService } from 'src/app/services/attempts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pages = [
    {
      title: 'Itens',
      description: 'Gerencie os itens da sua loja',
      url: '/items',
    },
  ];

  constructor(private attemptsService: AttemptsService) {
    console.log(`hello`);
    // attemptsService
    //   .getAttemptsFiltredByItemAndDate(2, new Date('2023-02-27'))
    //   .pipe(tap((attempts) => console.log('attempts on tap', attempts)))
    //   .subscribe((attempts) => {
    //     console.log('attempts in home', attempts);
    //   });
  }
}
