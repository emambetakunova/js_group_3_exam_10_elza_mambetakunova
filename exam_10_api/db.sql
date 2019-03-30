CREATE SCHEMA `exam_10` DEFAULT CHARACTER SET utf8;

USE `exam_10`;

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `image` VARCHAR(100) NULL,
  `data` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `author` VARCHAR(255) NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `news_id_fk_idx` (`news_id` ASC),
  CONSTRAINT `news_id_fk`
    FOREIGN KEY (`news_id`)
    REFERENCES `news` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO `news` (`id`, `title`, `content`, `data`)
VALUES
	(1, 'New news 1', 'Some comment', '2013'),
    (2, 'New news 2', 'Some comment', '2014'),
    (3, 'New news 3', 'Some comment', '2015'),
    (4, 'New news 4', 'Some comment', '2016');

INSERT INTO `comments` (`id`, `news_id`, `author`, `comment`)
VALUES
	(3, 1, 'Elza', 'Some comment'),
    (4, 2, 'Asel', 'Some comment'),
    (6, 4, 'Oleg', 'Some comment'),
    (7, 3, 'Anna', 'Some comment');