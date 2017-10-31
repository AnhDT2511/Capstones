package com.tripnet.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import com.tripnet.enties.TourByDayDetails;
import com.tripnet.services.ICommonService;

/*
 * *Author: QuanDT
 */
@Controller
@RequestMapping("tours/post")
public class TourByDayDetailsController {
	@Autowired
	private ICommonService<TourByDayDetails> commonService;
	
	@GetMapping("{id}/day/{day}/detail")
	public ResponseEntity<TourByDayDetails> getTourByDayDetailsById(@PathVariable("id") Integer id,@PathVariable("day") Integer day) {
		TourByDayDetails TourByDayDetails = commonService.getOneById(id);
		return new ResponseEntity<TourByDayDetails>(TourByDayDetails, HttpStatus.OK);
	}
	
	@GetMapping("{id}/day/{day}/detail/get-all")
	public ResponseEntity<List<TourByDayDetails>> getAllTourByDayDetailss(@PathVariable("id") Integer id,@PathVariable("day") Integer day) {
		List<TourByDayDetails> list = commonService.getAll();
		return new ResponseEntity<List<TourByDayDetails>>(list, HttpStatus.OK);
	}
	
	
	@PostMapping("day/detail")
	public ResponseEntity<Void> addTourByDayDetails(@RequestBody TourByDayDetails TourByDayDetails, UriComponentsBuilder builder) {
        boolean flag = commonService.add(TourByDayDetails);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/article/{id}").buildAndExpand(TourByDayDetails.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	

	@PutMapping("day/detail")
	public ResponseEntity<TourByDayDetails> updateTourByDayDetails(@RequestBody TourByDayDetails TourByDayDetails) {
		commonService.update(TourByDayDetails);
		return new ResponseEntity<TourByDayDetails>(TourByDayDetails, HttpStatus.OK);
	}public TourByDayDetailsController() {
		// TODO Auto-generated constructor stub
	}
	
}
