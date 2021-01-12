import { Component, OnInit } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/models/myworkers.model'
import { MyworkersService } from 'src/app/shared/services/myworkers.service'
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-worker-table',
  templateUrl: './worker-table.component.html',
  styleUrls: ['./worker-table.component.css']
})
export class WorkerTableComponent implements OnInit {

  workers: MyWorker[] = [];
  MyWorkerType = MyWorkerType;
  department: string;
  add: number;
  nowDate = new Date();
  myStr: string;
  forFilter = 'idUp';

  constructor(private MyworkersService: MyworkersService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getDepartment(id: number) {
    this.department = (id === this.MyWorkerType.IT) ? 'IT' :
                      (id === this.MyWorkerType.sales) ? 'Sales' :
                      (id === this.MyWorkerType.delivery) ? 'Delivery' :
                      (id === this.MyWorkerType.legal) ? 'Legal' :
                      '-';
    return this.department;
  }

  getAge(date: string) {    
    this.add = (((this.nowDate.getMonth()+1) > +date.slice(3,5)) ||
               (((this.nowDate.getMonth()+1) == +date.slice(3,5)) && (this.nowDate.getDate() >= +date.slice(0,2)))) ? 0 : 1;
    return this.nowDate.getFullYear() - +date.slice(6,10) - this.add;    
  }
  
  async getData() {
    try {
      let workers = this.MyworkersService.getAll();
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (err) {
      console.error(err);
    }
  }

  onAddWorker() {
    this.router.navigate([this.router.url, 'edit']);
  }

  onEditWorker(id: number) {
    this.router.navigate([this.router.url, 'edit', id]);
  }

  async onDeleteWorker(id: number) {
    try {
      await this.MyworkersService.deleteOneById(id);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  idUp() {
    this.forFilter = 'idUp';
  }

  idDown() {
    this.forFilter = 'idDown';
  }

  ageUp() {
    this.forFilter = 'ageUp';
  }

  ageDown() {
    this.forFilter = 'ageDown';
  }

}
