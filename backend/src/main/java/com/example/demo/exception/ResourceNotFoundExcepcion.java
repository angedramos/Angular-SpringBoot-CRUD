package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND)
public class ResourceNotFoundExcepcion extends RuntimeException{
	
	
	private static final long serialVersionID = 1;
	
	public ResourceNotFoundExcepcion(String message) {
		super(message);
	}

}
