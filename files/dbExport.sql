-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: portalturismo
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `nomeApp` varchar(100) NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `idadmin_UNIQUE` (`idAdmin`),
  KEY `FK_ADMIN_idUser_idx` (`idUser`),
  CONSTRAINT `FK_ADMIN_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'JoseApp',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `idAvaliacao` int NOT NULL AUTO_INCREMENT,
  `comentario` varchar(400) DEFAULT NULL,
  `rating` float NOT NULL,
  `idProduto` int NOT NULL,
  `idServico` int NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idAvaliacao`),
  UNIQUE KEY `idAvaliacao_UNIQUE` (`idAvaliacao`),
  KEY `FK_AVA_idProduto_idx` (`idProduto`),
  KEY `FK_AVA_idServico_idx` (`idServico`),
  KEY `FK_AVA_idCliente_idx` (`idCliente`),
  CONSTRAINT `FK_AVA_idCliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_AVA_idProduto` FOREIGN KEY (`idProduto`) REFERENCES `produto` (`idProduto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_AVA_idServico` FOREIGN KEY (`idServico`) REFERENCES `servico` (`idServico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nomeApp` varchar(100) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `idcliente_UNIQUE` (`idCliente`),
  KEY `FK_CLI_idUser_idx` (`idUser`),
  CONSTRAINT `FK_CLI_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'MariaApp','Ativo',2),(6,'ManuelaApp','Ativo',65);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encomenda`
--

DROP TABLE IF EXISTS `encomenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encomenda` (
  `idEncomenda` int NOT NULL AUTO_INCREMENT,
  `dataEncomenda` varchar(50) NOT NULL,
  `dataEntrega` varchar(50) NOT NULL,
  `valorTotal` float NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idEncomenda`),
  UNIQUE KEY `idencomenda_UNIQUE` (`idEncomenda`),
  KEY `FK_idCliente_idx` (`idCliente`),
  CONSTRAINT `FK_ENC_idCliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encomenda`
--

LOCK TABLES `encomenda` WRITE;
/*!40000 ALTER TABLE `encomenda` DISABLE KEYS */;
INSERT INTO `encomenda` VALUES (11,'sexta-feira, 19/02/2021','quarta-feira, 24/02/2021',270.01,1),(12,'sexta-feira, 19/02/2021','quarta-feira, 24/02/2021',376.8,6);
/*!40000 ALTER TABLE `encomenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornloj`
--

DROP TABLE IF EXISTS `fornloj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornloj` (
  `idFornLoj` int NOT NULL AUTO_INCREMENT,
  `nomeApp` varchar(100) NOT NULL,
  `idUser` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idFornLoj`),
  UNIQUE KEY `idFornloj_UNIQUE` (`idFornLoj`),
  KEY `FK_FORNLOJ_idUser_idx` (`idUser`),
  CONSTRAINT `FK_FORNLOJ_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornloj`
--

LOCK TABLES `fornloj` WRITE;
/*!40000 ALTER TABLE `fornloj` DISABLE KEYS */;
INSERT INTO `fornloj` VALUES (1,'ManuelApp',3,'Ativo'),(2,'FranciscoApp',4,'Inativo');
/*!40000 ALTER TABLE `fornloj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotolojapagina`
--

DROP TABLE IF EXISTS `fotolojapagina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotolojapagina` (
  `idFotoLojaPagina` int NOT NULL AUTO_INCREMENT,
  `imagem` varchar(400) NOT NULL,
  `idLojaPagina` int NOT NULL,
  PRIMARY KEY (`idFotoLojaPagina`),
  UNIQUE KEY `idFotoLojaPagina_UNIQUE` (`idFotoLojaPagina`),
  KEY `FK_FOTOLOJPAG_idLojaPagina_idx` (`idLojaPagina`),
  CONSTRAINT `FK_FOTOLOJPAG_idLojaPagina` FOREIGN KEY (`idLojaPagina`) REFERENCES `lojapagina` (`idLojaPagina`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotolojapagina`
--

LOCK TABLES `fotolojapagina` WRITE;
/*!40000 ALTER TABLE `fotolojapagina` DISABLE KEYS */;
INSERT INTO `fotolojapagina` VALUES (1,'lojaBikesService.jpg',2),(6,'visitarViana.jpg',39),(7,'folclore.jpg',40),(9,'alugueres.jpg',43),(10,'barcelos.jpg',44);
/*!40000 ALTER TABLE `fotolojapagina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotoproduto`
--

DROP TABLE IF EXISTS `fotoproduto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotoproduto` (
  `idFotoProduto` int NOT NULL AUTO_INCREMENT,
  `imagem` varchar(400) NOT NULL,
  `idProduto` int NOT NULL,
  PRIMARY KEY (`idFotoProduto`),
  UNIQUE KEY `idfotoproduto_UNIQUE` (`idFotoProduto`),
  KEY `FK_idProduto_idx` (`idProduto`),
  CONSTRAINT `FK_idProduto` FOREIGN KEY (`idProduto`) REFERENCES `produto` (`idProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotoproduto`
--

LOCK TABLES `fotoproduto` WRITE;
/*!40000 ALTER TABLE `fotoproduto` DISABLE KEYS */;
INSERT INTO `fotoproduto` VALUES (11,'REQUE-REQUE.jpg',19),(12,'lenço Viana.jpg',20),(13,'TRAJE DOMINGUEIRO ADULTO.jpg',21),(14,'CHINELA BORDADA LDF.jpg',22),(15,'galoBarcelos.jpg',23),(16,'lojaDecoracao.jpg',24);
/*!40000 ALTER TABLE `fotoproduto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotoservico`
--

DROP TABLE IF EXISTS `fotoservico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotoservico` (
  `idFotoServico` int NOT NULL AUTO_INCREMENT,
  `imagem` varchar(400) NOT NULL,
  `idServico` int NOT NULL,
  PRIMARY KEY (`idFotoServico`),
  UNIQUE KEY `idFotoServico_UNIQUE` (`idFotoServico`),
  KEY `FK_FOTOSERV_idServico_idx` (`idServico`),
  CONSTRAINT `FK_FOTOSERV_idServico` FOREIGN KEY (`idServico`) REFERENCES `servico` (`idServico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotoservico`
--

LOCK TABLES `fotoservico` WRITE;
/*!40000 ALTER TABLE `fotoservico` DISABLE KEYS */;
INSERT INTO `fotoservico` VALUES (1,'bikesService.jpg',1),(2,'bikesService.jpg',2),(3,'santaLuzia.jpg',3),(6,'BMW R1250 GS.jpg',14),(7,'Renault Megane SW.jpg',15);
/*!40000 ALTER TABLE `fotoservico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotouser`
--

DROP TABLE IF EXISTS `fotouser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotouser` (
  `idFotoUser` int NOT NULL AUTO_INCREMENT,
  `imagem` varchar(400) NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idFotoUser`),
  UNIQUE KEY `idfotouser_UNIQUE` (`idFotoUser`),
  KEY `FK_idUser_idx` (`idUser`),
  CONSTRAINT `FK_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotouser`
--

LOCK TABLES `fotouser` WRITE;
/*!40000 ALTER TABLE `fotouser` DISABLE KEYS */;
INSERT INTO `fotouser` VALUES (1,'Doge.jpg',2);
/*!40000 ALTER TABLE `fotouser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhaencomenda`
--

DROP TABLE IF EXISTS `linhaencomenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linhaencomenda` (
  `idLinhaEncomenda` int NOT NULL AUTO_INCREMENT,
  `quantidade` int NOT NULL,
  `totalLinha` float NOT NULL,
  `idEncomenda` int NOT NULL,
  `idProduto` int NOT NULL,
  PRIMARY KEY (`idLinhaEncomenda`),
  UNIQUE KEY `idLinhaEncomenda_UNIQUE` (`idLinhaEncomenda`),
  KEY `FK_idEncomenda_idx` (`idEncomenda`),
  KEY `FK_LENC_idProduto_idx` (`idProduto`),
  CONSTRAINT `FK_LENC_idEncomenda` FOREIGN KEY (`idEncomenda`) REFERENCES `encomenda` (`idEncomenda`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_LENC_idProduto` FOREIGN KEY (`idProduto`) REFERENCES `produto` (`idProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhaencomenda`
--

LOCK TABLES `linhaencomenda` WRITE;
/*!40000 ALTER TABLE `linhaencomenda` DISABLE KEYS */;
INSERT INTO `linhaencomenda` VALUES (31,2,11.98,11,23),(32,1,46.13,11,22),(33,1,104.55,11,20),(34,1,107.35,11,19),(35,2,369,12,21),(36,2,7.8,12,24);
/*!40000 ALTER TABLE `linhaencomenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linhareserva`
--

DROP TABLE IF EXISTS `linhareserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linhareserva` (
  `idLinhaReserva` int NOT NULL AUTO_INCREMENT,
  `quantidade` int NOT NULL,
  `totalLinha` float NOT NULL,
  `idReserva` int NOT NULL,
  `idServico` int NOT NULL,
  PRIMARY KEY (`idLinhaReserva`),
  UNIQUE KEY `idLinhaServico_UNIQUE` (`idLinhaReserva`),
  KEY `FK_LS_idReserva_idx` (`idReserva`),
  KEY `FK_LS_idServico_idx` (`idServico`),
  CONSTRAINT `FK_LS_idReserva` FOREIGN KEY (`idReserva`) REFERENCES `reserva` (`idReserva`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_LS_idServico` FOREIGN KEY (`idServico`) REFERENCES `servico` (`idServico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linhareserva`
--

LOCK TABLES `linhareserva` WRITE;
/*!40000 ALTER TABLE `linhareserva` DISABLE KEYS */;
INSERT INTO `linhareserva` VALUES (1,2,30,1,1),(2,2,15,1,2);
/*!40000 ALTER TABLE `linhareserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lojapagina`
--

DROP TABLE IF EXISTS `lojapagina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lojapagina` (
  `idLojaPagina` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL,
  `descricao` varchar(400) NOT NULL,
  `idFornLoj` int NOT NULL,
  PRIMARY KEY (`idLojaPagina`),
  UNIQUE KEY `idLojaPagina_UNIQUE` (`idLojaPagina`),
  KEY `FK_LojPag_idFornLoj_idx` (`idFornLoj`),
  CONSTRAINT `FK_LojPag_idFornLoj` FOREIGN KEY (`idFornLoj`) REFERENCES `fornloj` (`idFornLoj`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lojapagina`
--

LOCK TABLES `lojapagina` WRITE;
/*!40000 ALTER TABLE `lojapagina` DISABLE KEYS */;
INSERT INTO `lojapagina` VALUES (2,'Serviços','Loja Aluguer de Serviços',2),(39,'Serviços','Visitas guiadas em Viana do Castelo',1),(40,'Produtos','Loja de Trajes do Minho',2),(43,'Serviços','Aluguer de veículos',2),(44,'Produtos','Loja Barcelense',1);
/*!40000 ALTER TABLE `lojapagina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `idProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  `stock` int NOT NULL,
  `preco` float NOT NULL,
  `idLojaPagina` int NOT NULL,
  PRIMARY KEY (`idProduto`),
  UNIQUE KEY `idproduto_UNIQUE` (`idProduto`),
  KEY `FK_PROD_idLojaPagina_idx` (`idLojaPagina`),
  CONSTRAINT `FK_PROD_idLojaPagina` FOREIGN KEY (`idLojaPagina`) REFERENCES `lojapagina` (`idLojaPagina`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (19,'REQUE-REQUE – “O FUMADOR”','Reque-Reque em madeira natural envernizada, modelo o Fumador',10,107.35,40),(20,'LENÇO TRADICIONAL MINHOTO 100% LÃ','Para os trajes Certificados de Lavradeira Ricos de Viana do Castelo',5,104.55,40),(21,'TRAJE DOMINGUEIRO ADULTO','Calça, Colete, Camisa bordada em Vermelho, Faixa e Chapéu copa redonda',13,184.5,40),(22,'CHINELA BORDADA','Chinela de Viana bordada a cores personalizadas, confecionada artesanalmente.',20,46.13,40),(23,'Galo de Barcelos','Peça de barro pintada com a forma tradicional do Galo de Barcelos',79,5.99,44),(24,'Pratos Tradicionais','Prato de barro com pinturas tradicionais (pintados à mão)',197,3.9,44);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `idReserva` int NOT NULL AUTO_INCREMENT,
  `dataHoraInicio` varchar(50) NOT NULL,
  `dataHoraFim` varchar(50) NOT NULL,
  `preco` float NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idReserva`),
  UNIQUE KEY `idReserva_UNIQUE` (`idReserva`),
  KEY `FK_RES_idCliente_idx` (`idCliente`),
  CONSTRAINT `FK_RES_idCliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,'10/12/2020:10h00','10/12/2020:11h00',45,1);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `idServico` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(400) DEFAULT NULL,
  `stock` int NOT NULL,
  `preco` float NOT NULL,
  `idLojaPagina` int NOT NULL,
  PRIMARY KEY (`idServico`),
  UNIQUE KEY `idServico_UNIQUE` (`idServico`),
  KEY `FK_SERV_idLojaPag_idx` (`idLojaPagina`),
  CONSTRAINT `FK_SERV_idLojaPagina` FOREIGN KEY (`idLojaPagina`) REFERENCES `lojapagina` (`idLojaPagina`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'Aluguer de bicicletas de adulto','Aluguer de bicicletas de adulto para passeio de 1 hora',11,15.5,2),(2,'Aluguer de bicicletas de criança','Aluguer de bicicletas de criança para passeio de 1 hora',35,7.5,2),(3,'Visita Guiada a Santa Luzia ','Visita Guiada a Santa Luzia para grupo de 6 pessoas ',5,20,39),(14,' Aluguer Moto BMW R1250 GS','Preço de aluguer por 1 dia',3,108.81,43),(15,' Aluguer Carro Renault Megane SW','Preço de aluguer por 2 dias.',15,29.24,43);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dataNascimento` varchar(50) DEFAULT NULL,
  `morada` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contacto` varchar(50) NOT NULL,
  `nacionalidade` varchar(50) DEFAULT NULL,
  `biografia` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin1','admin1','José Machado','29/03/2020','Rua da Formiga','jose.machado@ipvc.pt','123456789','Portuguesa',''),(2,'cli1','cli1','Maria','23/05/1968','Rua das Marias','maria@hotmail.cm','967968969','Canadiana','Biografia cliente 1'),(3,'sup1','sup1','Manuel','12/07/1980','Rua Fixe','manuel@gmail.com','345678901','Francesa',NULL),(4,'sup2','sup2','Francisco','18/01/1974','Rua das motas','francisco@outlook.com','253222333','Portuguesa/Francesa','Alugo bicicletas desde 1995'),(65,'cli2','cli2','Manuela','','Rua das Camélias','manuela@outlook.com','912934912','','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-19 19:16:31
