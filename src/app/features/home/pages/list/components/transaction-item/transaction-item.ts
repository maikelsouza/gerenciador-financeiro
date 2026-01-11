import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionValeu } from './components/transaction-valeu/transaction-valeu';
import { Transaction } from '../../../../../../shared/transaction/interfaces/transaction';
import { CustomColorDirective } from '@shared/material/buttons/directives/custom-color.directive';
import { IsIncomeDirective } from './directives/is-income.directive';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValeu, CustomColorDirective, IsIncomeDirective],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {

  transaction = input.required<Transaction>();

  edit = output<Transaction>();

  remove = output<Transaction>();



}
