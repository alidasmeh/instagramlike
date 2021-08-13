-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2021 at 12:59 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instagramlike`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentid` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `text` text NOT NULL,
  `date` varchar(20) NOT NULL COMMENT 'time in millisecond'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentid`, `postid`, `userid`, `text`, `date`) VALUES
(1, 1, 4, 'The very first comment', '1628260098674'),
(2, 1, 4, 'asdasdadasd', '1628261222720'),
(3, 3, 5, 'It is my comment.\r\n', '1628349584788'),
(4, 4, 5, 'My comment.', '1628349661249'),
(5, 4, 6, 'Hello Dear aliaug7 .', '1628429235799'),
(6, 5, 6, 'OOO.', '1628429359573');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `likeid` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`likeid`, `postid`, `userid`, `date`) VALUES
(7, 3, 5, '1628349566564'),
(8, 4, 5, '1628349664503'),
(9, 4, 6, '1628429211119'),
(10, 5, 6, '1628429329636'),
(15, 2, 4, ''),
(16, 4, 4, ''),
(19, 1, 4, ''),
(21, 5, 4, '');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postid` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `userid` int(11) NOT NULL,
  `date` varchar(20) NOT NULL COMMENT 'time in millisecond'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postid`, `url`, `description`, `userid`, `date`) VALUES
(1, '/images/posts/1628259172285_IMG_6662.jpg', 'the Very first post from the form.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 4, '1628259431885'),
(2, '/images/posts/1628260077197_cape of good hope.jpeg', 'Hi the end of Africa continent.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 4, '1628260098674'),
(3, '/images/posts/1628262248462_Screenshot 2021-08-06 at 19.34.03.png', 'It is a new post. It is great that this platform works.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 4, '1628262269046'),
(4, '/images/posts/1628349635949_IMG_6662.jpg', 'It is my picture I took it.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 5, '1628349649451'),
(5, '/images/posts/1628429291067_Screenshot 2021-08-08 at 17.58.06.png', 'It is my very first image.\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 6, '1628429303548');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `registrationAt` varchar(30) NOT NULL COMMENT 'user registration date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `email`, `password`, `username`, `avatar`, `gender`, `registrationAt`) VALUES
(4, 'alidasmeh@gmail.com', '$2b$08$jwNwuTY8mQ3XrD40S80re.jWN/L4rMBDdZIU.tUcMv41ByMbwvEuK', 'Ali Dasmeh', '/images/avatars/1628269313104_Profile Pic.JPG', 'male', '1628234965645'),
(5, 'ali@dasmeh.ir', '$2b$08$KYb62LqRjTyRIXTGLDvxleA5ozAQiCFJHKPmFp4xqsYBhk2TyDg6W', 'Masoud Khalili', '/images/avatars/1628349620106_profile pic-min.png', 'male', '1628349512519'),
(6, 'aliaug8@dasmeh.ir', '$2b$08$j..bCrvgME5zj3tyB9qRZukxeolA0KNuWmTMLM1IElhqr/KI8et82', 'Bahram Radan', '/images/avatars/1628429398850_profile pic-min.png', 'male', '1628429166618');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentid`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likeid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `likeid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
