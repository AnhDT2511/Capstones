package com.tripnet.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.TourByDay;
import com.tripnet.enties.TourByDayDetails;
import com.tripnet.services.ICommonService;

/*
 * *Author: QuanDT
 */
@Service
public class TourByDayDetailServiceImpl implements ICommonService<TourByDayDetails> {
	@Autowired
	private ICommonDAO<TourByDayDetails> commonDAO;
	
	@Override
	public TourByDayDetails getOneById(int objectId) {
		return commonDAO.getOneById(objectId);
	}

	@Override
	public List<TourByDayDetails> getAll() {
		return commonDAO.getAll();
	}

	@Override
	public boolean add(TourByDayDetails object) {
		if(object != null) {
			commonDAO.add(object);
			return true;
		}else return true;
	}

	@Override
	public void update(TourByDayDetails object) {
		if(object != null) commonDAO.update(object);
	}

	@Override
	public void delete(int objectId) {
		// TODO Auto-generated method stub
		
	}

}
