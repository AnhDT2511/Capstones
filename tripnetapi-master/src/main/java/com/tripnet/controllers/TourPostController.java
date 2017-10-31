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

import com.tripnet.enties.TourPost;
import com.tripnet.services.ICommonService;
/*
 * *Author: QuanDT
 */
@Controller
@RequestMapping("tours")
public class TourPostController {
	@Autowired
	private ICommonService<TourPost> commonService;
	
	@GetMapping("post/{id}")
	public ResponseEntity<TourPost> getTourPostById(@PathVariable("id") Integer id) {
		TourPost TourPost = commonService.getOneById(id);
		return new ResponseEntity<TourPost>(TourPost, HttpStatus.OK);
	}
	
	@GetMapping("post/get_all")
	public ResponseEntity<List<TourPost>> getAllTourPosts() {
		List<TourPost> list = commonService.getAll();
		return new ResponseEntity<List<TourPost>>(list, HttpStatus.OK);
	}
	
	
	@PostMapping("post")
	public ResponseEntity<Void> addTourPost(@RequestBody TourPost TourPost, UriComponentsBuilder builder) {
        boolean flag = commonService.add(TourPost);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/article/{id}").buildAndExpand(TourPost.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	

	@PutMapping("post")
	public ResponseEntity<TourPost> updateTourPost(@RequestBody TourPost TourPost) {
		commonService.update(TourPost);
		return new ResponseEntity<TourPost>(TourPost, HttpStatus.OK);
	}public TourPostController() {
		// TODO Auto-generated constructor stub
	}
	
//	public static void main(String[] args) {
//		List<TourPost> list = commonService.getAll();
//		for (TourPost tourPost : list) {
//			tourPost.toString();
//		}
//	}
}
