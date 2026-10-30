import * as migration_20261012_060329_initial from './20261012_060329_initial';
import * as migration_20261012_064509_design_stage_blocks from './20261012_064509_design_stage_blocks';
import * as migration_20261012_064510_feature_grid_default_list from './20261012_064510_feature_grid_default_list';
import * as migration_20261012_083622_instagram_posts from './20261012_083622_instagram_posts';
import * as migration_20261019_024755_hero_colour_block from './20261019_024755_hero_colour_block';
import * as migration_20261020_013046_statement_block from './20261020_013046_statement_block';
import * as migration_20261020_015053_team_block from './20261020_015053_team_block';
import * as migration_20261020_032234_client_feedback_content from './20261020_032234_client_feedback_content';
import * as migration_20261021_044318_crew_vendor_database from './20261021_044318_crew_vendor_database';
import * as migration_20261022_010825_corporate_positioning from './20261022_010825_corporate_positioning';
import * as migration_20261027_032516_handoff_blocks from './20261027_032516_handoff_blocks';
import * as migration_20261027_072108_payload_3_91 from './20261027_072108_payload_3_91';
import * as migration_20261030_023857_credentials_style from './20261030_023857_credentials_style';

export const migrations = [
  {
    up: migration_20261012_060329_initial.up,
    down: migration_20261012_060329_initial.down,
    name: '20261012_060329_initial',
  },
  {
    up: migration_20261012_064509_design_stage_blocks.up,
    down: migration_20261012_064509_design_stage_blocks.down,
    name: '20261012_064509_design_stage_blocks',
  },
  {
    up: migration_20261012_064510_feature_grid_default_list.up,
    down: migration_20261012_064510_feature_grid_default_list.down,
    name: '20261012_064510_feature_grid_default_list',
  },
  {
    up: migration_20261012_083622_instagram_posts.up,
    down: migration_20261012_083622_instagram_posts.down,
    name: '20261012_083622_instagram_posts',
  },
  {
    up: migration_20261019_024755_hero_colour_block.up,
    down: migration_20261019_024755_hero_colour_block.down,
    name: '20261019_024755_hero_colour_block',
  },
  {
    up: migration_20261020_013046_statement_block.up,
    down: migration_20261020_013046_statement_block.down,
    name: '20261020_013046_statement_block',
  },
  {
    up: migration_20261020_015053_team_block.up,
    down: migration_20261020_015053_team_block.down,
    name: '20261020_015053_team_block',
  },
  {
    up: migration_20261020_032234_client_feedback_content.up,
    down: migration_20261020_032234_client_feedback_content.down,
    name: '20261020_032234_client_feedback_content',
  },
  {
    up: migration_20261021_044318_crew_vendor_database.up,
    down: migration_20261021_044318_crew_vendor_database.down,
    name: '20261021_044318_crew_vendor_database',
  },
  {
    up: migration_20261022_010825_corporate_positioning.up,
    down: migration_20261022_010825_corporate_positioning.down,
    name: '20261022_010825_corporate_positioning',
  },
  {
    up: migration_20261027_032516_handoff_blocks.up,
    down: migration_20261027_032516_handoff_blocks.down,
    name: '20261027_032516_handoff_blocks',
  },
  {
    up: migration_20261027_072108_payload_3_91.up,
    down: migration_20261027_072108_payload_3_91.down,
    name: '20261027_072108_payload_3_91',
  },
  {
    up: migration_20261030_023857_credentials_style.up,
    down: migration_20261030_023857_credentials_style.down,
    name: '20261030_023857_credentials_style'
  },
];
