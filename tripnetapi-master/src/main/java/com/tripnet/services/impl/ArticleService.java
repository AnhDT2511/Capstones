package com.tripnet.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripnet.dao.IArticleDAO;
import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.Article;
import com.tripnet.services.ICommonService;

@Service
public class ArticleService implements ICommonService<Article> {
	@Autowired
	private ICommonDAO<Article> commonDAO;
	@Autowired
	private IArticleDAO<Article> articleDAO;
	
	@Override
	public Article getOneById(int articleId) {
		Article obj = commonDAO.getOneById(articleId);
		return obj;
	}	
	
	@Override
	public List<Article> getAll(){
		return commonDAO.getAll();
	}
	
	@Override
	public synchronized boolean add(Article article){
       if (articleDAO.articleExists(article.getTitle(), article.getCategory())) {
    	   return false;
       } else {
    	   commonDAO.add(article);
    	   return true;
       }
	}
	
	@Override
	public void update(Article article) {
		commonDAO.update(article);
	}
	
	@Override
	public void delete(int articleId) {
		commonDAO.delete(articleId);
	}
}
