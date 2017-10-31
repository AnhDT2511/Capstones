package com.tripnet.dao;

import java.util.List;


public interface ICommonDAO<T> {
	T getOneById(int objectId);
	List<T> getAll();	
    void add(T object);
    void update(T object);
    void delete(int objectId);
}
