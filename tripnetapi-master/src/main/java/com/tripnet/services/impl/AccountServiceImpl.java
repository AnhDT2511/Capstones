package com.tripnet.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripnet.dao.IAccountDAO;
import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.Account;
import com.tripnet.services.IAccountService;
import com.tripnet.services.ICommonService;

@Service
public class AccountServiceImpl implements ICommonService<Account>, IAccountService<Account>{
	@Autowired
	private ICommonDAO<Account> commonDAO;
	@Autowired
	private IAccountDAO<Account> accountDAO;
	
	@Override
	public Account getOneById(int accountId) {
		Account obj = commonDAO.getOneById(accountId);
		return obj;
	}
	
	@Override
	public List<Account> getAll() {
		return commonDAO.getAll();
	}	

	@Override
	public synchronized boolean add(Account account) {
		if (accountDAO.accountExists(account.getUserName(), account.getEmail())) {
			return false;
		} else {
			commonDAO.add(account);
			return true;
		}
	}

	@Override
	public void update(Account account) {
		commonDAO.update(account);
		
	}

	@Override
	public void delete(int accountId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Account> login(Account account) {
		return accountDAO.checkLogin(account.getEmail(), account.getPassword());
	}

}
