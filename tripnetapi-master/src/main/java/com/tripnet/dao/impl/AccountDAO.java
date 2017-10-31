package com.tripnet.dao.impl;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tripnet.dao.IAccountDAO;
import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.Account;

@Transactional
@Repository
public class AccountDAO implements ICommonDAO<Account>, IAccountDAO<Account>{
	@PersistenceContext	
	private EntityManager entityManager;
	
	@Override
	public Account getOneById(int accountId) {
		return entityManager.find(Account.class, accountId);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Account> getAll() {
		String hql = "FROM Account AS acc WHERE acc.deleted = ?";
		return entityManager.createQuery(hql).setParameter(1, 1).getResultList();
	}

	@Override
	public void add(Account account) {
		entityManager.persist(account);
		
	}

	@Override
	public void update(Account account) {
		Account acc = getOneById(account.getId());
		acc.setUserName(account.getUserName());
		//acc.setEmail(acc.getEmail());
		acc.setPassword(account.getPassword());
		acc.setPhotoId(account.getPhotoId());
		acc.setCredit(account.getCredit());
		acc.setPoint(account.getPoint());
		acc.setDeleted(account.getDeleted());
		//acc.getCreateTime();
		acc.setRoleId(account.getRoleId());
		entityManager.flush();		
	}

	@Override
	public void delete(int accountId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean accountExists(String username, String email) {
		String hql = "FROM Account AS acc WHERE acc.email = ?";
		int count = entityManager.createQuery(hql).setParameter(1, email).getResultList().size();
		return count > 0 ? true : false;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Account> checkLogin(String email, String password) {
		String hql = "FROM Account AS acc WHERE acc.email = ? AND acc.password = ?";
		return entityManager.createQuery(hql).setParameter(1, email).setParameter(2, password).getResultList();
	}


}
