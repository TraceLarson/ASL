<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'LKr/Nhlu9VR4dyBPSlVQPPKDVDkqTs/SP6A3P3CZ1sCPQaStaR8CH8X9Ho3mKs6EGls+dhLSOwSFb5Fm23lPAw==');
define('SECURE_AUTH_KEY',  'ZSbI8OiOPQTxU9/LoFJW7QLHZbp20KidnDnhOeXeEZynhW0qHGpJoCIiI5sWPDqywCPmC1uCa228Tu7FPkGe0Q==');
define('LOGGED_IN_KEY',    'n8oxPczEMakCaV4fmswzZOEsKrzryvRumRq0y2KSLXGlzbM/Tm9UDrLEeC62STCZApnkCYYvzVN2QjqiCKi+GA==');
define('NONCE_KEY',        '43E0YloK/MosVjUG8pIW/GKoAUZtykODQ0G9YBnHKNtbjyY4VOIzvrr3LStU9WRCVmt0yZ1JW2oF+1/0Csja4w==');
define('AUTH_SALT',        'lQIw7IRe4jpSfbcjZi10etbVUPXQuFFidCHd73jQKObdyYdoM1arFjOBPIK9T/ffm9hqdtYoYzeODTLGbKTyYw==');
define('SECURE_AUTH_SALT', 'PqLh40uvxneddK/ROs+YJaD20/7+L4vUa07JwAh2WBkaYvOj/Ggkj20ojXHxlEiLFFa9BM8QhzDuX3QeCv14Ig==');
define('LOGGED_IN_SALT',   'ZFxB5hwZ/jpBkvflcOpKHPPxfT8b74y6e7WCnl06EiUsExA99tlsjERlhEgeieBlx0Ps3cwry4UL1k+43pFIvw==');
define('NONCE_SALT',       'vxXAKNWl0GNoZz6jI5HO8JJty9lGnsfimGgUDuffln86zjdSiCUXFzLlWoTjFVPeYjWeCKQa7hMlG7xf2T24/g==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
