import { configure } from '@kadira/storybook';

// stories loader
const req = require.context('../stories', true, /.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
