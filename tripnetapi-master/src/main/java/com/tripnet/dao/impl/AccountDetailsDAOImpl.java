package com.tripnet.dao.impl;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.AccountDetails;;


@Transactional
@Repository
public class AccountDetailsDAOImpl implements ICommonDAO<AccountDetails>{
	@PersistenceContext	
	private EntityManager entityManager;
	
	@Override
	public AccountDetails getOneById(int accountDetailsId) {
		return entityManager.find(AccountDetails.class, accountDetailsId);
	}

	@Override
	public List<AccountDetails> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void add(AccountDetails accountDetails) {
		entityManager.persist(accountDetails);
		
	}

	@Override
	public void update(AccountDetails accountDetails) {
		AccountDetails ad = getOneById(accountDetails.getId());
		ad.setFirstName(accountDetails.getFirstName());
		ad.setLastName(accountDetails.getLastName());
		ad.setGender(accountDetails.getGender());
		ad.setDob(accountDetails.getDob());
		ad.setPhoneNumber(accountDetails.getPhoneNumber());
		ad.setJob(accountDetails.getJob());
		ad.setAddress(accountDetails.getAddress());
		entityManager.flush();		
	}

	@Override
	public void delete(int accountDetailsId) {
		// TODO Auto-generated method stub
		
	}



}
