import * as migration_20261012_060329_initial from './20261012_060329_initial';
import * as migration_20261012_064509_design_stage_blocks from './20261012_064509_design_stage_blocks';
import * as migration_20261012_064510_feature_grid_default_list from './20261012_064510_feature_grid_default_list';
import * as migration_20261012_083622_instagram_posts from './20261012_083622_instagram_posts';
import * as migration_20261019_024755_hero_colour_block from './20261019_024755_hero_colour_block';
import * as migration_20261020_013046_statement_block from './20261020_013046_statement_block';

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
    name: '20261020_013046_statement_block'
  },
];
