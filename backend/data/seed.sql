--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: rodrigo
--

CREATE TYPE public.user_role_enum AS ENUM (
    'user',
    'editor',
    'admin'
);


ALTER TYPE public.user_role_enum OWNER TO rodrigo;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact_messages; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.contact_messages (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "dateCreated" timestamp without time zone NOT NULL,
    message text NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL
);


ALTER TABLE public.contact_messages OWNER TO rodrigo;

--
-- Name: content; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.content (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    "dateCreated" timestamp without time zone NOT NULL,
    "courseId" uuid,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.content OWNER TO rodrigo;

--
-- Name: course; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.course (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    "dateCreated" timestamp without time zone NOT NULL,
    "imageUrl" character varying,
    "createdBy" uuid NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.course OWNER TO rodrigo;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.enrollments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "dateCreated" timestamp without time zone DEFAULT now() NOT NULL,
    "enrolledAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "courseId" uuid
);


ALTER TABLE public.enrollments OWNER TO rodrigo;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    "userId" uuid,
    "courseId" uuid
);


ALTER TABLE public.favorites OWNER TO rodrigo;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: rodrigo
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO rodrigo;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rodrigo
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO rodrigo;

--
-- Name: user; Type: TABLE; Schema: public; Owner: rodrigo
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    role public.user_role_enum DEFAULT 'user'::public.user_role_enum NOT NULL,
    "refreshToken" character varying,
    "isActive" boolean DEFAULT true NOT NULL,
    email character varying NOT NULL,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "dateCreated" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO rodrigo;

--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.contact_messages (id, "updatedAt", name, email, "dateCreated", message, status) FROM stdin;
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.content (id, name, description, "dateCreated", "courseId", "updatedAt") FROM stdin;
5e15da6b-0812-4369-b94d-e9eaf0163870	rodrigo	asdsd	2024-10-28 20:07:23.117	cf2bc935-16bb-4280-8a97-be76bc15e749	2024-10-29 12:21:57.898328
c49ac850-4816-482f-bfe9-762f7d704733	xzczxc	wewqe34	2024-10-28 20:07:33.348	cf2bc935-16bb-4280-8a97-be76bc15e749	2024-10-29 12:21:57.898328
1df58bbc-6346-4a57-a53b-9d51b2f0f6d9	Intro	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:08:51.236	d55d8cef-eb1a-45f3-9fcd-a9d007664de1	2024-10-29 12:21:57.898328
82bab977-83f8-40ad-823e-cd4c5f6324a0	leccion 1	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:08:58.69	d55d8cef-eb1a-45f3-9fcd-a9d007664de1	2024-10-29 12:21:57.898328
9b22b3ee-9138-4c78-b9bb-db0f7b9594db	Leccion 2	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:09:06.615	d55d8cef-eb1a-45f3-9fcd-a9d007664de1	2024-10-29 12:21:57.898328
3bd9ae8e-ab7d-4e8c-9a8a-52e7a350e901	final	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:09:12.611	d55d8cef-eb1a-45f3-9fcd-a9d007664de1	2024-10-29 12:21:57.898328
f1e17cfb-fb61-473d-9d74-917bd37c0610	intro	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:10:21.367	4257e103-f69d-47d7-92b1-cb3870ecac21	2024-10-29 12:21:57.898328
37a53c4e-7a35-4fc6-a8c4-34f2cd73380d	Leccion 1	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:10:30.899	4257e103-f69d-47d7-92b1-cb3870ecac21	2024-10-29 12:21:57.898328
c1069960-73e3-46a3-9aa9-5eac87ef5fd4	Leccion 2	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:10:39.103	4257e103-f69d-47d7-92b1-cb3870ecac21	2024-10-29 12:21:57.898328
2653d509-89ce-4104-8602-f31ea0dc0d9c	Final	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:10:45.938	4257e103-f69d-47d7-92b1-cb3870ecac21	2024-10-29 12:21:57.898328
e184c6fa-af58-4b91-8de2-0c4dd25a0d7e	Intro	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:10:59.49	c7ab2621-3688-4e45-9174-6be19b9d2ccb	2024-10-29 12:21:57.898328
9eb93174-b23f-40c3-a742-7e7b0c7635f2	Leccion 1	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:11:06.547	c7ab2621-3688-4e45-9174-6be19b9d2ccb	2024-10-29 12:21:57.898328
b535df9f-23d5-4781-bbe1-2d79778344db	final	Lorem ipsum dolor sit amet consectetur, adipiscing elit natoque platea vestibulum, sodales duis sociosqu montes. Semper blandit elementum pretium et metus ad dapibus aliquet inceptos conubia, dignissim accumsan felis quisque senectus ligula faucibus purus auctor, ultrices vestibulum a fusce orci posuere fringilla sed tellus. Quam porttitor ultrices vestibulum rutrum sodales viverra montes pulvinar, praesent sociosqu convallis penatibus cubilia mi mattis hendrerit euismod, aptent lacus sapien scelerisque fringilla nulla at.	2024-10-29 09:11:12.115	c7ab2621-3688-4e45-9174-6be19b9d2ccb	2024-10-29 12:21:57.898328
ac971851-ed97-4112-9819-2cf3f6d30857	Intro	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:23:24.909	34180a99-b931-49c3-95d3-109b7d12e4f4	2024-10-29 09:23:24.909
2bf54cea-e8fa-45d1-98c9-0b74e9cb75e0	leccion 1	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:23:33.336	34180a99-b931-49c3-95d3-109b7d12e4f4	2024-10-29 09:23:33.336
fbc57879-92c7-4d9b-8f8d-b09ceecb427e	leccion 2	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:23:40.772	34180a99-b931-49c3-95d3-109b7d12e4f4	2024-10-29 09:23:40.772
995ed2f1-b94d-4725-b76b-b27f4ae75d0c	final	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:23:46.057	34180a99-b931-49c3-95d3-109b7d12e4f4	2024-10-29 09:23:46.057
4b8899de-bbc3-4aee-8289-0ac83ba90db4	Intro	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:24:04.636	2a549afc-b62c-4444-bdb8-41888218bc4a	2024-10-29 09:24:04.636
181c9fca-2592-483e-8199-a26a24742c27	Leccion 1	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:24:12.752	2a549afc-b62c-4444-bdb8-41888218bc4a	2024-10-29 09:24:12.752
dd26f7d6-db22-46b6-bf97-c22499abd4d7	Final	Tempor rutrum habitant ridiculus a facilisi mollis aliquam placerat, ornare ultricies mattis varius dictumst aptent eleifend fermentum, netus lacinia vestibulum lectus augue felis sem. Curabitur blandit iaculis ullamcorper fermentum aliquam turpis eros, hendrerit suspendisse tempus senectus natoque malesuada mollis massa, rutrum risus porta diam pretium luctus. Congue nullam etiam enim penatibus ornare sollicitudin id leo vulputate iaculis elementum rhoncus, urna tristique vestibulum sodales conubia netus euismod mollis risus pretium.	2024-10-29 09:24:18.812	2a549afc-b62c-4444-bdb8-41888218bc4a	2024-10-29 09:24:18.812
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.course (id, name, description, "dateCreated", "imageUrl", "createdBy", "updatedAt") FROM stdin;
c7ab2621-3688-4e45-9174-6be19b9d2ccb	Plomero	Uno de plomeria	2024-10-28 23:27:22.635	http://res.cloudinary.com/do5hovkvl/image/upload/v1730168841/courses/opsuybtupb740jud1tnb.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
4257e103-f69d-47d7-92b1-cb3870ecac21	Piloto Comercial	Buena salida laboral	2024-10-28 23:31:12.592	http://res.cloudinary.com/do5hovkvl/image/upload/v1730169072/courses/fbhtkplmvbxc9rtxs3u5.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
d55d8cef-eb1a-45f3-9fcd-a9d007664de1	Data Analitycs	Python y matematicas	2024-10-28 23:31:55.659	http://res.cloudinary.com/do5hovkvl/image/upload/v1730169114/courses/og7tcr2mxrcg8lyce0s5.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
0706b9a8-016d-44e6-b133-437f967f1096	Reparacion de PC	De la pantalla al teclado	2024-10-28 23:32:32.299	http://res.cloudinary.com/do5hovkvl/image/upload/v1730169151/courses/djq8zzpfcs6v07mskgez.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
57d035ae-6876-4b68-a4d3-89635cdbad0e	Mecanico dental	Como desarmar un carburadorc on la boca	2024-10-28 23:22:54.367	http://res.cloudinary.com/do5hovkvl/image/upload/v1730168573/courses/oimy4benqgdrb8nlwrjs.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
cf2bc935-16bb-4280-8a97-be76bc15e749	Piloto Bombardero	Oficio con gran salida laboral	2024-10-28 19:33:53.21	http://res.cloudinary.com/do5hovkvl/image/upload/v1730154832/courses/gt2mjrz22hiwysawc1fd.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
2a549afc-b62c-4444-bdb8-41888218bc4a	Edicion de Video	Crea videos devirtidos para toda la familia	2024-10-29 08:50:54.456	http://res.cloudinary.com/do5hovkvl/image/upload/v1730202653/courses/xg6svsd4kgo7xzdkdcmx.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
b290b467-084a-4210-902e-9b863d9c5dd6	Curso de Full Stack	Crea videos devirtidos para toda la familiaCon stack MERN	2024-10-29 08:51:45.533	http://res.cloudinary.com/do5hovkvl/image/upload/v1730202704/courses/s4lpcwmulcreha4x19nl.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
3047e0c9-9e9f-4669-836f-55e1391de194	Gasista	curso practico sobre gas	2024-10-28 23:23:30.42	http://res.cloudinary.com/do5hovkvl/image/upload/v1730168609/courses/fd6qidhx4uf7ab4lrjib.jpg	a0870c56-c388-47c1-a5fe-ebbcefe16eed	2024-10-29 12:21:57.898328
34180a99-b931-49c3-95d3-109b7d12e4f4	Curso de Libreria	como armar libros a distancia	2024-10-29 09:17:33.708	http://res.cloudinary.com/do5hovkvl/image/upload/v1730204253/courses/qulyxrtuk31ex5kbargm.jpg	b3572076-ad23-49cc-83f4-2dd801a7bc4c	2024-10-29 12:21:57.898328
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.enrollments (id, "updatedAt", "dateCreated", "enrolledAt", "userId", "courseId") FROM stdin;
3fcc7a60-bd39-4602-992d-4157d7b1bc49	2024-10-29 03:52:30.732526	2024-10-29 03:52:30.732526	2024-10-29 03:52:30.732526	a0870c56-c388-47c1-a5fe-ebbcefe16eed	c7ab2621-3688-4e45-9174-6be19b9d2ccb
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.favorites (id, "userId", "courseId") FROM stdin;
2	a0870c56-c388-47c1-a5fe-ebbcefe16eed	4257e103-f69d-47d7-92b1-cb3870ecac21
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: rodrigo
--

COPY public."user" (id, "firstName", "lastName", username, password, role, "refreshToken", "isActive", email, "isEmailVerified", "updatedAt", "dateCreated") FROM stdin;
19a76259-5a90-4a42-b2ae-d57aebbecc70	Francisco	Quintero	fran	$2b$10$efAugFpVGxF5IKTnBMl9A.cYriGOwAnQte6pkY2tLKKtszMPnPp..	user	\N	t	francisco.quintero@gmail.com	f	2024-10-29 12:21:57.898328	2024-10-29 12:21:57.898328
9fbfcca0-cea5-4e2f-867e-c8a7d9d538fd	Sonia	Martinez	sonia	$2b$10$9Qjw1O6yrsFm0.x81QR3vOrAj4WWBQjTibAs.52CkHWVCjEEQczM2	editor	\N	t	sonia.martinez@gmail.com	f	2024-10-29 12:21:57.898328	2024-10-29 12:21:57.898328
27d692a1-ed06-4a93-b78c-612c22cd35db	Lucas	Gonzalez	rato	$2b$10$qo6Fxv3SaQ0hREmHYASVaeoBN0q1UG/GNAAIKAinPpKGB0RfhcKeW	user	\N	t	rodrigo.m.quintero@gmail.com	f	2024-10-29 12:21:57.898328	2024-10-29 12:21:57.898328
a0870c56-c388-47c1-a5fe-ebbcefe16eed	admin	admin	admin	$2b$10$6kffsEZGSdRkEjm.u612pu6aX9LVFHE2l1zEJm3W7fvA6S5MEu.b6	admin	$2b$10$BuLlhNQnVFPMuqNfu89Zr.ICHmrqSVtAX2wosEfqz.JzxWap9xsb.	t	admin@admin.com	f	2024-10-29 12:21:57.898328	2024-10-29 12:21:57.898328
b3572076-ad23-49cc-83f4-2dd801a7bc4c	Juan	Valdez	juancho	$2b$10$W8IMH3syN8oudp2SlKmdXu8IhQOFNNcAdzs3/sR9eCjGz1ZLztZAG	editor	\N	t	juan@valdez.com	f	2024-10-29 12:25:16.651494	2024-10-29 12:21:57.898328
52350b0f-ba3d-4fae-a631-e6f4affff75d	Rodrigo	Quintero	Aragornz	$2b$10$MBfCYEiljrXczaamp2NOauvt5OhXC212gcyEtUlr/ACMVRRsQm9li	user	\N	t	rodrigo.m.quintero@outlook.com	f	2024-10-29 12:25:47.577923	2024-10-29 12:21:57.898328
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rodrigo
--

SELECT pg_catalog.setval('public.favorites_id_seq', 2, true);


--
-- Name: content PK_6a2083913f3647b44f205204e36; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY (id);


--
-- Name: enrollments PK_7c0f752f9fb68bf6ed7367ab00f; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY (id);


--
-- Name: favorites PK_890818d27523748dd36a4d1bdc8; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY (id);


--
-- Name: contact_messages PK_b74f96eb2edd977ccfba6533293; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.contact_messages
    ADD CONSTRAINT "PK_b74f96eb2edd977ccfba6533293" PRIMARY KEY (id);


--
-- Name: course PK_bf95180dd756fd204fb01ce4916; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: favorites UQ_6ada0415623917c5eb14a119bce; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "UQ_6ada0415623917c5eb14a119bce" UNIQUE ("userId", "courseId");


--
-- Name: enrollments UQ_a6f2eeafcbf0dd7a69fc91e2957; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "UQ_a6f2eeafcbf0dd7a69fc91e2957" UNIQUE ("userId", "courseId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: content FK_26bec3f34483ed6845c678dcde2; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "FK_26bec3f34483ed6845c678dcde2" FOREIGN KEY ("courseId") REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: enrollments FK_60dd0ae4e21002e63a5fdefeec8; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_60dd0ae4e21002e63a5fdefeec8" FOREIGN KEY ("courseId") REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: course FK_7c3b12e785a7d5c8038ea5a54f4; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "FK_7c3b12e785a7d5c8038ea5a54f4" FOREIGN KEY ("createdBy") REFERENCES public."user"(id);


--
-- Name: favorites FK_c6df4fbe36a86826a3f970225fe; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "FK_c6df4fbe36a86826a3f970225fe" FOREIGN KEY ("courseId") REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: enrollments FK_de33d443c8ae36800c37c58c929; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_de33d443c8ae36800c37c58c929" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: favorites FK_e747534006c6e3c2f09939da60f; Type: FK CONSTRAINT; Schema: public; Owner: rodrigo
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

