import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { ConfirmationDialogService } from '../../../../shared/dialog/confirmation/service/confirmation-dialog.service';
import { FeedbackService } from '../../../../shared/feedback/services/feedback.service';
import { Transaction } from '../../../../shared/transaction/interfaces/transaction';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import { Balance } from './components/balance/balance';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';


@Component({
  selector: 'app-list',
   imports: [Balance,
    MatButtonModule,
    RouterLink, TransactionsContainerComponent, TransactionItem, NoTransactions],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit{

    private readonly transactionsService = inject(TransactionsService);

  private readonly feedbackService = inject(FeedbackService);

  private readonly confirmationDialogService = inject(ConfirmationDialogService);

  private readonly router = inject(Router);

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService.open({
      title: 'Deletar Transação',
      message: 'Você realmente que deletar a transação?',
      noBtnText: 'Não',
      yesBtnText: 'Sim',
    }).subscribe({
      next: () => {
        this.transactionsService.delete(transaction.id).subscribe({
          next: () => {
            this.removeTransactionFromArray(transaction);
            this.feedbackService.success('Transação Removida com Sucesso');
          },
        });
      },
    });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id)
    );
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }

}
