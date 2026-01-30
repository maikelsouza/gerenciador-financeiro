import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HumanizeCurrencyPipe } from './pipes/humanize-currency-pipe';

type CardType = 'income'| 'outcome' | 'balance';

enum ValeuCssClass {
  income = 'income',
  outcome = 'outcome',
  zero = 'zero'
}


@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule, HumanizeCurrencyPipe],
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

    if (this.value() === 0){
      return ValeuCssClass.zero;
    }

    return this.value() > 0 ? ValeuCssClass.income : ValeuCssClass.outcome;

  });
}
