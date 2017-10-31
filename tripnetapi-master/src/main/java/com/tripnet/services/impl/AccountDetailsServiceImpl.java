package com.tripnet.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.AccountDetails;
import com.tripnet.services.ICommonService;

@Service
public class AccountDetailsServiceImpl implements ICommonService<AccountDetails>{
	@Autowired
	private ICommonDAO<AccountDetails> commonDAO;

	@Override
	public AccountDetails getOneById(int accountDetailsId) {
		AccountDetails obj = commonDAO.getOneById(accountDetailsId);
		return obj;
	}

	@Override
	public List<AccountDetails> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean add(AccountDetails accountDetails) {
		commonDAO.add(accountDetails);
		return true;
	}

	@Override
	public void update(AccountDetails accountDetails) {
		commonDAO.update(accountDetails);
		
	}

	@Override
	public void delete(int accountDetailsId) {
		// TODO Auto-generated method stub
		
	}
}
