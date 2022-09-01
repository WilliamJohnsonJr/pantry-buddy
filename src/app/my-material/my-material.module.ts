import { NgModule } from '@angular/core';

import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  MatButtonModule,
} from '@angular/material/button';
import { 
  MatCardModule
} from '@angular/material/card'
import {   MatCheckboxModule, } from '@angular/material/checkbox';
import { MatDialogModule, } from '@angular/material/dialog';
import {   MatIconModule, } from '@angular/material/icon';
import {   MatInputModule, } from '@angular/material/input';
import { MatListModule,} from '@angular/material/list';
import {   MatSelectModule,} from '@angular/material/select';
import {   MatSidenavModule,} from '@angular/material/sidenav';
import { MatRadioModule,} from '@angular/material/radio';
import {MatTabsModule, } from '@angular/material/tabs';
import { MatToolbarModule,} from '@angular/material/toolbar';
import { MatTableModule, } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAutocompleteComponent } from './my-autocomplete/my-autocomplete.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [
    MyAutocompleteComponent
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    CdkTableModule,
    MyAutocompleteComponent
  ]
})
export class MyMaterialModule { }
