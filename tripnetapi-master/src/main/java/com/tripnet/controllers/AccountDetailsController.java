package com.tripnet.controllers;

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

import com.tripnet.enties.AccountDetails;
import com.tripnet.services.ICommonService;

@Controller
@RequestMapping("user")
public class AccountDetailsController {
	@Autowired
	private ICommonService<AccountDetails> commonService;
	
	@GetMapping("accountdetails/{id}")
	public ResponseEntity<AccountDetails> getAccountById(@PathVariable("id") Integer id) {
		AccountDetails ad = commonService.getOneById(id);
		return new ResponseEntity<AccountDetails>(ad, HttpStatus.OK);
	}
	
	@PostMapping("accountdetails")
	public ResponseEntity<Void> addAccount(@RequestBody AccountDetails ad, UriComponentsBuilder builder) {
        commonService.add(ad);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/article/{id}").buildAndExpand(ad.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	@PutMapping("accountdetails")
	public ResponseEntity<AccountDetails> updateAccount(@RequestBody AccountDetails ad) {
		commonService.update(ad);
		return new ResponseEntity<AccountDetails>(ad, HttpStatus.OK);
	}
	
}
