import { Component, OnInit } from '@angular/core';
import { Employee } from '../interfaces/Employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id:number;
  employee:Employee = { id: 0, firstName: '', lastName: '', email: '' };

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      this.employee = data;
    }, 
    error => console.log(error))
  }
}
