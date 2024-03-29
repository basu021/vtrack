PGDMP     &                    {         	   bustrack1    14.9.1    14.6.0     b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    23852 	   bustrack1    DATABASE     r   CREATE DATABASE bustrack1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8' ICU_SHORT_FORM = '';
    DROP DATABASE bustrack1;
             	   ubustrack    false            �           1259    23853    login    TABLE     {  CREATE TABLE public.login (
    login_id character varying(50) NOT NULL,
    user_id integer NOT NULL,
    password_hash character varying(255) NOT NULL,
    role_id integer,
    last_login timestamp without time zone,
    login_attempts integer DEFAULT 0,
    locked boolean DEFAULT false,
    verification_token character varying(255),
    is_verified boolean DEFAULT false
);
    DROP TABLE public.login;
       public         heap 	   ubustrack    false            �           1259    23858    login_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.login_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.login_user_id_seq;
       public       	   ubustrack    false    391            f           0    0    login_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.login_user_id_seq OWNED BY public.login.user_id;
          public       	   ubustrack    false    392            �           1259    23859    roles    TABLE     �   CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL,
    description text
);
    DROP TABLE public.roles;
       public         heap 	   ubustrack    false            �           1259    23864    roles_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_role_id_seq;
       public       	   ubustrack    false    393            g           0    0    roles_role_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;
          public       	   ubustrack    false    394            �           1259    23865    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    fname character varying(50),
    lname character varying(50),
    phone_number character varying(20),
    whatsapp_number character varying(20),
    dob date,
    employee_id character varying(50),
    department character varying(255),
    job_role character varying(255)
);
    DROP TABLE public.users;
       public         heap 	   ubustrack    false            �           1259    23870    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public       	   ubustrack    false    395            h           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public       	   ubustrack    false    396            L           2604    23871    login user_id    DEFAULT     n   ALTER TABLE ONLY public.login ALTER COLUMN user_id SET DEFAULT nextval('public.login_user_id_seq'::regclass);
 <   ALTER TABLE public.login ALTER COLUMN user_id DROP DEFAULT;
       public       	   ubustrack    false    392    391            N           2604    23872    roles role_id    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
       public       	   ubustrack    false    394    393            O           2604    23873    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public       	   ubustrack    false    396    395            Z          0    23853    login 
   TABLE DATA           �   COPY public.login (login_id, user_id, password_hash, role_id, last_login, login_attempts, locked, verification_token, is_verified) FROM stdin;
    public       	   ubustrack    false    391   �#       \          0    23859    roles 
   TABLE DATA           @   COPY public.roles (role_id, role_name, description) FROM stdin;
    public       	   ubustrack    false    393   T%       ^          0    23865    users 
   TABLE DATA           �   COPY public.users (user_id, username, email, fname, lname, phone_number, whatsapp_number, dob, employee_id, department, job_role) FROM stdin;
    public       	   ubustrack    false    395   �%       i           0    0    login_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.login_user_id_seq', 1, false);
          public       	   ubustrack    false    392            j           0    0    roles_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_role_id_seq', 4, true);
          public       	   ubustrack    false    394            k           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 33, true);
          public       	   ubustrack    false    396            Q           2606    23875    login login_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (login_id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public         	   ubustrack    false    391            S           2606    23877    login login_user_id_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_user_id_key UNIQUE (user_id);
 A   ALTER TABLE ONLY public.login DROP CONSTRAINT login_user_id_key;
       public         	   ubustrack    false    391            U           2606    23879    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public         	   ubustrack    false    393            W           2606    23881    roles roles_role_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);
 C   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_role_name_key;
       public         	   ubustrack    false    393            Y           2606    23883    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public         	   ubustrack    false    395            [           2606    23885    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         	   ubustrack    false    395            ]           2606    23887    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public         	   ubustrack    false    395            ^           2606    23888    login login_role_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);
 B   ALTER TABLE ONLY public.login DROP CONSTRAINT login_role_id_fkey;
       public       	   ubustrack    false    391    393    5717            _           2606    23893    login login_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.login DROP CONSTRAINT login_user_id_fkey;
       public       	   ubustrack    false    5723    391    395            Z   �  x�U�Ko�@������ǳ�67��IQ��ofi����:�(���^=:�Α���֥�{�W���5���I�-��`c�O��E�^3ޝ�k�k#6�嵷�z;�X�<�H>&t�ޞ��m��#N�4|���������Xt_���dkZ�zQ�˱؛#wq��d94���e)�<��(�RQ�%a,>I8x
4hJ�f �Je(M�:�sg����:��4_��K���ٕ�\^o�d��^m`��_��Qe'����_0��!)J0-���j"�3�(�
�2�Z)�G��^��;lW�D�Ҵ��q{���լ�����Gc�w?��]�Kv�GŤ�;��� �_���Bc	�������{D����
�8��f�s�M�b�-�9�t:� ��k      \   �   x�M�;�0Dk�s�H|�AA��fq��G^ǹ>K��L��98F�vE�&��(V�G�(w3Q�1c3��FQn�q�Z�q����x-�On(Ҭ��s����������V�C��t��\�{������N�3�x���꟝����D�      ^   �   x�u��
�0���_:3ֺ�Rn\�Z$6��&�􅟯����p�p9L7Տ��f�q�8���U�d�xج��|{��w�4�	�Va��8B���v'��d\ӚN0���p����V�u&�Q���`
�kmf���y��x�'h�i-�<)����I�     