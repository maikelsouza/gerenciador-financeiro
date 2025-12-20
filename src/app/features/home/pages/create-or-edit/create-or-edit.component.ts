import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionType } from '../../../../shared/transaction/interfaces/enums/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import { TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../../shared/feedback/services/feedback.service';

@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule, MatInputModule, 
            ReactiveFormsModule, MatButtonModule,
            MatButtonToggleModule, NgxMaskDirective],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly transactionsService = inject(TransactionsService);

  private readonly router = inject(Router);

  private readonly feedbackService = inject(FeedbackService);

  readonly transactionType = TransactionType;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data);
  }

  form = new FormGroup({
    type: new FormControl('',{
      validators: [Validators.required] 
    }),
    title: new FormControl('',{
      validators: [Validators.required] 
    }),
    value: new FormControl(0,{
      validators: [Validators.required] 
    }),
  })

  submit(){
    if (this.form.invalid){
      return; 
    }

    const payload: TransactionPayload = {      
      title: this.form.value.title as string,
      type: this.form.value.type as TransactionType,
      value: this.form.value.value as number
    };

    this.transactionsService.post(payload).subscribe({
      next: () => {
        this.feedbackService.success('Transação criada com sucesso!');        
        this.router.navigate(['/']);
      }
    });
  }


}
