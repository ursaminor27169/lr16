import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(workers: any[], myStr: string): any[] {
    if ((myStr === '') || (myStr === undefined)) {
      return workers;
    }
    else{
      let filteredItems = workers.filter((worker) =>
        worker.name.toLowerCase().indexOf(myStr.toLowerCase()) !== -1 ||
        worker.surname.toLowerCase().indexOf(myStr.toLowerCase()) !== -1
      );
      return filteredItems;
    }

  }

}
