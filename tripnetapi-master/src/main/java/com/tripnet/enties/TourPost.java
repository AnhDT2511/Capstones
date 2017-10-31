package com.tripnet.enties;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/*
 * *Author: QuanDT
 */
@Entity
@Table(name = "tour_posts")
public class TourPost implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Id")
	private int id;
	@Column(name = "Acount_ID")
	private int accountID;
	@Column(name = "Start_Place_ID")
	private int startPlaceID;
	@Column(name = "End_Place_ID")
	private int endPlaceID;
	@Column(name = "Duration")
	private int duration;
	@Column(name = "Description")
	private String Description;
	@Column(name = "Tour_Article_Title")
	private String tourArticleTitle;
	@Column(name = "Deleted")
	private int deleted;
	@Column(name = "Created_Time")
	private String createTime;
	@Column(name = "Vehicle")
	private String Vehicle;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAccountID() {
		return accountID;
	}
	public void setAccountID(int accountID) {
		this.accountID = accountID;
	}
	public int getStartPlaceID() {
		return startPlaceID;
	}
	public void setStartPlaceID(int startPlaceID) {
		this.startPlaceID = startPlaceID;
	}
	public int getEndPlaceID() {
		return endPlaceID;
	}
	public void setEndPlaceID(int endPlaceID) {
		this.endPlaceID = endPlaceID;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getTourArticleTitle() {
		return tourArticleTitle;
	}
	public void setTourArticleTitle(String tourArticleTitle) {
		this.tourArticleTitle = tourArticleTitle;
	}
	public int getDeleted() {
		return deleted;
	}
	public void setDeleted(int deleted) {
		this.deleted = deleted;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getVehicle() {
		return Vehicle;
	}
	public void setVehicle(String vehicle) {
		Vehicle = vehicle;
	}
	
}