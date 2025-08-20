const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	src(credSource).pipe(dest(credDestination));

	// Copy shared assets to root dist
	const assetsSource = path.resolve('assets', '**', '*.{png,svg}');
	const assetsDestination = path.resolve('dist', 'assets');

	src(assetsSource).pipe(dest(assetsDestination));

	// Copy shared Virtuous icon to each Virtuous node directory
	const virtuousIconSource = path.resolve('assets', 'virtuous-logo-mark.svg');
	const virtuousNodeDirs = [
		path.resolve('dist', 'nodes', 'VirtuousContactNode'),
		path.resolve('dist', 'nodes', 'VirtuousGiftNode'),
		path.resolve('dist', 'nodes', 'VirtuousQuickSearchNode')
	];

	virtuousNodeDirs.forEach(dir => {
		src(virtuousIconSource).pipe(dest(dir));
	});

	return Promise.resolve();
}
