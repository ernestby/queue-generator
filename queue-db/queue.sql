-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql2
-- Время создания: Сен 16 2021 г., 06:11
-- Версия сервера: 5.7.35
-- Версия PHP: 7.4.23

CREATE DATABASE queue;

USE queue;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `queue`
--

-- --------------------------------------------------------

--
-- Структура таблицы `queues_active`
--

CREATE TABLE `queues_active` (
  `id` int(11) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `queues_assigned`
--

CREATE TABLE `queues_assigned` (
  `id` int(11) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `number` int(11) NOT NULL,
  `operator_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `queues_finished`
--

CREATE TABLE `queues_finished` (
  `id` int(11) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `number` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `operator_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `queues_today`
--

CREATE TABLE `queues_today` (
  `id` int(11) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `number` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `state` enum('free','break','busy','offline') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `group_id`, `status`, `state`) VALUES
(2, 'kalempir', 'kalempirka', 1, 'active', 'free');

-- --------------------------------------------------------

--
-- Структура таблицы `user_groups`
--

CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_groups`
--

INSERT INTO `user_groups` (`id`, `title`, `prefix`, `status`) VALUES
(1, 'Cashier', 'C', 'active'),
(2, 'Office', 'O', 'active');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `queues_active`
--
ALTER TABLE `queues_active`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `queues_assigned`
--
ALTER TABLE `queues_assigned`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `queues_finished`
--
ALTER TABLE `queues_finished`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `queues_today`
--
ALTER TABLE `queues_today`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `queues_active`
--
ALTER TABLE `queues_active`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT для таблицы `queues_assigned`
--
ALTER TABLE `queues_assigned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `queues_finished`
--
ALTER TABLE `queues_finished`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `queues_today`
--
ALTER TABLE `queues_today`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user_groups`
--
ALTER TABLE `user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
