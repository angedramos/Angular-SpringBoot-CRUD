package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundExcepcion;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@RestController
@RequestMapping("api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@GetMapping("/employees")
	@CrossOrigin(origins ="http://localhost:4200/") 
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	@CrossOrigin
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee){
		return employeeRepository.save(employee);
	}
	
	@CrossOrigin
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id).orElseThrow(
				()-> new ResourceNotFoundExcepcion("Employee doesn't exist with id: "+id));
		
		return ResponseEntity.ok(employee);
	}
	
	@CrossOrigin
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
		Employee getEmployee = employeeRepository.findById(id).orElseThrow(
				()-> new ResourceNotFoundExcepcion("Employee doesn't exist with id: "+id));
			
		getEmployee.setFirstName(employee.getFirstName());
		getEmployee.setLastName(employee.getLastName());
		getEmployee.setEmail(employee.getEmail());
		Employee updatedEmployee = employeeRepository.save(getEmployee);
		
		return ResponseEntity.ok(updatedEmployee);
	}
	@CrossOrigin
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee getEmployee = employeeRepository.findById(id).orElseThrow(
				()-> new ResourceNotFoundExcepcion("Employee doesn't exist with id: "+id));
			
		employeeRepository.delete(getEmployee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Employee Deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
