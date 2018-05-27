import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-meal-container',
  templateUrl: './edit-meal-container.component.html',
  styleUrls: ['./edit-meal-container.component.css']
})
export class EditMealContainerComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
