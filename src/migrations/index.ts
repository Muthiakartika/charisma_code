import * as migration_20261012_060329_initial from './20261012_060329_initial';
import * as migration_20261012_064509_design_stage_blocks from './20261012_064509_design_stage_blocks';
import * as migration_20261012_064510_feature_grid_default_list from './20261012_064510_feature_grid_default_list';
import * as migration_20261012_083622_instagram_posts from './20261012_083622_instagram_posts';

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
    name: '20261012_083622_instagram_posts'
  },
];
