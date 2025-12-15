import { Component, computed, input } from '@angular/core';
import { TransactionType } from '../../../../../../shared/transaction/interfaces/enums/transaction-type';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';

const CssClass = {
  [TransactionType.INCOME] : 'income',
  [TransactionType.OUTCOME] : 'outcome'
}

@Component({
  selector: 'app-transaction-valeu',
  imports: [],
  templateUrl: './transaction-valeu.html',
  styleUrl: './transaction-valeu.scss',
  host: {
    '[class]': 'cssClass()'
  }
})

export class TransactionValeu {

  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClass[this.transaction().type])

}
