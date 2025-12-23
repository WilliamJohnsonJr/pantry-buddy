import { NgModule } from '@angular/core';

import { MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {
  MatLegacyButtonModule as MatButtonModule,
} from '@angular/material/legacy-button';
import { 
  MatLegacyCardModule as MatCardModule
} from '@angular/material/legacy-card'
import {   MatLegacyCheckboxModule as MatCheckboxModule, } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule, } from '@angular/material/legacy-dialog';
import {   MatIconModule, } from '@angular/material/icon';
import {   MatLegacyInputModule as MatInputModule, } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule,} from '@angular/material/legacy-list';
import {   MatLegacySelectModule as MatSelectModule,} from '@angular/material/legacy-select';
import {   MatSidenavModule,} from '@angular/material/sidenav';
import { MatLegacyRadioModule as MatRadioModule,} from '@angular/material/legacy-radio';
import {MatLegacyTabsModule as MatTabsModule, } from '@angular/material/legacy-tabs';
import { MatToolbarModule,} from '@angular/material/toolbar';
import { MatLegacyTableModule as MatTableModule, } from '@angular/material/legacy-table';
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
