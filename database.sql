-- DROP TABLE public.contatos;

CREATE TABLE public.contatos (
	id serial4 NOT NULL,
	nome varchar(100) NULL,
	logradouro text NULL,
	bairro text NULL,
    cidade text NULL,
    uf text NULL,
    latitude text NULL,
    longitude text NULL,
    tipo text NULL,

	CONSTRAINT contatos_pkey PRIMARY KEY (id)
);