-- MySQL Script generated by MySQL Workbench
-- 10/12/17 00:48:26
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema TripNet
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `TripNet` ;

-- -----------------------------------------------------
-- Schema TripNet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TripNet` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `TripNet` ;

-- -----------------------------------------------------
-- Table `TripNet`.`Account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Account` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Account` (
  `Id` INT NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `User_Name` VARCHAR(45) NULL,
  `Photo_Id` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  `Credit` INT NULL,
  `Point` INT NULL,
  `Last_Sign_On` DATETIME NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Account_Details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Account_Details` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Account_Details` (
  `Job` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `Last_Name` VARCHAR(45) NULL,
  `First_Name` VARCHAR(45) NULL,
  `Gender` VARCHAR(45) NULL,
  `Date_of_Birth` DATE NULL,
  `Phone_Number` INT NULL,
  `Account_Id` INT NOT NULL,
  PRIMARY KEY (`Account_Id`),
  CONSTRAINT `fk_Account Details_Account`
    FOREIGN KEY (`Account_Id`)
    REFERENCES `TripNet`.`Account` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Role` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Role` (
  `Id` INT NOT NULL,
  `Role_Name` VARCHAR(45) NULL,
  `Account_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Account_Id`),
  INDEX `fk_Role_Account1_idx` (`Account_Id` ASC),
  CONSTRAINT `fk_Role_Account1`
    FOREIGN KEY (`Account_Id`)
    REFERENCES `TripNet`.`Account` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Tour_Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Tour_Post` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Tour_Post` (
  `Id` INT NOT NULL,
  `Created_Time` DATETIME NULL,
  `Deleted` TINYINT NULL,
  `Tour_Article_Title` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  `Duration` INT NULL,
  `Account_Id` INT NOT NULL,
  `Place_Id` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Tour Post_Account1_idx` (`Account_Id` ASC),
  CONSTRAINT `fk_Tour Post_Account1`
    FOREIGN KEY (`Account_Id`)
    REFERENCES `TripNet`.`Account` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Like` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Like` (
  `Id` INT NOT NULL,
  `Created_Time` DATETIME NULL,
  `Like_By_Id` VARCHAR(45) NULL,
  `Tour_Post_Id` INT NOT NULL,
  `Tour_Post_Account_Id` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Like_Tour Post1_idx` (`Tour_Post_Id` ASC),
  CONSTRAINT `fk_Like_Tour Post1`
    FOREIGN KEY (`Tour_Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Comments` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Comments` (
  `id` INT NOT NULL,
  `Content` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  `Comment_By_Id` INT NULL,
  `Created_Time` DATETIME NULL,
  `Tour Post Account Id` INT NULL,
  `Tour_Post_Id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Comments_Tour Post1_idx` (`Tour_Post_Id` ASC),
  CONSTRAINT `fk_Comments_Tour Post1`
    FOREIGN KEY (`Tour_Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Share`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Share` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Share` (
  `id` INT NOT NULL,
  `Tour_Post_Account_Id` INT NULL,
  `Created_Time` DATETIME NULL,
  `Deleted` TINYINT NULL,
  `Tour Post_Id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Share_Tour Post1_idx` (`Tour Post_Id` ASC),
  CONSTRAINT `fk_Share_Tour Post1`
    FOREIGN KEY (`Tour Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Tour_By_Day`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Tour_By_Day` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Tour_By_Day` (
  `Id` INT NOT NULL,
  `Tour_Post_Account_Id` INT NULL,
  `Vehicle` INT NULL,
  `Updated_Time` DATETIME NULL,
  `Stay_Location` VARCHAR(45) NULL,
  `Hotel` VARCHAR(45) NULL,
  `Day` INT NULL,
  `Deleted` TINYINT NULL,
  `Created_Time` DATETIME NULL,
  `Tour_Post_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Tour By Day_Tour Post1_idx` (`Tour_Post_Id` ASC),
  CONSTRAINT `fk_Tour By Day_Tour Post1`
    FOREIGN KEY (`Tour_Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Places`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Places` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Places` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Created_Time` DATETIME NULL,
  `Type` INT NULL,
  `Deleted` TINYINT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Tour_By_Day_Place_Detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Tour_By_Day_Place_Detail` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Tour_By_Day_Place_Detail` (
  `Created_Time` DATETIME NULL,
  `Places_Id` INT NOT NULL,
  `Deleted` TINYINT NULL,
  `Tour_By_Day_Id` INT NOT NULL,
  INDEX `fk_Tour By Day Place Detail_Places1_idx` (`Places_Id` ASC),
  PRIMARY KEY (`Tour_By_Day_Id`),
  CONSTRAINT `fk_Tour By Day Place Detail_Places1`
    FOREIGN KEY (`Places_Id`)
    REFERENCES `TripNet`.`Places` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tour_By_Day_Place_Detail_Tour_By_Day1`
    FOREIGN KEY (`Tour_By_Day_Id`)
    REFERENCES `TripNet`.`Tour_By_Day` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Report` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Report` (
  `Id` INT NOT NULL,
  `Reason` VARCHAR(45) NULL,
  `Report_Name` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Report_Tour_Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Report_Tour_Post` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Report_Tour_Post` (
  `ReportedById` INT NOT NULL,
  `Tour_Post_Account_Id` INT NULL,
  `CreatedTime` DATETIME NULL,
  `Description` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  `Report_Id` INT NOT NULL,
  `Tour_Post_Id` INT NOT NULL,
  PRIMARY KEY (`ReportedById`),
  INDEX `fk_Report Tour Post_Report1_idx` (`Report_Id` ASC),
  INDEX `fk_Report Tour Post_Tour Post1_idx` (`Tour_Post_Id` ASC),
  CONSTRAINT `fk_Report Tour Post_Report1`
    FOREIGN KEY (`Report_Id`)
    REFERENCES `TripNet`.`Report` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Report Tour Post_Tour Post1`
    FOREIGN KEY (`Tour_Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Category` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Category` (
  `Id` INT NOT NULL,
  `Description` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `Type` INT NULL,
  `Deleted` TINYINT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Category_Has_Tour_Post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Category_Has_Tour_Post` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Category_Has_Tour_Post` (
  `Tour_Post_Account_Id` INT NOT NULL,
  `Created_By_Id` INT NULL,
  `Created_Time` DATETIME NULL,
  `Deleted` TINYINT NULL,
  `TourPost_Id` INT NOT NULL,
  `Category_Id` INT NOT NULL,
  INDEX `fk_Category_Has_Tour_Post_TourPost1_idx` (`TourPost_Id` ASC),
  INDEX `fk_Category_Has_Tour_Post_Category1_idx` (`Category_Id` ASC),
  CONSTRAINT `fk_Category_Has_Tour_Post_TourPost1`
    FOREIGN KEY (`TourPost_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Category_Has_Tour_Post_Category1`
    FOREIGN KEY (`Category_Id`)
    REFERENCES `TripNet`.`Category` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Ads_Details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Ads_Details` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Ads_Details` (
  `Id` INT NOT NULL,
  `Location` VARCHAR(45) NULL,
  `Created_Time` DATETIME NULL,
  `State` VARCHAR(45) NULL,
  `End_Date` DATE NULL,
  `Start_Date` DATE NULL,
  `Conditions` VARCHAR(45) NULL,
  `Contact_No` INT NULL,
  `Ads_Title` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `Price` DECIMAL NULL,
  `Account_Id` INT NOT NULL,
  `Category_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Ads_Details_Account1_idx` (`Account_Id` ASC),
  INDEX `fk_Ads_Details_Category1_idx` (`Category_Id` ASC),
  CONSTRAINT `fk_Ads_Details_Account1`
    FOREIGN KEY (`Account_Id`)
    REFERENCES `TripNet`.`Account` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ads_Details_Category1`
    FOREIGN KEY (`Category_Id`)
    REFERENCES `TripNet`.`Category` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Media`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Media` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Media` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Length` DECIMAL NULL,
  `Thumbnails` VARCHAR(45) NULL,
  `Created_Time` DATETIME NULL,
  `Size` DOUBLE NULL,
  `Type` INT NULL,
  `Format` VARCHAR(45) NULL,
  `Media_URL` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  `Resolution` VARCHAR(45) NULL,
  `Deleted` TINYINT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Media_Ads_Details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Media_Ads_Details` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Media_Ads_Details` (
  `Created_Time` DATETIME NULL,
  `Deleted` TINYINT NULL,
  `Media_Id` INT NOT NULL,
  `Ads_Details_Id` INT NOT NULL,
  PRIMARY KEY (`Media_Id`),
  INDEX `fk_Media_Ads_Details_Ads_Details1_idx` (`Ads_Details_Id` ASC),
  CONSTRAINT `fk_Media_Ads_Details_Media1`
    FOREIGN KEY (`Media_Id`)
    REFERENCES `TripNet`.`Media` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Media_Ads_Details_Ads_Details1`
    FOREIGN KEY (`Ads_Details_Id`)
    REFERENCES `TripNet`.`Ads_Details` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TripNet`.`Media_Tour_Post_Details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TripNet`.`Media_Tour_Post_Details` ;

CREATE TABLE IF NOT EXISTS `TripNet`.`Media_Tour_Post_Details` (
  `Created_Time` DATETIME NULL,
  `Tour_Post_Account_Id` INT NULL,
  `Deleted` TINYINT NULL,
  `Tour_Post_Id` INT NOT NULL,
  `Media_Id` INT NOT NULL,
  PRIMARY KEY (`Tour_Post_Id`, `Media_Id`),
  INDEX `fk_Media_Tour_Post_Details_Media1_idx` (`Media_Id` ASC),
  CONSTRAINT `fk_Media_Tour_Post_Details_Tour_Post1`
    FOREIGN KEY (`Tour_Post_Id`)
    REFERENCES `TripNet`.`Tour_Post` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Media_Tour_Post_Details_Media1`
    FOREIGN KEY (`Media_Id`)
    REFERENCES `TripNet`.`Media` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
