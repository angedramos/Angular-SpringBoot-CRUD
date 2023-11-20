import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @Input() employee: Employee = {id:0, firstName:'', lastName:'',email:''}
  constructor(private employeeService: EmployeeService, private router:Router){

  }

  ngOnInit(): void {
      
  }

  addEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data=>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }


  onSubmit():void{
    this.addEmployee();
  }
}
