import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_tertiary_button_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_text_image_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_cards_tone" AS ENUM('light', 'tinted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_video_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq_tone" AS ENUM('light', 'tinted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_tertiary_button_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_text_image_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_items_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_tone" AS ENUM('light', 'tinted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_video_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_buttons_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_tone" AS ENUM('light', 'tinted', 'dark');
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_style" ADD VALUE 'match';
  ALTER TYPE "public"."enum_pages_blocks_feature_grid_style" ADD VALUE 'notes';
  ALTER TYPE "public"."enum_pages_blocks_service_cards_layout" ADD VALUE 'cards' BEFORE 'grid';
  ALTER TYPE "public"."enum_pages_blocks_cta_style" ADD VALUE 'ivory';
  ALTER TYPE "public"."enum_pages_blocks_cta_style" ADD VALUE 'card';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_grid_style" ADD VALUE 'match';
  ALTER TYPE "public"."enum__pages_v_blocks_feature_grid_style" ADD VALUE 'notes';
  ALTER TYPE "public"."enum__pages_v_blocks_service_cards_layout" ADD VALUE 'cards' BEFORE 'grid';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_style" ADD VALUE 'ivory';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_style" ADD VALUE 'card';
  CREATE TABLE "pages_blocks_text_image_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_text_image_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_text_image_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items_points_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_grid_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_feature_grid_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_process_steps_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_process_steps_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_service_cards_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_testimonials_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_founder_intro_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer
  );
  
  CREATE TABLE "pages_blocks_founder_intro_downloads_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_video_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_video_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_video_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_faq_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_text_image_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_text_image_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_image_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items_points_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_feature_grid_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_process_steps_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_service_cards_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_cards_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_testimonials_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_founder_intro_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_intro_downloads_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_video_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_video_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_faq_buttons_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_buttons_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tertiary_button_type" "enum_pages_blocks_hero_tertiary_button_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tertiary_button_page_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tertiary_button_url" varchar;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "second_heading" varchar;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN "tertiary_button_label" varchar;
  ALTER TABLE "pages_blocks_text_image_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "pages_blocks_text_image_locales" ADD COLUMN "table" varchar;
  ALTER TABLE "pages_blocks_text_image_locales" ADD COLUMN "points_heading" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "link_type" "enum_pages_blocks_feature_grid_items_link_type" DEFAULT 'page';
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "jump_to" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "ideal_for" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "points_heading" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "note" varchar;
  ALTER TABLE "pages_blocks_feature_grid_items_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_feature_grid_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "pages_blocks_service_cards" ADD COLUMN "tone" "enum_pages_blocks_service_cards_tone" DEFAULT 'light';
  ALTER TABLE "pages_blocks_service_cards_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "pages_blocks_founder_intro_locales" ADD COLUMN "downloads_heading" varchar;
  ALTER TABLE "pages_blocks_statement_locales" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_video_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "tone" "enum_pages_blocks_faq_tone" DEFAULT 'light';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_cta_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "tertiary_button_type" "enum__pages_v_blocks_hero_tertiary_button_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "tertiary_button_page_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "tertiary_button_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "second_heading" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN "tertiary_button_label" varchar;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD COLUMN "table" varchar;
  ALTER TABLE "_pages_v_blocks_text_image_locales" ADD COLUMN "points_heading" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "link_type" "enum__pages_v_blocks_feature_grid_items_link_type" DEFAULT 'page';
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "link_page_id" integer;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "jump_to" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "ideal_for" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "points_heading" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "note" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "_pages_v_blocks_service_cards" ADD COLUMN "tone" "enum__pages_v_blocks_service_cards_tone" DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_service_cards_locales" ADD COLUMN "footnote" varchar;
  ALTER TABLE "_pages_v_blocks_founder_intro_locales" ADD COLUMN "downloads_heading" varchar;
  ALTER TABLE "_pages_v_blocks_statement_locales" ADD COLUMN "tagline" varchar;
  ALTER TABLE "_pages_v_blocks_video_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "tone" "enum__pages_v_blocks_faq_tone" DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "price_line" varchar;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_price_line" varchar;
  ALTER TABLE "pages_blocks_text_image_buttons" ADD CONSTRAINT "pages_blocks_text_image_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_buttons" ADD CONSTRAINT "pages_blocks_text_image_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_buttons_locales" ADD CONSTRAINT "pages_blocks_text_image_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_image_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items_points" ADD CONSTRAINT "pages_blocks_feature_grid_items_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items_points_locales" ADD CONSTRAINT "pages_blocks_feature_grid_items_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_items_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_buttons" ADD CONSTRAINT "pages_blocks_feature_grid_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_buttons" ADD CONSTRAINT "pages_blocks_feature_grid_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_buttons_locales" ADD CONSTRAINT "pages_blocks_feature_grid_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_buttons" ADD CONSTRAINT "pages_blocks_process_steps_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_buttons" ADD CONSTRAINT "pages_blocks_process_steps_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_buttons_locales" ADD CONSTRAINT "pages_blocks_process_steps_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_buttons" ADD CONSTRAINT "pages_blocks_service_cards_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_buttons" ADD CONSTRAINT "pages_blocks_service_cards_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_buttons_locales" ADD CONSTRAINT "pages_blocks_service_cards_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_buttons" ADD CONSTRAINT "pages_blocks_testimonials_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_buttons" ADD CONSTRAINT "pages_blocks_testimonials_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_buttons_locales" ADD CONSTRAINT "pages_blocks_testimonials_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_intro_downloads" ADD CONSTRAINT "pages_blocks_founder_intro_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_intro_downloads" ADD CONSTRAINT "pages_blocks_founder_intro_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_intro_downloads_locales" ADD CONSTRAINT "pages_blocks_founder_intro_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_founder_intro_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_buttons" ADD CONSTRAINT "pages_blocks_video_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_buttons" ADD CONSTRAINT "pages_blocks_video_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_buttons_locales" ADD CONSTRAINT "pages_blocks_video_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_buttons" ADD CONSTRAINT "pages_blocks_faq_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_buttons" ADD CONSTRAINT "pages_blocks_faq_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_buttons_locales" ADD CONSTRAINT "pages_blocks_faq_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_buttons" ADD CONSTRAINT "_pages_v_blocks_text_image_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_buttons" ADD CONSTRAINT "_pages_v_blocks_text_image_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_image_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_text_image_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_image_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_points" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_points_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_points_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_items_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_buttons" ADD CONSTRAINT "_pages_v_blocks_feature_grid_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_buttons" ADD CONSTRAINT "_pages_v_blocks_feature_grid_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_feature_grid_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_buttons" ADD CONSTRAINT "_pages_v_blocks_process_steps_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_buttons" ADD CONSTRAINT "_pages_v_blocks_process_steps_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_process_steps_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_buttons" ADD CONSTRAINT "_pages_v_blocks_service_cards_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_buttons" ADD CONSTRAINT "_pages_v_blocks_service_cards_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_cards_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_service_cards_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_cards_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_buttons" ADD CONSTRAINT "_pages_v_blocks_testimonials_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_buttons" ADD CONSTRAINT "_pages_v_blocks_testimonials_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_intro_downloads" ADD CONSTRAINT "_pages_v_blocks_founder_intro_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_intro_downloads" ADD CONSTRAINT "_pages_v_blocks_founder_intro_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_intro_downloads_locales" ADD CONSTRAINT "_pages_v_blocks_founder_intro_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_founder_intro_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_buttons" ADD CONSTRAINT "_pages_v_blocks_video_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_buttons" ADD CONSTRAINT "_pages_v_blocks_video_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_video_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_video_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_buttons" ADD CONSTRAINT "_pages_v_blocks_faq_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_buttons" ADD CONSTRAINT "_pages_v_blocks_faq_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_faq_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_buttons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_image_buttons_order_idx" ON "pages_blocks_text_image_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_image_buttons_parent_id_idx" ON "pages_blocks_text_image_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_buttons_page_idx" ON "pages_blocks_text_image_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_text_image_buttons_locales_locale_parent_id_uni" ON "pages_blocks_text_image_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_points_order_idx" ON "pages_blocks_feature_grid_items_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_points_parent_id_idx" ON "pages_blocks_feature_grid_items_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_items_points_locales_locale_parent" ON "pages_blocks_feature_grid_items_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_buttons_order_idx" ON "pages_blocks_feature_grid_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_buttons_parent_id_idx" ON "pages_blocks_feature_grid_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_buttons_page_idx" ON "pages_blocks_feature_grid_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_grid_buttons_locales_locale_parent_id_u" ON "pages_blocks_feature_grid_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_process_steps_buttons_order_idx" ON "pages_blocks_process_steps_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_buttons_parent_id_idx" ON "pages_blocks_process_steps_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_buttons_page_idx" ON "pages_blocks_process_steps_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_process_steps_buttons_locales_locale_parent_id_" ON "pages_blocks_process_steps_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_buttons_order_idx" ON "pages_blocks_service_cards_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_buttons_parent_id_idx" ON "pages_blocks_service_cards_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_buttons_page_idx" ON "pages_blocks_service_cards_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_buttons_locales_locale_parent_id_" ON "pages_blocks_service_cards_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_buttons_order_idx" ON "pages_blocks_testimonials_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_buttons_parent_id_idx" ON "pages_blocks_testimonials_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_buttons_page_idx" ON "pages_blocks_testimonials_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_buttons_locales_locale_parent_id_u" ON "pages_blocks_testimonials_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_founder_intro_downloads_order_idx" ON "pages_blocks_founder_intro_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_intro_downloads_parent_id_idx" ON "pages_blocks_founder_intro_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_intro_downloads_file_idx" ON "pages_blocks_founder_intro_downloads" USING btree ("file_id");
  CREATE UNIQUE INDEX "pages_blocks_founder_intro_downloads_locales_locale_parent_i" ON "pages_blocks_founder_intro_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_video_buttons_order_idx" ON "pages_blocks_video_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_buttons_parent_id_idx" ON "pages_blocks_video_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_buttons_page_idx" ON "pages_blocks_video_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_video_buttons_locales_locale_parent_id_unique" ON "pages_blocks_video_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_buttons_order_idx" ON "pages_blocks_faq_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_buttons_parent_id_idx" ON "pages_blocks_faq_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_buttons_page_idx" ON "pages_blocks_faq_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_buttons_locales_locale_parent_id_unique" ON "pages_blocks_faq_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_buttons_order_idx" ON "_pages_v_blocks_text_image_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_image_buttons_parent_id_idx" ON "_pages_v_blocks_text_image_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_image_buttons_page_idx" ON "_pages_v_blocks_text_image_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_text_image_buttons_locales_locale_parent_id_" ON "_pages_v_blocks_text_image_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_points_order_idx" ON "_pages_v_blocks_feature_grid_items_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_points_parent_id_idx" ON "_pages_v_blocks_feature_grid_items_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_grid_items_points_locales_locale_par" ON "_pages_v_blocks_feature_grid_items_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_buttons_order_idx" ON "_pages_v_blocks_feature_grid_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_buttons_parent_id_idx" ON "_pages_v_blocks_feature_grid_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_buttons_page_idx" ON "_pages_v_blocks_feature_grid_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_grid_buttons_locales_locale_parent_i" ON "_pages_v_blocks_feature_grid_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_buttons_order_idx" ON "_pages_v_blocks_process_steps_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_buttons_parent_id_idx" ON "_pages_v_blocks_process_steps_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_buttons_page_idx" ON "_pages_v_blocks_process_steps_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_process_steps_buttons_locales_locale_parent_" ON "_pages_v_blocks_process_steps_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_buttons_order_idx" ON "_pages_v_blocks_service_cards_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_cards_buttons_parent_id_idx" ON "_pages_v_blocks_service_cards_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_cards_buttons_page_idx" ON "_pages_v_blocks_service_cards_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_cards_buttons_locales_locale_parent_" ON "_pages_v_blocks_service_cards_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_buttons_order_idx" ON "_pages_v_blocks_testimonials_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_buttons_parent_id_idx" ON "_pages_v_blocks_testimonials_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_buttons_page_idx" ON "_pages_v_blocks_testimonials_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_buttons_locales_locale_parent_i" ON "_pages_v_blocks_testimonials_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_intro_downloads_order_idx" ON "_pages_v_blocks_founder_intro_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_intro_downloads_parent_id_idx" ON "_pages_v_blocks_founder_intro_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_intro_downloads_file_idx" ON "_pages_v_blocks_founder_intro_downloads" USING btree ("file_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_founder_intro_downloads_locales_locale_paren" ON "_pages_v_blocks_founder_intro_downloads_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_video_buttons_order_idx" ON "_pages_v_blocks_video_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_buttons_parent_id_idx" ON "_pages_v_blocks_video_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_buttons_page_idx" ON "_pages_v_blocks_video_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_video_buttons_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_video_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_buttons_order_idx" ON "_pages_v_blocks_faq_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_buttons_parent_id_idx" ON "_pages_v_blocks_faq_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_buttons_page_idx" ON "_pages_v_blocks_faq_buttons" USING btree ("page_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_buttons_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_buttons_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_tertiary_button_page_id_pages_id_fk" FOREIGN KEY ("tertiary_button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_tertiary_button_page_id_pages_id_fk" FOREIGN KEY ("tertiary_button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_tertiary_button_tertiary_button_page_idx" ON "pages_blocks_hero" USING btree ("tertiary_button_page_id");
  CREATE INDEX "pages_blocks_feature_grid_items_link_link_page_idx" ON "pages_blocks_feature_grid_items" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_cta_image_idx" ON "pages_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_tertiary_button_tertiary_button_pag_idx" ON "_pages_v_blocks_hero" USING btree ("tertiary_button_page_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_link_link_page_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_cta_image_idx" ON "_pages_v_blocks_cta" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_image_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_image_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_process_steps_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_cards_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_cards_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_founder_intro_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_founder_intro_downloads_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_image_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_image_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_items_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_cards_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_cards_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_founder_intro_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_founder_intro_downloads_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_buttons_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text_image_buttons" CASCADE;
  DROP TABLE "pages_blocks_text_image_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items_points" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items_points_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_buttons" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_process_steps_buttons" CASCADE;
  DROP TABLE "pages_blocks_process_steps_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards_buttons" CASCADE;
  DROP TABLE "pages_blocks_service_cards_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_buttons" CASCADE;
  DROP TABLE "pages_blocks_testimonials_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_founder_intro_downloads" CASCADE;
  DROP TABLE "pages_blocks_founder_intro_downloads_locales" CASCADE;
  DROP TABLE "pages_blocks_video_buttons" CASCADE;
  DROP TABLE "pages_blocks_video_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_buttons" CASCADE;
  DROP TABLE "pages_blocks_faq_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_text_image_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items_points" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items_points_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_service_cards_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_intro_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_intro_downloads_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_video_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_video_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_buttons_locales" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_tertiary_button_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_feature_grid_items" DROP CONSTRAINT "pages_blocks_feature_grid_items_link_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_tertiary_button_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP CONSTRAINT "_pages_v_blocks_feature_grid_items_link_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta" DROP CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::text;
  DROP TYPE "public"."enum_pages_blocks_feature_grid_style";
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_style" AS ENUM('list', 'numbered', 'strip', 'cards', 'checklist');
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "pages_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_feature_grid_style" USING "style"::"public"."enum_pages_blocks_feature_grid_style";
  ALTER TABLE "pages_blocks_service_cards" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_service_cards" ALTER COLUMN "layout" SET DEFAULT 'priority'::text;
  DROP TYPE "public"."enum_pages_blocks_service_cards_layout";
  CREATE TYPE "public"."enum_pages_blocks_service_cards_layout" AS ENUM('priority', 'grid', 'list');
  ALTER TABLE "pages_blocks_service_cards" ALTER COLUMN "layout" SET DEFAULT 'priority'::"public"."enum_pages_blocks_service_cards_layout";
  ALTER TABLE "pages_blocks_service_cards" ALTER COLUMN "layout" SET DATA TYPE "public"."enum_pages_blocks_service_cards_layout" USING "layout"::"public"."enum_pages_blocks_service_cards_layout";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'spark'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('spark', 'dark', 'light');
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'spark'::"public"."enum_pages_blocks_cta_style";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "style" SET DATA TYPE "public"."enum_pages_blocks_cta_style" USING "style"::"public"."enum_pages_blocks_cta_style";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::text;
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_style";
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_style" AS ENUM('list', 'numbered', 'strip', 'cards', 'checklist');
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DEFAULT 'list'::"public"."enum__pages_v_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_feature_grid" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_feature_grid_style" USING "style"::"public"."enum__pages_v_blocks_feature_grid_style";
  ALTER TABLE "_pages_v_blocks_service_cards" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_service_cards" ALTER COLUMN "layout" SET DEFAULT 'priority'::text;
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_service_cards_layout" AS ENUM('priority', 'grid', 'list');
  ALTER TABLE "_pages_v_blocks_service_cards" ALTER COLUMN "layout" SET DEFAULT 'priority'::"public"."enum__pages_v_blocks_service_cards_layout";
  ALTER TABLE "_pages_v_blocks_service_cards" ALTER COLUMN "layout" SET DATA TYPE "public"."enum__pages_v_blocks_service_cards_layout" USING "layout"::"public"."enum__pages_v_blocks_service_cards_layout";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'spark'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('spark', 'dark', 'light');
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DEFAULT 'spark'::"public"."enum__pages_v_blocks_cta_style";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "style" SET DATA TYPE "public"."enum__pages_v_blocks_cta_style" USING "style"::"public"."enum__pages_v_blocks_cta_style";
  DROP INDEX "pages_blocks_hero_tertiary_button_tertiary_button_page_idx";
  DROP INDEX "pages_blocks_feature_grid_items_link_link_page_idx";
  DROP INDEX "pages_blocks_cta_image_idx";
  DROP INDEX "_pages_v_blocks_hero_tertiary_button_tertiary_button_pag_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_items_link_link_page_idx";
  DROP INDEX "_pages_v_blocks_cta_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tertiary_button_type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tertiary_button_page_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tertiary_button_url";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "second_heading";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "price_line";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN "tertiary_button_label";
  ALTER TABLE "pages_blocks_text_image_locales" DROP COLUMN "price_line";
  ALTER TABLE "pages_blocks_text_image_locales" DROP COLUMN "table";
  ALTER TABLE "pages_blocks_text_image_locales" DROP COLUMN "points_heading";
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "link_page_id";
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "jump_to";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "price_line";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "ideal_for";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "points_heading";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "note";
  ALTER TABLE "pages_blocks_feature_grid_items_locales" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_feature_grid_locales" DROP COLUMN "footnote";
  ALTER TABLE "pages_blocks_service_cards" DROP COLUMN "tone";
  ALTER TABLE "pages_blocks_service_cards_locales" DROP COLUMN "footnote";
  ALTER TABLE "pages_blocks_founder_intro_locales" DROP COLUMN "downloads_heading";
  ALTER TABLE "pages_blocks_statement_locales" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_video_locales" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "tone";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_cta_locales" DROP COLUMN "price_line";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "tertiary_button_type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "tertiary_button_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "tertiary_button_url";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "second_heading";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "price_line";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN "tertiary_button_label";
  ALTER TABLE "_pages_v_blocks_text_image_locales" DROP COLUMN "price_line";
  ALTER TABLE "_pages_v_blocks_text_image_locales" DROP COLUMN "table";
  ALTER TABLE "_pages_v_blocks_text_image_locales" DROP COLUMN "points_heading";
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "link_page_id";
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "jump_to";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "price_line";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "ideal_for";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "points_heading";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "note";
  ALTER TABLE "_pages_v_blocks_feature_grid_items_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_feature_grid_locales" DROP COLUMN "footnote";
  ALTER TABLE "_pages_v_blocks_service_cards" DROP COLUMN "tone";
  ALTER TABLE "_pages_v_blocks_service_cards_locales" DROP COLUMN "footnote";
  ALTER TABLE "_pages_v_blocks_founder_intro_locales" DROP COLUMN "downloads_heading";
  ALTER TABLE "_pages_v_blocks_statement_locales" DROP COLUMN "tagline";
  ALTER TABLE "_pages_v_blocks_video_locales" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "tone";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_cta_locales" DROP COLUMN "price_line";
  ALTER TABLE "services_locales" DROP COLUMN "price_line";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_price_line";
  DROP TYPE "public"."enum_pages_blocks_hero_tertiary_button_type";
  DROP TYPE "public"."enum_pages_blocks_text_image_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_process_steps_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_service_cards_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_service_cards_tone";
  DROP TYPE "public"."enum_pages_blocks_testimonials_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_video_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_faq_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_faq_tone";
  DROP TYPE "public"."enum__pages_v_blocks_hero_tertiary_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_text_image_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_cards_tone";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_faq_tone";`)
}
