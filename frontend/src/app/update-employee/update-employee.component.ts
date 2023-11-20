import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../interfaces/Employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  getEmployee: Employee = {id:0, firstName:'', lastName:'', email:''};
  id: number;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data=>{
      this.getEmployee = data;
    },
    error => console.log(error));
  }

  editEmployee(){
    this.employeeService.updateEmployee(this.id,this.getEmployee).subscribe(data=>{
      console.log(this.getEmployee);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }


  onSubmit():void{
    this.editEmployee();
  }
}
