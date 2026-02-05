import { Component, computed, input } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { Balance } from './components/balance/balance';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartConfig } from './components/pie-chart/pie-chart-config.interface';
import { TransactionType } from '@shared/transaction/interfaces/enums/transaction-type';
import { sumTransactions } from '@shared/transaction/functions/sum-transactions';

@Component({
  selector: 'app-home',
   imports: [Balance, PieChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent{

 transactions = input.required<Transaction[]>()

 totalIncomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.INCOME);
  });

  totalOutcomes = computed(() => {
    return sumTransactions(this.transactions(), TransactionType.OUTCOME);
  });

 chartConfig = computed<PieChartConfig>(() => {
    return {labels: ['Ganhos', 'Gastos'],
           dataLabel: 'Valor Total',
           data: [this.totalIncomes(), this.totalOutcomes()]}
 });
  

}
