import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DividerModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    MenuModule,
    DataViewModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    DropdownModule,
    RadioButtonModule,
    StepsModule,
    MultiSelectModule,
    CalendarModule,
    PasswordModule,
    InputNumberModule
  ],
  exports:[
    ProgressSpinnerModule,
    ConfirmDialogModule,
    DividerModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    MenuModule,
    DataViewModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    DropdownModule,
    RadioButtonModule,
    StepsModule,
    MultiSelectModule,
    CalendarModule,
    PasswordModule,
    InputNumberModule
  ],
  providers:[],
  
})
export class PrimengModule { }
