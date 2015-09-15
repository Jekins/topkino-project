module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imagemin: {
			files: {
				expand: true,
				flatten: true,
				cwd: 'src/blocks/',
				src: ['**/*.{png,jpg,gif,svg}'],
				dest: 'dist/img/'
			}
		},
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			js: {
				src: 'src/blocks/**/*.js',
				dest: 'dist/js/all-scripts.js'
			},
			css: {
				src: 'dist/css/includes/*.css',
				dest: 'dist/css/all-styles.min.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			scripts: {
				files: {
					'dist/js/all-scripts.min.js': ['dist/js/all-scripts.js']
				}
			}
		},
		less: {
			options: {
				compress: true
			},
			files: {
				expand: true,
				cwd: 'src/less/',
				src: ['*.less'],
				dest: 'dist/css/includes/',
				ext: '.css'
			}
		},
		clean: {
			css: {
				src: ["dist/css/includes/"]
			},
			dist: {
				src: ["dist/"]
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 30 versions', 'ie 8', 'ie 9']
			},
			single_file: {
				src: 'dist/css/*.css',
				dest: 'dist/css/all-styles.css'
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['fonts/**'],
						dest: 'dist'
					},
					{
						expand: true,
						flatten: true,
						cwd: 'src/blocks/',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: 'dist/img/'
					},
					{
						expand: true,
						flatten: true,
						cwd: 'src/img/',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: 'dist/img/'
					},
					{
						expand: true,
						cwd: 'src/',
						src: ['css/**'],
						dest: 'dist'
					},
					{
						expand: true,
						cwd: 'src/',
						src: ['js/**'],
						dest: 'dist'
					},
					{
						expand: true,
						cwd: 'src/tpl/',
						src: ['**'],
						dest: 'dist'
					},
				],
			},
		},
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			scripts: {
				files: [
					'src/**/*.js'
				],
				tasks: [
					'concat:js',
					'uglify',
					'copy'
				]
			},
			styles: {
				files: [
					'src/**/*.less'
				],
				tasks: [
					'less',
					'concat:css',
					'clean:css',
					'autoprefixer',
				]
			},
			html: {
				files: [
					'src/tpl/**/*.html'
				],
				tasks: [
					'copy',
				]
			},
			img: {
				files: [
					'src/blocks/**/*.{png,jpg,gif,svg}',
					'src/img/**/*.{png,jpg,gif,svg}'
				],
				tasks: [
					'copy'
				]
			},
			css: {
				files: [
					'src/css/**/*.{css,png,jpg,gif,svg}'
				],
				tasks: [
					'copy'
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 7777,
					base: 'dist/',
					livereload: true
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'dist/**/*'
					]
				},
				options: {
					watchTask: true,
					server: 'dist'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browser-sync');


	grunt.registerTask('default', ['clean:dist', 'concat:js', 'uglify', 'copy', 'less', 'concat:css', 'clean:css', 'autoprefixer']);
	grunt.registerTask('serve', ['default', 'connect', 'watch']);
	grunt.registerTask('sync', ['default', 'browserSync', 'watch']);
	grunt.registerTask('img', ['default', 'imagemin']);

};