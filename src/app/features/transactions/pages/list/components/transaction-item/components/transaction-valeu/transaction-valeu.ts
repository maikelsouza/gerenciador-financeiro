import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TransactionType } from '@shared/transaction/interfaces/enums/transaction-type';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { CurrencyPipe } from '@angular/common';


const CssClass = {
  [TransactionType.INCOME] : 'income',
  [TransactionType.OUTCOME] : 'outcome'
}

@Component({
  selector: 'app-transaction-valeu',
  imports: [CurrencyPipe],
  templateUrl: './transaction-valeu.html',
  styleUrl: './transaction-valeu.scss',
  host: {
    '[class]': 'cssClass()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionValeu {

  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClass[this.transaction().type])

}
