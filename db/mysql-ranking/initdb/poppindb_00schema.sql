-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema poppin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `poppin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

USE `poppin` ;

-- -----------------------------------------------------
-- Table `poppin`.`user`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `poppin`.`popup_ranking` (
  `popup_ranking_id` INT NOT NULL AUTO_INCREMENT,
  `popup_id` INT NOT NULL,
  `views` INT NOT NULL,
  `likes` INT NOT NULL,
  `reviewScore` FLOAT NOT NULL,
  `reviewCount` INT NOT NULL,
  `reservations` INT NOT NULL,
  `created_date` DATE NOT NULL,
  PRIMARY KEY (`popup_ranking_id`)
) ENGINE = InnoDB;