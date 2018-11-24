CREATE DATABASE  IF NOT EXISTS `discente` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `discente`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: discente
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bairro`
--

DROP TABLE IF EXISTS `bairro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bairro` (
  `id_bairro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_bairro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bairro`
--

LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` VALUES (1,'Vila A'),(2,'Vila da Alegria'),(3,'Vila Madalena'),(4,'Vila Matilde'),(5,'Jardim das Palmeiras'),(6,'Jardim das Flores'),(7,'Jardim das Laranjeiras');
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargodiscente`
--

DROP TABLE IF EXISTS `cargodiscente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargodiscente` (
  `id_cargo_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  PRIMARY KEY (`id_cargo_discente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargodiscente`
--

LOCK TABLES `cargodiscente` WRITE;
/*!40000 ALTER TABLE `cargodiscente` DISABLE KEYS */;
INSERT INTO `cargodiscente` VALUES (1,'Professor'),(2,'Diretor Executivo'),(3,'Gerente de Projetos'),(4,'Estagiário'),(5,'Recepcionista'),(6,'Gerente de TI');
/*!40000 ALTER TABLE `cargodiscente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cidade` (
  `id_cidade` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id_cidade`),
  KEY `fk_Cidade_Estado1_idx` (`id_estado`),
  CONSTRAINT `fk_Cidade_Estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade` VALUES (1,'Foz do Iguaçu',1);
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discente`
--

DROP TABLE IF EXISTS `discente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discente` (
  `id_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `sobrenome` varchar(90) NOT NULL,
  `data_nascimento` date NOT NULL,
  `rg` varchar(20) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `link_lattes` varchar(90) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `numero_residencia` int(11) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `id_docente` int(11) NOT NULL,
  `isAceito` tinyint(4) DEFAULT NULL,
  `situacao` int(11) NOT NULL,
  `id_titulo` int(11) NOT NULL,
  `sexo` int(11) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `passaporte` varchar(45) DEFAULT NULL,
  `id_nacionalidade` int(11) NOT NULL,
  PRIMARY KEY (`id_discente`),
  KEY `fk_Discente_EnderecoDiscente1_idx` (`id_endereco`),
  KEY `fk_Discente_Docente1_idx` (`id_docente`),
  KEY `fk_Discente_Titulo1_idx` (`id_titulo`),
  KEY `fk_Discente_Pais1_idx` (`id_nacionalidade`),
  CONSTRAINT `fk_Discente_Docente1` FOREIGN KEY (`id_docente`) REFERENCES `docente` (`id_docente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Discente_EnderecoDiscente1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Discente_Pais1` FOREIGN KEY (`id_nacionalidade`) REFERENCES `pais` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Discente_Titulo1` FOREIGN KEY (`id_titulo`) REFERENCES `titulo` (`id_titulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discente`
--

LOCK TABLES `discente` WRITE;
/*!40000 ALTER TABLE `discente` DISABLE KEYS */;
INSERT INTO `discente` VALUES (1,'Pedro da Silva Pereira','','2018-09-15','152055211','01478595442','pedrosilva','123','http://lattes.cnpq.br/4644492496905758','pedro@hotmail.com',1,123,NULL,1,NULL,1,1,1,'458965',NULL,2),(51,'Adalberto','Pena','2018-09-15','152055211','01478595442','pedrosilva','123',' http://lattes.cnpq.br/4866837000683515','adal@hotmail.com',50,123,NULL,1,NULL,1,2,1,'458965',NULL,1),(80,'Robson','Gouveia','1995-09-15','152055211','01478595442','robin','123456','http://lattes.cnpq.br/1641348341007875','rob@hotmail.com',79,123,NULL,1,NULL,1,2,1,'458965',NULL,1),(87,'Cleber','Medeiros','1997-09-01','','','clebersant','clebersant','http://lattes.cnpq.br/0080139530314175','cleberrrr@agrostac.com.br',87,489,'',1,NULL,3,3,1,'(45) 92000-0784',NULL,1);
/*!40000 ALTER TABLE `discente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discentecargoinstituicao`
--

DROP TABLE IF EXISTS `discentecargoinstituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discentecargoinstituicao` (
  `id_discente` int(11) NOT NULL,
  `id_instituicao` int(11) NOT NULL,
  `id_cargo_discente` int(11) NOT NULL,
  PRIMARY KEY (`id_discente`,`id_instituicao`,`id_cargo_discente`),
  KEY `fk_Discente_has_Instituicao_Instituicao1_idx` (`id_instituicao`),
  KEY `fk_Discente_has_Instituicao_Discente1_idx` (`id_discente`),
  KEY `fk_DiscenteInstituicao_CargoDiscente1_idx` (`id_cargo_discente`),
  CONSTRAINT `fk_DiscenteInstituicao_CargoDiscente1` FOREIGN KEY (`id_cargo_discente`) REFERENCES `cargodiscente` (`id_cargo_discente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Discente_has_Instituicao_Discente1` FOREIGN KEY (`id_discente`) REFERENCES `discente` (`id_discente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Discente_has_Instituicao_Instituicao1` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicao` (`id_instituicao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discentecargoinstituicao`
--

LOCK TABLES `discentecargoinstituicao` WRITE;
/*!40000 ALTER TABLE `discentecargoinstituicao` DISABLE KEYS */;
INSERT INTO `discentecargoinstituicao` VALUES (1,1,1),(1,2,2),(51,2,2),(80,3,3),(87,22,4);
/*!40000 ALTER TABLE `discentecargoinstituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discentetipodiscente`
--

DROP TABLE IF EXISTS `discentetipodiscente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discentetipodiscente` (
  `id_tipo_discente` int(11) NOT NULL,
  `id_discente` int(11) NOT NULL,
  `data_inicial` date NOT NULL,
  `data_final` date DEFAULT NULL,
  `isAtual` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_discente`,`id_discente`),
  KEY `fk_TipoDiscente_has_Discente_Discente1_idx` (`id_discente`),
  KEY `fk_TipoDiscente_has_Discente_TipoDiscente1_idx` (`id_tipo_discente`),
  CONSTRAINT `fk_TipoDiscente_has_Discente_Discente1` FOREIGN KEY (`id_discente`) REFERENCES `discente` (`id_discente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TipoDiscente_has_Discente_TipoDiscente1` FOREIGN KEY (`id_tipo_discente`) REFERENCES `tipodiscente` (`id_tipo_discente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discentetipodiscente`
--

LOCK TABLES `discentetipodiscente` WRITE;
/*!40000 ALTER TABLE `discentetipodiscente` DISABLE KEYS */;
INSERT INTO `discentetipodiscente` VALUES (1,1,'2018-02-08',NULL,1),(1,51,'2018-02-08',NULL,1),(2,80,'2018-02-08',NULL,1),(3,87,'2018-02-08',NULL,1);
/*!40000 ALTER TABLE `discentetipodiscente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docente` (
  `id_docente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `data_nascimento` date NOT NULL,
  `rg` varchar(20) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `link_lattes` varchar(128) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `numero_residencia` int(11) NOT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `carga_horaria_programa` int(11) NOT NULL,
  `situacao` int(11) NOT NULL,
  `id_titulo` int(11) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_docente`),
  KEY `fk_Docente_Titulo1_idx` (`id_titulo`),
  KEY `fk_Docente_Endereco1_idx` (`id_endereco`),
  CONSTRAINT `fk_Docente_Endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Docente_Titulo1` FOREIGN KEY (`id_titulo`) REFERENCES `titulo` (`id_titulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` VALUES (1,'José d Silva','1968-05-10','154896547','02674123596','jose','123','www.lattes.com/josedasilva','jose_silva@hotmail.com',785,'Casa',150,1,2,1,'Pereira');
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco` (
  `id_endereco` int(11) NOT NULL AUTO_INCREMENT,
  `id_cidade` int(11) DEFAULT NULL,
  `id_bairro` int(11) DEFAULT NULL,
  `id_logradouro` int(11) DEFAULT NULL,
  `cep` varchar(10) NOT NULL,
  PRIMARY KEY (`id_endereco`),
  KEY `fk_Endereco_Cidade1_idx` (`id_cidade`),
  KEY `fk_Endereco_Bairro1_idx` (`id_bairro`),
  KEY `fk_Endereco_Logradouro1_idx` (`id_logradouro`),
  CONSTRAINT `fk_Endereco_Bairro1` FOREIGN KEY (`id_bairro`) REFERENCES `bairro` (`id_bairro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Endereco_Cidade1` FOREIGN KEY (`id_cidade`) REFERENCES `cidade` (`id_cidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Endereco_Logradouro1` FOREIGN KEY (`id_logradouro`) REFERENCES `logradouro` (`id_logradouro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,1,1,1,'85868060'),(2,1,3,5,'1223445'),(3,1,3,5,'1223445'),(4,1,3,5,'1223445'),(5,1,3,5,'1223445'),(6,1,3,5,'1223445'),(7,1,3,5,'1223445'),(8,1,3,5,'1223445'),(9,1,3,5,'1223445'),(10,1,3,5,'1223445'),(11,1,3,5,'1223445'),(12,1,3,5,'1223445'),(13,1,3,5,'1223445'),(14,1,3,5,'1223445'),(15,1,3,5,'1223445'),(16,1,3,5,'1223445'),(17,1,3,5,'1223445'),(18,1,3,5,'1223445'),(19,1,3,5,'1223445'),(20,1,3,5,'1223445'),(21,1,3,5,'1223445'),(22,1,3,5,'1223445'),(23,1,3,5,'1223445'),(24,1,3,5,'1223445'),(25,1,3,5,'1223445'),(26,1,3,5,'1223445'),(27,1,3,5,'1223445'),(28,1,3,5,'1223445'),(29,1,3,5,'1223445'),(30,1,3,5,'1223445'),(31,1,3,5,'1223445'),(32,1,3,5,'1223445'),(33,1,3,5,'1223445'),(34,1,3,5,'1223445'),(35,1,3,5,'1223445'),(36,1,3,5,'1223445'),(37,1,3,5,'1223445'),(38,1,3,5,'1223445'),(39,1,3,5,'1223445'),(40,1,3,5,'1223445'),(41,1,3,5,'1223445'),(42,1,3,5,'1223445'),(43,1,3,5,'1223445'),(44,1,3,5,'1223445'),(45,1,3,5,'1223445'),(46,1,3,5,'1223445'),(47,1,3,5,'1223445'),(48,1,3,5,'1223445'),(49,1,3,5,'1223445'),(50,1,4,6,'1223445'),(51,1,4,6,'1223445'),(52,1,4,6,'1223445'),(53,1,4,6,'1223445'),(54,1,4,6,'1223445'),(55,1,4,6,'1223445'),(56,1,4,6,'1223445'),(57,1,4,6,'1223445'),(58,1,4,6,'1223445'),(59,1,4,6,'1223445'),(60,1,4,6,'1223445'),(61,1,4,6,'1223445'),(62,1,4,6,'1223445'),(63,1,4,6,'1223445'),(64,1,4,6,'1223445'),(65,1,4,6,'1223445'),(66,1,4,6,'1223445'),(67,1,4,6,'1223445'),(68,1,4,6,'1223445'),(69,1,4,6,'1223445'),(70,1,4,6,'1223445'),(71,1,4,6,'1223445'),(72,1,4,6,'1223445'),(73,1,4,6,'1223445'),(74,1,4,6,'1223445'),(75,1,4,6,'1223445'),(76,1,4,6,'1223445'),(77,1,4,6,'1223445'),(78,1,4,6,'1223445'),(79,1,NULL,7,'1223445'),(80,1,5,7,'1223445'),(81,1,5,7,'1223445'),(82,1,5,7,'1223445'),(83,1,5,7,'1223445'),(84,1,NULL,8,'85868060'),(85,1,6,8,'85868060'),(86,1,NULL,9,'85868-160'),(87,1,7,9,'85868-160'),(88,1,7,9,'85877000'),(89,1,7,9,'85877000'),(90,1,7,9,'85868-160');
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `sigla` varchar(3) NOT NULL,
  `id_pais` int(11) NOT NULL,
  PRIMARY KEY (`id_estado`),
  KEY `fk_Estado_Pais1_idx` (`id_pais`),
  CONSTRAINT `fk_Estado_Pais1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Paraná','PR',1);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instituicao`
--

DROP TABLE IF EXISTS `instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instituicao` (
  `id_instituicao` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  `sigla` varchar(10) DEFAULT NULL,
  `id_tipo_instituicao` int(11) NOT NULL,
  PRIMARY KEY (`id_instituicao`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituicao`
--

LOCK TABLES `instituicao` WRITE;
/*!40000 ALTER TABLE `instituicao` DISABLE KEYS */;
INSERT INTO `instituicao` VALUES (1,'União Dinâmica das Cataratas','UDC',2),(2,'Parque Tecnológico de Itaipu','PTI',1),(3,'Universidade Estadual do Oeste do Paraná','UNIOESTE',1),(22,'Bak Produções','BAK',1);
/*!40000 ALTER TABLE `instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logradouro`
--

DROP TABLE IF EXISTS `logradouro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logradouro` (
  `id_logradouro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  PRIMARY KEY (`id_logradouro`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logradouro`
--

LOCK TABLES `logradouro` WRITE;
/*!40000 ALTER TABLE `logradouro` DISABLE KEYS */;
INSERT INTO `logradouro` VALUES (1,'Rua das Dores'),(2,'Rua Carlos da Silva'),(3,'Rua das Mariqueiras'),(4,'Rua João José'),(5,'Rua Pedro Paulo'),(6,'Rua Jericó'),(7,'Av. Américo Sasdeli'),(8,'Av. Américo Silvio Sasdelli'),(9,'Rua Limeira');
/*!40000 ALTER TABLE `logradouro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `nacionalidade` varchar(60) NOT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Brasil','Brasileiro'),(2,'Paraguai','Paraguaio');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodiscente`
--

DROP TABLE IF EXISTS `tipodiscente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipodiscente` (
  `id_tipo_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo_discente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodiscente`
--

LOCK TABLES `tipodiscente` WRITE;
/*!40000 ALTER TABLE `tipodiscente` DISABLE KEYS */;
INSERT INTO `tipodiscente` VALUES (1,'Regular'),(2,'Especial 1'),(3,'Especial 2');
/*!40000 ALTER TABLE `tipodiscente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titulo`
--

DROP TABLE IF EXISTS `titulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `titulo` (
  `id_titulo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulo`
--

LOCK TABLES `titulo` WRITE;
/*!40000 ALTER TABLE `titulo` DISABLE KEYS */;
INSERT INTO `titulo` VALUES (1,'Bacharel'),(2,'Mestre'),(3,'Licenciatura'),(4,'Tecnólogo'),(5,'Doutor');
/*!40000 ALTER TABLE `titulo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-23 15:50:13
