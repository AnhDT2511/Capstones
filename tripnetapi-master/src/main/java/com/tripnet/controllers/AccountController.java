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

import com.tripnet.enties.Account;
import com.tripnet.services.IAccountService;
import com.tripnet.services.ICommonService;

@Controller
@RequestMapping("user")
public class AccountController {
	@Autowired
	private ICommonService<Account> commonService;
	@Autowired
	private IAccountService<Account> accountService;
	
	@GetMapping("account/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable("id") Integer id) {
		Account account = commonService.getOneById(id);
		return new ResponseEntity<Account>(account, HttpStatus.OK);
	}
	
	@GetMapping("account/get-all")
	public ResponseEntity<List<Account>> getAllAccounts() {
		List<Account> list = commonService.getAll();
		return new ResponseEntity<List<Account>>(list, HttpStatus.OK);
	}
	
	
	@PostMapping("account")
	public ResponseEntity<Void> addAccount(@RequestBody Account account, UriComponentsBuilder builder) {
        boolean flag = commonService.add(account);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/article/{id}").buildAndExpand(account.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	@PostMapping("account/login")
	public ResponseEntity<List<Account>> login(@RequestBody Account account, UriComponentsBuilder builder) {
		List<Account> list = accountService.login(account);
        if (list.isEmpty()) {
        	return new ResponseEntity<List<Account>>(list, HttpStatus.NO_CONTENT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/article/{id}").buildAndExpand(account.getId()).toUri());
        return new ResponseEntity<List<Account>>(list, HttpStatus.OK);
	}
	
	@PutMapping("account")
	public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
		commonService.update(account);
		return new ResponseEntity<Account>(account, HttpStatus.OK);
	}
	
}
