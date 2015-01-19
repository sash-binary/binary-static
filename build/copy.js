module.exports = {
    all: {
        files: [
            { expand: true, src: ['config.json'], dest: 'dist' },
            { expand: true, src: ['javascript.json'], dest: 'dist' },
            { expand: true, cwd: 'src/config/', src: ['**'], dest: 'dist/config/' },
            { expand: true, cwd: 'src/images/', src: ['**'], dest: 'dist/images/', },
            { expand: true, cwd: 'src/flash/', src: ['**'], dest: 'dist/flash/' },
            { expand: true, cwd: 'src/templates/', src: ['**'], dest: 'dist/templates/' },
            { expand: true, cwd: 'src/css/external/jquery-ui-custom-theme/images/', src: ['**'], dest: 'dist/css/images' },
            { expand: true, cwd: 'src/css/external/jquery-ui-custom-theme/', src: ['*.css'], dest: 'dist/css/' },
            { expand: true, cwd: 'src/javascript/', src: ['**'], dest: 'dist/dev/src/javascript/' },
            { expand: true, cwd: 'src/javascript/gtm/', src: ['experimental.js'], dest: 'dist/js/gtm/' }
        ]
    }
};
