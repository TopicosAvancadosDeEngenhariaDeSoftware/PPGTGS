UNLOCK TABLES;

DROP DATABASE IF EXISTS `discente`;
CREATE DATABASE  IF NOT EXISTS `discente`;
USE `discente`;



DROP TABLE IF EXISTS `bairro`;
CREATE TABLE `bairro` (
  `id_bairro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_bairro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `pais`;
CREATE TABLE `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `nacionalidade` varchar(60) NOT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `estado`;
CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `sigla` varchar(3) NOT NULL,
  `id_pais` int(11) NOT NULL,
  PRIMARY KEY (`id_estado`),
  KEY `fk_Estado_Pais1_idx` (`id_pais`),
  CONSTRAINT `fk_Estado_Pais1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `cidade`;
CREATE TABLE `cidade` (
  `id_cidade` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id_cidade`),
  KEY `fk_Cidade_Estado1_idx` (`id_estado`),
  CONSTRAINT `fk_Cidade_Estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `logradouro`;
CREATE TABLE `logradouro` (
  `id_logradouro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  PRIMARY KEY (`id_logradouro`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `endereco`;
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



DROP TABLE IF EXISTS `cargodiscente`;
CREATE TABLE `cargodiscente` (
  `id_cargo_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  PRIMARY KEY (`id_cargo_discente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `titulo`;
CREATE TABLE `titulo` (
  `id_titulo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `instituicao`;
CREATE TABLE `instituicao` (
  `id_instituicao` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  `sigla` varchar(10) DEFAULT NULL,
  `id_tipo_instituicao` int(11) NOT NULL,
  PRIMARY KEY (`id_instituicao`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `docente`;
CREATE TABLE `docente` (
  `id_docente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  `rg` varchar(20) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `username` varchar(20) NULL,
  `senha` varchar(256) NOT NULL,
  `link_lattes` varchar(128) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `numero_residencia` int(11) NOT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `situacao` int(11) NOT NULL,
  `carga_horaria_programa` int(11) NOT NULL,
  `id_titulo` int(11) NOT NULL,
  PRIMARY KEY (`id_docente`),
  KEY `fk_Docente_Titulo1_idx` (`id_titulo`),
  KEY `fk_Docente_Endereco1_idx` (`id_endereco`),
  CONSTRAINT `fk_Docente_Endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Docente_Titulo1` FOREIGN KEY (`id_titulo`) REFERENCES `titulo` (`id_titulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `discente`;
CREATE TABLE `discente` (
  `id_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `sobrenome` varchar(90) NOT NULL,
  `data_nascimento` date NOT NULL,
  `rg` varchar(20) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `username` varchar(20) NULL,
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



DROP TABLE IF EXISTS `discentecargoinstituicao`;
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



DROP TABLE IF EXISTS `tipodiscente`;
CREATE TABLE `tipodiscente` (
  `id_tipo_discente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo_discente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `discentetipodiscente`;
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








-----------------------------------------------

--
-- Dumping data for table `bairro`
--
LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` 
VALUES 
(1,'Vila A'),
(2,'Vila da Alegria'),
(3,'Vila Madalena'),
(4,'Vila Matilde'),
(5,'Jardim das Palmeiras'),
(6,'Jardim das Flores'),
(7,'Jardim das Laranjeiras');
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `pais`
--
LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` 
VALUES 
(1, 'Brasil', 'Brasileira'),
(2, 'Argentina', 'Argentina'),
(3, 'Bahamas', 'Bahamense'),
(4, 'Barbados', 'Barbadiano'),
(5, 'Belize', 'Belizenho'),
(6, 'Bolívia', 'Boliviana'),
(7, 'Antiga e Barbuda', 'Antiguana'),
(8, 'Canadá', 'Canadense'),
(9, 'Chile', 'Chilena'),
(10, 'Colômbia', 'Colombiana'),
(11, 'Costa Rica', 'Costa-Riquenho'),
(12, 'Cuba', 'Cubana'),
(13, 'Dominica', 'Dominiquense'),
(14, 'Equador', 'Equatoriana'),
(15, 'Estados Unidos', 'Estadunidense'),
(16, 'Granada', 'Granadino'),
(17, 'Guatemala', 'Guatemalteca'),
(18, 'Guiana', 'Guianense'),
(19, 'Haiti', 'Haitiana'),
(20, 'Honduras', 'Hondurenha'),
(21, 'Jamaica', 'Jamaicana'),
(22, 'México', 'Mexicana'),
(23, 'Nicarágua', 'Nicaraguense'),
(24, 'Panamá', 'Panamenho'),
(25, 'Paraguai', 'Paraguaia'),
(26, 'Peru', 'Peruana'),
(27, 'República Dominicana', 'Dominicana'),
(28, 'Salvador', 'Salvadorenho'),
(29, 'Santa Lúcia', 'Santa Lucense'),
(30, 'São Critóvão e Neves', 'São Cristovense'),
(31, 'São Vicente e Granadinas', 'São Vicentino'),
(32, 'Suriname', 'Surinamês'),
(33, 'Trindade e Tobago', 'Trinitário'),
(34, 'Uruguai', 'Uruguaia'),
(35, 'Venezuela', 'Venezuelana');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `estado`
--
LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` 
VALUES 
(12, 'Acre', 'AC', 7),
(27, 'Alagoas', 'AL', 7),
(16, 'Amapá', 'AP', 7),
(13, 'Amazonas', 'AM', 7),
(29, 'Bahia', 'BA', 7),
(23, 'Ceará', 'CE', 7),
(53, 'Distrito Federal', 'DF', 7),
(32, 'Espírito Santo', 'ES', 7),
(52, 'Goiás', 'GO', 7),
(21, 'Maranhão', 'MA', 7),
(51, 'Mato Grosso', 'MT', 7),
(50, 'Mato Grosso do Sul', 'MS', 7),
(31, 'Minas Gerais', 'MG', 7),
(15, 'Pará', 'PA', 7),
(25, 'Paraíba', 'PB', 7),
(41, 'Paraná', 'PR', 7),
(26, 'Pernambuco', 'PE', 7),
(22, 'Piauí', 'PI', 7),
(33, 'Rio de Janeiro', 'RJ', 7),
(24, 'Rio Grande do Norte', 'RN', 7),
(43, 'Rio Grande do Sul', 'RS', 7),
(11, 'Rondônia', 'RO', 7),
(14, 'Roraima', 'RR', 7),
(42, 'Santa Catarina', 'SC', 7),
(35, 'São Paulo', 'SP', 7),
(28, 'Sergipe', 'SE', 7),
(17, 'Tocantins', 'TO', 7);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `cidade`
--
LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade`
VALUES
(1, 'Foz do Iguaçu', 41),
(2, 'Cascavel', 41),
(3, 'Curitiba', 41),
(4, 'Maringá', 41),
(5, 'Londrina', 41);
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `logradouro`
--
LOCK TABLES `logradouro` WRITE;
/*!40000 ALTER TABLE `logradouro` DISABLE KEYS */;
INSERT INTO `logradouro` 
VALUES 
(1,'Rua das Dores'),
(2,'Rua Carlos da Silva'),
(3,'Rua das Mariqueiras'),
(4,'Rua João José'),
(5,'Rua Pedro Paulo'),
(6,'Rua Jericó'),
(7,'Av. Américo Sasdeli'),
(8,'Av. Américo Silvio Sasdelli'),
(9,'Rua Limeira');
/*!40000 ALTER TABLE `logradouro` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `endereco`
--
LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` 
VALUES 
(1, 1, 1, 1, '85868060'); 
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `cargodiscente`
--
LOCK TABLES `cargodiscente` WRITE;
/*!40000 ALTER TABLE `cargodiscente` DISABLE KEYS */;
INSERT INTO `cargodiscente` 
VALUES 
(1,'Professor Titular'),
(2,'Diretor Executivo'),
(3,'Gerente de Projetos'),
(4,'Estagiário'),
(5,'Recepcionista'),
(6,'Gerente de TI'),
(7,'Analista de Projetos'),
(8,'Agente Universitário'),
(9,'Administrador'),
(10,'Diretor de Projetos'),
(11,'Consultor'),
(12,'Técnico de Informática'),
(13,'Engenheiro Ambiental'),
(14,'Desenvolvedor'),
(15,'Professor Substituto'),
(16,'Engenheiro'),
(17,'Auxiliar Administratitivo'),
(18,'Perito Criminal'),
(19,'Professor Assistente'),
(20,'Analista de Marketing'),
(21,'Não informado'),
(22,'Sócio'),
(23,'Auxiliar de Dpto. Documental'),
(24,'Analista Administrativo'),
(25,'Coordenador de Projetos'),
(26,'Arquiteto e Urbanista'),
(27,'Professor Visitante'),
(28,'Agente de Atendimento'),
(29,'Técnico de Nível Superior');
/*!40000 ALTER TABLE `cargodiscente` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `titulo`
--
LOCK TABLES `titulo` WRITE;
/*!40000 ALTER TABLE `titulo` DISABLE KEYS */;
INSERT INTO `titulo` 
VALUES 
(1,'Bacharel'),
(2,'Mestre'),
(3,'Licenciado'),
(4,'Tecnólogo'),
(5,'Doutor'),
(6,'Especialista');

/*!40000 ALTER TABLE `titulo` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `instituicao`
--
LOCK TABLES `instituicao` WRITE;
/*!40000 ALTER TABLE `instituicao` DISABLE KEYS */;
INSERT INTO `instituicao` VALUES 
(1,'Universidade Estadual do Oeste do Paraná','UNIOESTE',1),
(2,'Parque Tecnológico de Itaipu','PTI',1),
(3,'Itaipu Binacional', 'Itaipu', 1),
(4,'União Dinâmica das Cataratas','UDC',2),
(5,'Mind Brasil Industrias da Mobilidade Ltda','CEiiA',2),
(6,'Universidade Federal da Integração Latino Americana','UNILA',1),
(7,'RR Associados Consultoria Empresarial Ltda','RRA',2),
(8,'Instituto de Apoio ao Desenvolvimento Tecnológico do Sudoeste do Paraná','IDETEP',2),
(9,'Instituto de Habitação de Foz do Iguaçu','FOZHABITA',1),
(10,'Universidade Tecnológica Federal do Paraná','UTFPR',1),
(11,'Polícia Científica do Paraná','IC-PR',1),
(12,'NEOAUTUS -AUTOMATION SYSTEMS','NEOAUTUS',2),
(13,'Não informado','NI',2),
(14,'Instituto Federal do Paraná','IFPR',1),
(15,'Macuco Safari','MS',2),
(16,'Cooperativa Sicredi Vanguarda','Sicredi',2),
(17,'Fundação André e Lucia Maggi','FALM',2),
(18,'Centro Internacional de Energias Renováveis','CIBiogás',2),
(19,'Faculdades Unificadas de Foz do Iguaçu','UNIFOZ',2),
(20,'VRG LINHAS AEREAS S/A','VRG',2);




/*!40000 ALTER TABLE `instituicao` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `docente`
--
LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` (id_docente, nome, sobrenome, data_nascimento, rg, cpf,senha, link_lattes, email, 
	id_endereco, numero_residencia, complemento, situacao, carga_horaria_programa, id_titulo)
VALUES 
(1, 'Carlos Henrique', 'Zanelato Pantaleão', '1978-01-01', '380945563', '05533766081', '123456', 'http://lattes.cnpq.br/7560571987514133', 'pantaleao@gmail.com', 1, 123, 'Casa', 5, 150, 1),
(2, 'Clodis', 'Boscarioli', '1978-01-01', '253151028', '49925206006',  '123456', 'http://lattes.cnpq.br/2844207318576160', 'boscarioli@gmail.com', 1, 124, 'Casa', 5, 150, 1),
(3, 'Eduardo César', 'Dechechi', '1978-01-01', '113177616', '59899973025', '123456', 'http://lattes.cnpq.br/0232503428559756', 'dechechi@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(4, 'Eduardo ', 'Hack Neto', '1978-01-01', '180773756', '38963778096', '123456', 'http://lattes.cnpq.br/4496924261739015', 'hackneto@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(5, 'Eduardo', 'Moreira', '1978-01-01', '424339201', '73261210010', '123456', 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4744068Z9', 'moreira@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(6, 'Eliane', 'Nascimento Pereira', '1978-01-01', '255236062', '53096922071',  '123456', 'http://lattes.cnpq.br/1779566969221196', 'pereira@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(7, 'Elias', 'Garcia', '1978-01-01', '437292514', '31279586095',  '123456', 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4773593P0', 'garcia@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(8, 'Elói', 'Junior Damke', '1978-01-01', '506779592', '78669043084', 'http://lattes.cnpq.br/2953634577751958', '123456', 'damke@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(9, 'Jose', 'Ricardo Sousa', '1978-01-01', '479508318', '01554945038',  '123456', 'http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4702977Z6', 'sousa@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(10, 'Luciano', 'Panek', '1978-01-01', '453510231', '64647828000',  '123456', 'http://lattes.cnpq.br/2407960550926577', 'panek@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(11, 'Manoela', 'Silveira dos Santos', '1978-01-01', '419485405', '97030420071',  '123456', 'http://lattes.cnpq.br/3160353255727010', 'santos@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(12, 'Neucir', 'Szinwelski', '1978-01-01', '373131288', '59719679085',  '123456', 'http://lattes.cnpq.br/5135022065325874', 'szinwelski@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(13, 'Renata', 'Camacho Bezerra', '1978-01-01', '158499591', '73764548029',  '123456', 'http://lattes.cnpq.br/3960357191532853', 'bezerra@gmail.com', 1, 125, 'Casa', 5, 150, 1),
(14, 'Willian Francisco ', 'da Silva', '1978-01-01', '435733369', '53158904063', '123456', 'http://lattes.cnpq.br/2112323830310902', 'silva@gmail.com', 1, 125, 'Casa', 5, 150, 1);
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `discente`
--
LOCK TABLES `discente` WRITE;
/*!40000 ALTER TABLE `discente` DISABLE KEYS */;
INSERT INTO `discente` (id_discente, nome, sobrenome, data_nascimento, rg, cpf, senha, link_lattes, email, id_endereco, numero_residencia, complemento, id_docente, isAceito, situacao, id_titulo, sexo, telefone, passaporte, id_nacionalidade)
VALUES 
(1,'Ana Cristina','Rempel de Oliveira','1990-11-11','911225341','21993570900','topicos','http://lattes.cnpq.br/6076572833928448','ana.oliveira@unioeste.br',1,123,NULL,8,1,3,2,2,'4539894215',NULL,1),
(2,'Elton Luiz','Ludwig','1989-06-02','157938761','11516455916','topicos','http://lattes.cnpq.br/6118194333533837','elton.ludwig@unioeste.br',1,12,NULL,11,1,3,2,1,'4537970020',NULL,1),
(3,'Fernanda','Sotello','1990-11-11','109293502','93697985957','topicos','http://lattes.cnpq.br/1764725275707185','fernanda.sotello@unioeste.br',1,204,NULL,4,1,3,2,2,'4535721774',NULL,1),
(4,'Hugo Alexandre','Souza Ribeiro','1980-06-02','110665314','35970562963','topicos','http://lattes.cnpq.br/6438929290071679','hugo.ribeiro@unioeste.br',1,124,NULL,3,1,3,2,1,'4535721774',NULL,1),
(5,'Joice Franciele ','Wendling Damke','1990-11-11','233089081','36757130912','topicos','http://lattes.cnpq.br/0353226688445776','joice.damke@unioeste.br',1,125,NULL,11,1,3,2,2,'4535721774',NULL,1),
(6,'Katia ','Abreu','1980-06-02','122373583','17483581972','topicos','http://lattes.cnpq.br/6430509357454386','katia.abreu@unioeste.br',1,126,NULL,1,1,3,2,2,'4535721774',NULL,1),
(7,'Marilan Cristina','Albuquerque','1990-11-02','122373583','17483581972','topicos',' http://lattes.cnpq.br/2170248077094085','marilan.albuquerque@unioeste.br',1,127,NULL,12,1,1,6,2,'4535721774',NULL,1),
(8,'Lilian','Sanches Camargo','1980-08-27','122373583','17483581972','topicos','http://lattes.cnpq.br/7184374386153903','lsanchescamargo@gmail.com',1,128,NULL,10,1,3,2,2,'4535721774',NULL,1),
(9,'Matheus','Gonçalves Bainy','1992-10-15','122373583','17483581972','topicos','http://lattes.cnpq.br/8505364738755158','matheus.bainy@unioeste.br',1,129,NULL,9,1,3,2,1,'4535721774',NULL,1),
(10,'Rafael Antonio','dos Santos Correia','1980-11-11','122373583','17483581972','topicos',' http://lattes.cnpq.br/8742429563763736','rafael.correia@unioeste.br',1,123,NULL,10,1,3,2,1,'4535721774',NULL,1),
(11,'Tiago Luis','Brugnera','1990-08-02','122373583','17483581972','topicos','http://lattes.cnpq.br/8018524943281173','tiago.brugnera@unioeste.br',1,130,NULL,8,1,3,2,1,'4535721774',NULL,1),
(12,'Vinicius','Gomes de Lima Araujo','1991-11-09','122373583','17483581972','topicos','http://lattes.cnpq.br/1001285901158210','vinicius.araujo@unioeste.br',1,131,NULL,1,1,1,6,1,'4535721774',NULL,1),
(13,'Adelio','de Souza Conter','1966-05-16','122373583','17483581972','topicos','http://lattes.cnpq.br/1585631977154651','adelio.conter@unioeste.br',1,132,NULL,1,1,1,2,1,'4535721774',NULL,1),
(14,'Vanessa','Demarchi Peron','1989-04-25','122373583','17483581972','topicos',' http://lattes.cnpq.br/9738346153387940','vanessa.peron@unioeste.br',1,123,NULL,9,1,1,6,2,'4535721774',NULL,1),
(15,'Eloise','Jacomelli','1993-06-25','122373583','17483581972','topicos','http://lattes.cnpq.br/9718166438958865','eloise.jacomelli@unioeste.br',1,123,NULL,11,1,1,6,2,'4535721774',NULL,1),
(16,'Bia Cristina','Bassani','1993-06-25','122373583','17483581972','topicos','http://lattes.cnpq.br/8219397587271032','bia.cristina@unioeste.br',1,123,NULL,1,1,1,1,2,'4535721774',NULL,1),
(17,'Douglas','Pereira Pavan','1993-06-25','122373583','17483581972','topicos','http://lattes.cnpq.br/6194910227281734','douglas.pavan@unioeste.br',1,123,NULL,6,1,1,1,1,'4535721774',NULL,1),
(18,'Iêda Beatriz','Closa Brasil','1993-06-25','122373583','17483581972','topicos','http://lattes.cnpq.br/2721348790803273','ieda.brasil@unioeste.br',1,123,NULL,12,1,1,6,2,'4535721774',NULL,1),
(19,'Marcos','Roque da Rosa','1993-06-25','122373583','17483581972','topicos','http://lattes.cnpq.br/6726801451000730','marcos.rosa@unioeste.br',1,123,NULL,6,1,1,6,1,'4535721774',NULL,1),
(20,'João Carlos','Christmann Zank','1983-03-26','122373583','17483581972','topicos','http://lattes.cnpq.br/7411577992924443','joao.zank@unioeste.br',1,123,NULL,13,1,1,1,1,'4535721774',NULL,1),
(21,'Francieli','Butske','1983-03-26','122373583','17483581972','topicos','http://lattes.cnpq.br/7373036320948700','francieli.butske@unioeste.br',1,123,NULL,10,1,1,6,2,'4535721774',NULL,1),
(22,'Lays','Martins Amaral','1989-04-02','122373583','17483581972','topicos','http://lattes.cnpq.br/9009018854738820','lays.amaral@unioeste.br',1,123,NULL,4,1,1,6,2,'4535721774',NULL,1),
(23,'Nathan','Marques Oliveira','1990-08-25','122373583','17483581972','topicos',' http://lattes.cnpq.br/7253765669118266','nathan.oliveira@unioeste.br',1,123,NULL,2,1,1,6,1,'4535721774',NULL,1),
(24,'Adriana','Brandt Rodrigues','1990-08-25','122373583','17483581972','topicos','http://lattes.cnpq.br/5831128552259848','adriana.rodrigues@unioeste.br',1,123,NULL,12,1,1,1,2,'4535721774',NULL,1),
(25,'Rodrigo','Chibiaqui','1982-12-29','122373583','17483581972','topicos','http://lattes.cnpq.br/7365250515770667','rodrigo.chibiaqui@unioeste.br',1,123,NULL,4,1,1,6,1,'4535721774',NULL,1),
(26,'Carlos Ariel','Baez','1982-09-29','122373583','17483581972','topicos','http://lattes.cnpq.br/5035652590182218','carlos.baez@unioeste.br',1,123,NULL,3,1,1,6,1,'4535721774',NULL,1),
(27,'Laíz Keiko','Kawahara','1984-09-29','122373583','17483581972','topicos','http://lattes.cnpq.br/9953804147224413','laiz.kawahara@unioeste.br',1,123,NULL,5,1,1,6,2,'4535721774',NULL,1);

/*!40000 ALTER TABLE `discente` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `discentecargoinstituicao`
--
LOCK TABLES `discentecargoinstituicao` WRITE;
/*!40000 ALTER TABLE `discentecargoinstituicao` DISABLE KEYS */;
INSERT INTO `discentecargoinstituicao` 
VALUES 
(1,5,7),
(2,1,8),
(3,6,9),
(4,7,11),
(4,8,10),
(5,13,21),
(6,1,12),
(8,1,8),
(7,9,13),
(9,10,15),
(9,2,14),
(10,3,16),
(11,6,17),
(11,4,1),
(12,11,18),
(13,4,19),
(13,12,22),
(14,14,17),
(15,15,23),
(16,2,24),
(17,16,17),
(18,17,25),
(19,6,12),
(20,18,16),
(21,6,26),
(22,19,27),
(23,20,28),
(24,2,29),
(25,2,20),
(26,2,9),
(27,6,9);

/*!40000 ALTER TABLE `discentecargoinstituicao` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `tipodiscente`
--
LOCK TABLES `tipodiscente` WRITE;
/*!40000 ALTER TABLE `tipodiscente` DISABLE KEYS */;
INSERT INTO `tipodiscente` 
VALUES 
(1, 'Regular'),
(2, 'Especial');
/*!40000 ALTER TABLE `tipodiscente` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `discentetipodiscente`
--
LOCK TABLES `discentetipodiscente` WRITE;
/*!40000 ALTER TABLE `discentetipodiscente` DISABLE KEYS */;
INSERT INTO `discentetipodiscente` 
VALUES 
(1,1,'2018-02-08',NULL,1),
(1,2,'2018-02-08',NULL,1),
(1,3,'2018-02-08',NULL,1),
(1,4,'2018-02-08',NULL,1),
(1,5,'2018-02-08',NULL,1),
(1,6,'2018-02-08',NULL,1),
(1,7,'2018-02-08',NULL,1),
(1,8,'2018-02-08',NULL,1),
(1,9,'2018-02-08',NULL,1),
(1,10,'2018-02-08',NULL,1),
(1,11,'2018-02-08',NULL,1),
(1,12,'2018-02-08',NULL,1),
(1,13,'2018-02-08',NULL,1),
(1,14,'2018-02-08',NULL,1),
(1,15,'2018-02-08',NULL,1),
(1,16,'2018-02-08',NULL,1),
(1,17,'2018-02-08',NULL,1),
(1,18,'2018-02-08',NULL,1),
(1,19,'2018-02-08',NULL,1),
(1,20,'2018-02-08',NULL,1),
(1,21,'2018-02-08',NULL,1),
(1,22,'2018-02-08',NULL,1),
(1,23,'2018-02-08',NULL,1),
(1,24,'2018-02-08',NULL,1),
(1,25,'2018-02-08',NULL,1),
(1,26,'2018-02-08',NULL,1),
(1,27,'2018-02-08',NULL,1);

/*!40000 ALTER TABLE `discentetipodiscente` ENABLE KEYS */;

UNLOCK TABLES;

