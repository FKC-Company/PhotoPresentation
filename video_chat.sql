-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2021 at 03:36 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `video_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `category_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `set_id`, `event_id`, `category_name`) VALUES
(1, 1, 1, 'Family'),
(2, 1, 1, 'Friends\r\n'),
(3, 1, 1, 'Travel'),
(4, 1, 1, 'Friends\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `m_account`
--

CREATE TABLE `m_account` (
  `account_id` int(11) NOT NULL,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `org_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `act_role` tinyint(1) NOT NULL,
  `act_sell_phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `act_phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `creat_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `valid_id` int(1) NOT NULL,
  `exipiration_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `m_event`
--

CREATE TABLE `m_event` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `room_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `folder_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `roomplace_id` int(11) NOT NULL,
  `event_date` datetime NOT NULL,
  `event_type` int(11) NOT NULL,
  `catalog_type` int(11) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `valid_id` int(11) NOT NULL,
  `is_video` int(11) NOT NULL,
  `exipiration_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `m_event`
--

INSERT INTO `m_event` (`event_id`, `event_name`, `room_name`, `folder_name`, `user_id`, `facility_id`, `roomplace_id`, `event_date`, `event_type`, `catalog_type`, `start_date`, `end_date`, `create_date`, `update_date`, `delete_date`, `valid_id`, `is_video`, `exipiration_date`) VALUES
(1, '', 'xeuhsb', '1617345516_1', 10, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00'),
(3, '', 'akorbjhim', '', 10, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00'),
(4, '', 'qektofer', '', 10, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00'),
(5, '', 'rtymbgdvvc', '', 10, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00'),
(7, '', 'fostslcdii', '1617589654_1', 10, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00'),
(8, '', 'ikdqh', 'meet_1617675350_1', 1, 0, 0, '0000-00-00 00:00:00', 0, 0, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `m_set`
--

CREATE TABLE `m_set` (
  `set_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `set_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `set_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `set_body` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `folder_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cat_name1` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_name2` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_name3` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_name4` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_name5` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_name6` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf1` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf2` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf3` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf4` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf5` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `cat_fpf6` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NULL',
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `valid_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `m_set`
--

INSERT INTO `m_set` (`set_id`, `event_id`, `set_name`, `set_title`, `set_body`, `folder_name`, `cat_name1`, `cat_name2`, `cat_name3`, `cat_name4`, `cat_name5`, `cat_name6`, `cat_fpf1`, `cat_fpf2`, `cat_fpf3`, `cat_fpf4`, `cat_fpf5`, `cat_fpf6`, `create_date`, `update_date`, `delete_date`, `valid_id`) VALUES
(1, 8, 'aa', '1.Childhood', 'body', 'set1', 'Family', 'Friends', 'Travel', '', '', '', 'fm', 'fr', 'tr', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(2, 8, '', '2.Teenage', 'tbody', 'set2', 'Family', 'Friends', 'Travel', '', '', '', 'fm', 'fr', 'tr', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(3, 8, '', '3.Adult', 'tbody', 'set3', 'Family', 'Friends', 'Travel', '', '', '', 'fm', 'fr', 'tr', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `m_users`
--

CREATE TABLE `m_users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address2` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address3` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `cellphone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `user_type` enum('Company','Corporation','Association','Organization','Personal','Other') COLLATE utf8_unicode_ci NOT NULL,
  `user_role` int(11) NOT NULL COMMENT '''0:Ａdministrator 9:見るだけユーザー\r\n1:写真と写真のコメント更新可能',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL,
  `delete_date` datetime NOT NULL,
  `valid_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `m_users`
--

INSERT INTO `m_users` (`user_id`, `email`, `username`, `password`, `address1`, `address2`, `address3`, `phone`, `cellphone`, `user_type`, `user_role`, `create_date`, `update_date`, `delete_date`, `valid_id`) VALUES
(1, 'unyamka@gmail.com', 'Urtnasan', '$2a$08$r7GFVNa289wWUafmvhm/furG5NaBwGz17qDswPiQrRzZhrnP9BPte', '', '', '', '', '', 'Personal', 0, '2021-04-02 10:33:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(10, 'eemeeel@gmail.com', 'Urtnasan Nyamgerel', '$2a$08$gLuf/qYkR5OMUPAk9hkFe.gR6IFrzocBcxk4AaqmywYnYfDiy72A.', '', '', '', '', '', 'Company', 0, '2021-09-22 16:48:04', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(11, 'able@gmail.com', 'Urtnasan Nyamgerel', '$2a$08$lYsmzjUaKjOTTPQOTHyOmeV1C5kLJMuLOlFrQ6SyMNkNrgu5spCJ6', '', '', '', '', '', 'Company', 0, '2021-09-22 17:48:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(12, 'unyamka@gmail.com123', 'Urtnasan Nyamgerel', '$2a$08$twSit6v5NaGxriJy/3Riu.6zJ2z5v.OmxVNrWs/T5y/bftUKq.cEa', '', '', '', '', '', 'Company', 0, '2021-10-01 04:56:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(13, 'unyamka@gmail.com12345', 'Urtnasan Nyamgerel', '$2a$08$l1PYv.shVglJNb8gCxqBJO138O7BdWzUOzzQRAGoG.39QeM/D4wZ6', '', '', '', '', '', 'Company', 0, '2021-10-01 05:07:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(14, 'asdf@gmail.com12345', 'Urtnasan Nyamgerel', '$2a$08$GPoYZaZVzoBs2uF2saCzWe2.hE3HWxMryiH2rOvdtsv2pD3oCC38i', '', '', '', '', '', 'Company', 0, '2021-10-01 05:08:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(15, 'unyamkajp@gmail.com111111', 'Urtnasan Nyamgerel', '$2a$08$CeYCPG6BVzeg6LbuMaWine5cwROIsKNUgovvoduiiokRW/idSJ4pi', '', '', '', '', '', 'Company', 0, '2021-10-01 05:08:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(16, 'asdf@gmail.com5566', 'Urtnasan Nyamgerel', '$2a$08$ccJH2sQ.oeluOJCwj/WOK.cws3D.PinokdAHQWKuGAgF/tSgf7oPG', '', '', '', '', '', 'Company', 0, '2021-10-01 05:09:29', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `m_account`
--
ALTER TABLE `m_account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `m_event`
--
ALTER TABLE `m_event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `m_set`
--
ALTER TABLE `m_set`
  ADD PRIMARY KEY (`set_id`);

--
-- Indexes for table `m_users`
--
ALTER TABLE `m_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `m_account`
--
ALTER TABLE `m_account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `m_event`
--
ALTER TABLE `m_event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `m_set`
--
ALTER TABLE `m_set`
  MODIFY `set_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `m_users`
--
ALTER TABLE `m_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
