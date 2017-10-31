package com.tripnet.dao;

public interface IArticleDAO<T> {
    boolean articleExists(String title, String category);
}
