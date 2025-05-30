-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2025 a las 16:16:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `repairio1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consola`
--

CREATE TABLE `consola` (
  `idConsola` int(11) NOT NULL,
  `nom` varchar(25) DEFAULT NULL,
  `fabricant` varchar(25) DEFAULT NULL,
  `descripcio` text DEFAULT NULL,
  `infoManteniment` text DEFAULT NULL,
  `URLapp` text DEFAULT NULL,
  `imatge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consola`
--

INSERT INTO `consola` (`idConsola`, `nom`, `fabricant`, `descripcio`, `infoManteniment`, `URLapp`, `imatge`) VALUES
(1, 'Nintendo DS', 'Nintendo', 'La Nintendo DS és una consola portàtil llançada per Nintendo l’any 2004, que va marcar un abans i un després en el món dels videojocs portàtils. La seva característica més distintiva era la doble pantalla, amb una d’elles tàctil, que va revolucionar la manera de jugar. Va ser un èxit mundial amb múltiples revisions: DS Lite, DSi i DSi XL.', 'La Nintendo DS fa servir una bateria recarregable de ions de liti, i el carregador s’adapta segons el model. Entrada: 120V – 220V AC, 60/50 Hz. Sortida: 5.2V DC / 450mA\r\n\r\nEl desmuntatge d’una DS pot ser necessari per reparar la pantalla, la bateria, els botons o la xarnella. Aquí tens les eines recomanades:\r\n\r\nTornavís tri-wing (Y): la majoria de cargols externs són d\'aquest tipus, tornavís Phillips petit (cruz): per a l\'interior, espàtula de plàstic / obre-carcasses: per separar la carcassa sense fer malbé el plàstic, pinces de precisió: per manipular cables interns i connectors fràgils, aire comprimit o pinzell suau: per netejar la pols interior i el ventilador (en models com DSi), pasta tèrmica (només per DSi, si es manipula la CPU).', 'http://localhost:5173', 'NintendoDsImg.png'),
(7, 'PlayStation4', 'Sony Computer Entertainme', 'La PlayStation 4 (PS4) és una consola de videojocs de vuitena generació desenvolupada per Sony Interactive Entertainment, llançada el 2013. Va ser la successora de la PlayStation 3 i una de les consoles més reeixides de tots els temps, amb més de 117 milions d\'unitats venudes a nivell mundial.', 'Voltaje i alimentació elèctrica admet una entrada de corrent alterna de 100-240V a 50/60Hz, amb un consum mitjà d’entre 85 i 160 watts.\r\n\r\nEines per desmuntar la consola\r\nEn cas que calgui fer una neteja interna profunda o una reparació, és important comptar amb les eines adequades per desmuntar la consola amb seguretat. Les principals són:\r\n\r\nUn tornavís Torx T8 o T9 de seguretat, amb forat central, necessari per accedir a les parts internes, un tornavís de precisió en creu (Phillips) per cargols petits, púes de plàstic o eines obrecarcasses per evitar danys a l’estructura, pinces fines, útils per manipular components petits o eliminar restes de pols, aire comprimit per netejar la pols interna sense risc, pasta tèrmica nova si es pretén renovar la dissipació del processador.', 'http://localhost:5173', 'play4img.png'),
(8, 'Nintendo Switch', 'Nintendo', 'La Nintendo Switch és una consola híbrida llançada el 2017 per Nintendo, que combina la funcionalitat d’una consola domèstica amb la portabilitat d’una consola de mà. Gràcies a aquesta versatilitat i al seu ampli catàleg de jocs per a totes les edats, s’ha convertit en una de les consoles més venudes de la història.', 'La Nintendo Switch utilitza un sistema d’alimentació basat en USB-C i es pot carregar tant mitjançant el dock com directament amb un adaptador. Les especificacions elèctriques són:\r\nEntrada (adaptador oficial): 100–240V a 50/60 Hz, 1A, sortida (cap al dispositiu): 5.0V / 1.5A o 15.0V / 2.6A (fins a 39W).\r\nDesmuntar la Nintendo Switch pot ser necessari en cas de neteja interna, substitució de la bateria, reparació dels Joy-Con o canvi de la pasta tèrmica. Les eines que es recomanen són: Tornavís Y00 (trigram) per als cargols exteriors de la consola i dels Joy-Con, tornavís Phillips de precisió (PH00) per cargols interns, púes de plàstic i espàtules antiestrès per obrir la carcassa sense danyar-la, pinces fines per manipular cables interns amb precisió, aire comprimit i pinzells suaus per netejar la pols acumulada en els ventiladors i ranures, pasta tèrmica: si es fa una reparació de la CPU/GPU o substitució del dissipador.', 'http://localhost:5173', 'NintendoSwitchImg.png'),
(9, 'Xbox', 'Microsoft', 'La Xbox és la consola de videojocs desenvolupada per Microsoft. Les versions més recents, com la Xbox Series X i Series S, ofereixen gràfics de nova generació, temps de càrrega molt reduïts i una integració completa amb serveis en línia com Xbox Game Pass.', 'La Xbox Series X/S utilitza una font d\'alimentació interna, a diferència d\'algunes consoles anteriors que requerien una font externa. Les especificacions són:\r\nEntrada universal (internacional): 100–240V AC, 50/60 Hz.\r\nConsum estimat: xbox series X: fins a 315W màxims i xbox series S: fins a 200W màxims.\r\nTot i que Microsoft no recomana que els usuaris obrin la consola (i això anul·la la garantia), si és necessari fer-ho per neteja interna, canvi de ventilador, disc dur o pasta tèrmica, aquestes són les eines recomanades: Tornavisos Torx T8 i T10 són els més comuns en l’estructura de la Xbox Series X i S, espàtules de plàstic per separar les carcasses sense danyar-les, pinces de precisió útils per manipular cintes de dades i petits connectors, aire comprimit per netejar el ventilador i les entrades/sortides d’aire, pasta tèrmica si es substitueix el dissipador de la CPU.', 'http://localhost:5173', 'xboxImg.png'),
(11, 'sfd', 'fdsfds', 'fdsfdsfds', 'fdsff', 'dfdgfhfbgdf', 'xboxImg.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forum`
--

CREATE TABLE `forum` (
  `idForum` int(11) NOT NULL,
  `idConsola` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `forum`
--

INSERT INTO `forum` (`idForum`, `idConsola`) VALUES
(6, 1),
(3, 7),
(4, 8),
(5, 9),
(7, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `missatge`
--

CREATE TABLE `missatge` (
  `idMissatge` int(11) NOT NULL,
  `contingut` text DEFAULT NULL,
  `data` date DEFAULT NULL,
  `idUsuari` int(11) DEFAULT NULL,
  `idForum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `missatge`
--

INSERT INTO `missatge` (`idMissatge`, `contingut`, `data`, `idUsuari`, `idForum`) VALUES
(25, 'Hola a tothom! Tinc una Nintendo DS Lite i la pantalla tàctil ha deixat de funcionar correctament. Quan toco un punt, el cursor apareix en un altre lloc. Ja he fet la calibració, però continua igual. Algú sap què podria ser o com ho puc arreglar? Gràcies!', '2025-05-29', 22, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `problema`
--

CREATE TABLE `problema` (
  `idProblema` int(11) NOT NULL,
  `titol` varchar(25) DEFAULT NULL,
  `descripcio` text DEFAULT NULL,
  `URLapp` text DEFAULT NULL,
  `idConsola` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `problema`
--

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(11, 'Problemes Llum', 'La llum', 'http://localhost:5173', 7);

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(1, 'Problemes D-Pad i XYAB', 'Btns', 'ds_btns_front_ds', 1);

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(2, 'Problemes Pantalla Normal', 'Btns', 'ds_screen_front_ds', 1);

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(3, 'Problemes Slots', 'Btns', 'ds_slots_ds', 1);

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(4, 'Problemes Pantalla Tactil', 'Btns', 'ds_wire_front_ds', 1);

INSERT INTO `problema` (`idProblema`, `titol`, `descripcio`, `URLapp`, `idConsola`) VALUES
(5, 'Problemes Btns', 'Btns', 'ds_btns_ds', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuari`
--

CREATE TABLE `usuari` (
  `idUser` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `rol` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuari`
--

INSERT INTO `usuari` (`idUser`, `nom`, `email`, `contrasenya`, `rol`) VALUES
(20, 'usuari', 'usuari@gmail.com', '$2y$10$fTPd.R1uPUtZla21XbhRIuhjlDwNPO5MgPYUs1Cx4eqUke3vWTdMe', 0),
(21, 'admin', 'admin@gmail.com', '$2y$10$gs6Ld0uszsrIWTI1sRlzLusVk7rOAXL7Oz4zSpqD7ZcdPKvpawIry', 1),
(22, 'Marta', 'marta@gmail.com', '$2y$10$9mG.6QYU.JDucJl.faQjyeEZsy9Xg/YxRGPIs4PTYf6yU0isj2Ybq', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consola`
--
ALTER TABLE `consola`
  ADD PRIMARY KEY (`idConsola`);

--
-- Indices de la tabla `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`idForum`),
  ADD KEY `idConsola` (`idConsola`);

--
-- Indices de la tabla `missatge`
--
ALTER TABLE `missatge`
  ADD PRIMARY KEY (`idMissatge`),
  ADD KEY `idUsuari` (`idUsuari`),
  ADD KEY `idForum` (`idForum`);

--
-- Indices de la tabla `problema`
--
ALTER TABLE `problema`
  ADD PRIMARY KEY (`idProblema`),
  ADD KEY `idConsola` (`idConsola`);

--
-- Indices de la tabla `usuari`
--
ALTER TABLE `usuari`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consola`
--
ALTER TABLE `consola`
  MODIFY `idConsola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `forum`
--
ALTER TABLE `forum`
  MODIFY `idForum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `missatge`
--
ALTER TABLE `missatge`
  MODIFY `idMissatge` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `problema`
--
ALTER TABLE `problema`
  MODIFY `idProblema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuari`
--
ALTER TABLE `usuari`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consola` (`idConsola`) ON DELETE CASCADE;

--
-- Filtros para la tabla `missatge`
--
ALTER TABLE `missatge`
  ADD CONSTRAINT `missatge_ibfk_1` FOREIGN KEY (`idUsuari`) REFERENCES `usuari` (`idUser`) ON DELETE CASCADE,
  ADD CONSTRAINT `missatge_ibfk_2` FOREIGN KEY (`idForum`) REFERENCES `forum` (`idForum`) ON DELETE CASCADE;

--
-- Filtros para la tabla `problema`
--
ALTER TABLE `problema`
  ADD CONSTRAINT `problema_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consola` (`idConsola`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
