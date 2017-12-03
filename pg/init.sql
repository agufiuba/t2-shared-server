CREATE DATABASE t2;

\connect t2
--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Name: autos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE autos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.autos_id_seq OWNER TO postgres;

--
-- Name: autos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('autos_id_seq', 2, true);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: autos; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE autos (
    user_email text NOT NULL PRIMARY KEY,
    model text NOT NULL,
    color text NOT NULL,
    patent text NOT NULL,
    year text NOT NULL,
    state text NOT NULL,
    air_conditioner TEXT NOT NULL,
    music text
);


--
-- Name: tarjetas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tarjetas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tarjetas_id_seq OWNER TO postgres;

--
-- Name: tarjetas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tarjetas_id_seq', 1, true);


--
-- Name: tarjetas; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE tarjetas (
    id integer DEFAULT nextval('tarjetas_id_seq'::regclass) NOT NULL,
    "nameOnCard" text NOT NULL,
    number text NOT NULL,
    "typeCard" integer NOT NULL
);


ALTER TABLE public.tarjetas OWNER TO postgres;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE usuarios (
    id integer NOT NULL,
    name text NOT NULL,
    last_name text NOT NULL,
    mail text NOT NULL,
    type integer NOT NULL,
    saldo numeric DEFAULT 0 NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE usuarios_id_seq OWNED BY usuarios.id;


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('usuarios_id_seq', 9, true);


--
-- Name: usuarios_tarjetas; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE usuarios_tarjetas (
    usuario integer NOT NULL,
    tarjeta integer NOT NULL
);


ALTER TABLE public.usuarios_tarjetas OWNER TO postgres;

--
-- Name: viajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE viajes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.viajes_id_seq OWNER TO postgres;

--
-- Name: viajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('viajes_id_seq', 2, true);


--
-- Name: viajes; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE viajes (
    id integer DEFAULT nextval('viajes_id_seq'::regclass) NOT NULL,
    pasajero integer NOT NULL,
    conductor integer NOT NULL,
    distancia integer NOT NULL,
    costo numeric NOT NULL,
    ganancia numeric NOT NULL,
    dia text NOT NULL,
    hora numeric NOT NULL
);


ALTER TABLE public.viajes OWNER TO postgres;


CREATE TABLE permisos (
    uid text NOT NULL,
    permiso numeric NOT NULL
);


ALTER TABLE public.permisos OWNER TO postgres;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuarios ALTER COLUMN id SET DEFAULT nextval('usuarios_id_seq'::regclass);


--
-- Data for Name: autos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO autos VALUES (1, 'Golf', 'Negro', 'AA000AA', '2017', true, false, '');
INSERT INTO autos VALUES (2, '208', 'Blanco', 'AB001ES', '2016', true, false, 'qweqweqwe');


--
-- Data for Name: tarjetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tarjetas VALUES (1, 'DATC', '1594987623245126', 1);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO usuarios VALUES (2, 'Tomas', 'Arjovsky', 'tomas@gmail.com', 1, 500.0);
INSERT INTO usuarios VALUES (1, 'Agustin', 'Gaillard', 'agu@gmail.com', 1, 250.0);
INSERT INTO usuarios VALUES (4, 'Darius', 'Maitita', 'darius@gmail.com', 2, 1000.0);
INSERT INTO usuarios VALUES (3, 'Cristian', 'Gonzalez', 'cristian@gmail.com', 2, 375.0);



--
-- Data for Name: usuarios_tarjetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO usuarios_tarjetas VALUES (3, 1);
INSERT INTO usuarios_tarjetas VALUES (2, 1);
INSERT INTO usuarios_tarjetas VALUES (1, 1);


--
-- Data for Name: viajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO viajes VALUES (1, 1, 3, 13, 150, 75, '7/11/2017', 1510076940291);
INSERT INTO viajes VALUES (2, 2, 4, 10, 200, 100, '7/11/2017', 1510077064409);

INSERT INTO permisos VALUES ('hzyz0ybCTzdCXHYy4hMRj4RRDIH2', 1);
INSERT INTO permisos VALUES ('hzyz0ybCTzdCXHYy4hMRj4RRDIH2', 2);
INSERT INTO permisos VALUES ('hzyz0ybCTzdCXHYy4hMRj4RRDIH2', 3);
INSERT INTO permisos VALUES ('TLFotts3y3SZ3CkyoLzzwf7abgG2', 1);



--
-- Name: modelo; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY autos
    ADD CONSTRAINT modelo UNIQUE (model);


--
-- Name: numero; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY tarjetas
    ADD CONSTRAINT numero UNIQUE (number);



--
-- Name: pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY usuarios_tarjetas
    ADD CONSTRAINT pk PRIMARY KEY (usuario, tarjeta);


--
-- Name: tarjetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY tarjetas
    ADD CONSTRAINT tarjetas_pkey PRIMARY KEY (id);


--
-- Name: usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: viajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY viajes
    ADD CONSTRAINT viajes_pkey PRIMARY KEY (id);




--
-- Name: tarjeta_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuarios_tarjetas
    ADD CONSTRAINT tarjeta_fk FOREIGN KEY (tarjeta) REFERENCES tarjetas(id) ON DELETE CASCADE;




--
-- Name: usuario_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuarios_tarjetas
    ADD CONSTRAINT usuario_fk FOREIGN KEY (usuario) REFERENCES usuarios(id) ON DELETE CASCADE;


--
-- Name: viajes_conductor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY viajes
    ADD CONSTRAINT viajes_conductor_fkey FOREIGN KEY (conductor) REFERENCES usuarios(id) ON DELETE CASCADE;


--
-- Name: viajes_pasajero_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY viajes
    ADD CONSTRAINT viajes_pasajero_fkey FOREIGN KEY (pasajero) REFERENCES usuarios(id) ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
