import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../my-material/my-material.module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class CoreModule { }
