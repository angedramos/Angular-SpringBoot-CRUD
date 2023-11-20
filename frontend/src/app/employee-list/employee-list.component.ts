import { Component, OnInit } from '@angular/core';
import { Employee } from '../interfaces/Employee';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  id: number;
  employees: Employee[] = [];
  getEmployee: Employee = { id: 0, firstName: '', lastName: '', email: '' };
  constructor(private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      console.log(data);
    })
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {

    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.getEmployee = data;
      let firstNameEmployee = this.getEmployee.firstName;
      let lastNameEmployee = this.getEmployee.lastName;
      Swal.fire({
        title: "Do you really wanna delete the employee: <strong>" + firstNameEmployee + " " + lastNameEmployee + "</strong>?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.employeeService.deleteEmployee(id).subscribe(data => {
            Swal.fire("Deleted!", "Employee <strong>" + firstNameEmployee + " " + lastNameEmployee + "</strong> has been deleted.", "success");
            this.getEmployees();
          },
            error => console.log(error));
        }
      });
    })
  }

  employeeDetails(id:number){
    this.router.navigate(['employee-details/'+id])
  }
}
