import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CardType = 'income'| 'outcome' | 'balance';

enum ValeuCssClass {
  income = 'income',
  outcome = 'outcome'
}


@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {

  type = input.required<CardType>();
  label = input.required<string>();
  value = input.required<number>();
  

  cssClass = computed<ValeuCssClass>(() => {
    if (this.type() === 'income'){
      return ValeuCssClass.income;
    }

    if (this.type() === 'outcome'){
      return ValeuCssClass.outcome;
    }

    return this.value() > 0 ? ValeuCssClass.income : ValeuCssClass.outcome;

  });
}
