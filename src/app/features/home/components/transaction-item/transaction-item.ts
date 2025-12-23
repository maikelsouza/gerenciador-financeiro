import { Component, input, output, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { TransactionValeu } from './components/transaction-valeu/transaction-valeu';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValeu],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {

  transaction = input.required<Transaction>();

  edit = output<Transaction>();

  remove = output<Transaction>();



}
