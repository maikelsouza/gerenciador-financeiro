import { Component, computed, inject, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/service/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { SearchComponent } from "./components/search/search.component";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

function typeDelay(signal: Signal<string>) {
    const observable = toObservable(signal).pipe(debounceTime(500));
    return toSignal(observable, { initialValue: '' } ); 
}


@Component({
  selector: 'app-list',
   imports: [MatButtonModule, RouterLink, TransactionsContainerComponent, 
    TransactionItem, NoTransactions, SearchComponent, MatProgressBarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent{

  private readonly transactionsService = inject(TransactionsService);

  private readonly feedbackService = inject(FeedbackService);

  private readonly confirmationDialogService = inject(ConfirmationDialogService);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly router = inject(Router);

  searchTerm = signal('');  

  private readonly resourceRef = this.transactionsService.getAllWithHttpResource(typeDelay(this.searchTerm));

  transactions = computed(() => this.resourceRef.value());

  isLoading = computed(() => this.resourceRef.isLoading());


  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.activatedRoute });
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
    this.resourceRef.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id)
    );
  }

  

}
