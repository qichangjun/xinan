import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProblemData } from '../../common/interface';

@Component({
  selector: 'app-common-problem',
  templateUrl: './common-problem.page.html',
  styleUrls: ['./common-problem.page.scss'],
})
export class CommonProblemPage implements OnInit {
  items: any[];

  constructor(
    private router: Router,
  ) {
    this.items = Array.from({ length: 2 }, (_, k) => createNewRescue(k + 1));
  }
  isShow = false;
  ngOnInit() {
  }
  allType() {
    if (this.isShow === false) {
      this.router.navigate(['/problem_details/１']);
    } else {
      this.router.navigate(['/problem_details/２']);
    }
  }
}
function createNewRescue(id: number): ProblemData {

  return {
    id: id.toString(),
    data: []
  };
}
