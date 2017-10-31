package com.tripnet.services;

import java.util.List;

public interface ICommonService<T> {
	T getOneById(int objectId);
	List<T> getAll();	
    boolean add(T object);
    void update(T object);
    void delete(int objectId);
}
