require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'toolkit'
require 'sass-globbing'
require 'susy'
require 'breakpoint'
require 'modular-scale'
require 'compass-normalize'
require 'compass-recipes'
require 'sassy-buttons'

# Set this to the root of your project when deployed:
http_path = "/public"
sass_dir = "app/scss"
css_dir = "public/stylesheets"
images_dir = "public/images"
javascripts_dir = "public/javascripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
line_comments = true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
