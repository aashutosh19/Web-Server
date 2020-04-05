-- MySQL Script generated by MySQL Workbench
-- Sun Nov 24 06:03:10 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csc651_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema csc651_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csc651_db`;
USE `csc651_db` ;

-- -----------------------------------------------------
-- Table `csc651_db`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc651_db`.`user_role` (
  `role_id` INT NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csc651_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc651_db`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `role_id` INT NULL,
  `disable` INT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `role_id_idx` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `csc651_db`.`user_role` (`role_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csc651_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc651_db`.`status` (
  `status_id` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`status_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csc651_db`.`issue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc651_db`.`issue` (
  `issue_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `description` MEDIUMTEXT NULL,
  `user_id` INT NULL,
  `status_id` INT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`issue_id`),
  INDEX `status_idx` (`status_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `status`
    FOREIGN KEY (`status_id`)
    REFERENCES `csc651_db`.`status` (`status_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `csc651_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;