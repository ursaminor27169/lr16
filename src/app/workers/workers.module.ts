import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerTableComponent } from './worker-table/worker-table.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkersComponent, WorkerTableComponent, WorkerEditComponent],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    ReactiveFormsModule
  ]
})
export class WorkersModule { }
