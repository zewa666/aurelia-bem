import * as gulp from 'gulp';
import tslint from 'gulp-tslint';
const gulpStylelint = require('gulp-stylelint');
const merge = require("merge-stream");
import * as project from '../aurelia.json';

export default function lint() {
  const tsLinting = gulp.src(project.transpiler.source)
    .pipe(tslint({
      tslint: require("tslint"),
      formatter: 'prose'
    }))
    .pipe(tslint.report());

  const scssLinting = gulp.src(project.cssProcessor.source)
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));

  return merge(tsLinting, scssLinting);
}
